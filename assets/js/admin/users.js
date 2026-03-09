/* ================================
   USER MANAGEMENT FUNCTIONALITY
   ================================ */

const usersData = [
    {
        id: 1, empId: 'EMP-001', name: 'John Doe',
        email: 'john.doe@company.com', phone: '+91 9876543210',
        role: 'employee', department: 'Engineering',
        joinDate: '2020-01-15', lastLogin: '2026-02-16 09:05',
        loginCount: 342, status: 'active'
    },
    {
        id: 2, empId: 'EMP-002', name: 'Jane Smith',
        email: 'jane.smith@company.com', phone: '+91 9876543211',
        role: 'employee', department: 'Marketing',
        joinDate: '2019-03-10', lastLogin: '2026-02-16 08:50',
        loginCount: 512, status: 'active'
    },
    {
        id: 3, empId: 'HR-001', name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com', phone: '+91 9876543212',
        role: 'hr', department: 'Human Resources',
        joinDate: '2018-06-01', lastLogin: '2026-02-17 08:30',
        loginCount: 890, status: 'active'
    },
    {
        id: 4, empId: 'ADM-001', name: 'Admin User',
        email: 'admin@company.com', phone: '+91 9876543213',
        role: 'admin', department: 'IT',
        joinDate: '2017-01-01', lastLogin: '2026-02-17 08:00',
        loginCount: 1240, status: 'active'
    },
    {
        id: 5, empId: 'EMP-003', name: 'Mike Wilson',
        email: 'mike.wilson@company.com', phone: '+91 9876543214',
        role: 'employee', department: 'Sales',
        joinDate: '2021-06-20', lastLogin: '2026-02-15 17:30',
        loginCount: 210, status: 'active'
    },
    {
        id: 6, empId: 'EMP-004', name: 'Sarah Brown',
        email: 'sarah.brown@company.com', phone: '+91 9876543215',
        role: 'employee', department: 'Human Resources',
        joinDate: '2020-09-01', lastLogin: '2026-02-10 09:00',
        loginCount: 180, status: 'inactive'
    },
    {
        id: 7, empId: 'EMP-005', name: 'David Lee',
        email: 'david.lee@company.com', phone: '+91 9876543216',
        role: 'employee', department: 'Finance',
        joinDate: '2018-11-15', lastLogin: '2026-02-14 10:20',
        loginCount: 430, status: 'locked'
    },
    {
        id: 8, empId: 'HR-002', name: 'Emma Watson',
        email: 'emma.watson@company.com', phone: '+91 9876543217',
        role: 'hr', department: 'Human Resources',
        joinDate: '2020-03-15', lastLogin: '2026-02-16 09:15',
        loginCount: 320, status: 'active'
    },
    {
        id: 9, empId: 'EMP-006', name: 'Emily Davis',
        email: 'emily.davis@company.com', phone: '+91 9876543218',
        role: 'employee', department: 'Engineering',
        joinDate: '2023-01-10', lastLogin: '2026-02-16 09:30',
        loginCount: 98, status: 'active'
    },
    {
        id: 10, empId: 'EMP-007', name: 'Robert Taylor',
        email: 'robert.taylor@company.com', phone: '+91 9876543219',
        role: 'employee', department: 'Operations',
        joinDate: '2019-07-22', lastLogin: '2026-02-13 16:00',
        loginCount: 265, status: 'active'
    }
];

let filteredUsers = [...usersData];
let currentPage = 1;
const itemsPerPage = 10;
let selectedUser = null;
let deleteTarget = null;

document.addEventListener('DOMContentLoaded', function() {
    renderUsersTable();
    updatePagination();
});

