from django.db import models

# Create your models here.



class Exam(models.Model):

 exam_name = models.CharField(max_length=200)
 sub_name = models.CharField(max_length=200)
 type_name = models.CharField(max_length=100)
 validity = models.CharField(max_length=50)
 exam_fees = models.IntegerField(default=0)
 total_questions = models.IntegerField()
 exam_duration = models.CharField(max_length=100)
 negative_marking = models.CharField(max_length=10)
 exam_mode = models.CharField(max_length=20)
 language = models.CharField(max_length=20)
 created_at = models.DateTimeField(auto_now_add=True)
 updated_at = models.DateTimeField(auto_now=True)
 status = models.CharField(max_length=20,choices=[('Active', 'Active'),('Inactive', 'Inactive')],default='Active')

def __str__(self):
        return self.exam_name


class Student_Reviews(models.Model):
   fullname = models.CharField(max_length=500)
   bharti = models.CharField(max_length=500)
   icon = models.CharField(max_length=500)
   dec = models.CharField(max_length=500)




# my exam page start here

class MyExampage(models.Model):


    exam_name = models.CharField(max_length=100)
    exam_description = models.TextField(blank=True, null=True)
    total_questions = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    marks = models.CharField(max_length=50)
    exam_instructions= models.TextField(blank=True, null=True)

    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']

class ExamInstruction(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()

# Available exam page start here

class AvailableExam(models.Model):
    STATUS_CHOICES = (
        ('available', 'Available Now'),
        ('upcoming', 'Upcoming'),
        ('closed', 'Closed'),
    )

    exam_name = models.CharField(max_length=100)
    exam_description = models.TextField(blank=True, null=True)
    total_questions = models.CharField(max_length=50)
    duration = models.CharField(max_length=50)
    marks = models.CharField(max_length=50)
    exam_instructions= models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='upcoming',
    )
    display_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['display_order']


class AvailExamInstruction(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()


class Teacher(models.Model):

    GENDER_CHOICES = (
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Other', 'Other'),
    )

    teacher_full_name = models.CharField(max_length=200)
    teacher_email = models.EmailField(unique=True)
    teacher_password = models.CharField(max_length=255)
    teacher_address = models.TextField()
    teacher_profile = models.ImageField(upload_to="static/images/teacher/images/")
    teacher_gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    teacher_dob = models.DateField()
    teacher_link = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.teacher_full_name


class Academy(models.Model):
    academy_name = models.CharField(max_length=200)
    owner_name = models.CharField(max_length=200)
    email = models.EmailField()
    mobile = models.CharField(max_length=10)
    address = models.TextField()
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    pincode = models.CharField(max_length=10)

    academy_logo = models.ImageField(upload_to="static/images/academy/logo/", blank=True, null=True)
    academy_banner = models.ImageField(upload_to="static/images/academy/banner/", blank=True, null=True)

    website = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=20, default="Active")
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.academy_name