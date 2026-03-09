/* ================================
   LEAVE REQUESTS FUNCTIONALITY
   ================================ */

// Sample leave requests data
const leaveRequests = [
    {
        id: 'LR-001',
        employeeId: 'EMP-001',
        employeeName: 'John Doe',
        department: 'engineering',
        departmentName: 'Engineering',
        designation: 'Senior Developer',
        leaveType: 'casual',
        leaveTypeName: 'Casual Leave',
        duration: 'full',
        startDate: '2026-02-20',
        endDate: '2026-02-22',
        totalDays: 3,
        reason: 'Family function and personal work',
        appliedDate: '2026-02-10',
        status: 'pending',
        available: 5,
        afterLeave: 2,
        attachment: null
    },
    {
        id: 'LR-002',
        employeeId: 'EMP-002',
        employeeName: 'Jane Smith',
        department: 'marketing',
        departmentName: 'Marketing',
        designation: 'Marketing Manager',
        leaveType: 'sick',
        leaveTypeName: 'Sick Leave',
        duration: 'full',
        startDate: '2026-02-17',
        endDate: '2026-02-17',
        totalDays: 1,
        reason: 'Not feeling well, need rest',
        appliedDate: '2026-02-16',
        status: 'pending',
        available: 4,
        afterLeave: 3,
        attachment: 'medical-certificate.pdf'
    },
    {
        id: 'LR-003',
        employeeId: 'EMP-003',
        employeeName: 'Mike Wilson',
        department: 'sales',
        departmentName: 'Sales',
        designation: 'Sales Executive',
        leaveType: 'privilege',
        leaveTypeName: 'Privilege Leave',
        duration: 'full',
        startDate: '2026-02-25',
        endDate: '2026-02-28',
        totalDays: 4,
        reason: 'Planning to visit hometown and spend time with family',
        appliedDate: '2026-02-12',
        status: 'pending',
        available: 3,
        afterLeave: 0,
        attachment: null
    },
    {
        id: 'LR-004',
        employeeId: 'EMP-004',
        employeeName: 'Sarah Brown',
        department: 'hr',
        departmentName: 'Human Resources',
        designation: 'HR Executive',
        leaveType: 'casual',
        leaveTypeName: 'Casual Leave',
        duration: 'half',
        startDate: '2026-02-19',
        endDate: '2026-02-19',
        totalDays: 0.5,
        reason: 'Doctor appointment in the morning',
        appliedDate: '2026-02-15',
        status: 'pending',
        available: 8,
        afterLeave: 7.5,
        attachment: null
    },
    {
        id: 'LR-005',
        employeeId: 'EMP-005',
        employeeName: 'David Lee',
        department: 'finance',
        departmentName: 'Finance',
        designation: 'Accountant',
        leaveType: 'sick',
        leaveTypeName: 'Sick Leave',
        duration: 'full',
        startDate: '2026-02-18',
        endDate: '2026-02-19',
        totalDays: 2,
        reason: 'Fever and body pain',
        appliedDate: '2026-02-17',
        status: 'pending',
        available: 6,
        afterLeave: 4,
        attachment: null
    },
    {
        id: 'LR-006',
        employeeId: 'EMP-006',
        employeeName: 'Emily Davis',
        department: 'engineering',
        departmentName: 'Engineering',
        designation: 'Junior Developer',
        leaveType: 'casual',
        leaveTypeName: 'Casual Leave',
        duration: 'full',
        startDate: '2026-01-28',
        endDate: '2026-01-29',
        totalDays: 2,
        reason: 'Wedding to attend',
        appliedDate: '2026-01-20',
        status: 'approved',
        available: 10,
        afterLeave: 8,
        attachment: null,
        approvedBy: 'Sarah Johnson',
        approvedDate: '2026-01-21'
    },
    {
        id: 'LR-007',
        employeeId: 'EMP-007',
        employeeName: 'Robert Taylor',
        department: 'operations',
        departmentName: 'Operations',
        designation: 'Operations Manager',
        leaveType: 'privilege',
        leaveTypeName: 'Privilege Leave',
        duration: 'full',
        startDate: '2026-01-15',
        endDate: '2026-01-16',
        totalDays: 2,
        reason: 'Personal work',
        appliedDate: '2026-01-10',
        status: 'rejected',
        available: 4,
        afterLeave: 4,
        attachment: null,
        rejectedBy: 'Sarah Johnson',
        rejectedDate: '2026-01-11',
        rejectionReason: 'Critical project deadline. Please reschedule.'
    },
    {
        id: 'LR-008',
        employeeId: 'EMP-008',
        employeeName: 'Lisa Anderson',
        department: 'sales',
        departmentName: 'Sales',
        designation: 'Sales Manager',
        leaveType: 'casual',
        leaveTypeName: 'Casual Leave',
        duration: 'full',
        startDate: '2026-02-24',
        endDate: '2026-02-24',
        totalDays: 1,
        reason: 'Child school event',
        appliedDate: '2026-02-14',
        status: 'pending',
        available: 7,
        afterLeave: 6,
        attachment: null
    }
];

