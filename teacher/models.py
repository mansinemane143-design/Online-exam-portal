from django.db import models

# Create your models here.

class Subject(models.Model):
    sub_name = models.CharField(max_length=100)
    status = models.CharField(max_length=20)

    def __str__(self):
        return self.sub_name
    
    
class sub_category(models.Model):
    subject = models.CharField(max_length=100)
    sub_category = models.CharField(max_length=100)

    def __str__(self):
        return self.subject