
  /*====================================
 Dashboard Counter Animation
====================================*/

const counters = document.querySelectorAll(".count");

counters.forEach(counter => {

    const updateCounter = () => {

        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        const increment = Math.ceil(target / 40);

        if (count < target) {

            counter.innerText = count + increment;

            setTimeout(updateCounter, 40);

        } else {

            counter.innerText = target;

        }

    };

    updateCounter();

});


/*====================================
 Card Hover Effect
====================================*/

const cards = document.querySelectorAll(".stats-card,.dashboard-card,.exam-card");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-8px)";
        card.style.transition = ".35s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";

    });

});


/*====================================
 Button Ripple Effect
====================================*/

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

    button.addEventListener("click", function(e){

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;

        circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;

        circle.style.top = `${e.clientY - this.offsetTop - radius}px`;

        circle.classList.add("ripple");

        const ripple = this.getElementsByClassName("ripple")[0];

        if(ripple){

            ripple.remove();

        }

        this.appendChild(circle);

    });

});


/*====================================
 Upcoming Exam Countdown
====================================*/

function countdown(){

    const countdownText = document.querySelector(".dashboard-card h4");

    if(countdownText){

        countdownText.innerHTML = "1 Day Left";

    }

}

countdown();


/*====================================
 Start Exam Button
====================================*/

const examButtons = document.querySelectorAll(".exam-card .btn");

examButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        alert("Exam Started Successfully!");

    });

});


/*====================================
 Payment Button
====================================*/

const paymentBtn = document.querySelector(".btn-outline-primary");

if(paymentBtn){

paymentBtn.addEventListener("click",()=>{

alert("Opening Payment Details...");

});

}


/*====================================
 View Details Button
====================================*/

const viewBtn=document.querySelector(".dashboard-card .btn-primary");

if(viewBtn){

viewBtn.addEventListener("click",()=>{

alert("Opening Upcoming Exam Details...");

});

}


/*====================================
 Smooth Scroll
====================================*/

document.querySelectorAll("a").forEach(anchor=>{

anchor.addEventListener("click",function(e){

const href=this.getAttribute("href");

if(href && href.startsWith("#")){

e.preventDefault();

document.querySelector(href).scrollIntoView({

behavior:"smooth"

});

}

});

});


/*====================================
 Welcome Message
====================================*/

window.addEventListener("load",()=>{

console.log("Student Dashboard Loaded Successfully");

});


/*====================================
 Current Date
====================================*/

const today=new Date();

console.log(today.toDateString());


/*====================================
 Dark Mode Ready
====================================*/

function toggleDarkMode(){

document.body.classList.toggle("dark-mode");

}
