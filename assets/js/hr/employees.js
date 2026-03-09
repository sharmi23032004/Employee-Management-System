/* ================================
   EMPLOYEES PAGE FUNCTIONALITY
   ================================ */

// Sample employees data
const employeesData = [
    {
        id: 'EMP-001',
        name: 'John Doe',
        email: 'john.doe@company.com',
        phone: '+91 9876543210',
        department: 'engineering',
        departmentName: 'Engineering',
        designation: 'Senior Developer',
        joinDate: '2020-01-15',
        dob: '1990-05-20',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-002',
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        phone: '+91 9876543211',
        department: 'marketing',
        departmentName: 'Marketing',
        designation: 'Marketing Manager',
        joinDate: '2019-03-10',
        dob: '1988-08-15',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-003',
        name: 'Mike Wilson',
        email: 'mike.wilson@company.com',
        phone: '+91 9876543212',
        department: 'sales',
        departmentName: 'Sales',
        designation: 'Sales Executive',
        joinDate: '2021-06-20',
        dob: '1992-12-10',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-004',
        name: 'Sarah Brown',
        email: 'sarah.brown@company.com',
        phone: '+91 9876543213',
        department: 'hr',
        departmentName: 'Human Resources',
        designation: 'HR Executive',
        joinDate: '2020-09-01',
        dob: '1991-04-25',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-005',
        name: 'David Lee',
        email: 'david.lee@company.com',
        phone: '+91 9876543214',
        department: 'finance',
        departmentName: 'Finance',
        designation: 'Accountant',
        joinDate: '2018-11-15',
        dob: '1987-07-30',
        employmentType: 'Full Time',
        status: 'inactive'
    },
    // Add more dummy data...
    {
        id: 'EMP-006',
        name: 'Emily Davis',
        email: 'emily.davis@company.com',
        phone: '+91 9876543215',
        department: 'engineering',
        departmentName: 'Engineering',
        designation: 'Junior Developer',
        joinDate: '2023-01-10',
        dob: '1995-03-18',
        employmentType: 'Full Time',
        status: 'probation'
    },
    {
        id: 'EMP-007',
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com',
        phone: '+91 9876543216',
        department: 'operations',
        departmentName: 'Operations',
        designation: 'Operations Manager',
        joinDate: '2019-07-22',
        dob: '1985-11-05',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-008',
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        phone: '+91 9876543217',
        department: 'sales',
        departmentName: 'Sales',
        designation: 'Sales Manager',
        joinDate: '2018-04-12',
        dob: '1986-09-28',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-009',
        name: 'James Martinez',
        email: 'james.martinez@company.com',
        phone: '+91 9876543218',
        department: 'engineering',
        departmentName: 'Engineering',
        designation: 'Tech Lead',
        joinDate: '2017-12-05',
        dob: '1984-06-14',
        employmentType: 'Full Time',
        status: 'active'
    },
    {
        id: 'EMP-010',
        name: 'Maria Garcia',
        email: 'maria.garcia@company.com',
        phone: '+91 9876543219',
        department: 'marketing',
        departmentName: 'Marketing',
        designation: 'Content Writer',
        joinDate: '2022-08-18',
        dob: '1993-02-22',
        employmentType: 'Contract',
        status: 'active'
    }
];

let filteredEmployees = [...employeesData];
let currentPage = 1;
const itemsPerPage = 10;
let selectedEmployeeId = null;
let currentView = 'table';

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    renderEmployeesTable();
    updatePagination();
});

