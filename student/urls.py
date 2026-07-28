from django.urls import path 
from . import views
urlpatterns = [
    path('',views.home,name="home"),
    path('student/',views.index,name="index"),
    path('my_profile/',views.my_profile,name="my_profile"),
    path('Student_dashboard/',views.Student_dashboard,name="Student_dashboard"),
    path('payment_history/',views.payment_history,name="payment_history"),
    path('payment/',views.payment,name="payment"),
    # path('available_exams/',views.available_exams,name="available_exams"),
    # path('my_exams/',views.my_exams,name="my_exams"),
    path('result/',views.result,name="result"),
    path('notifications/',views.notifications,name="notifications"),
    path('help_support/',views.help_support,name="help_support"),
    path('registration/',views.registration,name="registration"),
    path('exam_details/',views.exam_details,name="exam_details"),
    path('otp/',views.otp,name="otp"),
    path('login/',views.login,name="login"),
    path('logout/',views.logout, name="logout"),



    path("mark_notification_read/<int:id>/",views.mark_notification_read,name="mark_notification_read"),
    path("delete_notification/<int:id>/",views.delete_notification,name="delete_notification"),
    path("otp/", views.otp, name="otp"),
    path("resend-otp/", views.resend_otp, name="resend_otp"),
    path("download_receipt/<str:Order_ID>/",views.download_receipt,name="download_receipt"),


   path('my_exams/',views.my_exams,name="my_exams"),
    path('available/',views.available,name="available"),
    path("save_exam_order/", views.save_exam_order, name="save_exam_order"),




]