from django.shortcuts import render,redirect
from django.http import HttpResponse
# from models import models
from adminpanel import models as ad
# from adminpanel import  Exam
from django.core.mail import send_mail
from django.conf import settings
from payment import models as py

from .models import Notification, Registration
from student import models
import random
import time


# Create your views here.

def home(req):
    exams = ad.Exam.objects.all()
    Student_Reviews_data = ad.Student_Reviews.objects.all()[:3]

   

    obj = {
        "Student_Reviews_data":Student_Reviews_data,
        "exams":exams,
  
    }
    # return HttpResponse("Your Home student")
    return render(req,"student/home.html",obj)

def index(req):
    return render(req,"student/index.html")

def my_profile(req):
    return render(req,"student/my_profile.html")

def Student_dashboard(req):
    return render(req,"student/Student_dashboard.html")

def payment_history(req):
    payments = py.Payment.objects.all()

    return render(req, "student/payment_history.html",{"payments":payments})

def payment(req):
    return render(req,"student/payment.html")

def available_exams(req):
    return render(req,"student/available_exams.html")

def my_exams(req):
    return render(req,"student/my_exams.html")


def result(req):
    return render(req,"student/result.html")

def notifications(req):
    return render(req,"student/notifications.html")

def help_support(req):
    return render(req,"student/help_support.html")

def registration(req):
    return render(req,"student/registration.html")


def exam_details(req):
    return render(req,"student/exam_details.html")


def otp(req):
    return render(req,"student/otp.html")


def login(req):
    return render(req,"student/login.html")
    

# def student_login(req):
#     if req.method == "POST":
#         email = req.POST.get('email')
#         password = req.POST.get('password')

#         student = ad.Exam.objects.filter(email = email, password = password).first()

#         if student:
#             req.session['user_email'] = email
#             req.session['is_login'] = True
#             req.session.set_expiry(1800)

#             response = redirect('/admin/')
#             response.set_cookie('user_email', email, max_age=3600)
#             return response
#         else:
#             return render(req,'student/login.html',{"error":"Invalid User"})
#     return render(req,"student/login.html")

def logout(req):
    req.session.clear()
    req.session.flush() 
    return redirect('/login/')


# ---------------------------------------------------------------------
# Notifications
# ---------------------------------------------------------------------
def notifications(request):
    notifications = Notification.objects.all().order_by('-created_at')

    context = {
        "notifications": notifications,
        "total": notifications.count(),
        "unread": notifications.filter(is_read=False).count(),
        "exam": notifications.filter(category='exam').count(),
        "payment": notifications.filter(category='payment').count(),
        "result": notifications.filter(category='result').count(),
        "system": notifications.filter(category='system').count(),
    }

    return render(request, "student/notifications.html", context)


def mark_notification_read(request, id):
    notification = get_object_or_404(Notification, id=id)
    notification.is_read = True
    notification.save()
    return redirect('notifications')


def delete_notification(request, id):
    notification = get_object_or_404(Notification, id=id)
    notification.delete()
    return redirect('notifications')


# ---------------------------------------------------------------------
# Registration -> Exam Details -> OTP flow
# ---------------------------------------------------------------------
def registration(req):

    if req.method == "POST":

        print("REGISTRATION DATA:", req.POST)

        req.session["reg_full_name"] = req.POST.get("full_name")
        req.session["reg_mobile"] = req.POST.get("mobile_number")
        req.session["reg_email"] = req.POST.get("email")
        req.session["reg_age"] = req.POST.get("age")


        print("EMAIL SAVED:", req.session["reg_email"])


        req.session.modified = True

        return redirect("exam_details")


    return render(req, "student/registration.html")


def exam_details(req):

    print("SESSION EMAIL BEFORE OTP:", req.session.get("reg_email"))

    if req.method == "POST":

        req.session["reg_city"] = req.POST.get("city")
        req.session["reg_exam"] = req.POST.get("exam")
        req.session["reg_education"] = req.POST.get("education")

        generated_otp = str(random.randint(100000, 999999))

        print("OTP VALUE:", generated_otp)
        print("OTP LENGTH:", len(generated_otp))

        req.session["reg_otp"] = generated_otp
        req.session["otp_time"] = int(time.time())

        print("EMAIL SEND TO:", req.session.get("reg_email"))

        try:
            send_mail(
                subject="Your Exam Registration OTP",
                message=f"Your OTP is {generated_otp}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[req.session.get("reg_email")],
                fail_silently=False,
            )

            print("MAIL SENT SUCCESSFULLY")

        except Exception as e:
            print("MAIL ERROR:", e)

        return redirect("otp")

    return render(req, "student/exam_details.html")

