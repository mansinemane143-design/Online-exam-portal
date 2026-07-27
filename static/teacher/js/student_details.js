// ===============================
// Live Search
// ===============================

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        let rows = document.querySelectorAll("#studentTable tr");

        rows.forEach(function (row) {

            let studentName = row.querySelector("h6").innerText.toLowerCase();

            if (studentName.includes(value)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}

// ===============================
// Delete Confirmation
// ===============================

document.querySelectorAll(".btn-delete").forEach(function (button) {

    button.addEventListener("click", function () {

        let confirmDelete = confirm("Are you sure you want to delete this student?");

        if (confirmDelete) {

            this.closest("tr").remove();

            alert("Student deleted successfully.");

        }

    });

});

// ===============================
// Edit Button
// ===============================

document.querySelectorAll(".btn-edit").forEach(function (button) {

    button.addEventListener("click", function () {

        window.location.href = "edit_student.html";

    });

});

// ===============================
// View Button
// ===============================

document.querySelectorAll(".btn-view").forEach(function (button) {

    button.addEventListener("click", function () {

        window.location.href = "student_details.html";

    });

});

// ===============================
// Add Student Button
// ===============================

const addBtn = document.querySelector(".add-btn");

if (addBtn) {

    addBtn.addEventListener("click", function () {

        window.location.href = "add_student.html";

    });

}