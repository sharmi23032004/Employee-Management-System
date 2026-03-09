/* ================================
   LEAVE BALANCE PAGE FUNCTIONALITY
   ================================ */

// Leave balance data
const leaveBalanceData = {
    casual: {
        allocated: 12,
        used: 7,
        available: 5
    },
    sick: {
        allocated: 8,
        used: 4,
        available: 4
    },
    privilege: {
        allocated: 4,
        used: 1,
        available: 3
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCasualLeaveChart();
    initializeSickLeaveChart();
    initializePrivilegeLeaveChart();
    initializeLeaveUsageChart();
});

// Initialize Casual Leave Chart
function initializeCasualLeaveChart() {
    const ctx = document.getElementById('casualLeaveChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Available'],
            datasets: [{
                data: [leaveBalanceData.casual.used, leaveBalanceData.casual.available],
                backgroundColor: ['#4338CA', '#E0E7FF'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' days';
                        }
                    }
                }
            }
        }
    });
}

// Initialize Sick Leave Chart
function initializeSickLeaveChart() {
    const ctx = document.getElementById('sickLeaveChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Available'],
            datasets: [{
                data: [leaveBalanceData.sick.used, leaveBalanceData.sick.available],
                backgroundColor: ['#DC2626', '#FEE2E2'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' days';
                        }
                    }
                }
            }
        }
    });
}

// Initialize Privilege Leave Chart
function initializePrivilegeLeaveChart() {
    const ctx = document.getElementById('privilegeLeaveChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Used', 'Available'],
            datasets: [{
                data: [leaveBalanceData.privilege.used, leaveBalanceData.privilege.available],
                backgroundColor: ['#059669', '#D1FAE5'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + ' days';
                        }
                    }
                }
            }
        }
    });
}

// Initialize Leave Usage Chart
function initializeLeaveUsageChart() {
    const ctx = document.getElementById('leaveUsageChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [
                {
                    label: 'Casual Leave',
                    data: [1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
                    backgroundColor: '#4F46E5',
                    borderRadius: 6
                },
                {
                    label: 'Sick Leave',
                    data: [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
                    backgroundColor: '#EF4444',
                    borderRadius: 6
                },
                {
                    label: 'Privilege Leave',
                    data: [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
                    backgroundColor: '#10B981',
                    borderRadius: 6
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
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

// View leave history
function viewLeaveHistory(leaveType) {
    console.log('Viewing leave history for:', leaveType);
    // Redirect to my-leaves page with filter
    window.location.href = `my-leaves.html?type=${leaveType}`;
}

// Export leave balance
function exportLeaveBalance() {
    alert('Exporting leave balance report...');
    console.log('Exporting leave balance report');
    
    // In production, generate and download report
}

// Make functions globally available
window.viewLeaveHistory = viewLeaveHistory;
window.exportLeaveBalance = exportLeaveBalance;