# otp = str(random.randint(100000, 999999))

# req.session["reg_otp"] = otp
# req.session["otp_time"] = int(time.time())

# send_mail(
#     subject="Exam Registration OTP",
#     message=f"Your OTP is {otp}. This OTP is valid for 30 seconds.",
#     from_email=None,
#     recipient_list=[req.session["reg_email"]],
#     fail_silently=False,
# )




def otp(req):

    if req.method == "POST":

        entered_otp = req.POST.get("otp")

        actual_otp = req.session.get("reg_otp")

        otp_time = req.session.get("otp_time")


        # OTP Generate झाला नाही
        if not actual_otp:
            return render(req, "student/otp.html", {
                "error": "OTP not found. Please resend OTP."
            })


        # OTP Expiry Check (30 sec)
        if int(time.time()) - otp_time > 300:

            req.session.pop("reg_otp", None)
            req.session.pop("otp_time", None)

            return render(req, "student/otp.html", {
                "error": "OTP Expired. Please resend OTP."
            })


        # Wrong OTP
        if entered_otp != actual_otp:

            return render(req, "student/otp.html", {
                "error": "Invalid OTP. Please try again."
            })


        # Correct OTP
        registration_obj = Registration.objects.create(

            full_name=req.session.get("reg_full_name"),

            mobile_number=req.session.get("reg_mobile"),

            email=req.session.get("reg_email"),

            age=req.session.get("reg_age"),

            city=req.session.get("reg_city"),

            exam=req.session.get("reg_exam"),

            education=req.session.get("reg_education"),

            is_verified=True,

        )


        keys = [

            "reg_full_name",
            "reg_mobile",
            "reg_email",
            "reg_age",
            "reg_city",
            "reg_exam",
            "reg_education",
            "reg_otp",
            "otp_time"

        ]

        for key in keys:

            req.session.pop(key, None)


        return redirect(f"/razopay/?registration_id={registration_obj.id}")


    return render(req, "student/otp.html", {
    "email": req.session.get("reg_email")
})

def resend_otp(req):

    email = req.session.get("reg_email")

    print("USER EMAIL:", email)


    if not email:
        return redirect("registration")


    otp = str(random.randint(100000,999999))
    # otp = str(random.randint(100000,999999))

    print("RESEND OTP:")
    print(otp)

    print("LENGTH:")
    print(len(otp))

    print("GENERATED OTP:", otp)


    req.session["reg_otp"] = otp

    req.session["otp_time"] = int(time.time())


    send_mail(

        subject="New OTP",

        message=f"Your New OTP is {otp}",

        from_email=settings.DEFAULT_FROM_EMAIL,

        recipient_list=[email],

        fail_silently=False

    )


    print("MAIL SENT")


    return redirect("otp")


from django.http import HttpResponse
from reportlab.pdfgen import canvas


def download_receipt(request,Order_ID):

    response = HttpResponse(
        content_type="application/pdf"
    )

    response['Content-Disposition'] = (
        'attachment; filename="payment_receipt_{Order_ID}.pdf"'
    )


    pdf = canvas.Canvas(response)


    pdf.drawString(
        100,
        800,
        "ONLINE EXAM PORTAL PAYMENT RECEIPT"
    )


    pdf.drawString(
        100,
        760,
        "Payment Status : SUCCESS"
    )


    pdf.drawString(
        100,
        720,
        "Thank you for your payment"
    )


    pdf.save()




    return response


def registration(request):

    if request.method == "POST":

        Student_Registration.objects.create(

            full_name=request.POST.get("full_name"),
            mobile_number=request.POST.get("mobile_number"),
            email=request.POST.get("email"),
            password=request.POST.get("password"),
            age=request.POST.get("age"),
            profile_photo=request.FILES.get("profile_photo")

        )

        return redirect("student_list")   # किंवा ज्या page वर redirect करायचे आहे

    return render(request, "student/registration.html")