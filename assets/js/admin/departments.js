/* ================================
   DEPARTMENTS FUNCTIONALITY
   ================================ */

let departments = [
    {
        id: 1, name: 'Engineering', code: 'ENG',
        head: 'Robert Smith', employees: 85,
        budget: 25000000, color: '#4F46E5',
        description: 'Responsible for all product development, software engineering and technical infrastructure.',
        status: 'active', createdOn: '2017-01-01'
    },
    {
        id: 2, name: 'Sales', code: 'SAL',
        head: 'Lisa Anderson', employees: 45,
        budget: 12000000, color: '#10B981',
        description: 'Drives revenue through client acquisition, account management and business development.',
        status: 'active', createdOn: '2017-01-01'
    },
    {
        id: 3, name: 'Marketing', code: 'MKT',
        head: 'Michael Brown', employees: 32,
        budget: 8000000, color: '#F59E0B',
        description: 'Manages brand identity, campaigns, digital marketing and public relations.',
        status: 'active', createdOn: '2017-06-01'
    },
    {
        id: 4, name: 'Human Resources', code: 'HR',
        head: 'Sarah Johnson', employees: 15,
        budget: 5000000, color: '#EF4444',
        description: 'Handles recruitment, employee relations, payroll, compliance and talent development.',
        status: 'active', createdOn: '2017-01-01'
    },
    {
        id: 5, name: 'Finance', code: 'FIN',
        head: 'James Williams', employees: 28,
        budget: 6000000, color: '#8B5CF6',
        description: 'Manages accounts, financial reporting, budgeting, audit and tax compliance.',
        status: 'active', createdOn: '2017-01-01'
    },
    {
        id: 6, name: 'Operations', code: 'OPS',
        head: 'Kevin Davis', employees: 43,
        budget: 9000000, color: '#06B6D4',
        description: 'Oversees day-to-day business operations, logistics, vendor management and facilities.',
        status: 'active', createdOn: '2018-03-01'
    }
];

let filteredDepts = [...departments];
let editingId     = null;
let deleteId      = null;
let viewingId     = null;

document.addEventListener('DOMContentLoaded', function () {
    renderDeptCards();
    renderDeptTable();
    updateStats();
    initChart();
});

/* ---- RENDER CARDS ---- */
function renderDeptCards() {
    const grid   = document.getElementById('deptCardsGrid');
    const empty  = document.getElementById('deptEmptyState');

    if (filteredDepts.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'flex';
        return;
    }
    empty.style.display = 'none';

    grid.innerHTML = filteredDepts.map(d => `
        <div class="dept-card" style="border-top-color:${d.color}">
            <div class="dept-card-header">
                <div class="dept-card-icon" style="background:${d.color}">
                    <i class="fas fa-${deptIcon(d.code)}"></i>
                </div>
                <div class="dept-card-menu">
                    <button class="dept-card-menu-btn" onclick="toggleCardMenu(${d.id}, event)">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div class="dept-card-dropdown" id="cardMenu-${d.id}">
                        <a href="#" onclick="viewDept(${d.id}); return false;">
                            <i class="fas fa-eye"></i> View Details
                        </a>
                        <a href="#" onclick="openEditDeptModal(${d.id}); return false;">
                            <i class="fas fa-edit"></i> Edit
                        </a>
                        <a href="#" class="danger" onclick="deleteDept(${d.id}); return false;">
                            <i class="fas fa-trash"></i> Delete
                        </a>
                    </div>
                </div>
            </div>
            <div class="dept-card-name">${d.name}</div>
            <div class="dept-card-code">${d.code}</div>
            <div class="dept-card-head">
                <i class="fas fa-user-tie"></i> ${d.head || 'Not Assigned'}
            </div>
            <div class="dept-card-stats">
                <div class="dept-card-stat">
                    <span class="dept-card-stat-value">${d.employees}</span>
                    <span class="dept-card-stat-label">Employees</span>
                </div>
                <div class="dept-card-stat">
                    <span class="dept-card-stat-value">₹${(d.budget / 1000000).toFixed(1)}M</span>
                    <span class="dept-card-stat-label">Budget</span>
                </div>
                <div class="dept-card-stat">
                    <span class="dept-card-stat-value">
                        <span class="status-badge ${d.status}">${capitalize(d.status)}</span>
                    </span>
                    <span class="dept-card-stat-label">Status</span>
                </div>
            </div>
        </div>
    `).join('');
}