/* ---- RENDER TABLE ---- */
function renderUsersTable() {
    const tbody  = document.getElementById('usersTableBody');
    const empty  = document.getElementById('emptyState');

    if (filteredUsers.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'flex';
        return;
    }
    empty.style.display = 'none';

    const start = (currentPage - 1) * itemsPerPage;
    const page  = filteredUsers.slice(start, start + itemsPerPage);

    tbody.innerHTML = page.map(u => `
        <tr>
            <td><input type="checkbox" class="user-checkbox" value="${u.id}" onchange="updateSelection()"></td>
            <td>
                <div class="user-cell">
                    <div class="user-avatar-table ${u.role}">
                        ${u.name.charAt(0)}
                    </div>
                    <div class="user-name-table">
                        <h4>${u.name}</h4>
                        <p>${u.email}</p>
                    </div>
                </div>
            </td>
            <td><strong>${u.empId}</strong></td>
            <td><span class="role-badge ${u.role}">${roleLabel(u.role)}</span></td>
            <td>${u.department}</td>
            <td>${u.lastLogin}</td>
            <td><span class="status-badge ${u.status}">${capitalize(u.status)}</span></td>
            <td>
                <div class="table-action-btns">
                    <button class="action-btn-table view"   onclick="viewUser(${u.id})"   title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn-table edit"   onclick="editUser(${u.id})"   title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn-table ${u.status === 'active' ? 'warning' : 'success'}"
                            onclick="toggleStatus(${u.id})" 
                            title="${u.status === 'active' ? 'Deactivate' : 'Activate'}">
                        <i class="fas fa-${u.status === 'active' ? 'ban' : 'check'}"></i>
                    </button>
                    <button class="action-btn-table delete" onclick="deleteUser(${u.id})" title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

/* ---- FILTERS ---- */
function filterUsers() {
    const role   = document.getElementById('roleFilter').value;
    const status = document.getElementById('statusFilter').value;
    const search = document.getElementById('searchUsers').value.toLowerCase();

    filteredUsers = usersData.filter(u => {
        const matchRole   = role   === 'all' || u.role   === role;
        const matchStatus = status === 'all' || u.status === status;
        const matchSearch = !search ||
            u.name.toLowerCase().includes(search)   ||
            u.email.toLowerCase().includes(search)  ||
            u.empId.toLowerCase().includes(search);
        return matchRole && matchStatus && matchSearch;
    });

    currentPage = 1;
    renderUsersTable();
    updatePagination();
}

function resetFilters() {
    document.getElementById('roleFilter').value   = 'all';
    document.getElementById('statusFilter').value = 'all';
    document.getElementById('searchUsers').value  = '';
    filteredUsers = [...usersData];
    currentPage = 1;
    renderUsersTable();
    updatePagination();
}

/* ---- PAGINATION ---- */
function updatePagination() {
    const total  = filteredUsers.length;
    const pages  = Math.ceil(total / itemsPerPage);
    const start  = total > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
    const end    = Math.min(currentPage * itemsPerPage, total);

    document.getElementById('startEntry').textContent  = start;
    document.getElementById('endEntry').textContent    = end;
    document.getElementById('totalEntries').textContent = total;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === pages || pages === 0;

    // Page numbers
    const container = document.getElementById('paginationNumbers');
    const maxVis = 5;
    let s = Math.max(1, currentPage - Math.floor(maxVis / 2));
    let e = Math.min(pages, s + maxVis - 1);
    if (e - s + 1 < maxVis) s = Math.max(1, e - maxVis + 1);

    container.innerHTML = '';
    for (let i = s; i <= e; i++) {
        const btn = document.createElement('button');
        btn.className = `page-number ${i === currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.onclick = () => goToPage(i);
        container.appendChild(btn);
    }
}

function changePage(dir) {
    const pages = Math.ceil(filteredUsers.length / itemsPerPage);
    if (dir === 'prev' && currentPage > 1)      currentPage--;
    if (dir === 'next' && currentPage < pages)  currentPage++;
    renderUsersTable();
    updatePagination();
}

function goToPage(p) {
    currentPage = p;
    renderUsersTable();
    updatePagination();
}

/* ---- SELECTION ---- */
function toggleSelectAll() {
    const checked = document.getElementById('selectAllHeader').checked ||
                    document.getElementById('selectAll').checked;
    document.querySelectorAll('.user-checkbox').forEach(cb => cb.checked = checked);
    updateSelection();
}

function updateSelection() {
    const checked = document.querySelectorAll('.user-checkbox:checked');
    const bar = document.getElementById('bulkActionsBar');
    document.getElementById('selectedCount').textContent = checked.length;
    bar.style.display = checked.length > 0 ? 'flex' : 'none';
}

function clearSelection() {
    document.querySelectorAll('.user-checkbox').forEach(cb => cb.checked = false);
    ['selectAll', 'selectAllHeader'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = false;
    });
    updateSelection();
}

/* ---- BULK ACTIONS ---- */
function bulkAction(action) {
    const checked = document.querySelectorAll('.user-checkbox:checked');
    const ids = Array.from(checked).map(cb => parseInt(cb.value));

    if (action === 'delete') {
        if (!confirm(`Delete ${ids.length} selected users? This cannot be undone.`)) return;
        ids.forEach(id => {
            const idx = usersData.findIndex(u => u.id === id);
            if (idx !== -1) usersData.splice(idx, 1);
        });
        showAlert(`${ids.length} users deleted successfully`, 'success');
    } else {
        const newStatus = action === 'activate' ? 'active' : 'inactive';
        ids.forEach(id => {
            const u = usersData.find(u => u.id === id);
            if (u) u.status = newStatus;
        });
        showAlert(`${ids.length} users ${action}d`, 'success');
    }

    filteredUsers = [...usersData];
    clearSelection();
    renderUsersTable();
    updatePagination();
}

