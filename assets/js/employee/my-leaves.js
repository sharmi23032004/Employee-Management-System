/* ================================
   MY LEAVES PAGE FUNCTIONALITY
   ================================ */

// Sample leave data
const leavesData = [
    {
        id: 'LV-2026-015',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2026-02-15',
        endDate: '2026-02-17',
        days: 3,
        duration: 'Full Day',
        reason: 'Family function',
        appliedOn: '2026-02-05',
        status: 'pending',
        approver: null,
        approvedDate: null,
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2026-014',
        type: 'sick',
        typeName: 'Sick Leave',
        startDate: '2026-02-07',
        endDate: '2026-02-07',
        days: 1,
        duration: 'Full Day',
        reason: 'Medical appointment',
        appliedOn: '2026-02-06',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2026-02-06',
        rejectionReason: null,
        attachment: true
    },
    {
        id: 'LV-2026-013',
        type: 'privilege',
        typeName: 'Privilege Leave',
        startDate: '2026-01-20',
        endDate: '2026-01-24',
        days: 5,
        duration: 'Full Day',
        reason: 'Personal vacation',
        appliedOn: '2026-01-10',
        status: 'rejected',
        approver: 'Robert Smith',
        approvedDate: null,
        rejectionReason: 'Project deadline conflict',
        attachment: false
    },
    {
        id: 'LV-2025-012',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2025-12-23',
        endDate: '2025-12-24',
        days: 2,
        duration: 'Full Day',
        reason: 'Christmas celebration',
        appliedOn: '2025-12-15',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-12-16',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-011',
        type: 'sick',
        typeName: 'Sick Leave',
        startDate: '2025-11-15',
        endDate: '2025-11-15',
        days: 0.5,
        duration: 'Half Day (Morning)',
        reason: 'Doctor appointment',
        appliedOn: '2025-11-14',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-11-14',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-010',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2025-10-28',
        endDate: '2025-10-29',
        days: 2,
        duration: 'Full Day',
        reason: 'Festival celebration',
        appliedOn: '2025-10-20',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-10-21',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-009',
        type: 'sick',
        typeName: 'Sick Leave',
        startDate: '2025-09-12',
        endDate: '2025-09-13',
        days: 2,
        duration: 'Full Day',
        reason: 'Flu and fever',
        appliedOn: '2025-09-12',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-09-12',
        rejectionReason: null,
        attachment: true
    },
    {
        id: 'LV-2025-008',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2025-08-15',
        endDate: '2025-08-15',
        days: 1,
        duration: 'Full Day',
        reason: 'Independence Day celebration',
        appliedOn: '2025-08-10',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-08-11',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-007',
        type: 'privilege',
        typeName: 'Privilege Leave',
        startDate: '2025-07-10',
        endDate: '2025-07-12',
        days: 3,
        duration: 'Full Day',
        reason: 'Personal trip',
        appliedOn: '2025-07-01',
        status: 'cancelled',
        approver: null,
        approvedDate: null,
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-006',
        type: 'sick',
        typeName: 'Sick Leave',
        startDate: '2025-06-20',
        endDate: '2025-06-20',
        days: 1,
        duration: 'Full Day',
        reason: 'Medical checkup',
        appliedOn: '2025-06-19',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-06-19',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-005',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2025-05-18',
        endDate: '2025-05-19',
        days: 2,
        duration: 'Full Day',
        reason: 'Family event',
        appliedOn: '2025-05-12',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-05-13',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-004',
        type: 'sick',
        typeName: 'Sick Leave',
        startDate: '2025-04-08',
        endDate: '2025-04-08',
        days: 0.5,
        duration: 'Half Day (Afternoon)',
        reason: 'Dental appointment',
        appliedOn: '2025-04-07',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-04-07',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-003',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2025-03-25',
        endDate: '2025-03-26',
        days: 2,
        duration: 'Full Day',
        reason: 'Personal work',
        appliedOn: '2025-03-20',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-03-21',
        rejectionReason: null,
        attachment: false
    },
    {
        id: 'LV-2025-002',
        type: 'privilege',
        typeName: 'Privilege Leave',
        startDate: '2025-02-14',
        endDate: '2025-02-14',
        days: 1,
        duration: 'Full Day',
        reason: 'Birthday celebration',
        appliedOn: '2025-02-10',
        status: 'rejected',
        approver: 'Robert Smith',
        approvedDate: null,
        rejectionReason: 'Insufficient staff on that day',
        attachment: false
    },
    {
        id: 'LV-2025-001',
        type: 'casual',
        typeName: 'Casual Leave',
        startDate: '2025-01-15',
        endDate: '2025-01-16',
        days: 2,
        duration: 'Full Day',
        reason: 'Family function',
        appliedOn: '2025-01-10',
        status: 'approved',
        approver: 'Robert Smith',
        approvedDate: '2025-01-11',
        rejectionReason: null,
        attachment: false
    }
];

