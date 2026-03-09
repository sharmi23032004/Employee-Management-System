/* ================================
   MARK ATTENDANCE FUNCTIONALITY
   ================================ */

// Sample employees data
const employees = [
    { id: 'EMP-001', name: 'John Doe', department: 'engineering', departmentName: 'Engineering' },
    { id: 'EMP-002', name: 'Jane Smith', department: 'marketing', departmentName: 'Marketing' },
    { id: 'EMP-003', name: 'Mike Wilson', department: 'sales', departmentName: 'Sales' },
    { id: 'EMP-004', name: 'Sarah Brown', department: 'hr', departmentName: 'Human Resources' },
    { id: 'EMP-005', name: 'David Lee', department: 'finance', departmentName: 'Finance' },
    { id: 'EMP-006', name: 'Emily Davis', department: 'engineering', departmentName: 'Engineering' },
    { id: 'EMP-007', name: 'Robert Taylor', department: 'operations', departmentName: 'Operations' },
    { id: 'EMP-008', name: 'Lisa Anderson', department: 'sales', departmentName: 'Sales' },
    { id: 'EMP-009', name: 'James Martinez', department: 'engineering', departmentName: 'Engineering' },
    { id: 'EMP-010', name: 'Maria Garcia', department: 'marketing', departmentName: 'Marketing' }
];

// Employees on leave (sample data)
const employeesOnLeave = ['EMP-004', 'EMP-007', 'EMP-009', 'EMP-010'];

let attendanceRecords = {};
let filteredEmployees = [...employees];
let currentDate = new Date();
let selectedEmployee = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeAttendance();
});

// Initialize attendance
function initializeAttendance() {
    setToday();
    initializeAttendanceRecords();
    renderAttendanceTable();
    updateStats();
}

// Initialize attendance records
function initializeAttendanceRecords() {
    employees.forEach(emp => {
        if (employeesOnLeave.includes(emp.id)) {
            attendanceRecords[emp.id] = {
                status: 'leave',
                checkIn: null,
                checkOut: null,
                remarks: 'On approved leave'
            };
        } else {
            attendanceRecords[emp.id] = {
                status: 'pending',
                checkIn: null,
                checkOut: null,
                remarks: ''
            };
        }
    });
}

// Set to today
function setToday() {
    currentDate = new Date();
    updateDateDisplay();
}

// Change date
function changeDate(days) {
    currentDate.setDate(currentDate.getDate() + days);
    updateDateDisplay();
    loadAttendanceByDate();
}

// Update date display
function updateDateDisplay() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('displayDate').textContent = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('attendanceDate').valueAsDate = currentDate;
}

// Load attendance by date
function loadAttendanceByDate() {
    const dateInput = document.getElementById('attendanceDate');
    currentDate = new Date(dateInput.value);
    updateDateDisplay();
    
    // In production, load attendance from API for selected date
    console.log('Loading attendance for:', currentDate.toISOString().split('T')[0]);
}

