from django.urls import path
from payment import views 
app_name = "payment"

urlpatterns = [

    path("", views.index, name="index"),
    path("api/create-order/", views.create_order, name="create_order"),
    path("api/verify-payment/", views.verify_payment, name="verify_payment"),
    path("api/payment-failed/", views.payment_failed_callback, name="payment_failed_callback"),
    path("success/", views.success, name="success"),
    path("failed/", views.failed, name="failed"),

]