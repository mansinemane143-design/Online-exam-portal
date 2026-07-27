

let form=document.getElementById("subCategoryForm");


form.addEventListener("submit",function(e){


e.preventDefault();


let subject=document.getElementById("subject");

let category=document.getElementById("subCategory");


let valid=true;



document.querySelectorAll(".error").forEach(function(error){

error.innerHTML="";

});



document.querySelectorAll("input,select").forEach(function(field){

field.classList.remove("error-border");

});




if(subject.value==""){


document.getElementById("subjectError").innerHTML="Please select subject";


subject.classList.add("error-border");


valid=false;


}





if(category.value.trim()==""){


document.getElementById("categoryError").innerHTML="Sub category name is required";


category.classList.add("error-border");


valid=false;


}





if(valid){


let popup=document.getElementById("popup");


popup.style.display="block";


form.reset();



setTimeout(function(){


popup.style.display="none";


},3000);



}



});