let filteredRequests = [...leaveRequests];
let currentFilter = 'pending';
let selectedRequest = null;

document.addEventListener('DOMContentLoaded', function() {
    filterByStatus('pending');
    updateStats();
});

// Filter by status
function filterByStatus(status) {
    currentFilter = status;
    
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.tab-btn[data-status="${status}"]`)?.classList.add('active');
    
    applyFilters();
}

// Apply filters
function applyFilters() {
    const leaveTypeFilter = document.getElementById('leaveTypeFilter').value;
    const departmentFilter = document.getElementById('departmentFilterLeave').value;
    const searchInput = document.getElementById('searchLeaveRequest').value.toLowerCase();
    
    filteredRequests = leaveRequests.filter(request => {
        const matchStatus = currentFilter === 'all' || request.status === currentFilter;
        const matchType = leaveTypeFilter === 'all' || request.leaveType === leaveTypeFilter;
        const matchDept = departmentFilter === 'all' || request.department === departmentFilter;
        const matchSearch = searchInput === '' || 
            request.employeeName.toLowerCase().includes(searchInput) ||
            request.employeeId.toLowerCase().includes(searchInput);
        
        return matchStatus && matchType && matchDept && matchSearch;
    });
    
    renderLeaveRequests();
}

// Reset filters
function resetLeaveFilters() {
    document.getElementById('leaveTypeFilter').value = 'all';
    document.getElementById('departmentFilterLeave').value = 'all';
    document.getElementById('dateRangeFilter').value = 'all';
    document.getElementById('searchLeaveRequest').value = '';
    applyFilters();
}

// Render leave requests
function renderLeaveRequests() {
    const container = document.getElementById('leaveRequestsList');
    const emptyState = document.getElementById('emptyStateLeave');
    
    if (filteredRequests.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    
    container.innerHTML = filteredRequests.map(request => `
        <div class="leave-request-card ${request.status}">
            <div class="leave-request-header">
                <div class="employee-leave-info">
                    <div class="employee-avatar-leave">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="employee-leave-details">
                        <h4>${request.employeeName}</h4>
                        <p>${request.designation} • ${request.departmentName}</p>
                    </div>
                </div>
                <div class="leave-request-meta">
                    <span class="status-badge ${request.status}">${capitalizeFirst(request.status)}</span>
                </div>
            </div>
            
            <div class="leave-request-body">
                <div class="leave-info-item">
                    <span class="leave-info-label">Leave Type</span>
                    <span class="leave-info-value">${request.leaveTypeName}</span>
                </div>
                <div class="leave-info-item">
                    <span class="leave-info-label">Duration</span>
                    <span class="leave-info-value">${formatDate(request.startDate)} - ${formatDate(request.endDate)}</span>
                </div>
                <div class="leave-info-item">
                    <span class="leave-info-label">Total Days</span>
                    <span class="leave-info-value">${request.totalDays} ${request.totalDays === 1 ? 'day' : 'days'}</span>
                </div>
                <div class="leave-info-item">
                    <span class="leave-info-label">Applied On</span>
                    <span class="leave-info-value">${formatDate(request.appliedDate)}</span>
                </div>
            </div>
            
            <div class="leave-reason-preview">
                <p>${request.reason}</p>
            </div>
            
            <div class="leave-request-actions">
                <button class="btn btn-sm btn-secondary" onclick="viewLeaveDetails('${request.id}')">
                    <i class="fas fa-eye"></i>
                    View Details
                </button>
                ${request.status === 'pending' ? `
                    <button class="btn btn-sm btn-danger" onclick="quickReject('${request.id}')">
                        <i class="fas fa-times"></i>
                        Reject
                    </button>
                    <button class="btn btn-sm btn-success" onclick="quickApprove('${request.id}')">
                        <i class="fas fa-check"></i>
                        Approve
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// View leave details
function viewLeaveDetails(id) {
    selectedRequest = leaveRequests.find(req => req.id === id);
    if (!selectedRequest) return;
    
    document.getElementById('modalEmpName').textContent = selectedRequest.employeeName;
    document.getElementById('modalEmpId').textContent = selectedRequest.employeeId;
    document.getElementById('modalEmpDept').textContent = selectedRequest.departmentName;
    document.getElementById('modalEmpDesig').textContent = selectedRequest.designation;
    
    document.getElementById('modalLeaveType').textContent = selectedRequest.leaveTypeName;
    document.getElementById('modalLeaveDuration').textContent = capitalizeFirst(selectedRequest.duration) + ' Day';
    document.getElementById('modalStartDate').textContent = formatDate(selectedRequest.startDate);
    document.getElementById('modalEndDate').textContent = formatDate(selectedRequest.endDate);
    document.getElementById('modalTotalDays').textContent = selectedRequest.totalDays + ' days';
    document.getElementById('modalAppliedDate').textContent = formatDate(selectedRequest.appliedDate);
    
    document.getElementById('modalLeaveReason').textContent = selectedRequest.reason;
    
    document.getElementById('modalAvailable').textContent = selectedRequest.available + ' days';
    document.getElementById('modalAfterLeave').textContent = selectedRequest.afterLeave + ' days';
    
    // Show/hide attachment
    const attachmentSection = document.getElementById('attachmentSection');
    if (selectedRequest.attachment) {
        attachmentSection.style.display = 'block';
        document.getElementById('modalAttachment').textContent = selectedRequest.attachment;
    } else {
        attachmentSection.style.display = 'none';
    }
    
    // Show/hide action buttons
    const approveBtn = document.getElementById('approveBtnModal');
    const rejectBtn = document.getElementById('rejectBtnModal');
    
    if (selectedRequest.status === 'pending') {
        approveBtn.style.display = 'inline-flex';
        rejectBtn.style.display = 'inline-flex';
    } else {
        approveBtn.style.display = 'none';
        rejectBtn.style.display = 'none';
    }
    
    document.getElementById('leaveDetailsModal').classList.add('show');
}

// Close leave details modal
function closeLeaveDetailsModal() {
    document.getElementById('leaveDetailsModal').classList.remove('show');
    selectedRequest = null;
}

// Quick approve
function quickApprove(id) {
    selectedRequest = leaveRequests.find(req => req.id === id);
    if (!selectedRequest) return;
    
    if (confirm(`Approve leave request for ${selectedRequest.employeeName}?`)) {
        approveLeaveRequest();
    }
}

// Approve leave request
function approveLeaveRequest() {
    if (!selectedRequest) return;
    
    const index = leaveRequests.findIndex(req => req.id === selectedRequest.id);
    if (index !== -1) {
        leaveRequests[index].status = 'approved';
        leaveRequests[index].approvedBy = 'Sarah Johnson';
        leaveRequests[index].approvedDate = new Date().toISOString().split('T')[0];
    }
    
    showAlert(`Leave request approved for ${selectedRequest.employeeName}`, 'success');
    closeLeaveDetailsModal();
    applyFilters();
    updateStats();
}

// Quick reject
function quickReject(id) {
    selectedRequest = leaveRequests.find(req => req.id === id);
    if (!selectedRequest) return;
    
    openRejectModal();
}

// Open reject modal
function openRejectModal() {
    document.getElementById('rejectModal').classList.add('show');
}

// Close reject modal
function closeRejectModal() {
    document.getElementById('rejectModal').classList.remove('show');
    document.getElementById('rejectForm').reset();
    document.getElementById('rejectReasonError').style.display = 'none';
}

// Confirm reject
function confirmReject() {
    const reason = document.getElementById('rejectReason').value.trim();
    
    if (!reason) {
        const errorEl = document.getElementById('rejectReasonError');
        errorEl.textContent = 'Please provide a rejection reason';
        errorEl.style.display = 'block';
        return;
    }
    
    if (!selectedRequest) return;
    
    const index = leaveRequests.findIndex(req => req.id === selectedRequest.id);
    if (index !== -1) {
        leaveRequests[index].status = 'rejected';
        leaveRequests[index].rejectedBy = 'Sarah Johnson';
        leaveRequests[index].rejectedDate = new Date().toISOString().split('T')[0];
        leaveRequests[index].rejectionReason = reason;
    }
    
    showAlert(`Leave request rejected for ${selectedRequest.employeeName}`, 'success');
    closeRejectModal();
    closeLeaveDetailsModal();
    applyFilters();
    updateStats();
}

// Update stats
function updateStats() {
    const pending = leaveRequests.filter(req => req.status === 'pending').length;
    const approved = leaveRequests.filter(req => req.status === 'approved').length;
    const rejected = leaveRequests.filter(req => req.status === 'rejected').length;
    
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('approvedCount').textContent = approved;
    document.getElementById('rejectedCount').textContent = rejected;
    
    // Update badge in tab
    const badge = document.querySelector('.tab-btn[data-status="pending"] .tab-badge');
    if (badge) {
        badge.textContent = pending;
    }
}

// Export leave requests
function exportLeaveRequests() {
    alert('Exporting leave requests to Excel...');
    console.log('Exporting leave requests');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('leaveRequestAlert');
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
    const alertBox = document.getElementById('leaveRequestAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Make functions globally available
window.filterByStatus = filterByStatus;
window.applyFilters = applyFilters;
window.resetLeaveFilters = resetLeaveFilters;
window.viewLeaveDetails = viewLeaveDetails;
window.closeLeaveDetailsModal = closeLeaveDetailsModal;
window.quickApprove = quickApprove;
window.quickReject = quickReject;
window.approveLeaveRequest = approveLeaveRequest;
window.openRejectModal = openRejectModal;
window.closeRejectModal = closeRejectModal;
window.confirmReject = confirmReject;
window.exportLeaveRequests = exportLeaveRequests;
window.closeAlert = closeAlert;