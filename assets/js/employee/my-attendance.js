/* ================================
   MY ATTENDANCE PAGE FUNCTIONALITY
   ================================ */

// Sample attendance data for February 2026
const attendanceData = {
    '2026-02-03': { status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9 },
    '2026-02-04': { status: 'present', checkIn: '09:10 AM', checkOut: '06:15 PM', hours: 9.08 },
    '2026-02-05': { status: 'present', checkIn: '09:05 AM', checkOut: '06:05 PM', hours: 9 },
    '2026-02-06': { status: 'present', checkIn: '09:15 AM', checkOut: '06:20 PM', hours: 9.08 },
    '2026-02-07': { status: 'leave', checkIn: '-', checkOut: '-', hours: 0, remarks: 'Sick Leave' },
    '2026-02-08': { status: 'holiday', checkIn: '-', checkOut: '-', hours: 0, remarks: 'Weekend' },
    '2026-02-09': { status: 'present', checkIn: '09:05 AM', checkOut: null, hours: 0, remarks: 'In Progress' },
    '2026-02-10': { status: 'present', checkIn: '08:55 AM', checkOut: '06:10 PM', hours: 9.25 },
    '2026-02-11': { status: 'present', checkIn: '09:00 AM', checkOut: '06:05 PM', hours: 9.08 },
    '2026-02-12': { status: 'present', checkIn: '09:20 AM', checkOut: '06:25 PM', hours: 9.08 },
    '2026-02-13': { status: 'present', checkIn: '09:10 AM', checkOut: '06:00 PM', hours: 8.83 },
    '2026-02-14': { status: 'present', checkIn: '09:05 AM', checkOut: '06:15 PM', hours: 9.17 },
    '2026-02-15': { status: 'holiday', checkIn: '-', checkOut: '-', hours: 0, remarks: 'Weekend' },
    '2026-02-16': { status: 'holiday', checkIn: '-', checkOut: '-', hours: 0, remarks: 'Weekend' },
    '2026-02-17': { status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9 },
    '2026-02-18': { status: 'present', checkIn: '08:58 AM', checkOut: '06:05 PM', hours: 9.12 },
    '2026-02-19': { status: 'present', checkIn: '09:15 AM', checkOut: '06:10 PM', hours: 8.92 },
    '2026-02-20': { status: 'present', checkIn: '09:05 AM', checkOut: '06:20 PM', hours: 9.25 },
    '2026-02-21': { status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9 },
    '2026-02-22': { status: 'holiday', checkIn: '-', checkOut: '-', hours: 0, remarks: 'Weekend' },
    '2026-02-23': { status: 'holiday', checkIn: '-', checkOut: '-', hours: 0, remarks: 'Weekend' },
    '2026-02-24': { status: 'present', checkIn: '09:10 AM', checkOut: '06:15 PM', hours: 9.08 },
    '2026-02-25': { status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9 },
    '2026-02-26': { status: 'present', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: 9.08 },
    '2026-02-27': { status: 'present', checkIn: '08:55 AM', checkOut: '06:05 PM', hours: 9.17 },
    '2026-02-28': { status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: 9 }
};

let currentMonth = 1; // February (0-indexed)
let currentYear = 2026;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    updateCurrentDate();
    renderCalendar();
    renderRecentAttendance();
    renderAttendanceTable();
    initializeAttendanceChart();
    
    // Start working hours counter
    startWorkingHoursCounter();
});

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}

// Start working hours counter
function startWorkingHoursCounter() {
    const checkInTime = new Date();
    checkInTime.setHours(9, 5, 0); // 09:05 AM
    
    setInterval(() => {
        const now = new Date();
        const diff = now - checkInTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('workingHours').textContent = `${hours}h ${minutes}m`;
    }, 60000); // Update every minute
}

// Handle check out
function handleCheckOut() {
    if (confirm('Are you sure you want to check out?')) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        
        document.getElementById('checkOutTime').textContent = time;
        document.getElementById('checkOutBtn').innerHTML = '<i class="fas fa-check"></i> Checked Out';
        document.getElementById('checkOutBtn').disabled = true;
        document.getElementById('checkOutBtn').classList.remove('btn-success');
        document.getElementById('checkOutBtn').classList.add('btn-secondary');
        
        alert('Check out recorded successfully!');
    }
}

