/* ================================
   ATTENDANCE RECORDS FUNCTIONALITY
   ================================ */

// Sample attendance records data
const attendanceRecords = [
    { id: 1, date: '2026-02-16', employeeId: 'EMP-001', employeeName: 'John Doe', department: 'engineering', departmentName: 'Engineering', checkIn: '09:05', checkOut: '18:15', hours: 9.17, status: 'present', remarks: '' },
    { id: 2, date: '2026-02-16', employeeId: 'EMP-002', employeeName: 'Jane Smith', department: 'marketing', departmentName: 'Marketing', checkIn: '09:00', checkOut: '18:00', hours: 9.00, status: 'present', remarks: '' },
    { id: 3, date: '2026-02-16', employeeId: 'EMP-003', employeeName: 'Mike Wilson', department: 'sales', departmentName: 'Sales', checkIn: '09:20', checkOut: '18:10', hours: 8.83, status: 'present', remarks: 'Late arrival' },
    { id: 4, date: '2026-02-16', employeeId: 'EMP-004', employeeName: 'Sarah Brown', department: 'hr', departmentName: 'Human Resources', checkIn: null, checkOut: null, hours: 0, status: 'absent', remarks: 'Sick leave' },
    { id: 5, date: '2026-02-16', employeeId: 'EMP-005', employeeName: 'David Lee', department: 'finance', departmentName: 'Finance', checkIn: '09:10', checkOut: '18:05', hours: 8.92, status: 'present', remarks: '' },
    { id: 6, date: '2026-02-15', employeeId: 'EMP-001', employeeName: 'John Doe', department: 'engineering', departmentName: 'Engineering', checkIn: '09:00', checkOut: '18:00', hours: 9.00, status: 'present', remarks: '' },
    { id: 7, date: '2026-02-15', employeeId: 'EMP-002', employeeName: 'Jane Smith', department: 'marketing', departmentName: 'Marketing', checkIn: '09:15', checkOut: '18:10', hours: 8.92, status: 'present', remarks: '' },
    { id: 8, date: '2026-02-15', employeeId: 'EMP-003', employeeName: 'Mike Wilson', department: 'sales', departmentName: 'Sales', checkIn: '09:05', checkOut: '13:00', hours: 3.92, status: 'halfday', remarks: 'Half day approved' },
    { id: 9, date: '2026-02-15', employeeId: 'EMP-004', employeeName: 'Sarah Brown', department: 'hr', departmentName: 'Human Resources', checkIn: '08:55', checkOut: '18:20', hours: 9.42, status: 'present', remarks: '' },
    { id: 10, date: '2026-02-15', employeeId: 'EMP-005', employeeName: 'David Lee', department: 'finance', departmentName: 'Finance', checkIn: '09:30', checkOut: '18:00', hours: 8.50, status: 'present', remarks: 'Late by 30 mins' },
    { id: 11, date: '2026-02-14', employeeId: 'EMP-001', employeeName: 'John Doe', department: 'engineering', departmentName: 'Engineering', checkIn: '09:10', checkOut: '18:25', hours: 9.25, status: 'present', remarks: '' },
    { id: 12, date: '2026-02-14', employeeId: 'EMP-002', employeeName: 'Jane Smith', department: 'marketing', departmentName: 'Marketing', checkIn: '09:00', checkOut: '18:00', hours: 9.00, status: 'present', remarks: '' },
    { id: 13, date: '2026-02-14', employeeId: 'EMP-003', employeeName: 'Mike Wilson', department: 'sales', departmentName: 'Sales', checkIn: null, checkOut: null, hours: 0, status: 'leave', remarks: 'Casual leave' },
    { id: 14, date: '2026-02-14', employeeId: 'EMP-004', employeeName: 'Sarah Brown', department: 'hr', departmentName: 'Human Resources', checkIn: '09:05', checkOut: '18:15', hours: 9.17, status: 'present', remarks: '' },
    { id: 15, date: '2026-02-14', employeeId: 'EMP-005', employeeName: 'David Lee', department: 'finance', departmentName: 'Finance', checkIn: '09:00', checkOut: '17:30', hours: 8.50, status: 'present', remarks: 'Early departure' },
    { id: 16, date: '2026-02-13', employeeId: 'EMP-001', employeeName: 'John Doe', department: 'engineering', departmentName: 'Engineering', checkIn: '09:00', checkOut: '18:10', hours: 9.17, status: 'present', remarks: '' },
    { id: 17, date: '2026-02-13', employeeId: 'EMP-002', employeeName: 'Jane Smith', department: 'marketing', departmentName: 'Marketing', checkIn: '09:20', checkOut: '18:00', hours: 8.67, status: 'present', remarks: 'Late by 20 mins' },
    { id: 18, date: '2026-02-13', employeeId: 'EMP-003', employeeName: 'Mike Wilson', department: 'sales', departmentName: 'Sales', checkIn: '09:00', checkOut: '18:00', hours: 9.00, status: 'present', remarks: '' },
    { id: 19, date: '2026-02-13', employeeId: 'EMP-004', employeeName: 'Sarah Brown', department: 'hr', departmentName: 'Human Resources', checkIn: '09:00', checkOut: '18:05', hours: 9.08, status: 'present', remarks: '' },
    { id: 20, date: '2026-02-13', employeeId: 'EMP-005', employeeName: 'David Lee', department: 'finance', departmentName: 'Finance', checkIn: '09:15', checkOut: '18:15', hours: 9.00, status: 'present', remarks: '' }
];

