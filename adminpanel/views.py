from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Exam
from . models import Student_Reviews
from payment import models as py



# Admin Home
def index(req):
    exams = Exam.objects.all()
    return render(req, "admin/index.html", {"exams":exams})


# Create Exam Card Page
def home_exam_card(req):
    return render(req, "admin/home_exam_card.html")



from django.contrib import messages

def create_card_save(request):
    messages.success(request, "Exam Card Form Save Successfully!")

    if request.method == "POST":

        exam_name = request.POST.get("exam_name")
        validity = request.POST.get("validity")
        exam_fees = request.POST.get("exam_fees")
        total_questions = request.POST.get("total_questions")
        exam_duration=request.POST.get("exam_duration"),
        negative_marking = request.POST.get("negative_marking")
        exam_mode = request.POST.get("exam_mode")
        language = request.POST.get("language")
        status = request.POST.get("status")
        sub_name = request.POST.get("sub_name")
        type_name=request.POST.get("type_name"),

        Exam.objects.create(
            exam_name=exam_name,
            validity=validity,
            exam_fees=exam_fees,
            total_questions=total_questions,
            negative_marking=negative_marking,
            exam_mode=exam_mode,
            language=language,
            status=status,
            sub_name=sub_name,
            type_name=type_name,
            exam_duration=exam_duration

        )


        return redirect("/admin/home_exam_card/")

    return redirect("/admin/home_exam_card/")

# Exam List
def home_exam_card_list(request):

    exams = Exam.objects.all()

    return render(
        request,
        "admin/home_exam_card_list.html",
        {
            "exams":exams
        }
    )

    

def update_home_exam_card(request, id):
    exam = get_object_or_404(Exam, id=id)
    messages.success(request, "Exam Card Form Update Successfully!")

    if request.method == "POST":
        exam.exam_name = request.POST.get("exam_name")
        exam.validity = request.POST.get("validity")
        exam.exam_fees = request.POST.get("exam_fees")
        exam.total_questions = request.POST.get("total_questions")
        exam.sub_name = request.POST.get("sub_name")
        exam.minutes = request.POST.get("minutes")
        exam.seconds = request.POST.get("seconds")
        exam.status = request.POST.get("status")
        exam.negative_marking = request.POST.get("negative_marking")
        exam.exam_mode = request.POST.get("exam_mode")
        exam.language = request.POST.get("language")
        exam.type_name = request.POST.get("type_name")
        exam.exam_duration=request.POST.get("exam_duration")

        exam.save()
        return redirect("/admin/home_exam_card_list/")

    return render(request, "admin/update_home_exam_card.html", {
        "exam": exam
    })
# Delete Exam
def delete_exam(request,id):

    exam = get_object_or_404(
        Exam,
        id=id
    )

    exam.delete()

    return redirect('/admin/home_exam_card_list/')



def student_review(req):
  
    return render(req,"admin/student_review.html")

def Student_Reviews_save(req):

    if req.method == "POST":
        print(req.POST)
        data = Student_Reviews(
            fullname = req.POST.get('fullname'),
            bharti = req.POST.get('bharti'),
            icon = req.POST.get('icon'),
            dec = req.POST.get('dec')
        )
        data.save()
        print("Saved Successfully!")
        messages.success(req, "Student Review Form Save Successfully!")

    return redirect('/admin/student_review/')
    
    
def student_review_update(req,id):
    Student_Reviews_data = Student_Reviews.objects.all()
   
    update = Student_Reviews.objects.get(id=id)

    if req.method == "POST":
        update.fullname = req.POST.get('fullname')
        update.bharti = req.POST.get('bharti')
        update.icon = req.POST.get('icon')
        update.dec = req.POST.get('dec')
        update.save()
        messages.success(req, "Student Review Updated Successfully!")
        return redirect('/admin/student_review_list/')
    return render(req,"admin/student_review_update.html",{"Student_Reviews_data":Student_Reviews_data})
    
def Delete_Student_Reviews(req,id):
  
    delete_data = Student_Reviews.objects.get(id=id)
    messages.success(req, "Record Deleted Successfully")

    delete_data.delete()
    return redirect('/admin/student_review_list/')

def student_review_list(req):
    Student_Reviews_data = Student_Reviews.objects.all()
    return render(req,"admin/student_review_list.html",{"Student_Reviews_data":Student_Reviews_data}) \


