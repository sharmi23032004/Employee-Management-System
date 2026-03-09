/* ================================
   AUDIT LOGS FUNCTIONALITY
   ================================ */

/* ---------- SAMPLE DATA ---------- */
const auditData = [
    { id:'LOG-001', timestamp:'2026-02-17 09:05:12', user:'Admin User',
      email:'admin@company.com', role:'admin', action:'login',
      module:'auth', desc:'Successful login from Chrome on Windows',
      ip:'192.168.1.101', browser:'Chrome 121 / Windows 11', severity:'info',
      meta:{ session:'sess_abc123', location:'Chennai, IN' } },

    { id:'LOG-002', timestamp:'2026-02-17 09:08:44', user:'Sarah Johnson',
      email:'sarah.johnson@company.com', role:'hr', action:'create',
      module:'employee', desc:'Added new employee: Alex Turner (EMP-251)',
      ip:'192.168.1.45', browser:'Firefox 122 / macOS', severity:'info',
      meta:{ record_id:'EMP-251', department:'Engineering' } },

    { id:'LOG-003', timestamp:'2026-02-17 09:12:30', user:'John Doe',
      email:'john.doe@company.com', role:'employee', action:'update',
      module:'employee', desc:'Updated personal profile information',
      ip:'192.168.1.88', browser:'Safari 17 / macOS', severity:'info',
      meta:{ fields_changed:['phone','address'], record_id:'EMP-001' } },

    { id:'LOG-004', timestamp:'2026-02-17 09:15:05', user:'Unknown',
      email:'hacker@external.com', role:'-', action:'failed_login',
      module:'auth', desc:'Failed login attempt — invalid credentials',
      ip:'203.0.113.42', browser:'Chrome 121 / Linux', severity:'critical',
      meta:{ attempts:3, blocked:false } },

    { id:'LOG-005', timestamp:'2026-02-17 09:22:18', user:'Sarah Johnson',
      email:'sarah.johnson@company.com', role:'hr', action:'update',
      module:'attendance', desc:'Attendance updated for EMP-003 on 2026-02-16',
      ip:'192.168.1.45', browser:'Firefox 122 / macOS', severity:'info',
      meta:{ record_id:'EMP-003', date:'2026-02-16', change:'absent → present' } },

    { id:'LOG-006', timestamp:'2026-02-17 09:35:00', user:'Admin User',
      email:'admin@company.com', role:'admin', action:'update',
      module:'settings', desc:'Updated general settings: timezone changed',
      ip:'192.168.1.101', browser:'Chrome 121 / Windows 11', severity:'warning',
      meta:{ setting:'timezone', old:'UTC', new:'Asia/Kolkata' } },

    { id:'LOG-007', timestamp:'2026-02-17 09:40:22', user:'Sarah Johnson',
      email:'sarah.johnson@company.com', role:'hr', action:'export',
      module:'employee', desc:'Exported employee directory to Excel',
      ip:'192.168.1.45', browser:'Firefox 122 / macOS', severity:'info',
      meta:{ format:'xlsx', records:248 } },

    { id:'LOG-008', timestamp:'2026-02-17 09:50:11', user:'Admin User',
      email:'admin@company.com', role:'admin', action:'delete',
      module:'employee', desc:'Deleted user account: temp.user@company.com',
      ip:'192.168.1.101', browser:'Chrome 121 / Windows 11', severity:'warning',
      meta:{ deleted_user:'temp.user@company.com', reason:'Duplicate account' } },

    { id:'LOG-009', timestamp:'2026-02-17 10:02:45', user:'Jane Smith',
      email:'jane.smith@company.com', role:'employee', action:'login',
      module:'auth', desc:'Successful login from mobile browser',
      ip:'10.0.0.55', browser:'Safari iOS 17 / iPhone', severity:'info',
      meta:{ session:'sess_xyz789', device:'mobile' } },

    { id:'LOG-010', timestamp:'2026-02-17 10:10:30', user:'Sarah Johnson',
      email:'sarah.johnson@company.com', role:'hr', action:'create',
      module:'leave', desc:'Approved leave request LR-001 for John Doe',
      ip:'192.168.1.45', browser:'Firefox 122 / macOS', severity:'info',
      meta:{ leave_id:'LR-001', employee:'John Doe', days:3 } },

    { id:'LOG-011', timestamp:'2026-02-17 10:20:00', user:'Admin User',
      email:'admin@company.com', role:'admin', action:'update',
      module:'settings', desc:'Email SMTP settings updated',
      ip:'192.168.1.101', browser:'Chrome 121 / Windows 11', severity:'warning',
      meta:{ changed:'smtp_host, smtp_port' } },

    { id:'LOG-012', timestamp:'2026-02-17 10:25:15', user:'Unknown',
      email:'bot@spam.net', role:'-', action:'failed_login',
      module:'auth', desc:'Brute force attempt detected — IP blocked',
      ip:'198.51.100.99', browser:'Python-requests/2.28', severity:'critical',
      meta:{ attempts:10, blocked:true, block_duration:'24h' } },

    { id:'LOG-013', timestamp:'2026-02-17 10:35:40', user:'Sarah Johnson',
      email:'sarah.johnson@company.com', role:'hr', action:'create',
      module:'payroll', desc:'Salary processing initiated for February 2026',
      ip:'192.168.1.45', browser:'Firefox 122 / macOS', severity:'info',
      meta:{ month:'Feb 2026', employees:248, total:'₹1.11 Cr' } },

    { id:'LOG-014', timestamp:'2026-02-17 10:50:00', user:'System',
      email:'system@ems.internal', role:'system', action:'create',
      module:'system', desc:'Automatic database backup completed successfully',
      ip:'127.0.0.1', browser:'System Process', severity:'info',
      meta:{ backup_file:'backup_20260217.sql', size:'2.3 GB' } },

    { id:'LOG-015', timestamp:'2026-02-17 11:00:22', user:'Mike Wilson',
      email:'mike.wilson@company.com', role:'employee', action:'logout',
      module:'auth', desc:'User session ended',
      ip:'192.168.1.77', browser:'Edge 121 / Windows 10', severity:'info',
      meta:{ session_duration:'1h 45m' } }
];

