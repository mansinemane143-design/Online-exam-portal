from django.shortcuts import render

# Create your views here.
import json
import logging

import razorpay
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.utils import timezone

from .models import Payment

logger = logging.getLogger(__name__)


def get_razorpay_client():
    """Return a configured Razorpay client instance."""
    return razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))


def index(request):
    """Render the payment page and show the pay button."""
    context = {
        "razorpay_key_id": settings.RAZORPAY_KEY_ID,
        "company_name": settings.COMPANY_NAME,
        "company_logo_url": settings.COMPANY_LOGO_URL,
        "product_name": settings.PRODUCT_NAME,
        "product_description": settings.PRODUCT_DESCRIPTION,
        "product_amount": settings.PRODUCT_AMOUNT,
        "currency": settings.RAZORPAY_CURRENCY,
    }
    return render(request, "payment/index.html", context)


@require_POST
def create_order(request):
    """
    Create a Razorpay Order from the backend.
    Called via fetch() from script.js before opening the checkout modal.
    """
    try:
        data = json.loads(request.body.decode("utf-8"))
        customer_name = data.get("customer_name", "").strip()
        customer_email = data.get("customer_email", "").strip()
        customer_phone = data.get("customer_phone", "").strip()

        if not (customer_name and customer_email and customer_phone):
            return JsonResponse(
                {"success": False, "error": "Name, email and phone are required."},
                status=400,
            )

        amount_rupees = settings.PRODUCT_AMOUNT
        amount_paise = int(amount_rupees) * 100  # Razorpay expects the smallest currency unit

        client = get_razorpay_client()
        razorpay_order = client.order.create(
            {
                "amount": amount_paise,
                "currency": settings.RAZORPAY_CURRENCY,
                "payment_capture": 1,
            }
        )

        # Persist a PENDING payment record right away
        Payment.objects.create(
            order_id=razorpay_order["id"],
            customer_name=customer_name,
            customer_email=customer_email,
            customer_phone=customer_phone,
            amount=amount_rupees,
            currency=settings.RAZORPAY_CURRENCY,
            status=Payment.Status.PENDING,
        )

        return JsonResponse(
            {
                "success": True,
                "order_id": razorpay_order["id"],
                "amount": amount_paise,
                "currency": settings.RAZORPAY_CURRENCY,
                "key_id": settings.RAZORPAY_KEY_ID,
                "company_name": settings.COMPANY_NAME,
                "product_name": settings.PRODUCT_NAME,
                "customer_name": customer_name,
                "customer_email": customer_email,
                "customer_phone": customer_phone,
            }
        )

    except razorpay.errors.BadRequestError as exc:
        logger.exception("Razorpay bad request while creating order")
        return JsonResponse({"success": False, "error": str(exc)}, status=400)
    except Exception as exc:  # noqa: BLE001
        logger.exception("Unexpected error while creating order")
        return JsonResponse({"success": False, "error": "Could not create order. Please try again."}, status=500)


@csrf_exempt
@require_POST
def verify_payment(request):
    """
    Verify the Razorpay payment signature on the backend.
    This endpoint is called after the Razorpay Checkout success callback fires.
    """
    try:
        data = json.loads(request.body.decode("utf-8"))
        razorpay_order_id = data.get("razorpay_order_id")
        razorpay_payment_id = data.get("razorpay_payment_id")
        razorpay_signature = data.get("razorpay_signature")

        if not (razorpay_order_id and razorpay_payment_id and razorpay_signature):
            return JsonResponse({"success": False, "error": "Missing payment parameters."}, status=400)

        client = get_razorpay_client()

        params_dict = {
            "razorpay_order_id": razorpay_order_id,
            "razorpay_payment_id": razorpay_payment_id,
            "razorpay_signature": razorpay_signature,
        }

        try:
            payment = Payment.objects.get(order_id=razorpay_order_id)
        except Payment.DoesNotExist:
            return JsonResponse({"success": False, "error": "Order not found."}, status=404)

        try:
            # Raises razorpay.errors.SignatureVerificationError if invalid
            client.utility.verify_payment_signature(params_dict)
        except razorpay.errors.SignatureVerificationError:
            payment.status = Payment.Status.FAILED
            payment.failure_reason = "Signature verification failed."
            payment.payment_id = razorpay_payment_id
            payment.save()
            return JsonResponse({"success": False, "error": "Payment signature verification failed."}, status=400)

        # Signature is valid -> mark as SUCCESS
        payment.payment_id = razorpay_payment_id
        payment.razorpay_signature = razorpay_signature
        payment.status = Payment.Status.SUCCESS

        # Fetch payment method details from Razorpay for our records (best effort)
        try:
            payment_details = client.payment.fetch(razorpay_payment_id)
            payment.payment_method = payment_details.get("method", "")
        except Exception:  # noqa: BLE001
            logger.warning("Could not fetch extended payment details from Razorpay")

        payment.save()

        return JsonResponse({"success": True, "order_id": razorpay_order_id})

    except Exception:  # noqa: BLE001
        logger.exception("Unexpected error while verifying payment")
        return JsonResponse({"success": False, "error": "Verification failed. Please contact support."}, status=500)


@csrf_exempt
@require_POST
def payment_failed_callback(request):
    """Called by the frontend when Razorpay Checkout reports a failure."""
    try:
        data = json.loads(request.body.decode("utf-8"))
        order_id = data.get("order_id")
        reason = data.get("reason", "Payment was not completed.")

        if order_id:
            Payment.objects.filter(order_id=order_id).update(
                status=Payment.Status.FAILED,
                failure_reason=reason,
            )
        return JsonResponse({"success": True})
    except Exception:  # noqa: BLE001
        logger.exception("Unexpected error while logging payment failure")
        return JsonResponse({"success": False}, status=500)


def success(request):
    """Render the success page, looking up the order from the query string."""
    order_id = request.GET.get("order_id")
    payment = Payment.objects.filter(order_id=order_id, status=Payment.Status.SUCCESS).first()
    if not payment:
        return redirect("payment:failed")

    context = {"payment": payment}
    return render(request, "payment/success.html", context)


def failed(request):
    """Render the failure page, looking up the order from the query string if present."""
    order_id = request.GET.get("order_id")
    payment = Payment.objects.filter(order_id=order_id).first() if order_id else None
    context = {
        "payment": payment,
        "reason": (payment.failure_reason if payment and payment.failure_reason else "Your payment could not be completed."),
    }
    return render(request, "payment/failed.html", context)



def index(request):
    registration_id = request.GET.get("registration_id")
    amount = settings.PRODUCT_AMOUNT
    product_name = settings.PRODUCT_NAME

    if registration_id:
        from student.models import Registration
        registration_obj = Registration.objects.filter(id=registration_id).first()
        if registration_obj:
            amount = registration_obj.get_exam_fee()
            product_name = f"{registration_obj.exam} Exam Fee"

    context = {
        "razorpay_key_id": settings.RAZORPAY_KEY_ID,
        "company_name": settings.COMPANY_NAME,
        "company_logo_url": settings.COMPANY_LOGO_URL,
        "product_name": product_name,
        "product_description": settings.PRODUCT_DESCRIPTION,
        "product_amount": amount,
        "currency": settings.RAZORPAY_CURRENCY,
        "registration_id": registration_id,
    }
    return render(request, "payment/index.html", context)
