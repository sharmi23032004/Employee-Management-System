/* ================================
   MY PAYSLIPS PAGE FUNCTIONALITY
   ================================ */

// Sample payslip data
const payslipsData = [
    { month: 'January 2026', year: 2026, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2026-02-01' },
    { month: 'December 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2026-01-01' },
    { month: 'November 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-12-01' },
    { month: 'October 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-11-01' },
    { month: 'September 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-10-01' },
    { month: 'August 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-09-01' },
    { month: 'July 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-08-01' },
    { month: 'June 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-07-01' },
    { month: 'May 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-06-01' },
    { month: 'April 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-05-01' },
    { month: 'March 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-04-01' },
    { month: 'February 2025', year: 2025, amount: 45000, gross: 55000, deductions: 10000, status: 'Paid', date: '2025-03-01' },
];

let filteredPayslips = [...payslipsData];
let currentPayslip = null;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    renderPayslipsList();
    initializeEarningsChart();
});

// Render payslips list
function renderPayslipsList() {
    const container = document.getElementById('payslipsList');
    
    if (filteredPayslips.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <h3>No Payslips Found</h3>
                <p>No payslips available for the selected period.</p>
            </div>
        `;
        return;
    }
    
    const html = filteredPayslips.map((payslip, index) => `
        <div class="payslip-card" onclick="viewPayslip(${index})">
            <div class="payslip-info">
                <div class="payslip-icon">
                    <i class="fas fa-file-invoice-dollar"></i>
                </div>
                <div class="payslip-details">
                    <h4>${payslip.month}</h4>
                    <p>Processed on ${formatDate(payslip.date)}</p>
                </div>
            </div>
            <div class="payslip-amount">
                <span class="amount">₹${formatCurrency(payslip.amount)}</span>
                <span class="status">${payslip.status}</span>
            </div>
            <div class="payslip-actions">
                <button class="payslip-action-btn" onclick="viewPayslip(${index}); event.stopPropagation();" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="payslip-action-btn" onclick="downloadPayslip('${payslip.month}'); event.stopPropagation();" title="Download">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = html;
}

// View latest payslip
function viewLatestPayslip() {
    if (filteredPayslips.length > 0) {
        viewPayslip(0);
    }
}

// View payslip
function viewPayslip(index) {
    currentPayslip = filteredPayslips[index];
    
    if (!currentPayslip) return;
    
    // Update modal content
    document.getElementById('modalPayPeriod').textContent = `For the month of ${currentPayslip.month}`;
    document.getElementById('generatedDate').textContent = formatDate(new Date());
    
    // Show modal
    document.getElementById('payslipDetailsModal').classList.add('show');
}

// Close payslip modal
function closePayslipModal() {
    document.getElementById('payslipDetailsModal').classList.remove('show');
    currentPayslip = null;
}

// Download current payslip
function downloadCurrentPayslip() {
    if (currentPayslip) {
        downloadPayslip(currentPayslip.month);
    }
}

// Download payslip
function downloadPayslip(month) {
    alert(`Downloading payslip for ${month}`);
    console.log('Downloading payslip:', month);
    
    // In production, generate and download PDF
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
        a.download = `payslip-${month.replace(' ', '-')}.pdf`;
        a.click();
    });
    */
}

// Download Form 16
function downloadForm16() {
    alert('Form 16 download functionality will be implemented here');
    console.log('Downloading Form 16...');
}

// Filter payslips
function filterPayslips() {
    const yearFilter = parseInt(document.getElementById('yearFilter').value);
    
    filteredPayslips = payslipsData.filter(payslip => payslip.year === yearFilter);
    
    renderPayslipsList();
}

// Reset filters
function resetPayslipFilters() {
    document.getElementById('yearFilter').value = '2026';
    filterPayslips();
}

// Initialize earnings chart
function initializeEarningsChart() {
    const ctx = document.getElementById('earningsChart');
    
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
            datasets: [{
                label: 'Net Pay',
                data: [45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000, 45000],
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }, {
                label: 'Gross Salary',
                data: [55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000, 55000],
                borderColor: '#F59E0B',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.4,
                fill: true
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
                            return context.dataset.label + ': ₹' + context.parsed.y.toLocaleString('en-IN');
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 40000,
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

// Utility Functions

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function formatCurrency(amount) {
    return amount.toLocaleString('en-IN');
}

// Make functions globally available
window.viewLatestPayslip = viewLatestPayslip;
window.viewPayslip = viewPayslip;
window.closePayslipModal = closePayslipModal;
window.downloadCurrentPayslip = downloadCurrentPayslip;
window.downloadPayslip = downloadPayslip;
window.downloadForm16 = downloadForm16;
window.filterPayslips = filterPayslips;
window.resetPayslipFilters = resetPayslipFilters;