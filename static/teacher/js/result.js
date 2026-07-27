/*==================================================
            STUDENT RESULT PAGE
            script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==============================================
                SEARCH STUDENT
    ==============================================*/

    const searchInput = document.querySelector("input[placeholder*='Search']");
    const tableRows = document.querySelectorAll(".premium-table tbody tr");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            tableRows.forEach(row => {

                const text = row.innerText.toLowerCase();

                row.style.display = text.includes(value) ? "" : "none";

            });

        });

    }


    /*==============================================
                STATUS FILTER
    ==============================================*/

    const statusFilter = document.querySelectorAll(".form-select")[2];

    if (statusFilter) {

        statusFilter.addEventListener("change", function () {

            const selected = this.value.toLowerCase();

            tableRows.forEach(row => {

                const badge = row.querySelector(".badge");

                if (!badge) return;

                const status = badge.innerText.toLowerCase();

                if (selected === "all") {

                    row.style.display = "";

                }

                else if (status.includes(selected)) {

                    row.style.display = "";

                }

                else {

                    row.style.display = "none";

                }

            });

        });

    }


    /*==============================================
                FILTER BUTTON
    ==============================================*/

    const filterBtn = document.querySelector(".btn-purple");

    if (filterBtn) {

        filterBtn.addEventListener("click", function () {

            this.innerHTML = '<i class="bi bi-check-circle-fill"></i> Filter Applied';

            this.classList.add("btn-success");

            setTimeout(() => {

                this.innerHTML = '<i class="bi bi-funnel"></i> Filter';

                this.classList.remove("btn-success");

            }, 1800);

        });

    }


    /*==============================================
                EXPORT BUTTON
    ==============================================*/

    const exportBtn = document.querySelector(".btn-outline-dark");

    if (exportBtn) {

        exportBtn.addEventListener("click", function () {

            alert("Student Results Exported Successfully!");

        });

    }


    /*==============================================
                ACTION BUTTONS
    ==============================================*/

    const actionButtons = document.querySelectorAll(".action-btn");

    actionButtons.forEach(button => {

        button.addEventListener("click", function () {

            const icon = this.querySelector("i");

            if (icon.classList.contains("bi-eye")) {

                alert("View Student Result");

            }

            else {

                alert("Performance Report");

            }

        });

    });


    /*==============================================
                CARD HOVER EFFECT
    ==============================================*/

    const cards = document.querySelectorAll(".stats-card");

    cards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-6px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });


    /*==============================================
                COUNTER ANIMATION
    ==============================================*/

    const counters = document.querySelectorAll(".stats-card h2");

    counters.forEach(counter => {

        const original = counter.innerText;

        const number = parseFloat(original.replace(/[^\d.]/g, ""));

        if (isNaN(number)) return;

        let start = 0;
        const duration = 1000;
        const increment = number / 40;

        const timer = setInterval(() => {

            start += increment;

            if (start >= number) {

                clearInterval(timer);
                counter.innerText = original;

            } else {

                if (original.includes("%")) {

                    counter.innerText = start.toFixed(1) + "%";

                }

                else {

                    counter.innerText = Math.floor(start);

                }

            }

        }, duration / 40);

    });


    /*==============================================
                TABLE ROW ANIMATION
    ==============================================*/

    tableRows.forEach((row, index) => {

        row.style.opacity = "0";
        row.style.transform = "translateY(15px)";

        setTimeout(() => {

            row.style.transition = ".4s ease";
            row.style.opacity = "1";
            row.style.transform = "translateY(0)";

        }, index * 120);

    });


    /*==============================================
                PAGINATION ACTIVE
    ==============================================*/

    const pages = document.querySelectorAll(".pagination .page-item");

    pages.forEach(page => {

        page.addEventListener("click", function (e) {

            e.preventDefault();

            pages.forEach(item => item.classList.remove("active"));

            if (!this.innerText.includes("Previous") &&
                !this.innerText.includes("Next")) {

                this.classList.add("active");

            }

        });

    });


    /*==============================================
                TOOLTIP
    ==============================================*/

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    tooltipTriggerList.map(function (tooltipTriggerEl) {

        return new bootstrap.Tooltip(tooltipTriggerEl);

    });


    console.log("Student Result Dashboard Loaded Successfully.");

});

    // export 
function exportTableToExcel(tableID, filename = '') {
    let table = document.getElementById(tableID);
    let html = table.outerHTML.replace(/ /g, '%20');

    filename = filename ? filename + '.xls' : 'export.xls';

    let downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = 'data:application/vnd.ms-excel,' + html;
    downloadLink.download = filename;
    downloadLink.click();

    document.body.removeChild(downloadLink);
}
function exportCSV() {
    const table = document.getElementById("studentsTable");
    let csv = [];

    for (let row of table.rows) {
        let cols = [];
        for (let cell of row.cells) {
            cols.push('"' + cell.innerText + '"');
        }
        csv.push(cols.join(","));
    }

    const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
    const downloadLink = document.createElement("a");

    downloadLink.download = "students.csv";
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.click();
}