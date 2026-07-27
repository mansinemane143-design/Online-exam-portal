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