let filteredLeaves = [...leavesData];
let currentPage = 1;
const itemsPerPage = 10;
let leaveToCancel = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    renderLeavesTable();
    updatePagination();
});

// Render leaves table
function renderLeavesTable() {
    const tbody = document.getElementById('leavesTableBody');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredLeaves.length === 0) {
        tbody.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageLeaves = filteredLeaves.slice(startIndex, endIndex);
    
    // Render rows
    tbody.innerHTML = pageLeaves.map(leave => `
        <tr>
            <td><strong>${leave.id}</strong></td>
            <td>${leave.typeName}</td>
            <td>${formatDate(leave.startDate)}</td>
            <td>${formatDate(leave.endDate)}</td>
            <td>${leave.days} ${leave.days === 1 ? 'day' : 'days'}</td>
            <td>${truncateText(leave.reason, 30)}</td>
            <td>${formatDate(leave.appliedOn)}</td>
            <td><span class="status-badge ${leave.status}">${capitalizeFirst(leave.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn view-btn" onclick="viewLeaveDetails('${leave.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn cancel-btn" onclick="cancelLeave('${leave.id}')" 
                        ${leave.status !== 'pending' ? 'disabled' : ''} 
                        title="${leave.status === 'pending' ? 'Cancel Leave' : 'Cannot cancel'}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Filter leaves
function filterLeaves() {
    const statusFilter = document.getElementById('statusFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;
    
    filteredLeaves = leavesData.filter(leave => {
        const matchStatus = statusFilter === 'all' || leave.status === statusFilter;
        const matchType = typeFilter === 'all' || leave.type === typeFilter;
        const matchYear = leave.startDate.startsWith(yearFilter);
        
        return matchStatus && matchType && matchYear;
    });
    
    currentPage = 1;
    renderLeavesTable();
    updatePagination();
}

// Reset filters
function resetFilters() {
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('typeFilter').value = 'all';
    document.getElementById('yearFilter').value = '2026';
    
    filterLeaves();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
    const startEntry = filteredLeaves.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endEntry = Math.min(currentPage * itemsPerPage, filteredLeaves.length);
    
    // Update info
    document.getElementById('startEntry').textContent = startEntry;
    document.getElementById('endEntry').textContent = endEntry;
    document.getElementById('totalEntries').textContent = filteredLeaves.length;
    
    // Update buttons
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;
    
    // Render page numbers
    renderPageNumbers(totalPages);
}

// Render page numbers
function renderPageNumbers(totalPages) {
    const container = document.getElementById('paginationNumbers');
    const maxVisible = 5;
    let html = '';
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        html += `
            <button class="page-number ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
                ${i}
            </button>
        `;
    }
    
    container.innerHTML = html;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    renderLeavesTable();
    updatePagination();
}

// Go to page
function goToPage(page) {
    currentPage = page;
    renderLeavesTable();
    updatePagination();
}

// View leave details
function viewLeaveDetails(leaveId) {
    const leave = leavesData.find(l => l.id === leaveId);
    
    if (!leave) return;
    
    // Populate modal
    document.getElementById('modalLeaveId').textContent = leave.id;
    document.getElementById('modalLeaveType').textContent = leave.typeName;
    document.getElementById('modalDuration').textContent = leave.duration;
    document.getElementById('modalStartDate').textContent = formatDate(leave.startDate);
    document.getElementById('modalEndDate').textContent = formatDate(leave.endDate);
    document.getElementById('modalTotalDays').textContent = leave.days + ' ' + (leave.days === 1 ? 'day' : 'days');
    document.getElementById('modalReason').textContent = leave.reason;
    document.getElementById('modalAppliedOn').textContent = formatDate(leave.appliedOn);
    document.getElementById('modalStatus').innerHTML = `<span class="status-badge ${leave.status}">${capitalizeFirst(leave.status)}</span>`;
    
    // Show/hide conditional fields
    const approverRow = document.getElementById('modalApproverRow');
    const approvedDateRow = document.getElementById('modalApprovedDateRow');
    const rejectionRow = document.getElementById('modalRejectionRow');
    const attachmentRow = document.getElementById('modalAttachmentRow');
    
    if (leave.status === 'approved') {
        approverRow.style.display = 'grid';
        approvedDateRow.style.display = 'grid';
        document.getElementById('modalApprover').textContent = leave.approver;
        document.getElementById('modalApprovedDate').textContent = formatDate(leave.approvedDate);
    } else {
        approverRow.style.display = 'none';
        approvedDateRow.style.display = 'none';
    }
    
    if (leave.status === 'rejected') {
        rejectionRow.style.display = 'grid';
        document.getElementById('modalRejectionReason').textContent = leave.rejectionReason;
    } else {
        rejectionRow.style.display = 'none';
    }
    
    if (leave.attachment) {
        attachmentRow.style.display = 'grid';
        document.getElementById('modalAttachment').href = '#';
    } else {
        attachmentRow.style.display = 'none';
    }
    
    // Show modal
    document.getElementById('leaveDetailsModal').classList.add('show');
}

// Close leave details modal
function closeLeaveDetailsModal() {
    document.getElementById('leaveDetailsModal').classList.remove('show');
}

// Cancel leave
function cancelLeave(leaveId) {
    const leave = leavesData.find(l => l.id === leaveId);
    
    if (!leave || leave.status !== 'pending') {
        showAlert('Only pending leave requests can be cancelled', 'danger');
        return;
    }
    
    leaveToCancel = leaveId;
    document.getElementById('cancelLeaveModal').classList.add('show');
}

// Close cancel modal
function closeCancelModal() {
    document.getElementById('cancelLeaveModal').classList.remove('show');
    leaveToCancel = null;
}

// Confirm cancel leave
function confirmCancelLeave() {
    if (!leaveToCancel) return;
    
    // Find and update leave
    const leaveIndex = leavesData.findIndex(l => l.id === leaveToCancel);
    
    if (leaveIndex !== -1) {
        leavesData[leaveIndex].status = 'cancelled';
        
        // Re-filter and render
        filterLeaves();
        
        // Show success message
        showAlert('Leave request cancelled successfully', 'success');
        
        // Auto hide after 3 seconds
        setTimeout(() => {
            closeAlert();
        }, 3000);
    }
    
    closeCancelModal();
}

// Export to Excel
function exportToExcel() {
    alert('Export to Excel functionality will be implemented here');
    console.log('Exporting to Excel...');
    // In production, use a library like SheetJS
}

// Export to PDF
function exportToPDF() {
    alert('Export to PDF functionality will be implemented here');
    console.log('Exporting to PDF...');
    // In production, use a library like jsPDF
}

// Utility Functions

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('leavesAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
    }
}

function closeAlert() {
    const alertBox = document.getElementById('leavesAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Make functions globally available
window.filterLeaves = filterLeaves;
window.resetFilters = resetFilters;
window.changePage = changePage;
window.goToPage = goToPage;
window.viewLeaveDetails = viewLeaveDetails;
window.closeLeaveDetailsModal = closeLeaveDetailsModal;
window.cancelLeave = cancelLeave;
window.closeCancelModal = closeCancelModal;
window.confirmCancelLeave = confirmCancelLeave;
window.exportToExcel = exportToExcel;
window.exportToPDF = exportToPDF;
window.closeAlert = closeAlert;