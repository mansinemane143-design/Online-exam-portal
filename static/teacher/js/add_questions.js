// ===============================
// ELEMENTS
// ===============================

const form =
document.getElementById("questionForm");

const popup =
document.getElementById("popup");

const closePopup =
document.getElementById("closePopup");

const categories =
document.querySelectorAll(".category-check");

const difficulty =
document.getElementById("difficulty");

const marks =
document.getElementById("marks");

// NEW
const correctAnswer =
document.getElementById("correctAnswer");


// ===============================
// CATEGORY SYSTEM
// ===============================

categories.forEach(item=>{

item.addEventListener("change",function(){

if(this.checked){

localStorage.setItem(
"category",
this.value
);

hideOther(this);

}
else{

localStorage.removeItem(
"category"
);

showAll();

}

});

});



function hideOther(selected){

categories.forEach(item=>{

if(item!==selected){

item.parentElement.style.display="none";

}
else{

item.parentElement.style.display="flex";

}

});

}



function showAll(){

categories.forEach(item=>{

item.parentElement.style.display="flex";

item.checked=false;

});

}



function loadCategory(){

let saved =
localStorage.getItem("category");

if(saved){

categories.forEach(item=>{

if(item.value===saved){

item.checked=true;

hideOther(item);

}

});

}

}



// ===============================
// DIFFICULTY
// ===============================

difficulty.addEventListener("change",()=>{

localStorage.setItem(
"difficulty",
difficulty.value
);

calculateMarks();

});



function calculateMarks(){

let level =
localStorage.getItem("difficulty");

if(level==="Easy"){

marks.value=1;

}
else if(level==="Medium"){

marks.value=2;

}
else if(level==="Hard"){

marks.value=5;

}
else{

marks.value=0;

}

}



function loadDifficulty(){

let saved =
localStorage.getItem("difficulty");

if(saved){

difficulty.value=saved;

calculateMarks();

}

}



// ===============================
// PAGE LOAD
// ===============================

window.onload=function(){

loadCategory();

loadDifficulty();

};



// ===============================
// SAVE
// ===============================

form.addEventListener("submit",function(e){

e.preventDefault();

let selected =
document.querySelector(
".category-check:checked"
);

if(!selected){

document.getElementById(
"categoryError"
).innerText =
"Select Subject";

return;

}

// NEW - Correct Answer Validation
if(correctAnswer.value===""){

alert("Please Select Correct Answer");

correctAnswer.focus();

return;

}

popup.style.display="flex";

});



// ===============================
// POPUP CLOSE
// ===============================

closePopup.onclick=function(){

popup.style.display="none";

let savedCategory =
localStorage.getItem("category");

let savedDifficulty =
localStorage.getItem("difficulty");

form.reset();


// restore category

categories.forEach(item=>{

if(item.value===savedCategory){

item.checked=true;

hideOther(item);

}

});


// restore difficulty

difficulty.value=savedDifficulty;

calculateMarks();


// NEW - Reset Correct Answer

correctAnswer.value="";

};