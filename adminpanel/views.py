from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Exam
from . models import Student_Reviews
from payment import models as py
from student import models as stu




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


from django.shortcuts import render, redirect, get_object_or_404
import student.models as stu

def student_registations_list(req):
    Registration = stu.Registration.objects.all()
    return render(req,"admin/student_registations_list.html",{"Registration": Registration})

def delete_registration(request, id):
    student = get_object_or_404(stu.Registration, id=id)
    if student.profile_photo:
        student.profile_photo.delete(save=False)

    student.delete()

    return redirect("/admin/student_registations_list/")



from . import models

from django.contrib import messages

def my_exam(req):
    data =models.MyExampage.objects.all()
    return render(req,'admin/my_exam.html',{"data":data})

def save_my_exam(req):
    data = models.MyExampage(
            exam_name=req.POST.get("exam_name"),
            exam_description=req.POST.get("exam_description"),
            total_questions=req.POST.get("total_questions"),
            duration=req.POST.get("duration"),
            marks=req.POST.get("marks"),
            # exam_instructions = req.POST.get('exam_instructions'),
            # status=req.POST.get("status"),

    )
    data.save()
    messages.success(req, "Exam saved successfully!")
    return redirect('/admin/my_exam')

def my_exam_list(req):
    data = models.MyExampage.objects.all()
    return render(req,'admin/my_exam_list.html',{"data":data})


def edit_my_exam(req,id):
    data= models.MyExampage.objects.get(id=id)
    return render(req,'admin/update_my_exam.html',{"data":data})

def update_my_exam(req,id):
    data = models.MyExampage.objects.get(id=id)
    if req.method =='POST':
        data.exam_name = req.POST.get('exam_name')
        data.exam_description = req.POST.get('exam_description')
        data.total_questions = req.POST.get('total_questions')
        data.duration = req.POST.get('duration')
        data.marks = req.POST.get('marks')
        data.save()
        messages.success(req, "Exam saved successfully!")
        return redirect('/admin/my_exam')

def delete_my_exam(req,id):
    data = models.MyExampage.objects.get(id=id)
    data.delete()
    messages.success(req, "Deleted successfully!")
    return redirect('/admin/my_exam')


# instruction 
def instruction(req):
    instruction=models.ExamInstruction.objects.all()
    return render(req, "admin/my_exam_instruction.html", {"instruction": instruction})


def save_instruction(req):
    if req.method == "POST":
        models.ExamInstruction.objects.create(
            title=req.POST.get("title"),
            description=req.POST.get("description")
        )
    messages.success(req, "Data saved successfully!")
    return redirect("/admin/instruction")

def edit_instruction(req,id):
    instruction = models.ExamInstruction.objects.get(id=id)
    return render(req,'admin/update_exam_instruction.html',{"instruction":instruction})
    
def update_instruction(req,id):
    instruction = models.ExamInstruction.objects.get(id=id)
    if req.method =='POST':
        instruction.title=req.POST.get('title')
        instruction.description=req.POST.get('description')
        instruction.save()
        messages.success(req, "Update Data successfully!")

        return redirect('/admin/instruction')

def delete_instruction(req,id):
    instruction= models.ExamInstruction.objects.get(id=id)
    instruction.delete()
    messages.success(req, "Delete Data successfully!")

    return redirect('/admin/instruction')

# my available page start here 

from django.contrib import messages


def available_exam(req):
    data = models.AvailableExam.objects.all()
    return render(req,'admin/available_exam.html',{"data":data})

def save_available_exam(req):
    data = models.AvailableExam(
            exam_name=req.POST.get("exam_name"),
            exam_description=req.POST.get("exam_description"),
            total_questions=req.POST.get("total_questions"),
            duration=req.POST.get("duration"),
            marks=req.POST.get("marks"),
            status=req.POST.get("status"),

    )
    data.save()
    messages.success(req, "Exam saved successfully!")
    return redirect('/admin/available_exam')

def available_list(req):
        data = models.AvailableExam.objects.all()
        return render(req,'admin/available_list.html',{"data":data})

def edit_available_exam(req,id):
    data = models.AvailableExam.objects.get(id=id)
    return render(req,'admin/update_available_exam.html',{"data":data,})


def update_available_exam(req,id):
    data = models.AvailableExam.objects.get(id=id)
    if req.method =='POST':
        data.exam_name=req.POST.get('exam_name')
        data.exam_description=req.POST.get('exam_description')
        data.total_questions=req.POST.get('total_questions')
        data.duration=req.POST.get('duration')
        data.marks=req.POST.get('marks')
        # data.exam_instructions=req.POST.get('exam_instructions')
        data.status=req.POST.get('status')
        data.save()
        messages.success(req, " Update Exam successfully!")

        return redirect('/admin/available_exam')


def delete_available_exam(req,id):
    data = models.AvailableExam.objects.get(id=id)
    data.delete()
    messages.success(req, " Delete Data successfully!")

    return redirect('/admin/available_exam')

# instruction 

# from .models import ExamInstruction

def available_instruction(req):
    instruction = models.AvailExamInstruction.objects.all()
    return render(req, "admin/instruction_available.html", {"instruction": instruction})


def available_save_instruction(req):
    if req.method == "POST":
        models.AvailExamInstruction.objects.create(
            title=req.POST.get("title"),
            description=req.POST.get("description")
        )
    messages.success(req, "Data saved successfully!")
    return redirect("/admin/available_instruction")

def available_edit_instruction(req,id):
    instruction = models.AvailExamInstruction.objects.get(id=id)
    return render(req,'admin/update_instruction.html',{"instruction":instruction})

def available_update_instruction(req,id):
    instruction = models.AvailExamInstruction.objects.get(id=id)
    if req.method =='POST':
        instruction.title=req.POST.get('title')
        instruction.description=req.POST.get('description')
        instruction.save()
        messages.success(req, "Update Data successfully!")

        return redirect('/admin/available_instruction')

def available_delete_instruction(req,id):
    instruction= models.AvailExamInstruction.objects.get(id=id)
    instruction.delete()
    messages.success(req, "Delete Data successfully!")

    return redirect('/admin/available_instruction')

