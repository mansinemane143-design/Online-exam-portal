from django.urls import path 
from . import views
urlpatterns = [
    path('',views.dashboard,name="dashboard"),
    path('add_subject/',views.add_subject,name="add_subject"),
    path('subject_list/',views.subject_list,name="subject_list"),
    path("save_sub/", views.save_sub, name="save_sub"),
    path("delete_subject/<int:id>/", views.delete_subject, name="delete_subject"),
    path('questions_add/',views.questions_add,name="questions_add"),
    path('answer_key/',views.answer_key,name="answer_key"),
    path("sub_category/", views.sub_category, name="sub_category"),
    path("sub_category_list/", views.sub_category_list, name="sub_category_list"),

    path(
        "add_sub_category/",
        views.add_sub_category,
        name="add_sub_category"
    ),

    path(
        "delete_subcategory/<int:id>/",
        views.delete_subcategory,
        name="delete_subcategory"
    ),
    path('publish_exam/',views.publish_exam,name="publish_exam"),
    path('income/',views.income,name="income"),
    path('student_details/',views.student_details,name="student_details"),
    path('notifications/',views.notifications,name="notifications"),
    path('help_support/',views.help_support,name="help_support"),
    path('teach_View_details/',views.teach_View_details,name="teach_View_details"),
    path('result/',views.result,name="result"),

    







]