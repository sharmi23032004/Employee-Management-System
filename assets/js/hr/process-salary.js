/* ================================
   PROCESS SALARY FUNCTIONALITY
   ================================ */

// Sample employee salary data
const employeeSalaries = [
    {
        id: 'EMP-001',
        name: 'John Doe',
        department: 'engineering',
        departmentName: 'Engineering',
        daysWorked: 22,
        totalDays: 22,
        basic: 30000,
        hra: 15000,
        special: 10000,
        pf: 3600,
        pt: 200,
        tax: 6200,
        leaveDeduction: 0,
        calculated: false
    },
    {
        id: 'EMP-002',
        name: 'Jane Smith',
        department: 'marketing',
        departmentName: 'Marketing',
        daysWorked: 21,
        totalDays: 22,
        basic: 35000,
        hra: 17500,
        special: 12500,
        pf: 4200,
        pt: 200,
        tax: 7500,
        leaveDeduction: 2954.55,
        calculated: false
    },
    {
        id: 'EMP-003',
        name: 'Mike Wilson',
        department: 'sales',
        departmentName: 'Sales',
        daysWorked: 22,
        totalDays: 22,
        basic: 28000,
        hra: 14000,
        special: 8000,
        pf: 3360,
        pt: 200,
        tax: 5500,
        leaveDeduction: 0,
        calculated: false
    },
    {
        id: 'EMP-004',
        name: 'Sarah Brown',
        department: 'hr',
        departmentName: 'Human Resources',
        daysWorked: 22,
        totalDays: 22,
        basic: 32000,
        hra: 16000,
        special: 12000,
        pf: 3840,
        pt: 200,
        tax: 6800,
        leaveDeduction: 0,
        calculated: false
    },
    {
        id: 'EMP-005',
        name: 'David Lee',
        department: 'finance',
        departmentName: 'Finance',
        daysWorked: 20,
        totalDays: 22,
        basic: 40000,
        hra: 20000,
        special: 15000,
        pf: 4800,
        pt: 200,
        tax: 9000,
        leaveDeduction: 6818.18,
        calculated: false
    }
];

let filteredSalaries = [...employeeSalaries];
let currentMonth = new Date();
let selectedEmployee = null;

document.addEventListener('DOMContentLoaded', function() {
    updateMonthDisplay();
    renderSalaryTable();
    updateSummary();
    initializeCharts();
});

// Update month display
function updateMonthDisplay() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('displayMonth').textContent = 
        `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;
}

// Change month
function changeMonth(direction) {
    currentMonth.setMonth(currentMonth.getMonth() + direction);
    updateMonthDisplay();
    // In production, load salary data for new month
}

// Render salary table
function renderSalaryTable() {
    const tbody = document.getElementById('salaryTableBody');
    
    tbody.innerHTML = filteredSalaries.map(emp => {
        const gross = emp.basic + emp.hra + emp.special;
        const deductions = emp.pf + emp.pt + emp.tax + emp.leaveDeduction;
        const net = gross - deductions;
        
        return `
            <tr>
                <td>
                    <input type="checkbox" 
                           class="salary-checkbox" 
                           value="${emp.id}"
                           onchange="updateSalarySelection()">
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
                <td>${emp.daysWorked}/${emp.totalDays}</td>
                <td>₹${gross.toLocaleString('en-IN')}</td>
                <td>₹${deductions.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td><strong>₹${net.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</strong></td>
                <td>
                    <span class="calculated-status ${emp.calculated ? 'calculated' : 'pending'}">
                        ${emp.calculated ? 'Calculated' : 'Pending'}
                    </span>
                </td>
                <td>
                    <div class="table-action-btns">
                        <button class="action-btn-table view" onclick="viewSalaryBreakdown('${emp.id}')" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn-table edit" onclick="calculateSalary('${emp.id}')" title="Calculate">
                            <i class="fas fa-calculator"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
    
    updateSummary();
}

// Filter salaries
function filterSalaries() {
    const deptFilter = document.getElementById('deptFilterSalary').value;
    const searchInput = document.getElementById('searchSalary').value.toLowerCase();
    
    filteredSalaries = employeeSalaries.filter(emp => {
        const matchDept = deptFilter === 'all' || emp.department === deptFilter;
        const matchSearch = searchInput === '' || 
            emp.name.toLowerCase().includes(searchInput) ||
            emp.id.toLowerCase().includes(searchInput);
        
        return matchDept && matchSearch;
    });
    
    renderSalaryTable();
}

// Reset salary filters
function resetSalaryFilters() {
    document.getElementById('deptFilterSalary').value = 'all';
    document.getElementById('searchSalary').value = '';
    filteredSalaries = [...employeeSalaries];
    renderSalaryTable();
}

// Toggle select all
function toggleSelectAllSalary() {
    const selectAll = document.getElementById('selectAllSalary') || document.getElementById('selectAllHeader');
    const checkboxes = document.querySelectorAll('.salary-checkbox');
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
    });
    
    updateSalarySelection();
}

