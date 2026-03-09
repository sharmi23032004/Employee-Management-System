/* ================================
   REPORTS & ANALYTICS FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();
    
    // Form handling
    const customReportForm = document.getElementById('customReportForm');
    if (customReportForm) {
        customReportForm.addEventListener('submit', handleCustomReportSubmit);
    }
    
    // Period selector
    const periodSelector = document.getElementById('reportPeriod');
    if (periodSelector) {
        periodSelector.addEventListener('change', handlePeriodChange);
    }
});

// Generate quick report
function generateReport(type) {
    console.log('Generating report:', type);
    
    // Show loading
    const reportName = type.charAt(0).toUpperCase() + type.slice(1) + ' Report';
    
    // Simulate report generation
    setTimeout(() => {
        alert(`${reportName} generated successfully!\n\nDownloading...`);
        console.log(`Download ${type} report`);
    }, 500);
}

// Handle custom report submit
function handleCustomReportSubmit(e) {
    e.preventDefault();
    
    const reportType = document.getElementById('reportType').value;
    const reportFormat = document.getElementById('reportFormat').value;
    const department = document.getElementById('reportDepartment').value;
    const period = document.getElementById('reportPeriod').value;
    
    if (!reportType) {
        alert('Please select a report type');
        return;
    }
    
    console.log('Generating custom report:', {
        type: reportType,
        format: reportFormat,
        department: department,
        period: period
    });
    
    // Simulate report generation
    setTimeout(() => {
        alert(`Custom ${reportType} report generated successfully!\n\nFormat: ${reportFormat.toUpperCase()}\nDepartment: ${department}\nPeriod: ${period}\n\nDownloading...`);
    }, 1000);
}

// Handle period change
function handlePeriodChange(e) {
    const customDateRange = document.getElementById('customDateRange');
    if (e.target.value === 'custom') {
        customDateRange.style.display = 'flex';
    } else {
        customDateRange.style.display = 'none';
    }
}

// Download report
function downloadReport(reportId) {
    console.log('Downloading report:', reportId);
    alert(`Downloading ${reportId}...`);
}

// Initialize all charts
function initializeCharts() {
    initializeHeadcountTrendChart();
    initializeDepartmentDistributionChart();
    initializeAttendanceLeaveChart();
    initializePayrollTrendChart();
}

// Headcount Trend Chart
function initializeHeadcountTrendChart() {
    const ctx = document.getElementById('headcountTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sep 2025', 'Oct 2025', 'Nov 2025', 'Dec 2025', 'Jan 2026', 'Feb 2026'],
            datasets: [{
                label: 'Total Employees',
                data: [235, 238, 240, 243, 245, 248],
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
                    beginAtZero: false,
                    min: 230,
                    max: 250
                }
            }
        }
    });
}

// Department Distribution Chart
function initializeDepartmentDistributionChart() {
    const ctx = document.getElementById('departmentDistributionChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
            datasets: [{
                data: [85, 45, 32, 15, 28, 43],
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
                }
            }
        }
    });
}

// Attendance vs Leave Chart
function initializeAttendanceLeaveChart() {
    const ctx = document.getElementById('attendanceLeaveChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Attendance %',
                    data: [94, 95, 93, 96, 94, 95],
                    backgroundColor: '#10B981',
                    borderRadius: 8
                },
                {
                    label: 'Leave %',
                    data: [4, 3, 5, 2, 4, 3],
                    backgroundColor: '#F59E0B',
                    borderRadius: 8
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

// Payroll Trend Chart
function initializePayrollTrendChart() {
    const ctx = document.getElementById('payrollTrendChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'],
            datasets: [{
                label: 'Monthly Payroll (₹ Cr)',
                data: [1.05, 1.06, 1.07, 1.08, 1.09, 1.11],
                borderColor: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
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
                    beginAtZero: false,
                    min: 1.0,
                    max: 1.15,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toFixed(2) + ' Cr';
                        }
                    }
                }
            }
        }
    });
}

// Make functions globally available
window.generateReport = generateReport;
window.downloadReport = downloadReport;


