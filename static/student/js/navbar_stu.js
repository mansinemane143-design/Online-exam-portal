
const observer = new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el)=>observer.observe(el));

// INFINITE AUTO SCROLL
const Slider = document.getElementById('reviewSlider');
slider.innerHTML += slider.innerHTML; // duplicate for infinite

let Speed = 0.6; 
let isPaused = false;

function scrollReviews(){
    if(!isPaused){
        slider.scrollLeft += speed;
        if(slider.scrollLeft >= slider.scrollWidth / 2){
            slider.scrollLeft = 0;
        }
    }
    requestAnimationFrame(scrollReviews);
}

slider.addEventListener('mouseenter', ()=> isPaused = true);
slider.addEventListener('mouseleave', ()=> isPaused = false);
scrollReviews();

const slider = document.getElementById('reviewSlider');
slider.innerHTML += slider.innerHTML; // duplicate for infinite

let translateX = 0;
const speed = 0.7; // speed kami jast karayla

function animate(){
    translateX -= speed; // - mule davikade jail
    slider.style.transform = `translateX(${translateX}px)`;
    
    // ardhe cards gele ki reset kar - user la kalnar nahi
    if(Math.abs(translateX) >= slider.scrollWidth / 2){
        translateX = 0;
    }
    requestAnimationFrame(animate);
}
animate();

// mouse thevla tar pause
slider.addEventListener('mouseenter', ()=> speed = 0);
slider.addEventListener('mouseleave', ()=> speed = 0.7);

