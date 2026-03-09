/* ================================
   EMPLOYEE DASHBOARD FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initializeDashboard();
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize charts
    initializeCharts();
});

// Initialize dashboard
function initializeDashboard() {
    console.log('Employee Dashboard Initialized');
}

// Load dashboard data
function loadDashboardData() {
    // In production, fetch from API
    // For demo, we'll use static data
    
    const dashboardData = {
        attendance: {
            percentage: 92,
            trend: 3
        },
        leaves: {
            balance: 12,
            total: 24,
            pending: 2
        },
        salary: {
            last: 45000,
            currency: 'INR'
        }
    };
    
    // Update stats
    updateStats(dashboardData);
}

// Update stats
function updateStats(data) {
    // Attendance
    const attendancePercentage = document.getElementById('attendancePercentage');
    if (attendancePercentage) {
        attendancePercentage.textContent = data.attendance.percentage + '%';
    }
    
    // Leave Balance
    const leaveBalance = document.getElementById('leaveBalance');
    if (leaveBalance) {
        leaveBalance.textContent = data.leaves.balance;
    }
    
    // Pending Leaves
    const pendingLeaves = document.getElementById('pendingLeaves');
    if (pendingLeaves) {
        pendingLeaves.textContent = data.leaves.pending;
    }
    
    // Last Salary
    const lastSalary = document.getElementById('lastSalary');
    if (lastSalary) {
        lastSalary.textContent = '₹' + data.salary.last.toLocaleString('en-IN');
    }
}

// Initialize charts
function initializeCharts() {
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendanceChart');
    if (attendanceCtx) {
        new Chart(attendanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Attendance %',
                    data: [88, 90, 87, 92, 89, 93, 91, 94, 90, 92, 95, 92],
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    tension: 0.4,
                    fill: true
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
                        max: 100
                    }
                }
            }
        });
    }
    
    // Leave Balance Chart
    const leaveBalanceCtx = document.getElementById('leaveBalanceChart');
    if (leaveBalanceCtx) {
        new Chart(leaveBalanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Casual Leave', 'Sick Leave', 'Privilege Leave'],
                datasets: [{
                    data: [5, 4, 3],
                    backgroundColor: ['#4F46E5', '#EF4444', '#10B981'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }
}

// Download payslip
function downloadPayslip(month) {
    alert('Downloading payslip for ' + month);
    console.log('Downloading payslip:', month);
    
    // In production, trigger download from API
    /*
    fetch(CONFIG.API_BASE_URL + '/payroll/download/' + month, {
        headers: {
            'Authorization': 'Bearer ' + Utils.getLocalStorage(CONFIG.STORAGE_KEYS.TOKEN)
        }
    })
    .then(response => response.blob())
    .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payslip-' + month + '.pdf';
        a.click();
    });
    */
}

// Make functions globally available
window.downloadPayslip = downloadPayslip;