from django.db import models

# Create your models here.
import random
from django.db import models
from django.utils import timezone


class PendingRegistration(models.Model):
    """
    Registration page (Page 1) chi mahiti tात्पुरती (temporarily) ithe save hote,
    jopryant user OTP verify karत नाही (until OTP is verified).
    """
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)  # hashed password store karto
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)
    profile_photo = models.ImageField(upload_to="static/images/student/registration/")
    profile_photo = models.ImageField(upload_to="static/images/student/registration/",blank=True,null=True)

    def __str__(self):
        return f"{self.email} - {self.otp}"

    @staticmethod
    def generate_otp():
        return str(random.randint(100000, 999999))

    def is_expired(self, minutes=5):
        return timezone.now() > self.created_at + timezone.timedelta(minutes=minutes)



class Notification(models.Model):
    CATEGORY = (
        ('exam', 'Exam'),
        ('payment', 'Payment'),
        ('result', 'Result'),
        ('system', 'System'),
    )

    title = models.CharField(max_length=200)
    message = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


# from django.db import models


class Notification(models.Model):
    CATEGORY = (
        ('exam', 'Exam'),
        ('payment', 'Payment'),
        ('result', 'Result'),
        ('system', 'System'),
    )

    title = models.CharField(max_length=200)
    message = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


EXAM_FEES = {
    "MPSC": 49,
    "UPSC": 12,
    "SSC": 12,
    "Banking": 99,
    "Railway": 49,
    "Police Bharti": 69,
    "Army": 199,
    "Talathi": 299,
}

EXAM_CHOICES = [(k, k) for k in EXAM_FEES.keys()]


class Registration(models.Model):
    full_name = models.CharField(max_length=150)
    mobile_number = models.CharField(max_length=15)
    email = models.EmailField()
    age = models.PositiveIntegerField()
    password = models.CharField(max_length=100)
    profile_photo = models.ImageField(upload_to="static/images/student/registration/")
    profile_photo = models.ImageField(upload_to="static/images/student/registration/",blank=True,null=True)

    city = models.CharField(max_length=100)
    exam = models.CharField(max_length=50, choices=EXAM_CHOICES)
    education = models.CharField(max_length=50)

    otp = models.CharField(max_length=6, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    is_paid = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    def get_exam_fee(self):
        return EXAM_FEES.get(self.exam, 0)

    def __str__(self):
        return f"{self.full_name} - {self.exam}"



# Available exam
CATEGORY_CHOICES = (
    ('UPSC', 'UPSC'),
    ('MPSC', 'MPSC'),
    ('TALATHI', 'TALATHI'),
    ('GRAMSEVAK', 'GRAMSEVAK'),
    ('VANRAKSHAK', 'VANRAKSHAK'),
)

category = models.CharField(
    max_length=20,
    choices=CATEGORY_CHOICES,
    default='MPSC'
)




