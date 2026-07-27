/* =========================================================================
   Nova Pay — Checkout logic
   Handles: form validation, order creation, Razorpay Checkout, ripple
   effect, loading states, success/failure redirects, receipt download.
   ========================================================================= */

(function () {
    "use strict";

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
        return null;
    }

    const CSRF_TOKEN = getCookie("csrftoken");

    /* ---------------------------------------------------------------------
       Ripple effect on the Pay button
       --------------------------------------------------------------------- */
    function attachRipple(button) {
        button.addEventListener("click", function (e) {
            const rect = button.getBoundingClientRect();
            const ripple = document.createElement("span");
            const size = Math.max(rect.width, rect.height);
            ripple.className = "ripple";
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 650);
        });
    }

    /* ---------------------------------------------------------------------
       Simple field validation
       --------------------------------------------------------------------- */
    function validateForm(form) {
        let valid = true;
        const name = form.querySelector("#customer_name");
        const email = form.querySelector("#customer_email");
        const phone = form.querySelector("#customer_phone");

        const setError = (input, message) => {
            const field = input.closest(".field");
            const errorEl = form.querySelector(`[data-error-for="${input.id}"]`);
            if (message) {
                field.classList.add("invalid");
                if (errorEl) errorEl.textContent = message;
                valid = false;
            } else {
                field.classList.remove("invalid");
                if (errorEl) errorEl.textContent = "";
            }
        };

        setError(name, name.value.trim().length < 2 ? "Please enter your full name." : "");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(email, !emailPattern.test(email.value.trim()) ? "Enter a valid email address." : "");

        const phonePattern = /^[6-9]\d{9}$/;
        setError(phone, !phonePattern.test(phone.value.trim()) ? "Enter a valid 10-digit phone number." : "");

        return valid;
    }

    /* ---------------------------------------------------------------------
       Loading overlay helpers
       --------------------------------------------------------------------- */
    function showOverlay(text) {
        const overlay = document.getElementById("loadingOverlay");
        const textEl = document.getElementById("loadingText");
        if (!overlay) return;
        if (textEl && text) textEl.textContent = text;
        overlay.classList.add("is-visible");
    }

    function hideOverlay() {
        const overlay = document.getElementById("loadingOverlay");
        if (overlay) overlay.classList.remove("is-visible");
    }

    /* ---------------------------------------------------------------------
       Checkout page bootstrap
       --------------------------------------------------------------------- */
    function initCheckoutPage() {
        const form = document.getElementById("paymentForm");
        const payBtn = document.getElementById("payBtn");
        if (!form || !payBtn) return;

        attachRipple(payBtn);

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            if (!validateForm(form)) return;

            const registrationIdField = document.getElementById("registration_id");
            const payload = {
                customer_name: form.customer_name.value.trim(),
                customer_email: form.customer_email.value.trim(),
                customer_phone: form.customer_phone.value.trim(),
                registration_id: registrationIdField ? registrationIdField.value : null,
            };

            payBtn.classList.add("is-loading");
            showOverlay("Creating your order\u2026");

            try {
                const res = await fetch(window.CREATE_ORDER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": CSRF_TOKEN,
                    },
                    body: JSON.stringify(payload),
                });

                const data = await res.json();

                if (!data.success) {
                    throw new Error(data.error || "Could not create order.");
                }

                hideOverlay();
                openRazorpayCheckout(data);
            } catch (err) {
                hideOverlay();
                payBtn.classList.remove("is-loading");
                alert(err.message || "Something went wrong. Please try again.");
            }
        });
    }

    function openRazorpayCheckout(order) {
        const payBtn = document.getElementById("payBtn");

        const options = {
            key: order.key_id,
            amount: order.amount,
            currency: order.currency,
            name: order.company_name,
            description: order.product_name,
            order_id: order.order_id,
            prefill: {
                name: order.customer_name,
                email: order.customer_email,
                contact: order.customer_phone,
            },
            theme: { color: "#f5b942" },
            modal: {
                ondismiss: function () {
                    if (payBtn) payBtn.classList.remove("is-loading");
                },
            },
            handler: function (response) {
                showOverlay("Verifying your payment\u2026");
                verifyPayment(response, order.order_id);
            },
        };

        const rzp = new Razorpay(options);

        rzp.on("payment.failed", function (response) {
            hideOverlay();
            if (payBtn) payBtn.classList.remove("is-loading");
            fetch(window.PAYMENT_FAILED_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": CSRF_TOKEN,
                },
                body: JSON.stringify({
                    order_id: order.order_id,
                    reason: response.error ? response.error.description : "Payment failed.",
                }),
            }).finally(() => {
                window.location.href = `${window.FAILED_URL}?order_id=${encodeURIComponent(order.order_id)}`;
            });
        });

        rzp.open();
    }

    async function verifyPayment(response, orderId) {
        try {
            const res = await fetch(window.VERIFY_PAYMENT_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": CSRF_TOKEN,
                },
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                }),
            });

            const data = await res.json();
            hideOverlay();

            if (data.success) {
                window.location.href = `${window.SUCCESS_URL}?order_id=${encodeURIComponent(orderId)}`;
            } else {
                window.location.href = `${window.FAILED_URL}?order_id=${encodeURIComponent(orderId)}`;
            }
        } catch (err) {
            hideOverlay();
            window.location.href = `${window.FAILED_URL}?order_id=${encodeURIComponent(orderId)}`;
        }
    }

    /* ---------------------------------------------------------------------
       Success page: receipt download as PDF using jsPDF
       --------------------------------------------------------------------- */
    function initSuccessPage() {
        const btn = document.getElementById("downloadReceipt");
        if (!btn || !window.RECEIPT_DATA) return;

        btn.addEventListener("click", function () {
            const r = window.RECEIPT_DATA;

            if (typeof window.jspdf === "undefined") {
                alert("PDF library load nahi zhali, internet connection check kara.");
                return;
            }

            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({ unit: "pt", format: "a4" });

            const pageWidth = doc.internal.pageSize.getWidth();

            // Header
            doc.setFillColor(20, 20, 43);
            doc.rect(0, 0, pageWidth, 90, "F");
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.text("Payment Receipt", 40, 50);
            doc.setFontSize(11);
            doc.setTextColor(220, 220, 220);
            doc.text(window.COMPANY_NAME || "Nova Pay", 40, 70);

            // Body
            doc.setTextColor(30, 30, 30);
            let y = 130;
            const rows = [
                ["Customer Name", r.company],
                ["Payment ID", r.payment_id],
                ["Order ID", r.order_id],
                ["Amount Paid", `Rs. ${r.amount} ${r.currency}`],
                ["Payment Method", r.method],
                ["Date & Time", r.date],
            ];

            doc.setFontSize(12);
            rows.forEach(([label, value]) => {
                doc.setFont(undefined, "bold");
                doc.text(`${label}:`, 40, y);
                doc.setFont(undefined, "normal");
                doc.text(String(value || "-"), 220, y);
                y += 28;
            });

            y += 20;
            doc.setDrawColor(200, 200, 200);
            doc.line(40, y, pageWidth - 40, y);
            y += 30;

            doc.setFontSize(10);
            doc.setTextColor(120, 120, 120);
            doc.text("This is a system-generated receipt. Thank you for your payment!", 40, y);

            doc.save(`receipt-${r.order_id}.pdf`);
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        initCheckoutPage();
        initSuccessPage();
    });
})();