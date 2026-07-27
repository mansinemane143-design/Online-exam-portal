from django.urls import path
from . import views


urlpatterns = [

    path('', views.index, name="index"),
    path('home_exam_card/',views.home_exam_card,name="home_exam_card"),
    path('create_card_save/',views.create_card_save,name="create_card_save"),
    path('home_exam_card_list/',views.home_exam_card_list,name="home_exam_card_list"),
    path('update_home_exam_card/<int:id>/',views.update_home_exam_card,name="update_home_exam_card"),
    path('delete_exam/<int:id>/',views.delete_exam,name="delete_exam"),

    path('student_review/',views.student_review,name="student_review"),
    path('Student_Reviews_save/', views.Student_Reviews_save, name='Student_Reviews_save'),
    path('student_review_list/',views.student_review_list,name="student_review_list"),
    path('student_review_update/<int:id>/',views.student_review_update,name="student_review_update"),
    path('Delete_Student_Reviews/<int:id>/',views.Delete_Student_Reviews,name="Delete_Student_Reviews"),




]