/* ---- RENDER TABLE ---- */
function renderDeptTable() {
    const tbody = document.getElementById('deptTableBody');
    tbody.innerHTML = filteredDepts.map((d, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>
                <div style="display:flex;align-items:center;gap:.75rem;">
                    <div style="width:36px;height:36px;border-radius:8px;background:${d.color};
                                display:flex;align-items:center;justify-content:center;
                                color:white;font-size:1rem;">
                        <i class="fas fa-${deptIcon(d.code)}"></i>
                    </div>
                    <div>
                        <div style="font-weight:600;color:var(--gray-900);">${d.name}</div>
                        <div style="font-size:.75rem;color:var(--gray-500);">${d.description.substring(0,50)}...</div>
                    </div>
                </div>
            </td>
            <td><strong>${d.code}</strong></td>
            <td>${d.head || '-'}</td>
            <td>
                <span style="font-weight:700;color:var(--gray-900);">${d.employees}</span>
            </td>
            <td>₹${(d.budget / 1000000).toFixed(1)}M</td>
            <td><span class="status-badge ${d.status}">${capitalize(d.status)}</span></td>
            <td>
                <div class="table-action-btns">
                    <button class="action-btn-table view"   onclick="viewDept(${d.id})"           title="View"><i class="fas fa-eye"></i></button>
                    <button class="action-btn-table edit"   onclick="openEditDeptModal(${d.id})"  title="Edit"><i class="fas fa-edit"></i></button>
                    <button class="action-btn-table delete" onclick="deleteDept(${d.id})"         title="Delete"><i class="fas fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join('');
}

/* ---- FILTER ---- */
function filterDepts() {
    const search = document.getElementById('searchDept').value.toLowerCase();
    const status = document.getElementById('statusDeptFilter').value;

    filteredDepts = departments.filter(d => {
        const matchSearch = !search ||
            d.name.toLowerCase().includes(search) ||
            d.code.toLowerCase().includes(search) ||
            (d.head && d.head.toLowerCase().includes(search));
        const matchStatus = status === 'all' || d.status === status;
        return matchSearch && matchStatus;
    });

    renderDeptCards();
    renderDeptTable();
}

/* ---- STATS ---- */
function updateStats() {
    const total    = departments.length;
    const totalEmp = departments.reduce((s, d) => s + d.employees, 0);
    const active   = departments.filter(d => d.status === 'active').length;
    const largest  = departments.reduce((a, b) => a.employees > b.employees ? a : b);

    document.getElementById('totalDepts').textContent    = total;
    document.getElementById('totalEmpsDept').textContent = totalEmp;
    document.getElementById('activeDepts').textContent   = active;
    document.getElementById('largestDept').textContent   = largest.name;
}

/* ---- CHART ---- */
let chartInstance = null;

function initChart() {
    const ctx = document.getElementById('deptDistributionChart');
    if (!ctx) return;

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: departments.map(d => d.name),
            datasets: [{
                data: departments.map(d => d.employees),
                backgroundColor: departments.map(d => d.color),
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: ctx =>
                            ` ${ctx.label}: ${ctx.parsed} employees`
                    }
                }
            }
        }
    });
}

/* ---- ADD MODAL ---- */
function openAddDeptModal() {
    editingId = null;
    document.getElementById('deptModalTitle').innerHTML =
        '<i class="fas fa-plus"></i> Add Department';
    document.getElementById('saveDeptBtn').innerHTML =
        '<i class="fas fa-save"></i> Save Department';
    document.getElementById('deptForm').reset();
    document.getElementById('deptColor').value = '#4F46E5';
    clearDeptErrors();
    document.getElementById('deptModal').classList.add('show');
}

/* ---- EDIT MODAL ---- */
function openEditDeptModal(id) {
    closeCardMenus();
    const dept = departments.find(d => d.id === id);
    if (!dept) return;

    editingId = id;
    document.getElementById('deptModalTitle').innerHTML =
        '<i class="fas fa-edit"></i> Edit Department';
    document.getElementById('saveDeptBtn').innerHTML =
        '<i class="fas fa-save"></i> Update Department';

    document.getElementById('deptName').value        = dept.name;
    document.getElementById('deptCode').value        = dept.code;
    document.getElementById('deptHead').value        = dept.head;
    document.getElementById('deptBudget').value      = dept.budget;
    document.getElementById('deptDescription').value = dept.description;
    document.getElementById('deptStatus').value      = dept.status;
    document.getElementById('deptColor').value       = dept.color;

    clearDeptErrors();
    document.getElementById('deptModal').classList.add('show');
}

function closeDeptModal() {
    document.getElementById('deptModal').classList.remove('show');
    editingId = null;
}

/* ---- SAVE DEPARTMENT ---- */
function saveDepartment() {
    const name   = document.getElementById('deptName').value.trim();
    const code   = document.getElementById('deptCode').value.trim().toUpperCase();
    const head   = document.getElementById('deptHead').value;
    const budget = parseFloat(document.getElementById('deptBudget').value) || 0;
    const desc   = document.getElementById('deptDescription').value.trim();
    const status = document.getElementById('deptStatus').value;
    const color  = document.getElementById('deptColor').value;

    clearDeptErrors();
    let valid = true;

    if (!name) {
        document.getElementById('deptNameError').textContent = 'Department name is required';
        valid = false;
    }
    if (!code) {
        document.getElementById('deptCodeError').textContent = 'Department code is required';
        valid = false;
    } else if (!/^[A-Z]{2,5}$/.test(code)) {
        document.getElementById('deptCodeError').textContent = 'Code must be 2-5 uppercase letters';
        valid = false;
    }
    if (!valid) return;

    if (editingId) {
        /* Update */
        const idx = departments.findIndex(d => d.id === editingId);
        if (idx !== -1) {
            departments[idx] = { ...departments[idx], name, code, head, budget, description: desc, status, color };
        }
        showAlert(`"${name}" updated successfully`, 'success');
    } else {
        /* Add */
        const newDept = {
            id: Date.now(), name, code, head,
            employees: 0, budget,
            description: desc, status, color,
            createdOn: new Date().toISOString().split('T')[0]
        };
        departments.push(newDept);
        showAlert(`"${name}" department added successfully`, 'success');
    }

    filteredDepts = [...departments];
    closeDeptModal();
    renderDeptCards();
    renderDeptTable();
    updateStats();
    initChart();
}