// Render attendance table
function renderAttendanceTable() {
    const tbody = document.getElementById('attendanceTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredEmployees.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    
    tbody.innerHTML = filteredEmployees.map(emp => {
        const record = attendanceRecords[emp.id];
        const isOnLeave = record.status === 'leave';
        
        return `
            <tr>
                <td>
                    <input type="checkbox" 
                           class="employee-checkbox" 
                           value="${emp.id}"
                           ${isOnLeave ? 'disabled' : ''}
                           onchange="updateSelection()">
                </td>
                <td>
                    <div class="employee-name-cell">
                        <div class="employee-avatar-mini">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="employee-name-info">
                            <h4>${emp.name}</h4>
                        </div>
                    </div>
                </td>
                <td><strong>${emp.id}</strong></td>
                <td>${emp.departmentName}</td>
                <td>
                    ${!isOnLeave ? `
                        <input type="time" 
                               class="time-input-small" 
                               value="${record.checkIn || ''}"
                               onchange="updateCheckIn('${emp.id}', this.value)">
                    ` : '-'}
                </td>
                <td>
                    ${!isOnLeave ? `
                        <input type="time" 
                               class="time-input-small" 
                               value="${record.checkOut || ''}"
                               onchange="updateCheckOut('${emp.id}', this.value)">
                    ` : '-'}
                </td>
                <td>
                    ${getStatusBadge(record.status)}
                </td>
                <td>
                    ${!isOnLeave ? `
                        <div class="attendance-quick-actions">
                            <button class="quick-status-btn present" 
                                    onclick="quickMark('${emp.id}', 'present')"
                                    title="Mark Present">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="quick-status-btn absent" 
                                    onclick="quickMark('${emp.id}', 'absent')"
                                    title="Mark Absent">
                                <i class="fas fa-times"></i>
                            </button>
                            <button class="action-mark-btn" 
                                    onclick="openMarkModal('${emp.id}')"
                                    title="Mark Details">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    ` : '<span class="text-muted">On Leave</span>'}
                </td>
            </tr>
        `;
    }).join('');
    
    updateStats();
}

// Get status badge
function getStatusBadge(status) {
    const badges = {
        present: '<span class="status-badge active">Present</span>',
        absent: '<span class="status-badge inactive">Absent</span>',
        leave: '<span class="status-badge warning">On Leave</span>',
        pending: '<span class="status-badge pending">Not Marked</span>'
    };
    return badges[status] || badges.pending;
}

// Quick mark
function quickMark(employeeId, status) {
    attendanceRecords[employeeId].status = status;
    
    if (status === 'present' && !attendanceRecords[employeeId].checkIn) {
        attendanceRecords[employeeId].checkIn = '09:00';
        attendanceRecords[employeeId].checkOut = '18:00';
    }
    
    renderAttendanceTable();
    showAlert(`Attendance marked as ${status}`, 'success');
}

// Update check in
function updateCheckIn(employeeId, time) {
    attendanceRecords[employeeId].checkIn = time;
    if (time && attendanceRecords[employeeId].status === 'pending') {
        attendanceRecords[employeeId].status = 'present';
        renderAttendanceTable();
    }
}

// Update check out
function updateCheckOut(employeeId, time) {
    attendanceRecords[employeeId].checkOut = time;
}

// Open mark modal
function openMarkModal(employeeId) {
    selectedEmployee = employees.find(emp => emp.id === employeeId);
    if (!selectedEmployee) return;
    
    const record = attendanceRecords[employeeId];
    
    document.getElementById('modalEmployeeName').textContent = selectedEmployee.name;
    document.getElementById('modalEmployeeId').textContent = selectedEmployee.id;
    document.getElementById('modalEmployeeDept').textContent = selectedEmployee.departmentName;
    document.getElementById('modalDate').textContent = currentDate.toLocaleDateString('en-US');
    
    // Set form values
    document.getElementById('checkInTime').value = record.checkIn || '';
    document.getElementById('checkOutTime').value = record.checkOut || '';
    document.getElementById('remarks').value = record.remarks || '';
    
    // Set status
    const statusRadio = document.querySelector(`input[name="attendanceStatus"][value="${record.status}"]`);
    if (statusRadio) {
        statusRadio.checked = true;
    }
    
    document.getElementById('markAttendanceModal').classList.add('show');
}

// Close mark modal
function closeMarkModal() {
    document.getElementById('markAttendanceModal').classList.remove('show');
    document.getElementById('attendanceMarkForm').reset();
    selectedEmployee = null;
}

// Confirm mark attendance
function confirmMarkAttendance() {
    if (!selectedEmployee) return;
    
    const status = document.querySelector('input[name="attendanceStatus"]:checked')?.value;
    const checkIn = document.getElementById('checkInTime').value;
    const checkOut = document.getElementById('checkOutTime').value;
    const remarks = document.getElementById('remarks').value;
    
    if (!status) {
        alert('Please select attendance status');
        return;
    }
    
    attendanceRecords[selectedEmployee.id] = {
        status: status,
        checkIn: checkIn,
        checkOut: checkOut,
        remarks: remarks
    };
    
    renderAttendanceTable();
    closeMarkModal();
    showAlert('Attendance marked successfully', 'success');
}

// Filter attendance
function filterAttendance() {
    const deptFilter = document.getElementById('deptFilter').value;
    const statusFilter = document.getElementById('statusAttFilter').value;
    const searchInput = document.getElementById('searchEmployee').value.toLowerCase();
    
    filteredEmployees = employees.filter(emp => {
        const record = attendanceRecords[emp.id];
        const matchDept = deptFilter === 'all' || emp.department === deptFilter;
        const matchStatus = statusFilter === 'all' || record.status === statusFilter;
        const matchSearch = searchInput === '' || 
            emp.name.toLowerCase().includes(searchInput) ||
            emp.id.toLowerCase().includes(searchInput);
        
        return matchDept && matchStatus && matchSearch;
    });
    
    renderAttendanceTable();
}

// Reset filters
function resetFilters() {
    document.getElementById('deptFilter').value = 'all';
    document.getElementById('statusAttFilter').value = 'all';
    document.getElementById('searchEmployee').value = '';
    filteredEmployees = [...employees];
    renderAttendanceTable();
}

// Toggle select all
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAllEmployees') || document.getElementById('selectAllHeader');
    const checkboxes = document.querySelectorAll('.employee-checkbox:not([disabled])');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateSelection();
}

