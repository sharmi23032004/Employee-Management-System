/* ================================
   ATTENDANCE SUMMARY FUNCTIONALITY
   ================================ */

const attendanceData = [
    { date: '2026-02-03', day: 'Mon', checkIn: '09:05', checkOut: '18:10', hours: 9.08, status: 'present', remarks: 'On time' },
    { date: '2026-02-04', day: 'Tue', checkIn: '09:20', checkOut: '18:15', hours: 8.92, status: 'present', remarks: 'Late arrival' },
    { date: '2026-02-05', day: 'Wed', checkIn: '09:00', checkOut: '18:05', hours: 9.08, status: 'present', remarks: 'On time' },
    { date: '2026-02-06', day: 'Thu', checkIn: '09:10', checkOut: '18:00', hours: 8.83, status: 'present', remarks: 'On time' },
    { date: '2026-02-07', day: 'Fri', checkIn: '09:00', checkOut: '18:20', hours: 9.33, status: 'present', remarks: 'Overtime' },
    { date: '2026-02-10', day: 'Mon', checkIn: '-', checkOut: '-', hours: 0, status: 'leave', remarks: 'Casual Leave' },
    { date: '2026-02-11', day: 'Tue', checkIn: '09:05', checkOut: '18:00', hours: 8.92, status: 'present', remarks: 'On time' },
    { date: '2026-02-12', day: 'Wed', checkIn: '09:25', checkOut: '18:10', hours: 8.75, status: 'present', remarks: 'Late arrival' },
    { date: '2026-02-13', day: 'Thu', checkIn: '09:00', checkOut: '17:30', hours: 8.50, status: 'present', remarks: 'Early departure' },
    { date: '2026-02-14', day: 'Fri', checkIn: '09:00', checkOut: '18:05', hours: 9.08, status: 'present', remarks: 'On time' },
    { date: '2026-02-17', day: 'Mon', checkIn: '-', checkOut: '-', hours: 0, status: 'absent', remarks: 'Absent' },
    { date: '2026-02-18', day: 'Tue', checkIn: '09:15', checkOut: '18:00', hours: 8.75, status: 'present', remarks: 'Late arrival' },
    { date: '2026-02-19', day: 'Wed', checkIn: '09:00', checkOut: '18:00', hours: 9.00, status: 'present', remarks: 'On time' },
    { date: '2026-02-20', day: 'Thu', checkIn: '09:00', checkOut: '18:15', hours: 9.25, status: 'present', remarks: 'Overtime' },
    { date: '2026-02-21', day: 'Fri', checkIn: '09:05', checkOut: '18:00', hours: 8.92, status: 'present', remarks: 'On time' },
    { date: '2026-02-24', day: 'Mon', checkIn: '-', checkOut: '-', hours: 0, status: 'leave', remarks: 'Sick Leave' },
    { date: '2026-02-25', day: 'Tue', checkIn: '09:00', checkOut: '18:00', hours: 9.00, status: 'present', remarks: 'On time' },
    { date: '2026-02-26', day: 'Wed', checkIn: '09:10', checkOut: '18:10', hours: 9.00, status: 'present', remarks: 'On time' },
    { date: '2026-02-27', day: 'Thu', checkIn: '09:00', checkOut: '18:20', hours: 9.33, status: 'present', remarks: 'Overtime' },
    { date: '2026-02-28', day: 'Fri', checkIn: '-', checkOut: '-', hours: 0, status: 'absent', remarks: 'Absent' }
];

let currentMonthIndex = 1; // February (0 = Jan, 1 = Feb, etc.)
let currentYear = 2026;

let trendChart = null;
let statusChart = null;
let hoursChart = null;

document.addEventListener('DOMContentLoaded', () => {
    renderSummaryTable();
    updateMonthDisplay();
    initCharts();
});

/* ---- RENDER TABLE ---- */
function renderSummaryTable() {
    const tbody = document.getElementById('summaryTableBody');
    
    tbody.innerHTML = attendanceData.map(record => `
        <tr>
            <td>${formatDate(record.date)}</td>
            <td>${record.day}</td>
            <td>${record.checkIn}</td>
            <td>${record.checkOut}</td>
            <td>
                <strong>${record.hours > 0 ? record.hours.toFixed(2) + ' hrs' : '-'}</strong>
            </td>
            <td>
                <span class="status-badge ${record.status}">
                    ${capitalize(record.status)}
                </span>
            </td>
            <td>${record.remarks}</td>
        </tr>
    `).join('');
}

/* ---- MONTH NAVIGATION ---- */
function changeMonth(direction) {
    currentMonthIndex += direction;
    
    if (currentMonthIndex > 11) {
        currentMonthIndex = 0;
        currentYear++;
    } else if (currentMonthIndex < 0) {
        currentMonthIndex = 11;
        currentYear--;
    }
    
    updateMonthDisplay();
    // In production: fetch new data for the month
}

function updateMonthDisplay() {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    document.getElementById('currentMonth').textContent = 
        `${months[currentMonthIndex]} ${currentYear}`;
}

/* ---- CHARTS ---- */
function initCharts() {
    initTrendChart();
    initStatusChart();
    initHoursChart();
}

function initTrendChart() {
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    
    if (trendChart) trendChart.destroy();
    
    // Calculate week-wise attendance
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    const presentData = [5, 4, 4, 5]; // Example data
    const absentData = [0, 1, 1, 0];
    
    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weeks,
            datasets: [
                {
                    label: 'Present',
                    data: presentData,
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Absent/Leave',
                    data: absentData,
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
        }
    });
}

function initStatusChart() {
    const ctx = document.getElementById('statusChart');
    if (!ctx) return;
    
    if (statusChart) statusChart.destroy();
    
    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'Leave'],
            datasets: [{
                data: [18, 2, 2],
                backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}

function initHoursChart() {
    const ctx = document.getElementById('hoursChart');
    if (!ctx) return;
    
    if (hoursChart) hoursChart.destroy();
    
    const labels = attendanceData
        .filter(d => d.status === 'present')
        .map(d => d.date.split('-')[2]);
    
    const hours = attendanceData
        .filter(d => d.status === 'present')
        .map(d => d.hours);
    
    hoursChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Working Hours',
                data: hours,
                backgroundColor: '#4F46E5',
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: { stepSize: 2 }
                }
            }
        }
    });
}

/* ---- EXPORT ---- */
function exportSummary() {
    alert('Exporting attendance summary as PDF...');
    // In production: generate PDF using jsPDF or similar
}

/* ---- HELPERS ---- */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ---- GLOBAL ---- */
window.changeMonth    = changeMonth;
window.exportSummary  = exportSummary;