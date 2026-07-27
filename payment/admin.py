from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Payment

@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = (
        "order_id",
        "customer_name",
        "customer_email",
        "amount",
        "currency",
        "status",
        "payment_method",
        "created_at",
    )
    list_filter = ("status", "currency", "payment_method", "created_at")
    search_fields = ("order_id", "payment_id", "customer_name", "customer_email", "customer_phone")
    readonly_fields = (
        "order_id",
        "payment_id",
        "razorpay_signature",
        "created_at",
        "updated_at",
    )
    ordering = ("-created_at",)