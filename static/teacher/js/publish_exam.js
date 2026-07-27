/*==================================================
            EXAM DASHBOARD UI
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initProgressRing();
    initStepper();
    initRippleButtons();
    initCardHover();
    initInputs();
    initTableAnimation();

});

/*==================================================
            CIRCULAR PROGRESS
==================================================*/

function initProgressRing() {

    const progressCircle = document.querySelector(".progress");

    if (!progressCircle) return;

    const radius = 70;
    const circumference = 2 * Math.PI * radius;

    progressCircle.style.strokeDasharray = circumference;

    let percent = 75;

    let offset = circumference - (percent / 100) * circumference;

    progressCircle.style.strokeDashoffset = circumference;

    setTimeout(() => {

        progressCircle.style.transition = "stroke-dashoffset 1.8s ease";

        progressCircle.style.strokeDashoffset = offset;

    }, 400);

}

/*==================================================
            STEPPER
==================================================*/

function initStepper() {

    const steps = document.querySelectorAll(".step");

    steps.forEach((step, index) => {

        step.addEventListener("click", () => {

            steps.forEach((item, i) => {

                if (i <= index) {

                    item.classList.add("active");

                } else {

                    item.classList.remove("active");

                }

            });

        });

    });

}

/*==================================================
            RIPPLE BUTTON
==================================================*/

function initRippleButtons() {

    document.querySelectorAll(".btn-purple").forEach(button => {

        button.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.className = "ripple";

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

}

/*==================================================
            CARD HOVER
==================================================*/

function initCardHover() {

    const cards = document.querySelectorAll(".glass-card");

    cards.forEach(card => {

        card.addEventListener("mousemove", e => {

            const rect = card.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background =
                `radial-gradient(circle at ${x}px ${y}px,
                rgba(108,99,255,.08),
                #ffffff 65%)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.background = "#ffffff";

        });

    });

}

/*==================================================
            INPUT FOCUS
==================================================*/

function initInputs() {

    document.querySelectorAll(".form-control, .form-select").forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add("focused");

        });

        input.addEventListener("blur", () => {

            input.parentElement.classList.remove("focused");

        });

    });

}

/*==================================================
            TABLE ANIMATION
==================================================*/

function initTableAnimation() {

    const rows = document.querySelectorAll("tbody tr");

    rows.forEach((row, index) => {

        row.style.opacity = "0";
        row.style.transform = "translateY(25px)";

        setTimeout(() => {

            row.style.transition = ".5s ease";

            row.style.opacity = "1";
            row.style.transform = "translateY(0)";

        }, index * 120);

    });

}

/*==================================================
            BUTTON LOADING
==================================================*/

document.querySelectorAll(".btn-purple").forEach(btn => {

    btn.addEventListener("click", function () {

        if (this.classList.contains("loading")) return;

        const text = this.innerHTML;

        this.classList.add("loading");

        this.innerHTML =
            `<span class="spinner-border spinner-border-sm me-2"></span>Processing...`;

        setTimeout(() => {

            this.innerHTML = text;

            this.classList.remove("loading");

        }, 1500);

    });

});

/*==================================================
            SMOOTH SCROLL
==================================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});

/*==================================================
            CONSOLE MESSAGE
==================================================*/

console.log("%cPremium Exam Dashboard Loaded Successfully 🚀",
    "color:#6C63FF;font-size:16px;font-weight:bold;");


// pop up 
document.getElementById("examForm").addEventListener("submit", function(e) {

    e.preventDefault();

    // Agar form valid hai tabhi popup show hoga
    if (this.checkValidity()) {

        var successModal = new bootstrap.Modal(
            document.getElementById("successModal")
        );

        successModal.show();

        // Optional: Form reset
        this.reset();

    } else {

        // Browser validation show karega
        this.reportValidity();

    }

});