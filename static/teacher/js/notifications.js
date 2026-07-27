// Search Notification


const search = document.getElementById("search");

search.addEventListener("keyup", function () {

    let value = search.value.toLowerCase();

    document.querySelectorAll(".notification").forEach(function (card) {

        let text = card.innerText.toLowerCase();

        if (text.includes(value)) {

            card.style.display = "flex";

        } else {

            card.style.display = "none";

        }

    });

});


// Mark Individual Notification as Read

document.querySelectorAll(".read-btn").forEach(function(btn){

    btn.addEventListener("click",function(){

        const notification = btn.closest(".notification");

        notification.classList.remove("unread");

        notification.style.opacity=".9";

    });

});




// Delete Notification

document.querySelectorAll(".delete-btn").forEach(function(btn){

    btn.addEventListener("click",function(){

        const notification = btn.closest(".notification");

        notification.style.transform="translateX(100px)";
        notification.style.opacity="0";

        setTimeout(()=>{

            notification.remove();

        },300);

    });

});




// Mark All Read

document.getElementById("markAll").addEventListener("click",function(){

    document.querySelectorAll(".notification").forEach(function(card){

        card.classList.remove("unread");

        card.style.opacity=".9";

    });

});




// Filter Notification

const filterButtons=document.querySelectorAll(".filter button");

filterButtons.forEach(function(button){

button.addEventListener("click",function(){

filterButtons.forEach(function(btn){

btn.classList.remove("active");

});

button.classList.add("active");

let filter=button.dataset.filter;

document.querySelectorAll(".notification").forEach(function(card){

if(filter==="all"){

card.style.display="flex";

}

else if(filter==="read"){

if(card.classList.contains("unread")){

card.style.display="none";

}
else{

card.style.display="flex";

}

}

else if(filter==="unread"){

if(card.classList.contains("unread")){

card.style.display="flex";

}
else{

card.style.display="none";

}

}

});

});

});




// Smooth Load Animation

window.addEventListener("load",function(){

const cards=document.querySelectorAll(".notification");

cards.forEach(function(card,index){

card.style.opacity="0";
card.style.transform="translateY(20px)";

setTimeout(function(){

card.style.transition=".4s";

card.style.opacity="1";

card.style.transform="translateY(0px)";

},index*120);

});

});