let filteredRecords = [...attendanceRecords];
let currentPage = 1;
const itemsPerPage = 10;
let selectedRecord = null;

document.addEventListener('DOMContentLoaded', function() {
    // Set default date range
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    document.getElementById('startDateRecords').valueAsDate = firstDay;
    document.getElementById('endDateRecords').valueAsDate = today;
    
    renderRecordsTable();
    updatePagination();
    initializeCharts();
});

// Apply filters
function applyRecordsFilters() {
    const employeeFilter = document.getElementById('employeeSelect').value;
    const deptFilter = document.getElementById('deptFilterRecords').value;
    const statusFilter = document.getElementById('statusFilterRecords').value;
    const startDate = document.getElementById('startDateRecords').value;
    const endDate = document.getElementById('endDateRecords').value;
    
    filteredRecords = attendanceRecords.filter(record => {
        const matchEmployee = employeeFilter === 'all' || record.employeeId === employeeFilter;
        const matchDept = deptFilter === 'all' || record.department === deptFilter;
        const matchStatus = statusFilter === 'all' || record.status === statusFilter;
        const matchDateRange = (!startDate || record.date >= startDate) && (!endDate || record.date <= endDate);
        
        return matchEmployee && matchDept && matchStatus && matchDateRange;
    });
    
    currentPage = 1;
    renderRecordsTable();
    updatePagination();
}

// Reset filters
function resetRecordsFilters() {
    document.getElementById('employeeSelect').value = 'all';
    document.getElementById('deptFilterRecords').value = 'all';
    document.getElementById('statusFilterRecords').value = 'all';
    document.getElementById('monthFilter').value = '2026-02';
    
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    document.getElementById('startDateRecords').valueAsDate = firstDay;
    document.getElementById('endDateRecords').valueAsDate = today;
    
    filteredRecords = [...attendanceRecords];
    currentPage = 1;
    renderRecordsTable();
    updatePagination();
}

// Render records table
function renderRecordsTable() {
    const tbody = document.getElementById('recordsTableBody');
    const emptyState = document.getElementById('emptyStateRecords');
    
    if (filteredRecords.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'flex';
        document.getElementById('recordsCount').textContent = '0';
        return;
    }
    
    emptyState.style.display = 'none';
    document.getElementById('recordsCount').textContent = filteredRecords.length;
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageRecords = filteredRecords.slice(startIndex, endIndex);
    
    tbody.innerHTML = pageRecords.map(record => `
        <tr>
            <td><strong>${formatDate(record.date)}</strong></td>
            <td>
                <div class="employee-name-cell">
                    <div class="employee-avatar-mini">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="employee-name-info">
                        <h4>${record.employeeName}</h4>
                        <p>${record.employeeId}</p>
                    </div>
                </div>
            </td>
            <td>${record.departmentName}</td>
            <td>${record.checkIn || '-'}</td>
            <td>${record.checkOut || '-'}</td>
            <td>
                <span class="working-hours ${getHoursClass(record.hours)}">
                    ${record.hours > 0 ? record.hours.toFixed(2) + 'h' : '-'}
                </span>
            </td>
            <td><span class="status-badge ${record.status}">${capitalizeFirst(record.status)}</span></td>
            <td>
                <span class="remarks-text" title="${record.remarks}">
                    ${record.remarks || '-'}
                </span>
            </td>
            <td>
                <div class="table-action-btns">
                    <button class="action-btn-table edit" onclick="editRecord(${record.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get hours class
function getHoursClass(hours) {
    if (hours >= 8) return 'full';
    if (hours > 0) return 'partial';
    return 'none';
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const startEntry = filteredRecords.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endEntry = Math.min(currentPage * itemsPerPage, filteredRecords.length);
    
    document.getElementById('startEntry').textContent = startEntry;
    document.getElementById('endEntry').textContent = endEntry;
    document.getElementById('totalEntries').textContent = filteredRecords.length;
    
    document.getElementById('prevBtnRecords').disabled = currentPage === 1;
    document.getElementById('nextBtnRecords').disabled = currentPage === totalPages || totalPages === 0;
    
    renderPageNumbers(totalPages);
}

// Render page numbers
function renderPageNumbers(totalPages) {
    const container = document.getElementById('paginationNumbersRecords');
    const maxVisible = 5;
    let html = '';
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <button class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToRecordsPage(${i})">
                ${i}
            </button>
        `;
    }
    
    container.innerHTML = html;
}

