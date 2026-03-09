/* ================================
   SALARY DETAILS PAGE FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeSalaryDistributionChart();
    initializeDeductionsChart();
});

// Initialize Salary Distribution Chart
function initializeSalaryDistributionChart() {
    const ctx = document.getElementById('salaryDistributionChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Basic Salary', 'HRA', 'Special Allowance'],
            datasets: [{
                data: [30000, 15000, 10000],
                backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = '₹' + context.parsed.toLocaleString('en-IN');
                            const percentage = ((context.parsed / 55000) * 100).toFixed(1) + '%';
                            return label + ': ' + value + ' (' + percentage + ')';
                        }
                    }
                }
            }
        }
    });
}

// Initialize Deductions Chart
function initializeDeductionsChart() {
    const ctx = document.getElementById('deductionsChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Provident Fund', 'Professional Tax', 'Income Tax (TDS)'],
            datasets: [{
                label: 'Monthly Deduction (₹)',
                data: [3600, 200, 6200],
                backgroundColor: ['#EF4444', '#F59E0B', '#DC2626'],
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Amount: ₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString('en-IN');
                        }
                    }
                }
            }
        }
    });
}