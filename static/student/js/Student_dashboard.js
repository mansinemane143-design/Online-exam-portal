

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("show");
});


// ===============================
// Active Menu
// ===============================

const menuItems = document.querySelectorAll(".menu li");

menuItems.forEach(item => {

    item.addEventListener("click", function () {

        menuItems.forEach(li => li.classList.remove("active"));

        this.classList.add("active");

    });

});


// ===============================
// Notification
// ===============================

const notification = document.querySelector(".notification");

notification.addEventListener("click", () => {

    alert("You have 3 new notifications.");

});


// ===============================
// Welcome Message
// ===============================

window.onload = function () {

    console.log("Student Dashboard Loaded Successfully");

};


// ===============================
// Card Hover Animation
// ===============================

const cards = document.querySelectorAll(".dashboard-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";
        card.style.transition = ".3s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


// ===============================
// Progress Circle Animation
// ===============================

const circle = document.querySelector(".circle span");

let progress = 0;
const target = 82;

const timer = setInterval(() => {

    progress++;

    circle.innerHTML = progress + "%";

    if (progress >= target) {

        clearInterval(timer);

    }

}, 20);


// ===============================
// Button Click Effect
// ===============================

const startButtons = document.querySelectorAll(".btn-primary");

startButtons.forEach(btn => {

    btn.addEventListener("click", function () {

        alert("Exam Started Successfully!");

    });

});


// ===============================
// Payment Button
// ===============================

const paymentBtn = document.querySelector(".btn-outline-primary");

if (paymentBtn) {

    paymentBtn.addEventListener("click", () => {

        alert("Payment Details");

    });

}


// ===============================
// Responsive Sidebar Close
// ===============================

window.addEventListener("resize", () => {

    if (window.innerWidth > 992) {

        sidebar.classList.remove("show");

    }

});