let filteredLogs  = [...auditData];
let currentPage   = 1;
const perPage     = 10;
let selectedLog   = null;
let chartInstance = null;

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    // Set default date range (today)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
    document.getElementById('endDate').value   = today;

    renderTable();
    renderTopUsers();
    initChart(7);
});

/* ---------- TABLE ---------- */
function renderTable() {
    const tbody = document.getElementById('logsTableBody');
    const empty = document.getElementById('logsEmptyState');

    document.getElementById('logCount').textContent = filteredLogs.length;

    if (filteredLogs.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'flex';
        updatePagination();
        return;
    }
    empty.style.display = 'none';

    const start = (currentPage - 1) * perPage;
    const page  = filteredLogs.slice(start, start + perPage);

    tbody.innerHTML = page.map((log, idx) => `
        <tr class="${log.severity === 'critical' ? 'row-critical' : ''}">
            <td style="color:var(--gray-500);font-size:.75rem;">${start + idx + 1}</td>
            <td>
                <div style="font-size:.8rem;font-weight:600;color:var(--gray-900);">
                    ${log.timestamp.split(' ')[1]}
                </div>
                <div style="font-size:.7rem;color:var(--gray-500);">
                    ${formatShortDate(log.timestamp.split(' ')[0])}
                </div>
            </td>
            <td>
                <div style="font-size:.8rem;font-weight:600;color:var(--gray-900);">
                    ${log.user}
                </div>
                <div style="font-size:.7rem;color:var(--gray-500);">${log.email}</div>
            </td>
            <td><span class="action-badge ${log.action}">${actionLabel(log.action)}</span></td>
            <td><span class="module-badge">${capitalize(log.module)}</span></td>
            <td>
                <span class="log-desc" title="${log.desc}">${log.desc}</span>
            </td>
            <td style="font-size:.8rem;color:var(--gray-700);font-family:monospace;">
                ${log.ip}
            </td>
            <td><span class="severity-badge ${log.severity}">${capitalize(log.severity)}</span></td>
            <td>
                <button class="action-btn-table view" onclick="viewLog('${log.id}')"
                        title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        </tr>
    `).join('');

    updatePagination();
}

/* ---------- FILTERS ---------- */
function applyFilters() {
    const action   = document.getElementById('actionFilter').value;
    const module   = document.getElementById('moduleFilter').value;
    const severity = document.getElementById('severityFilter').value;
    const user     = document.getElementById('userFilter').value.toLowerCase();
    const start    = document.getElementById('startDate').value;
    const end      = document.getElementById('endDate').value;

    filteredLogs = auditData.filter(log => {
        const matchAction   = action   === 'all' || log.action   === action;
        const matchModule   = module   === 'all' || log.module   === module;
        const matchSeverity = severity === 'all' || log.severity === severity;
        const matchUser     = !user    ||
            log.user.toLowerCase().includes(user)  ||
            log.email.toLowerCase().includes(user);
        const logDate = log.timestamp.split(' ')[0];
        const matchDate = (!start || logDate >= start) && (!end || logDate <= end);
        return matchAction && matchModule && matchSeverity && matchUser && matchDate;
    });

    currentPage = 1;
    renderTable();
}

function resetFilters() {
    document.getElementById('actionFilter').value   = 'all';
    document.getElementById('moduleFilter').value   = 'all';
    document.getElementById('severityFilter').value = 'all';
    document.getElementById('userFilter').value     = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').value = today;
    document.getElementById('endDate').value   = today;

    filteredLogs = [...auditData];
    currentPage  = 1;
    renderTable();
}