// Change page
function changeRecordsPage(direction) {
    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    renderRecordsTable();
    updatePagination();
}

// Go to page
function goToRecordsPage(page) {
    currentPage = page;
    renderRecordsTable();
    updatePagination();
}

// Edit record
function editRecord(id) {
    selectedRecord = attendanceRecords.find(r => r.id === id);
    if (!selectedRecord) return;
    
    document.getElementById('editEmpName').textContent = selectedRecord.employeeName;
    document.getElementById('editDate').textContent = formatDate(selectedRecord.date);
    document.getElementById('editCheckIn').value = selectedRecord.checkIn || '';
    document.getElementById('editCheckOut').value = selectedRecord.checkOut || '';
    document.getElementById('editStatus').value = selectedRecord.status;
    document.getElementById('editRemarks').value = selectedRecord.remarks || '';
    
    document.getElementById('editAttendanceModal').classList.add('show');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editAttendanceModal').classList.remove('show');
    document.getElementById('editAttendanceForm').reset();
    selectedRecord = null;
}

// Save attendance edit
function saveAttendanceEdit() {
    if (!selectedRecord) return;
    
    const checkIn = document.getElementById('editCheckIn').value;
    const checkOut = document.getElementById('editCheckOut').value;
    const status = document.getElementById('editStatus').value;
    const remarks = document.getElementById('editRemarks').value;
    
    // Calculate hours
    let hours = 0;
    if (checkIn && checkOut) {
        const [inH, inM] = checkIn.split(':').map(Number);
        const [outH, outM] = checkOut.split(':').map(Number);
        hours = (outH + outM/60) - (inH + inM/60);
    }
    
    // Update record
    const index = attendanceRecords.findIndex(r => r.id === selectedRecord.id);
    if (index !== -1) {
        attendanceRecords[index].checkIn = checkIn;
        attendanceRecords[index].checkOut = checkOut;
        attendanceRecords[index].hours = hours;
        attendanceRecords[index].status = status;
        attendanceRecords[index].remarks = remarks;
    }
    
    closeEditModal();
    applyRecordsFilters();
    
    alert('Attendance record updated successfully');
}

// Export records
function exportRecords() {
    alert('Exporting attendance records to Excel...');
    console.log('Exporting records:', filteredRecords);
}

// Initialize charts
function initializeCharts() {
    initializeAttendanceTrendChart();
    initializeDepartmentAttendanceChart();
}

// Initialize attendance trend chart
function initializeAttendanceTrendChart() {
    const ctx = document.getElementById('attendanceTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
                {
                    label: 'Present',
                    data: [95, 94, 96, 93],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Absent',
                    data: [3, 4, 2, 5],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4
                },
                {
                    label: 'Leave',
                    data: [2, 2, 2, 2],
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4
                }
            ]
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
                    max: 100
                }
            }
        }
    });
}

// Initialize department attendance chart
function initializeDepartmentAttendanceChart() {
    const ctx = document.getElementById('departmentAttendanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
            datasets: [{
                data: [96, 93, 95, 97, 94, 92],
                backgroundColor: [
                    '#4F46E5',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6',
                    '#06B6D4'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function capitalizeFirst(str) {
    if (str === 'halfday') return 'Half Day';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Make functions globally available
window.applyRecordsFilters = applyRecordsFilters;
window.resetRecordsFilters = resetRecordsFilters;
window.changeRecordsPage = changeRecordsPage;
window.goToRecordsPage = goToRecordsPage;
window.editRecord = editRecord;
window.closeEditModal = closeEditModal;
window.saveAttendanceEdit = saveAttendanceEdit;
window.exportRecords = exportRecords;