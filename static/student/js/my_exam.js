/*====================================================
        ONLINE EXAM PORTAL
        PREMIUM SCRIPT.JS
====================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      RIPPLE EFFECT
    =========================================*/

    document.querySelectorAll(".btn").forEach(btn => {

        btn.addEventListener("click", function (e) {

            const ripple = document.createElement("span");

            ripple.classList.add("ripple");

            const rect = this.getBoundingClientRect();

            ripple.style.left = (e.clientX - rect.left) + "px";
            ripple.style.top = (e.clientY - rect.top) + "px";

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

        });

    });


    /*=========================================
      SEARCH FILTER (Available Exams)
    =========================================*/

    const searchInput = document.querySelector("input[type='text']");
    const subjectSelect = document.querySelector(".form-select");
    const examTable = document.querySelector(".premium-table tbody");

    function filterTable() {

        if (!examTable) return;

        const keyword = searchInput ? searchInput.value.toLowerCase() : "";
        const subject = subjectSelect ? subjectSelect.value.toLowerCase() : "all subjects";

        examTable.querySelectorAll("tr").forEach(row => {

            const exam = row.children[0].innerText.toLowerCase();
            const sub = row.children[1].innerText.toLowerCase();

            const matchExam = exam.includes(keyword);

            const matchSubject =
                subject === "all subjects" ||
                sub.includes(subject);

            row.style.display =
                (matchExam && matchSubject) ? "" : "none";

        });

    }

    if (searchInput) {

        searchInput.addEventListener("keyup", filterTable);

    }

    if (subjectSelect) {

        subjectSelect.addEventListener("change", filterTable);

    }


    /*=========================================
      RESET BUTTON
    =========================================*/

    const resetBtn = document.querySelector(".btn-light");

    if (resetBtn) {

        resetBtn.addEventListener("click", () => {

            if (searchInput)
                searchInput.value = "";

            if (subjectSelect)
                subjectSelect.selectedIndex = 0;

            filterTable();

        });

    }


    /*=========================================
      DASHBOARD COUNTER
    =========================================*/

    document.querySelectorAll(".dashboard-card h3").forEach(counter => {

        const value = counter.innerText;

        if (value.includes("%")) {

            const target = parseInt(value);

            let count = 0;

            const timer = setInterval(() => {

                count++;

                counter.innerText = count + "%";

                if (count >= target)
                    clearInterval(timer);

            }, 15);

        }

        else {

            const target = parseInt(value);

            let count = 0;

            const step = Math.ceil(target / 30);

            const timer = setInterval(() => {

                count += step;

                if (count >= target) {

                    count = target;

                    clearInterval(timer);

                }

                counter.innerText = count;

            }, 25);

        }

    });


    /*=========================================
      FADE-UP ANIMATION
    =========================================*/

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("fade-up");

            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(".card,.dashboard-card,.note-box")
        .forEach(el => observer.observe(el));


    /*=========================================
      BOOTSTRAP TOOLTIP
    =========================================*/

    const tooltipTriggerList =
        [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));

    tooltipTriggerList.map(function (tooltipTriggerEl) {

        return new bootstrap.Tooltip(tooltipTriggerEl);

    });


    /*=========================================
      BUTTON LOADING
    =========================================*/

    document.querySelectorAll(".btn-start").forEach(btn => {

        btn.addEventListener("click", function () {

            if (this.disabled) return;

            const oldText = this.innerHTML;

            this.innerHTML =
                '<span class="spinner-border spinner-border-sm me-2"></span>Loading';

            this.disabled = true;

            setTimeout(() => {

                this.innerHTML = oldText;

                this.disabled = false;

            }, 1200);

        });

    });


    /*=========================================
      ACTIVE TABLE ROW
    =========================================*/

    document.querySelectorAll(".premium-table tbody tr")
        .forEach(row => {

            row.addEventListener("click", () => {

                document.querySelectorAll(".premium-table tbody tr")
                    .forEach(r => r.classList.remove("table-active"));

                row.classList.add("table-active");

            });

        });


    /*=========================================
      TAB ANIMATION
    =========================================*/

    document.querySelectorAll(".tab-pane")
        .forEach(tab => {

            tab.addEventListener("shown.bs.tab", () => {

                tab.classList.add("fade-up");

            });

        });


    /*=========================================
      CURRENT DATE
    =========================================*/

    const footerDate = document.querySelector("#todayDate");

    if (footerDate) {

        footerDate.innerText =
            new Date().toLocaleDateString();

    }


    /*=========================================
      BACK TO TOP
    =========================================*/

    const topBtn = document.createElement("button");

    topBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';

    topBtn.className = "btn btn-primary";

    topBtn.style.position = "fixed";
    topBtn.style.bottom = "25px";
    topBtn.style.right = "25px";
    topBtn.style.width = "50px";
    topBtn.style.height = "50px";
    topBtn.style.borderRadius = "50%";
    topBtn.style.display = "none";
    topBtn.style.zIndex = "999";

    document.body.appendChild(topBtn);

    window.addEventListener("scroll", () => {

        topBtn.style.display =
            window.scrollY > 300 ? "block" : "none";

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });


    /*=========================================
      SEARCH ENTER KEY
    =========================================*/

    if (searchInput) {

        searchInput.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                filterTable();

            }

        });

    }


    /*=========================================
      HOVER SCALE
    =========================================*/

    document.querySelectorAll(".dashboard-card")
        .forEach(card => {

            card.addEventListener("mouseenter", () => {

                card.style.transform = "translateY(-6px) scale(1.02)";

            });

            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });


    /*=========================================
      PAGE LOADER
    =========================================*/

    window.addEventListener("load", () => {

        document.body.classList.add("loaded");

    });

});

/*====================================================
                END OF SCRIPT.JS
====================================================*/