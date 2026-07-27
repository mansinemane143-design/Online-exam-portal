// ============================
// STUDENT DATA
// ============================

let students = [

{
id:1,
roll:"PB001",
name:"Rahul Sharma",
marks:85,
result:"Pass"
},

{
id:2,
roll:"PB002",
name:"Rohit Patil",
marks:40,
result:"Fail"
},

{
id:3,
roll:"PB003",
name:"Amit Jadhav",
marks:78,
result:"Pass"
},

{
id:4,
roll:"PB004",
name:"Sneha Pawar",
marks:92,
result:"Pass"
},

{
id:5,
roll:"PB005",
name:"Pooja Kale",
marks:30,
result:"Fail"
}

];


// ============================
// ELEMENTS
// ============================

const table =
document.getElementById("studentTable");

const search =
document.getElementById("search");

const popup =
document.getElementById("popup");

const passCount =
document.getElementById("passCount");

const failCount =
document.getElementById("failCount");

const totalCount =
document.getElementById("totalCount");

let deleteId = null;


// ============================
// LOAD TABLE
// ============================

function loadTable(data){

table.innerHTML="";

data.forEach((student,index)=>{

table.innerHTML += `

<tr>

<td>${index+1}</td>

<td>${student.roll}</td>

<td>${student.name}</td>

<td>${student.marks}</td>

<td class="${student.result==="Pass" ? "pass-text":"fail-text"}">

${student.result}

</td>

<td>

<button
class="action-btn view-btn"
onclick="viewStudent(${student.id})">

<i class="fa-solid fa-eye"></i>

View

</button>

<button
class="action-btn delete-btn"
onclick="openPopup(${student.id})">

<i class="fa-solid fa-trash"></i>

Delete

</button>

</td>

</tr>

`;

});

updateCards();

}


// ============================
// SUMMARY CARDS
// ============================

function updateCards(){

let pass =
students.filter(x=>x.result==="Pass").length;

let fail =
students.filter(x=>x.result==="Fail").length;

passCount.innerHTML = pass;

failCount.innerHTML = fail;

totalCount.innerHTML = students.length;

}


// ============================
// SEARCH
// ============================

search.addEventListener("keyup",function(){

let value =
this.value.toLowerCase();

let filter =
students.filter(student=>

student.name.toLowerCase().includes(value) ||

student.roll.toLowerCase().includes(value)

);

loadTable(filter);

});


// ============================
// VIEW
// ============================

function viewStudent(id){

// Save selected student id

localStorage.setItem(
"studentId",
id
);

// Open next page

window.location.href =
"student_profile.html";

}


// ============================
// DELETE
// ============================

function openPopup(id){

deleteId = id;

popup.style.display="flex";

}

function closePopup(){

popup.style.display="none";

}

function deleteStudent(){

students =
students.filter(student=>

student.id!==deleteId

);

popup.style.display="none";

loadTable(students);

}


// ============================
// LOAD PAGE
// ============================

loadTable(students);