// Render calendar
function renderCalendar() {
    const calendarDays = document.getElementById('calendarDays');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
    document.getElementById('calendarMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
    
    let html = '';
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
        const day = daysInPrevMonth - i;
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const attendance = attendanceData[dateStr];
        
        let classes = 'calendar-day';
        if (today.getDate() === day && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
            classes += ' today';
        } else if (attendance) {
            classes += ` ${attendance.status}`;
        }
        
        html += `<div class="${classes}">${day}</div>`;
    }
    
    // Next month days
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    for (let i = 1; i <= remainingCells; i++) {
        html += `<div class="calendar-day other-month">${i}</div>`;
    }
    
    calendarDays.innerHTML = html;
}

// Change month
function changeMonth(direction) {
    currentMonth += direction;
    
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    
    renderCalendar();
}

// Render recent attendance
function renderRecentAttendance() {
    const container = document.getElementById('recentAttendanceList');
    const sortedDates = Object.keys(attendanceData).sort().reverse().slice(0, 5);
    
    const html = sortedDates.map(dateStr => {
        const attendance = attendanceData[dateStr];
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateFormatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        return `
            <div class="recent-attendance-item ${attendance.status}">
                <div class="attendance-date-info">
                    <h4>${dayName}, ${dateFormatted}</h4>
                    <p>${attendance.status === 'present' ? 'Present' : 
                          attendance.status === 'absent' ? 'Absent' : 
                          attendance.status === 'leave' ? 'On Leave' : 'Holiday'}</p>
                </div>
                <div class="attendance-time-info">
                    ${attendance.status === 'present' ? `
                        <span class="time">${attendance.checkIn} - ${attendance.checkOut || 'In Progress'}</span>
                        <span class="hours">${attendance.hours ? attendance.hours.toFixed(2) + 'h' : 'Ongoing'}</span>
                    ` : `<span class="time">${attendance.remarks || '-'}</span>`}
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = html;
}

// Render attendance table
function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    const sortedDates = Object.keys(attendanceData).sort().reverse();
    
    const html = sortedDates.map(dateStr => {
        const attendance = attendanceData[dateStr];
        const date = new Date(dateStr);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
        const dateFormatted = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        
        return `
            <tr>
                <td><strong>${dateFormatted}</strong></td>
                <td>${dayName}</td>
                <td>${attendance.checkIn}</td>
                <td>${attendance.checkOut || '-'}</td>
                <td>${attendance.hours ? attendance.hours.toFixed(2) + ' hours' : '-'}</td>
                <td><span class="attendance-status ${attendance.status}">${
                    attendance.status === 'present' ? 'Present' : 
                    attendance.status === 'absent' ? 'Absent' : 
                    attendance.status === 'leave' ? 'On Leave' : 'Holiday'
                }</span></td>
                <td>${attendance.remarks || '-'}</td>
            </tr>
        `;
    }).join('');
    
    tbody.innerHTML = html;
}

// Initialize attendance chart
function initializeAttendanceChart() {
    const ctx = document.getElementById('attendanceChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: 'Present Days',
                data: [5, 5, 5, 5],
                backgroundColor: '#10B981',
                borderRadius: 8
            }, {
                label: 'Absent Days',
                data: [0, 0, 0, 0],
                backgroundColor: '#EF4444',
                borderRadius: 8
            }, {
                label: 'Leave Days',
                data: [0, 1, 0, 0],
                backgroundColor: '#F59E0B',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 7,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// Filter attendance
function filterAttendance() {
    // In production, this would filter the data
    console.log('Filtering attendance...');
}

// Reset filters
function resetAttendanceFilters() {
    document.getElementById('monthFilter').value = '2026-02';
    document.getElementById('statusFilterAtt').value = 'all';
    filterAttendance();
}

// Export to Excel
function exportAttendanceExcel() {
    alert('Export to Excel functionality will be implemented here');
    console.log('Exporting attendance to Excel...');
}

// Export to PDF
function exportAttendancePDF() {
    alert('Export to PDF functionality will be implemented here');
    console.log('Exporting attendance to PDF...');
}

// Make functions globally available
window.handleCheckOut = handleCheckOut;
window.changeMonth = changeMonth;
window.filterAttendance = filterAttendance;
window.resetAttendanceFilters = resetAttendanceFilters;
window.exportAttendanceExcel = exportAttendanceExcel;
window.exportAttendancePDF = exportAttendancePDF;