// Update salary selection
function updateSalarySelection() {
    const checkboxes = document.querySelectorAll('.salary-checkbox:checked');
    const count = checkboxes.length;
    
    const bulkBar = document.getElementById('bulkActionsSalary');
    const selectedCountSpan = document.getElementById('selectedSalaryCount');
    
    if (count > 0) {
        bulkBar.style.display = 'flex';
        selectedCountSpan.textContent = count;
    } else {
        bulkBar.style.display = 'none';
    }
}

// Clear salary selection
function clearSalarySelection() {
    document.querySelectorAll('.salary-checkbox').forEach(cb => cb.checked = false);
    if (document.getElementById('selectAllSalary')) {
        document.getElementById('selectAllSalary').checked = false;
    }
    if (document.getElementById('selectAllHeader')) {
        document.getElementById('selectAllHeader').checked = false;
    }
    updateSalarySelection();
}

// Calculate salary
function calculateSalary(empId) {
    const emp = employeeSalaries.find(e => e.id === empId);
    if (!emp) return;
    
    emp.calculated = true;
    renderSalaryTable();
    showAlert(`Salary calculated for ${emp.name}`, 'success');
}

// Calculate all salaries
function calculateAll() {
    if (!confirm('Calculate salary for all employees?')) return;
    
    employeeSalaries.forEach(emp => {
        emp.calculated = true;
    });
    
    renderSalaryTable();
    showAlert('All salaries calculated successfully', 'success');
}

// Bulk calculate salary
function bulkCalculateSalary() {
    const checkboxes = document.querySelectorAll('.salary-checkbox:checked');
    
    if (checkboxes.length === 0) {
        alert('Please select employees first');
        return;
    }
    
    checkboxes.forEach(checkbox => {
        const emp = employeeSalaries.find(e => e.id === checkbox.value);
        if (emp) {
            emp.calculated = true;
        }
    });
    
    renderSalaryTable();
    clearSalarySelection();
    showAlert(`Salary calculated for ${checkboxes.length} employees`, 'success');
}

// View salary breakdown
function viewSalaryBreakdown(empId) {
    selectedEmployee = employeeSalaries.find(e => e.id === empId);
    if (!selectedEmployee) return;
    
    const gross = selectedEmployee.basic + selectedEmployee.hra + selectedEmployee.special;
    const totalDeductions = selectedEmployee.pf + selectedEmployee.pt + selectedEmployee.tax + selectedEmployee.leaveDeduction;
    const net = gross - totalDeductions;
    
    document.getElementById('modalEmpName').textContent = selectedEmployee.name;
    document.getElementById('modalEmpId').textContent = selectedEmployee.id;
    document.getElementById('modalDept').textContent = selectedEmployee.departmentName;
    document.getElementById('modalDays').textContent = `${selectedEmployee.daysWorked}/${selectedEmployee.totalDays}`;
    
    document.getElementById('modalBasic').textContent = '₹' + selectedEmployee.basic.toLocaleString('en-IN');
    document.getElementById('modalHRA').textContent = '₹' + selectedEmployee.hra.toLocaleString('en-IN');
    document.getElementById('modalSpecial').textContent = '₹' + selectedEmployee.special.toLocaleString('en-IN');
    document.getElementById('modalTotalEarnings').textContent = '₹' + gross.toLocaleString('en-IN');
    
    document.getElementById('modalPF').textContent = '₹' + selectedEmployee.pf.toLocaleString('en-IN');
    document.getElementById('modalPT').textContent = '₹' + selectedEmployee.pt.toLocaleString('en-IN');
    document.getElementById('modalTax').textContent = '₹' + selectedEmployee.tax.toLocaleString('en-IN');
    document.getElementById('modalLeave').textContent = '₹' + selectedEmployee.leaveDeduction.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    document.getElementById('modalTotalDeductions').textContent = '₹' + totalDeductions.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('modalNetSalary').textContent = '₹' + net.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    
    document.getElementById('salaryDetailsModal').classList.add('show');
}

