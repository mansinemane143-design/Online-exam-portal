from django.shortcuts import render,redirect
from django.contrib import messages
from django.http import HttpResponse
from . import models
# Create your views here.



def dashboard(req):
    return render(req,"teacher/dashboard.html")



def teach_View_details(req):
    return render(req,"teacher/teach_View_details.html")






def add_subject(req):
    return render(req,"teacher/add_subject.html" )

def subject_list(req):
    subject_data = models.Subject.objects.all().order_by("-id")
    return render(req,"teacher/subject_list.html",{"subject_data": subject_data} )

def save_sub(request):

    if request.method == "POST":

        sub_name = request.POST.get("sub_name")
        status = request.POST.get("status")

        models.Subject.objects.create(
            sub_name=sub_name,
            status=status
        )
        messages.success(request, "Subject Saved Successfully")

    return redirect("/teacher/add_subject/")



def delete_subject(request, id):
    models.Subject.objects.get(id=id).delete()
    return redirect("/teacher/subject_list/")





def sub_category(req):
    return render(req,"teacher/sub_category.html")

def sub_category_list(req):
    sub_category_data = models.sub_category.objects.all().order_by("-id")
    return render(req,"teacher/sub_category_list.html",{"sub_category_data": sub_category_data} )

def add_sub_category(request):

    if request.method == "POST":

        sub_category = request.POST.get("sub_category"),
        subject = request.POST.get("subject"),

        models.sub_category.objects.create(
            sub_category=sub_category,
            subject=subject
        )
        messages.success(request, "Subject Saved Successfully")

    return redirect("/teacher/sub_category/")



def delete_subcategory(request, id):
    models.sub_category.objects.get(id=id).delete()
    return redirect("/teacher/sub_category_list/")


def questions_add(req):
    return render(req,"teacher/questions_add.html")

def answer_key(req):
    return render(req,"teacher/answer_key.html")


def publish_exam(req):
    return render(req,"teacher/publish_exam.html")



def income(req):
    return render(req,"teacher/income.html")


def student_details(req):
    return render(req,"teacher/student_details.html")

def notifications(req):
    return render(req,"teacher/notifications.html")

def help_support(req):
    return render(req,"teacher/help_support.html")

def result(req):
    return render(req,"teacher/result.html")