// Render employees table
function renderEmployeesTable() {
    const tbody = document.getElementById('employeesTableBody');
    const emptyState = document.getElementById('emptyState');
    const tableView = document.getElementById('tableView');
    
    if (filteredEmployees.length === 0) {
        if (currentView === 'table') {
            tbody.innerHTML = '';
            tableView.style.display = 'none';
        }
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    if (currentView === 'table') {
        tableView.style.display = 'block';
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageEmployees = filteredEmployees.slice(startIndex, endIndex);
    
    // Render rows
    tbody.innerHTML = pageEmployees.map(employee => `
        <tr>
            <td>
                <input type="checkbox" class="employee-checkbox" value="${employee.id}">
            </td>
            <td><strong>${employee.id}</strong></td>
            <td>
                <div class="employee-name-cell">
                    <div class="employee-avatar-mini">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="employee-name-info">
                        <h4>${employee.name}</h4>
                        <p>${employee.email}</p>
                    </div>
                </div>
            </td>
            <td>${employee.email}</td>
            <td>${employee.departmentName}</td>
            <td>${employee.designation}</td>
            <td>${formatDate(employee.joinDate)}</td>
            <td><span class="status-badge ${employee.status}">${capitalizeFirst(employee.status)}</span></td>
            <td>
                <div class="table-action-btns">
                    <button class="action-btn-table view" onclick="viewEmployee('${employee.id}')" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn-table edit" onclick="editEmployee('${employee.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn-table delete" onclick="deleteEmployee('${employee.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Render employees grid
function renderEmployeesGrid() {
    const gridView = document.getElementById('gridView');
    const emptyState = document.getElementById('emptyState');
    
    if (filteredEmployees.length === 0) {
        gridView.innerHTML = '';
        emptyState.style.display = 'flex';
        return;
    }
    
    emptyState.style.display = 'none';
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageEmployees = filteredEmployees.slice(startIndex, endIndex);
    
    gridView.innerHTML = pageEmployees.map(employee => `
        <div class="employee-grid-card">
            <div class="employee-grid-avatar">
                <i class="fas fa-user"></i>
            </div>
            <h3>${employee.name}</h3>
            <p>${employee.designation}</p>
            <span class="status-badge ${employee.status}">${capitalizeFirst(employee.status)}</span>
            <div class="employee-grid-info">
                <div class="employee-grid-info-item">
                    <span class="label">ID:</span>
                    <span class="value">${employee.id}</span>
                </div>
                <div class="employee-grid-info-item">
                    <span class="label">Department:</span>
                    <span class="value">${employee.departmentName}</span>
                </div>
                <div class="employee-grid-info-item">
                    <span class="label">Joined:</span>
                    <span class="value">${formatDate(employee.joinDate)}</span>
                </div>
            </div>
            <div class="employee-grid-actions">
                <button class="grid-action-btn" onclick="viewEmployee('${employee.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
                <button class="grid-action-btn" onclick="editEmployee('${employee.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </div>
        </div>
    `).join('');
}

// Switch view
function switchView(view) {
    currentView = view;
    const tableView = document.getElementById('tableView');
    const gridView = document.getElementById('gridView');
    const tableViewBtn = document.getElementById('tableViewBtn');
    const gridViewBtn = document.getElementById('gridViewBtn');
    
    if (view === 'table') {
        tableView.style.display = 'block';
        gridView.style.display = 'none';
        tableViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
        renderEmployeesTable();
    } else {
        tableView.style.display = 'none';
        gridView.style.display = 'grid';
        tableViewBtn.classList.remove('active');
        gridViewBtn.classList.add('active');
        renderEmployeesGrid();
    }
}

// Filter employees
function filterEmployees() {
    const departmentFilter = document.getElementById('departmentFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    
    filteredEmployees = employeesData.filter(emp => {
        const matchDepartment = departmentFilter === 'all' || emp.department === departmentFilter;
        const matchStatus = statusFilter === 'all' || emp.status === statusFilter;
        const matchSearch = searchInput === '' || 
            emp.name.toLowerCase().includes(searchInput) ||
            emp.id.toLowerCase().includes(searchInput) ||
            emp.email.toLowerCase().includes(searchInput);
        
        return matchDepartment && matchStatus && matchSearch;
    });
    
    currentPage = 1;
    if (currentView === 'table') {
        renderEmployeesTable();
    } else {
        renderEmployeesGrid();
    }
    updatePagination();
}

// Search employees
function searchEmployees() {
    filterEmployees();
}

// Reset filters
function resetFilters() {
    document.getElementById('departmentFilter').value = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('searchInput').value = '';
    filterEmployees();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const startEntry = filteredEmployees.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const endEntry = Math.min(currentPage * itemsPerPage, filteredEmployees.length);
    
    document.getElementById('startEntry').textContent = startEntry;
    document.getElementById('endEntry').textContent = endEntry;
    document.getElementById('totalEntries').textContent = filteredEmployees.length;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages || totalPages === 0;
    
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
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    
    if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    } else if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    }
    
    if (currentView === 'table') {
        renderEmployeesTable();
    } else {
        renderEmployeesGrid();
    }
    updatePagination();
}

// Go to page
function goToPage(page) {
    currentPage = page;
    if (currentView === 'table') {
        renderEmployeesTable();
    } else {
        renderEmployeesGrid();
    }
    updatePagination();
}

// Toggle select all
function toggleSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.employee-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
}

// View employee
function viewEmployee(id) {
    const employee = employeesData.find(emp => emp.id === id);
    if (!employee) return;
    
    document.getElementById('modalEmployeeName').textContent = employee.name;
    document.getElementById('modalEmployeeDesignation').textContent = employee.designation;
    document.getElementById('modalEmployeeStatus').textContent = capitalizeFirst(employee.status);
    document.getElementById('modalEmployeeStatus').className = `status-badge ${employee.status}`;
    
    document.getElementById('modalEmployeeId').textContent = employee.id;
    document.getElementById('modalEmployeeEmail').textContent = employee.email;
    document.getElementById('modalEmployeePhone').textContent = employee.phone;
    document.getElementById('modalEmployeeDOB').textContent = formatDate(employee.dob);
    
    document.getElementById('modalEmployeeDepartment').textContent = employee.departmentName;
    document.getElementById('modalEmployeeDesignationFull').textContent = employee.designation;
    document.getElementById('modalEmployeeJoinDate').textContent = formatDate(employee.joinDate);
    document.getElementById('modalEmployeeType').textContent = employee.employmentType;
    
    selectedEmployeeId = id;
    document.getElementById('employeeDetailsModal').classList.add('show');
}

// Close employee modal
function closeEmployeeModal() {
    document.getElementById('employeeDetailsModal').classList.remove('show');
    selectedEmployeeId = null;
}

// Edit employee
function editEmployee(id) {
    if (!id && selectedEmployeeId) {
        id = selectedEmployeeId;
    }
    console.log('Editing employee:', id);
    // Navigate to edit page
    window.location.href = `edit-employee.html?id=${id}`;
}

// Delete employee
function deleteEmployee(id) {
    selectedEmployeeId = id;
    document.getElementById('deleteConfirmModal').classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').classList.remove('show');
    selectedEmployeeId = null;
}

// Confirm delete
function confirmDelete() {
    if (!selectedEmployeeId) return;
    
    console.log('Deleting employee:', selectedEmployeeId);
    
    // In production, make API call to delete
    // For demo, just remove from array
    const index = employeesData.findIndex(emp => emp.id === selectedEmployeeId);
    if (index !== -1) {
        employeesData.splice(index, 1);
        filterEmployees();
        showAlert('Employee deleted successfully', 'success');
        setTimeout(() => closeAlert(), 3000);
    }
    
    closeDeleteModal();
}

// Export to Excel
function exportToExcel() {
    alert('Exporting employees data to Excel...');
    console.log('Exporting to Excel');
    // In production, generate and download Excel file
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
    const alertBox = document.getElementById('employeesAlert');
    const alertMessage = document.getElementById('alertMessage');
    
    if (alertBox && alertMessage) {
        alertMessage.textContent = message;
        alertBox.className = `alert alert-${type}`;
        alertBox.style.display = 'flex';
    }
}

function closeAlert() {
    const alertBox = document.getElementById('employeesAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Make functions globally available
window.filterEmployees = filterEmployees;
window.searchEmployees = searchEmployees;
window.resetFilters = resetFilters;
window.changePage = changePage;
window.goToPage = goToPage;
window.toggleSelectAll = toggleSelectAll;
window.switchView = switchView;
window.viewEmployee = viewEmployee;
window.closeEmployeeModal = closeEmployeeModal;
window.editEmployee = editEmployee;
window.deleteEmployee = deleteEmployee;
window.closeDeleteModal = closeDeleteModal;
window.confirmDelete = confirmDelete;
window.exportToExcel = exportToExcel;
window.closeAlert = closeAlert;