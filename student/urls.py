from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('student_dashboard/', views.index, name="index"),
    
    path('my_profile/', views.my_profile, name="my_profile"),
    path('student_dashboard/', views.student_dashboard, name="student_dashboard"),
    path('payment_history/', views.payment_history, name="payment_history"),
    path('payment/', views.payment, name="payment"),

    path('result/', views.result, name="result"),
    path('notifications/', views.notifications, name="notifications"),
    path('help_support/', views.help_support, name="help_support"),

    # Registration
    path('registration/', views.registration, name="registration"),
    path('exam_details/', views.exam_details, name="exam_details"),
    path('otp/', views.otp, name="otp"),
    path('resend-otp/', views.resend_otp, name="resend_otp"),

    # Login
    path('student_login/', views.student_login, name="student_login"),
    path('logout/', views.logout, name="logout"),

    # Forgot Password
    path("forgot_password/", views.forgot_password, name="forgot_password"),
    path("forgot_otp/", views.forgot_otp, name="forgot_otp"),
    path("forgot_resend_otp/", views.forgot_resend_otp, name="forgot_resend_otp"),
    path("reset_password/", views.reset_password, name="reset_password"),

    # Notifications
    path("mark_notification_read/<int:id>/", views.mark_notification_read, name="mark_notification_read"),
    path("delete_notification/<int:id>/", views.delete_notification, name="delete_notification"),

    # Receipt
    path("download_receipt/<str:Order_ID>/", views.download_receipt, name="download_receipt"),

    # Exams
    path('my_exams/', views.my_exams, name="my_exams"),
    path('available/', views.available, name="available"),
    path("save_exam_order/", views.save_exam_order, name="save_exam_order"),



    path(
    "password_success/",
    views.password_success,
    name="password_success"
),
]