/* ---- VIEW USER ---- */
function viewUser(id) {
    selectedUser = usersData.find(u => u.id === id);
    if (!selectedUser) return;

    document.getElementById('modalUserName').textContent    = selectedUser.name;
    document.getElementById('modalUserStatus').textContent  = capitalize(selectedUser.status);
    document.getElementById('modalUserStatus').className    = `status-badge ${selectedUser.status}`;
    document.getElementById('modalEmpId').textContent       = selectedUser.empId;
    document.getElementById('modalEmail').textContent       = selectedUser.email;
    document.getElementById('modalRole').textContent        = roleLabel(selectedUser.role);
    document.getElementById('modalDepartment').textContent  = selectedUser.department;
    document.getElementById('modalPhone').textContent       = selectedUser.phone;
    document.getElementById('modalJoinDate').textContent    = formatDate(selectedUser.joinDate);
    document.getElementById('modalLastLogin').textContent   = selectedUser.lastLogin;
    document.getElementById('modalLoginCount').textContent  = selectedUser.loginCount + ' times';

    document.getElementById('userDetailsModal').classList.add('show');
}

function closeUserModal() {
    document.getElementById('userDetailsModal').classList.remove('show');
    selectedUser = null;
}

/* ---- EDIT USER ---- */
function editUser(id) {
    const uid = id || (selectedUser ? selectedUser.id : null);
    if (!uid) return;
    closeUserModal();
    window.location.href = `edit-user.html?id=${uid}`;
}

/* ---- TOGGLE STATUS ---- */
function toggleStatus(id) {
    const user = usersData.find(u => u.id === id);
    if (!user) return;

    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    if (!confirm(`${newStatus === 'active' ? 'Activate' : 'Deactivate'} ${user.name}?`)) return;

    user.status = newStatus;
    filteredUsers = [...usersData];
    renderUsersTable();
    showAlert(`${user.name} ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`, 'success');
}

/* ---- DELETE USER ---- */
function deleteUser(id) {
    deleteTarget = usersData.find(u => u.id === id);
    if (!deleteTarget) return;
    document.getElementById('deleteUserName').textContent = deleteTarget.name;
    document.getElementById('deleteModal').classList.add('show');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('show');
    deleteTarget = null;
}

function confirmDelete() {
    if (!deleteTarget) return;
    const idx = usersData.findIndex(u => u.id === deleteTarget.id);
    if (idx !== -1) usersData.splice(idx, 1);
    filteredUsers = [...usersData];
    closeDeleteModal();
    renderUsersTable();
    updatePagination();
    showAlert(`${deleteTarget.name} deleted successfully`, 'success');
}

/* ---- RESET PASSWORD ---- */
function resetUserPassword() {
    if (!selectedUser) return;
    document.getElementById('resetUserName').textContent = selectedUser.name;
    document.getElementById('resetPasswordModal').classList.add('show');
}

function closeResetModal() {
    document.getElementById('resetPasswordModal').classList.remove('show');
    document.getElementById('newPassword').value    = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('newPasswordError').textContent    = '';
    document.getElementById('confirmPasswordError').textContent = '';
}

function confirmResetPassword() {
    const pwd  = document.getElementById('newPassword').value;
    const cpwd = document.getElementById('confirmPassword').value;
    let valid  = true;

    document.getElementById('newPasswordError').textContent    = '';
    document.getElementById('confirmPasswordError').textContent = '';

    if (!pwd || pwd.length < 8) {
        document.getElementById('newPasswordError').textContent = 'Password must be at least 8 characters';
        valid = false;
    }
    if (pwd !== cpwd) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        valid = false;
    }
    if (!valid) return;

    closeResetModal();
    closeUserModal();
    showAlert(`Password reset successfully for ${selectedUser.name}`, 'success');
}

/* ---- EXPORT ---- */
function exportUsers() {
    alert('Exporting users to Excel...');
}

/* ---- UTILITIES ---- */
function roleLabel(role) {
    return { admin: 'Admin', hr: 'HR Manager', employee: 'Employee' }[role] || role;
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function showAlert(msg, type = 'success') {
    const box = document.getElementById('usersAlert');
    document.getElementById('alertMessage').textContent = msg;
    box.className = `alert alert-${type}`;
    box.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(closeAlert, 3000);
}

function closeAlert() {
    document.getElementById('usersAlert').style.display = 'none';
}

/* ---- GLOBAL EXPORTS ---- */
window.filterUsers        = filterUsers;
window.resetFilters       = resetFilters;
window.changePage         = changePage;
window.goToPage           = goToPage;
window.toggleSelectAll    = toggleSelectAll;
window.updateSelection    = updateSelection;
window.clearSelection     = clearSelection;
window.bulkAction         = bulkAction;
window.viewUser           = viewUser;
window.closeUserModal     = closeUserModal;
window.editUser           = editUser;
window.toggleStatus       = toggleStatus;
window.deleteUser         = deleteUser;
window.closeDeleteModal   = closeDeleteModal;
window.confirmDelete      = confirmDelete;
window.resetUserPassword  = resetUserPassword;
window.closeResetModal    = closeResetModal;
window.confirmResetPassword = confirmResetPassword;
window.exportUsers        = exportUsers;
window.closeAlert         = closeAlert;