// Close salary modal
function closeSalaryModal() {
    document.getElementById('salaryDetailsModal').classList.remove('show');
    selectedEmployee = null;
}

// Calculate salary for employee (from modal)
function calculateSalaryForEmployee() {
    if (!selectedEmployee) return;
    
    selectedEmployee.calculated = true;
    closeSalaryModal();
    renderSalaryTable();
    showAlert(`Salary recalculated for ${selectedEmployee.name}`, 'success');
}

// Update summary
function updateSummary() {
    let totalGross = 0;
    let totalDeductions = 0;
    
    employeeSalaries.forEach(emp => {
        const gross = emp.basic + emp.hra + emp.special;
        const deductions = emp.pf + emp.pt + emp.tax + emp.leaveDeduction;
        
        totalGross += gross;
        totalDeductions += deductions;
    });
    
    const totalNet = totalGross - totalDeductions;
    
    document.getElementById('totalEmployees').textContent = employeeSalaries.length;
    document.getElementById('totalGross').textContent = '₹' + totalGross.toLocaleString('en-IN');
    document.getElementById('totalDeductions').textContent = '₹' + totalDeductions.toLocaleString('en-IN', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    document.getElementById('totalNet').textContent = '₹' + totalNet.toLocaleString('en-IN', {minimumFractionDigits: 0, maximumFractionDigits: 0});
}

// Save draft
function saveDraft() {
    console.log('Saving salary draft...');
    showAlert('Salary data saved as draft', 'success');
}

// Process salaries
function processSalaries() {
    const notCalculated = employeeSalaries.filter(emp => !emp.calculated).length;
    
    if (notCalculated > 0) {
        if (!confirm(`${notCalculated} employees have not been calculated. Do you want to continue?`)) {
            return;
        }
    }
    
    if (!confirm('Process salaries and generate payslips for all employees? This action cannot be undone.')) {
        return;
    }
    
    console.log('Processing salaries...');
    
    // In production, make API call to process salaries
    setTimeout(() => {
        showAlert('Salaries processed successfully! Payslips are being generated.', 'success');
        setTimeout(() => {
            window.location.href = 'salary-slips.html';
        }, 2000);
    }, 1500);
}

// Initialize charts
function initializeCharts() {
    initializeDepartmentPayrollChart();
    initializeSalaryDistributionChart();
}

// Initialize department payroll chart
function initializeDepartmentPayrollChart() {
    const ctx = document.getElementById('departmentPayrollChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
            datasets: [{
                data: [4680000, 2250000, 1950000, 960000, 2250000, 1290000],
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
                            return context.label + ': ₹' + context.parsed.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
}

// Initialize salary distribution chart
function initializeSalaryDistributionChart() {
    const ctx = document.getElementById('salaryDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['< 30K', '30K-40K', '40K-50K', '50K-60K', '> 60K'],
            datasets: [{
                label: 'Number of Employees',
                data: [45, 82, 68, 38, 15],
                backgroundColor: '#4F46E5',
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 20
                    }
                }
            }
        }
    });
}

// Utility functions
function showAlert(message, type = 'success') {
    const alertBox = document.getElementById('salaryAlert');
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
    const alertBox = document.getElementById('salaryAlert');
    if (alertBox) {
        alertBox.style.display = 'none';
    }
}

// Make functions globally available
window.changeMonth = changeMonth;
window.filterSalaries = filterSalaries;
window.resetSalaryFilters = resetSalaryFilters;
window.toggleSelectAllSalary = toggleSelectAllSalary;
window.updateSalarySelection = updateSalarySelection;
window.clearSalarySelection = clearSalarySelection;
window.calculateSalary = calculateSalary;
window.calculateAll = calculateAll;
window.bulkCalculateSalary = bulkCalculateSalary;
window.viewSalaryBreakdown = viewSalaryBreakdown;
window.closeSalaryModal = closeSalaryModal;
window.calculateSalaryForEmployee = calculateSalaryForEmployee;
window.saveDraft = saveDraft;
window.processSalaries = processSalaries;
window.closeAlert = closeAlert;