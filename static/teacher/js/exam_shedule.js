
// ===== WORKING CALENDAR JS =====
let currentDate = new Date();

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const examDates = {
    '2026-07-20': 'blue',
    '2026-07-22': 'orange', 
    '2026-07-24': 'red',
    '2026-07-26': 'green',
    '2026-07-27': 'green'
};

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    document.getElementById('monthYear').innerText = `${months[month]} ${year}`;
    
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    
    let html = '';
    days.forEach(day => html += `<div class="cal-head">${day}</div>`);
    
    for(let i = firstDay; i > 0; i--) {
        html += `<div class="cal-other">${prevLastDate - i + 1}</div>`;
    }
    
    for(let i = 1; i <= lastDate; i++) {
        const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(i).padStart(2,'0')}`;
        let classes = '';
        if(i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            classes = 'cal-active';
        }
        let dot = '';
        if(examDates[dateStr]) {
            dot = `<span class="cal-dot dot-${examDates[dateStr]}"></span>`;
        }
        html += `<div class="${classes}">${i}${dot}</div>`;
    }
    
    let nextDays = 42 - firstDay - lastDate;
    for(let i = 1; i <= nextDays; i++) {
        html += `<div class="cal-other">${i}</div>`;
    }
    document.getElementById('calendarGrid').innerHTML = html;
}

function prevMonth() { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); }
function nextMonth() { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); }
function goToToday() { currentDate = new Date(); renderCalendar(); }

renderCalendar();