/* ---------- PAGINATION ---------- */
function updatePagination() {
    const total  = filteredLogs.length;
    const pages  = Math.ceil(total / perPage) || 1;
    const s      = total > 0 ? (currentPage - 1) * perPage + 1 : 0;
    const e      = Math.min(currentPage * perPage, total);

    document.getElementById('startEntry').textContent  = s;
    document.getElementById('endEntry').textContent    = e;
    document.getElementById('totalEntries').textContent = total;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === pages;

    const container = document.getElementById('paginationNumbers');
    const maxVis = 5;
    let ps = Math.max(1, currentPage - 2);
    let pe = Math.min(pages, ps + maxVis - 1);
    if (pe - ps + 1 < maxVis) ps = Math.max(1, pe - maxVis + 1);

    container.innerHTML = '';
    for (let i = ps; i <= pe; i++) {
        const b = document.createElement('button');
        b.className  = `page-number ${i === currentPage ? 'active' : ''}`;
        b.textContent = i;
        b.onclick     = () => goToPage(i);
        container.appendChild(b);
    }
}

function changePage(dir) {
    const pages = Math.ceil(filteredLogs.length / perPage);
    if (dir === 'prev' && currentPage > 1)     currentPage--;
    if (dir === 'next' && currentPage < pages) currentPage++;
    renderTable();
}

function goToPage(p) {
    currentPage = p;
    renderTable();
}

/* ---------- VIEW LOG DETAIL ---------- */
function viewLog(id) {
    selectedLog = auditData.find(l => l.id === id);
    if (!selectedLog) return;

    document.getElementById('ldId').textContent        = selectedLog.id;
    document.getElementById('ldTimestamp').textContent = selectedLog.timestamp;
    document.getElementById('ldUser').textContent      =
        `${selectedLog.user} (${selectedLog.email})`;
    document.getElementById('ldRole').textContent      = capitalize(selectedLog.role);
    document.getElementById('ldAction').innerHTML      =
        `<span class="action-badge ${selectedLog.action}">${actionLabel(selectedLog.action)}</span>`;
    document.getElementById('ldModule').textContent    = capitalize(selectedLog.module);
    document.getElementById('ldIP').textContent        = selectedLog.ip;
    document.getElementById('ldBrowser').textContent   = selectedLog.browser;
    document.getElementById('ldDesc').textContent      = selectedLog.desc;
    document.getElementById('ldMeta').textContent      =
        JSON.stringify(selectedLog.meta, null, 2);

    document.getElementById('logDetailModal').classList.add('show');
}

function closeLogModal() {
    document.getElementById('logDetailModal').classList.remove('show');
    selectedLog = null;
}

/* ---------- TOP USERS ---------- */
function renderTopUsers() {
    const counts = {};
    auditData.forEach(log => {
        if (log.user !== 'System' && log.user !== 'Unknown') {
            counts[log.user] = (counts[log.user] || 0) + 1;
        }
    });

    const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const rankClasses = ['gold', 'silver', 'bronze', '', ''];

    document.getElementById('topUsersList').innerHTML = sorted.map(([name, count], i) => `
        <div class="top-user-item">
            <div class="top-user-rank ${rankClasses[i]}">${i + 1}</div>
            <div class="top-user-avatar">${name.charAt(0)}</div>
            <div class="top-user-info">
                <div class="top-user-name">${name}</div>
                <div class="top-user-role">
                    ${auditData.find(l => l.user === name)?.role || ''}
                </div>
            </div>
            <div class="top-user-count">${count} actions</div>
        </div>
    `).join('');
}

/* ---------- CHART ---------- */
function initChart(days) {
    const ctx = document.getElementById('activityChart');
    if (!ctx) return;
    if (chartInstance) chartInstance.destroy();

    // Generate last N days labels
    const labels = [];
    const logins  = [];
    const changes = [];
    const alerts  = [];

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        labels.push(d.toLocaleDateString('en-US', { month:'short', day:'numeric' }));
        // Randomised demo data (in production: query by date)
        logins.push(Math.floor(Math.random() * 60) + 20);
        changes.push(Math.floor(Math.random() * 40) + 10);
        alerts.push(Math.floor(Math.random() * 5));
    }

    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Logins',
                    data: logins,
                    backgroundColor: '#10B981',
                    borderRadius: 6,
                    stack: 'a'
                },
                {
                    label: 'Data Changes',
                    data: changes,
                    backgroundColor: '#4F46E5',
                    borderRadius: 6,
                    stack: 'a'
                },
                {
                    label: 'Alerts',
                    data: alerts,
                    backgroundColor: '#EF4444',
                    borderRadius: 6,
                    stack: 'a'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
}

function updateChart() {
    const days = parseInt(document.getElementById('chartRange').value);
    initChart(days);
}

/* ---------- EXPORT ---------- */
function exportLogs() {
    alert(`Exporting ${filteredLogs.length} log records to Excel...`);
}

/* ---------- HELPERS ---------- */
function actionLabel(action) {
    const map = {
        login:'Login', logout:'Logout', create:'Create',
        update:'Update', delete:'Delete', export:'Export',
        failed_login:'Failed Login'
    };
    return map[action] || action;
}

function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '-';
}

function formatShortDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US',
        { month: 'short', day: 'numeric' });
}

/* ---------- GLOBAL ---------- */
window.applyFilters  = applyFilters;
window.resetFilters  = resetFilters;
window.changePage    = changePage;
window.goToPage      = goToPage;
window.viewLog       = viewLog;
window.closeLogModal = closeLogModal;
window.updateChart   = updateChart;
window.exportLogs    = exportLogs;