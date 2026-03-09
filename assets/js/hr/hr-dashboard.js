/* ================================
   HR DASHBOARD FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Update current date
    updateCurrentDate();
    
    // Initialize charts
    initializeAttendancePieChart();
    initializeDepartmentChart();
});

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Initialize Attendance Pie Chart
function initializeAttendancePieChart() {
    const ctx = document.getElementById('attendancePieChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Present', 'Absent', 'On Leave', 'Late'],
            datasets: [{
                data: [234, 8, 4, 12],
                backgroundColor: ['#10B981', '#EF4444', '#F59E0B', '#8B5CF6'],
                borderWidth: 0
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
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return label + ': ' + value + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });
}

// Initialize Department Chart
function initializeDepartmentChart() {
    const ctx = document.getElementById('departmentChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'],
            datasets: [{
                label: 'Number of Employees',
                data: [85, 45, 32, 15, 28, 43],
                backgroundColor: [
                    '#4F46E5',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6',
                    '#06B6D4'
                ],
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
                        stepSize: 10
                    }
                }
            }
        }
    });
}

// Approve leave
function approveLeave(id) {
    if (confirm('Are you sure you want to approve this leave request?')) {
        console.log('Approving leave:', id);
        alert('Leave request approved successfully!');
        // In production, make API call to approve leave
    }
}

// Reject leave
function rejectLeave(id) {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason && reason.trim() !== '') {
        console.log('Rejecting leave:', id, 'Reason:', reason);
        alert('Leave request rejected.');
        // In production, make API call to reject leave
    }
}

// View leave details
function viewLeaveDetails(id) {
    console.log('Viewing leave details:', id);
    // In production, open modal or navigate to details page
    window.location.href = 'leave-requests.html?id=' + id;
}

// Make functions globally available
window.approveLeave = approveLeave;
window.rejectLeave = rejectLeave;
window.viewLeaveDetails = viewLeaveDetails;