/* ---- VIEW DEPARTMENT ---- */
function viewDept(id) {
    closeCardMenus();
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    viewingId = id;

    document.getElementById('viewDeptIcon').style.background = dept.color;
    document.getElementById('viewDeptName').textContent      = dept.name;
    document.getElementById('viewDeptCode').textContent      = dept.code;
    document.getElementById('viewDeptStatus').textContent    = capitalize(dept.status);
    document.getElementById('viewDeptStatus').className      = `status-badge ${dept.status}`;
    document.getElementById('viewDeptHead').textContent      = dept.head || '-';
    document.getElementById('viewDeptEmployees').textContent = dept.employees + ' employees';
    document.getElementById('viewDeptBudget').textContent    =
        '₹' + dept.budget.toLocaleString('en-IN');
    document.getElementById('viewDeptCreated').textContent   = formatDate(dept.createdOn);
    document.getElementById('viewDeptDesc').textContent      = dept.description;

    document.getElementById('viewDeptModal').classList.add('show');
}

function closeViewDeptModal() {
    document.getElementById('viewDeptModal').classList.remove('show');
    viewingId = null;
}

function editFromView() {
    closeViewDeptModal();
    if (viewingId) openEditDeptModal(viewingId);
}

/* ---- DELETE ---- */
function deleteDept(id) {
    closeCardMenus();
    const dept = departments.find(d => d.id === id);
    if (!dept) return;
    deleteId = id;
    document.getElementById('deleteDeptName').textContent = dept.name;
    document.getElementById('deleteDeptModal').classList.add('show');
}

function closeDeleteDeptModal() {
    document.getElementById('deleteDeptModal').classList.remove('show');
    deleteId = null;
}

function confirmDeleteDept() {
    if (!deleteId) return;
    const dept = departments.find(d => d.id === deleteId);
    const idx  = departments.findIndex(d => d.id === deleteId);
    if (idx !== -1) departments.splice(idx, 1);
    filteredDepts = [...departments];
    closeDeleteDeptModal();
    renderDeptCards();
    renderDeptTable();
    updateStats();
    initChart();
    showAlert(`"${dept.name}" deleted successfully`, 'success');
}

/* ---- CARD MENU ---- */
function toggleCardMenu(id, e) {
    e.stopPropagation();
    const menu = document.getElementById(`cardMenu-${id}`);
    const isOpen = menu.classList.contains('show');
    closeCardMenus();
    if (!isOpen) menu.classList.add('show');
}

function closeCardMenus() {
    document.querySelectorAll('.dept-card-dropdown').forEach(m => m.classList.remove('show'));
}

document.addEventListener('click', closeCardMenus);

/* ---- HELPERS ---- */
function deptIcon(code) {
    const icons = {
        ENG: 'code', SAL: 'chart-line', MKT: 'bullhorn',
        HR:  'user-friends', FIN: 'coins', OPS: 'cogs'
    };
    return icons[code] || 'building';
}

function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(d) {
    return new Date(d).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
}

function clearDeptErrors() {
    ['deptNameError', 'deptCodeError'].forEach(id => {
        document.getElementById(id).textContent = '';
    });
}

function exportDepts() {
    alert('Exporting departments to Excel...');
}

function showAlert(msg, type = 'success') {
    const box = document.getElementById('deptAlert');
    document.getElementById('alertMessage').textContent = msg;
    box.className = `alert alert-${type}`;
    box.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(closeAlert, 3000);
}

function closeAlert() {
    document.getElementById('deptAlert').style.display = 'none';
}

/* ---- GLOBAL ---- */
window.filterDepts          = filterDepts;
window.openAddDeptModal     = openAddDeptModal;
window.openEditDeptModal    = openEditDeptModal;
window.closeDeptModal       = closeDeptModal;
window.saveDepartment       = saveDepartment;
window.viewDept             = viewDept;
window.closeViewDeptModal   = closeViewDeptModal;
window.editFromView         = editFromView;
window.deleteDept           = deleteDept;
window.closeDeleteDeptModal = closeDeleteDeptModal;
window.confirmDeleteDept    = confirmDeleteDept;
window.toggleCardMenu       = toggleCardMenu;
window.exportDepts          = exportDepts;
window.closeAlert           = closeAlert;