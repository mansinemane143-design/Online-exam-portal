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
    path('student_registations_list/',views.student_registations_list,name="student_registations_list"),
path("delete_registration/<int:id>/",views.delete_registration,name="delete_registration"),



    # my exam
    
    path('my_exam/',views.my_exam, name="my_exam"),
    path('save_my_exam/',views.save_my_exam, name='save_my_exam'),
    path('my_exam_list/',views.my_exam_list, name='my_exam_list'),
    path('edit_my_exam/<int:id>/', views.edit_my_exam, name='edit_my_exam'),
    path('update_my_exam/<int:id>/', views.update_my_exam, name='update_my_exam'),
    path('delete_my_exam/<int:id>/', views.delete_my_exam, name='delete_my_exam'),
#instruction
    path('instruction/',views.instruction, name='instruction'),
    path('save_instruction/',views.save_instruction, name='save_instruction'),
    path('edit_instruction/<int:id>/',views.edit_instruction, name='edit_instruction'),
    path('update_instruction/<int:id>/',views.update_instruction, name='update_instruction'),
    path('delete_instruction/<int:id>/',views.delete_instruction, name='delete_instruction'),

    # Available Exam page start here 

    path('available_exam/',views.available_exam, name='available_exam'),
    path('save_available_exam/',views.save_available_exam,name='save_available_exam'),
    path('available_list/',views.available_list, name='available_list'),
    path('edit_available_exam/<int:id>/',views.edit_available_exam, name='edit_available_exam'),
    path('update_available_exam/<int:id>/',views.update_available_exam, name='update_available_exam'),
    path('delete_available_exam/<int:id>/',views.delete_available_exam, name='delete_available_exam'),
    path('available_instruction/',views.available_instruction, name='available_instruction'),
    path('available_save_instruction/',views.available_save_instruction, name='available_save_instruction'),
    path('available_edit_instruction/<int:id>/',views.available_edit_instruction, name='available_edit_instruction'),
    path('available_update_instruction/<int:id>/',views.available_update_instruction, name='available_update_instruction'),
    path('available_delete_instruction/<int:id>/',views.available_delete_instruction, name='available_delete_instruction'),




    path('Teacher_registrations/',views.Teacher_registrations, name='Teacher_registrations'),
    path('teacher_profile/',views.teacher_profile, name='teacher_profile'),

path('Teacher_registrations_list/',views.Teacher_registrations_list, name='Teacher_registrations_list'),

path("teacher_update/<int:id>/",views.teacher_update,name="teacher_update"),

path("teacher_delete/<int:id>/",views.teacher_delete,name="teacher_delete"),

path('Add_Academy/',views.Add_Academy, name='Add_Academy'),
path("academy_list/", views.academy_list, name="academy_list"),
path("add_academy/", views.add_academy, name="add_academy"),
path("update_academy/<int:id>/", views.update_academy, name="update_academy"),
path("delete_academy/<int:id>/", views.delete_academy, name="delete_academy"),


]