// Update selection
function updateSelection() {
    const checkboxes = document.querySelectorAll('.employee-checkbox:checked');
    const count = checkboxes.length;
    
    const bulkBar = document.getElementById('bulkActionsBar');
    const selectedCountSpan = document.getElementById('selectedCount');
    
    if (count > 0) {
        bulkBar.style.display = 'flex';
        selectedCountSpan.textContent = count;
    } else {
        bulkBar.style.display = 'none';
    }
}

// Bulk mark status
function bulkMarkStatus(status) {
    const checkboxes = document.querySelectorAll('.employee-checkbox:checked');
    
    checkboxes.forEach(checkbox => {
        const employeeId = checkbox.value;
        attendanceRecords[employeeId].status = status;
        
        if (status === 'present') {
            if (!attendanceRecords[employeeId].checkIn) {
                attendanceRecords[employeeId].checkIn = '09:00';
            }
            if (!attendanceRecords[employeeId].checkOut) {
                attendanceRecords[employeeId].checkOut = '18:00';
            }
        }
    });
    
    renderAttendanceTable();
    clearSelection();
    showAlert(`Marked ${checkboxes.length} employees as ${status}`, 'success');
}

// Clear selection
function clearSelection() {
    document.querySelectorAll('.employee-checkbox').forEach(cb => cb.checked = false);
    if (document.getElementById('selectAllEmployees')) {
        document.getElementById('selectAllEmployees').checked = false;
    }
    if (document.getElementById('selectAllHeader')) {
        document.getElementById('selectAllHeader').checked = false;
    }
    updateSelection();
}

// Bulk mark all present
function bulkMarkAttendance() {
    if (!confirm('Mark all employees as present with default timings (9:00 AM - 6:00 PM)?')) {
        return;
    }
    
    let count = 0;
    employees.forEach(emp => {
        if (attendanceRecords[emp.id].status !== 'leave') {
            attendanceRecords[emp.id].status = 'present';
            attendanceRecords[emp.id].checkIn = '09:00';
            attendanceRecords[emp.id].checkOut = '18:00';
            count++;
        }
    });
    
    renderAttendanceTable();
    showAlert(`Marked ${count} employees as present`, 'success');
}

// Update stats
function updateStats() {
    let present = 0;
    let absent = 0;
    let leave = 0;
    let pending = 0;
    
    Object.values(attendanceRecords).forEach(record => {
        switch(record.status) {
            case 'present': present++; break;
            case 'absent': absent++; break;
            case 'leave': leave++; break;
            case 'pending': pending++; break;
        }
    });
    
    document.getElementById('totalEmployees').textContent = employees.length;
    document.getElementById('presentCount').textContent = present;
    document.getElementById('absentCount').textContent = absent;
    document.getElementById('leaveCount').textContent = leave;
    document.getElementById('pendingCount').textContent = pending;
}

// Save attendance
function saveAttendance() {
    // Check if all marked
    const pending = Object.values(attendanceRecords).filter(r => r.status === 'pending').length;
    
    if (pending > 0) {
        if (!confirm(`${pending} employees are not marked. Do you want to continue?`)) {
            return;
        }
    }
    
    console.log('Saving attendance:', attendanceRecords);
    console.log('Date:', currentDate.toISOString().split('T')[0]);
    
    // In production, make API call to save
    showAlert('Attendance saved successfully!', 'success');
    
    setTimeout(() => {
        window.location.href = 'attendance-records.html';
    }, 2000);
}

// Cancel attendance
function cancelAttendance() {
    if (confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
        window.location.href = 'dashboard.html';
    }
}

// Utility functions
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('attendanceAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => closeAlert(), 3000);
    }
}

function closeAlert() {
    const alertBox = document.getElementById('attendanceAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Make functions globally available
window.changeDate = changeDate;
window.setToday = setToday;
window.loadAttendanceByDate = loadAttendanceByDate;
window.filterAttendance = filterAttendance;
window.resetFilters = resetFilters;
window.toggleSelectAll = toggleSelectAll;
window.updateSelection = updateSelection;
window.bulkMarkStatus = bulkMarkStatus;
window.clearSelection = clearSelection;
window.bulkMarkAttendance = bulkMarkAttendance;
window.quickMark = quickMark;
window.updateCheckIn = updateCheckIn;
window.updateCheckOut = updateCheckOut;
window.openMarkModal = openMarkModal;
window.closeMarkModal = closeMarkModal;
window.confirmMarkAttendance = confirmMarkAttendance;
window.saveAttendance = saveAttendance;
window.cancelAttendance = cancelAttendance;
window.closeAlert = closeAlert;