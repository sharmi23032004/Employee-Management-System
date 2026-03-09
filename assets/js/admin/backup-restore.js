/* ================================
   BACKUP & RESTORE FUNCTIONALITY
   ================================ */

/* ---------- BACKUP HISTORY DATA ---------- */
let backupHistory = [
    { id:1, file:'backup_full_20260217_020000.sql.gz',
      type:'full', size:'2.31 GB', createdBy:'System (Auto)',
      datetime:'2026-02-17 02:00:00', status:'success' },
    { id:2, file:'backup_incremental_20260216_140000.sql.gz',
      type:'incremental', size:'145 MB', createdBy:'System (Auto)',
      datetime:'2026-02-16 14:00:00', status:'success' },
    { id:3, file:'backup_full_20260216_020000.sql.gz',
      type:'full', size:'2.28 GB', createdBy:'System (Auto)',
      datetime:'2026-02-16 02:00:00', status:'success' },
    { id:4, file:'backup_db_20260215_manual.sql.gz',
      type:'db', size:'1.12 GB', createdBy:'Admin User',
      datetime:'2026-02-15 11:30:00', status:'success' },
    { id:5, file:'backup_full_20260215_020000.sql.gz',
      type:'full', size:'2.25 GB', createdBy:'System (Auto)',
      datetime:'2026-02-15 02:00:00', status:'success' },
    { id:6, file:'backup_incremental_20260214_140000.sql.gz',
      type:'incremental', size:'98 MB', createdBy:'System (Auto)',
      datetime:'2026-02-14 14:00:00', status:'failed' },
    { id:7, file:'backup_full_20260214_020000.sql.gz',
      type:'full', size:'2.24 GB', createdBy:'System (Auto)',
      datetime:'2026-02-14 02:00:00', status:'success' },
    { id:8, file:'backup_full_20260213_020000.sql.gz',
      type:'full', size:'2.22 GB', createdBy:'System (Auto)',
      datetime:'2026-02-13 02:00:00', status:'success' }
];

let filteredHistory = [...backupHistory];
let selectedBackupType = 'full';
let restoreFile = null;
let deleteTarget = null;
let isBackingUp  = false;

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    renderBackupHistory();
    initStorageChart();

    // Restore checklist: enable button when all checked
    document.querySelectorAll('.restore-checklist input').forEach(cb => {
        cb.addEventListener('change', checkRestoreReady);
    });
});

/* ---------- STORAGE CHART ---------- */
function initStorageChart() {
    const ctx = document.getElementById('storageChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [45, 55],
                backgroundColor: ['#4F46E5', '#E5E7EB'],
                borderWidth: 0,
                cutout: '75%'
            }]
        },
        options: {
            responsive: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
    });
}

/* ---------- BACKUP HISTORY ---------- */
function renderBackupHistory() {
    const tbody = document.getElementById('backupHistoryBody');

    tbody.innerHTML = filteredHistory.map((b, i) => `
        <tr>
            <td>${i + 1}</td>
            <td>
                <div style="display:flex;align-items:center;gap:.625rem;">
                    <i class="fas fa-file-archive"
                       style="color:var(--primary-color);font-size:1.25rem;"></i>
                    <span style="font-size:.8rem;font-weight:600;color:var(--gray-900);
                                 word-break:break-all;">${b.file}</span>
                </div>
            </td>
            <td><span class="backup-type-badge ${b.type}">${typeLabel(b.type)}</span></td>
            <td><span class="file-size">${b.size}</span></td>
            <td style="font-size:.85rem;color:var(--gray-700);">${b.createdBy}</td>
            <td>
                <div style="font-size:.8rem;font-weight:600;color:var(--gray-900);">
                    ${b.datetime.split(' ')[0]}
                </div>
                <div style="font-size:.7rem;color:var(--gray-500);">
                    ${b.datetime.split(' ')[1]}
                </div>
            </td>
            <td>
                <span class="backup-status-badge ${b.status}">
                    ${capitalize(b.status)}
                </span>
            </td>
            <td>
                <div class="table-action-btns">
                    <button class="action-btn-table view"
                            onclick="downloadBackup(${b.id})"
                            title="Download">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn-table success"
                            onclick="restoreFromHistory(${b.id})"
                            title="Restore"
                            ${b.status !== 'success' ? 'disabled' : ''}>
                        <i class="fas fa-undo-alt"></i>
                    </button>
                    <button class="action-btn-table delete"
                            onclick="deleteBackup(${b.id})"
                            title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function filterHistory() {
    const type = document.getElementById('historyFilter').value;
    filteredHistory = type === 'all'
        ? [...backupHistory]
        : backupHistory.filter(b => b.type === type);
    renderBackupHistory();
}

/* ---------- SCHEDULE ---------- */
function toggleSchedule() {
    const enabled = document.getElementById('scheduleToggle').checked;
    document.getElementById('scheduleBody').style.opacity = enabled ? '1' : '0.4';
    document.getElementById('scheduleBody').style.pointerEvents = enabled ? 'auto' : 'none';
    showAlert(
        enabled ? 'Auto backup schedule enabled' : 'Auto backup schedule disabled',
        enabled ? 'success' : 'warning'
    );
}

function saveSchedule() {
    const freq      = document.getElementById('backupFreq').value;
    const time      = document.getElementById('backupTime').value;
    const type      = document.getElementById('backupType').value;
    const retention = document.getElementById('retention').value;

    console.log('Saving schedule:', { freq, time, type, retention });

    showAlert('Backup schedule saved successfully!', 'success');
}

/* ---------- MANUAL BACKUP ---------- */
function selectBackupOpt(type) {
    selectedBackupType = type;
    ['full','incremental','db'].forEach(t => {
        document.getElementById(`opt-${t}`)
                .classList.toggle('active', t === type);
    });
}

function startManualBackup() {
    if (isBackingUp) return;
    isBackingUp = true;

    const btn = document.getElementById('startBackupBtn');
    btn.disabled  = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Backing up...';

    const progress = document.getElementById('backupProgress');
    const fill     = document.getElementById('progressFill');
    const pct      = document.getElementById('progressPct');
    const label    = document.getElementById('progressLabel');
    const sub      = document.getElementById('progressSub');

    progress.style.display = 'block';

    const steps = [
        { pct: 10, label: 'Connecting to database...', sub: 'Establishing connection' },
        { pct: 25, label: 'Exporting tables...',        sub: 'Employees, Attendance, Leave...' },
        { pct: 50, label: 'Exporting payroll data...',  sub: 'Salary, Payslips...' },
        { pct: 75, label: 'Compressing files...',        sub: 'Creating .gz archive' },
        { pct: 90, label: 'Uploading to storage...',     sub: 'Saving backup file' },
        { pct:100, label: 'Backup complete!',             sub: 'File saved successfully' }
    ];

    let stepIdx = 0;

    const interval = setInterval(() => {
        if (stepIdx >= steps.length) {
            clearInterval(interval);

            // Add to history
            const now = new Date();
            const pad = n => String(n).padStart(2,'0');
            const dt  = `${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ` +
                        `${pad(now.getHours())}:${pad(now.getMinutes())}:00`;
            const fname = `backup_${selectedBackupType}_` +
                          `${dt.replace(/[-: ]/g,'').slice(0,14)}_manual.sql.gz`;

            const sizes = { full:'2.31 GB', incremental:'152 MB', db:'1.14 GB' };

            backupHistory.unshift({
                id: Date.now(), file: fname,
                type: selectedBackupType, size: sizes[selectedBackupType],
                createdBy: 'Admin User', datetime: dt, status: 'success'
            });
            filteredHistory = [...backupHistory];
            renderBackupHistory();

            btn.disabled  = false;
            btn.innerHTML = '<i class="fas fa-play"></i> Start Backup Now';
            isBackingUp   = false;

            setTimeout(() => { progress.style.display = 'none'; }, 2000);
            showAlert('Manual backup completed successfully!', 'success');
            return;
        }

        const s = steps[stepIdx++];
        fill.style.width = s.pct + '%';
        pct.textContent  = s.pct + '%';
        label.textContent = s.label;
        sub.textContent   = s.sub;
    }, 700);
}

/* ---------- RESTORE FROM FILE ---------- */
function handleDragOver(e) {
    e.preventDefault();
    document.getElementById('restoreDropZone').classList.add('drag-over');
}

function handleDragLeave(e) {
    document.getElementById('restoreDropZone').classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    handleDragLeave(e);
    const files = e.dataTransfer.files;
    if (files.length > 0) processRestoreFile(files[0]);
}

function handleRestoreFile(e) {
    if (e.target.files.length > 0) processRestoreFile(e.target.files[0]);
}

function processRestoreFile(file) {
    const allowed = ['.sql', '.zip', '.gz'];
    const ext     = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowed.includes(ext)) {
        showAlert('Invalid file type. Use .sql, .zip or .gz', 'error');
        return;
    }

    restoreFile = file;
    const zone  = document.getElementById('restoreDropZone');
    zone.classList.add('restore-file-selected');
    zone.innerHTML = `
        <i class="fas fa-check-circle" style="color:var(--success);"></i>
        <h4 style="color:var(--success);">${file.name}</h4>
        <p>${(file.size / (1024*1024)).toFixed(1)} MB selected</p>
        <button class="btn btn-secondary btn-sm"
                onclick="clearRestoreFile(event)">
            <i class="fas fa-times"></i> Remove
        </button>
    `;
    checkRestoreReady();
}

function clearRestoreFile(e) {
    e.stopPropagation();
    restoreFile = null;
    const zone  = document.getElementById('restoreDropZone');
    zone.classList.remove('restore-file-selected');
    zone.innerHTML = `
        <i class="fas fa-cloud-upload-alt"></i>
        <h4>Drag & Drop Backup File</h4>
        <p>or</p>
        <button class="btn btn-secondary"
                onclick="document.getElementById('restoreFile').click()">
            <i class="fas fa-folder-open"></i> Browse File
        </button>
        <input type="file" id="restoreFile" accept=".sql,.zip,.gz"
               style="display:none;" onchange="handleRestoreFile(event)">
        <p class="upload-hint">Supported: .sql, .zip, .gz (max 5 GB)</p>
    `;
    checkRestoreReady();
}

function checkRestoreReady() {
    const chks = document.querySelectorAll('.restore-checklist input:checked');
    const allChecked = chks.length === 3;
    const hasFile    = restoreFile !== null;
    document.getElementById('restoreBtn').disabled = !(allChecked && hasFile);
}

function startRestore() {
    if (!restoreFile) return;
    document.getElementById('restoreFileName').textContent = restoreFile.name;
    document.getElementById('restoreConfirmInput').value  = '';
    document.getElementById('confirmRestoreBtn').disabled = true;
    document.getElementById('restoreConfirmModal').classList.add('show');
}

function closeRestoreModal() {
    document.getElementById('restoreConfirmModal').classList.remove('show');
}

function checkRestoreConfirm() {
    const val = document.getElementById('restoreConfirmInput').value;
    document.getElementById('confirmRestoreBtn').disabled = val !== 'RESTORE';
}

function confirmRestore() {
    closeRestoreModal();
    showAlert('System restore initiated. This may take several minutes...', 'warning');
    // In production: POST to restore API endpoint
}

/* ---------- RESTORE FROM HISTORY ---------- */
function restoreFromHistory(id) {
    const backup = backupHistory.find(b => b.id === id);
    if (!backup) return;

    restoreFile = { name: backup.file };
    document.getElementById('restoreFileName').textContent = backup.file;
    document.getElementById('restoreConfirmInput').value   = '';
    document.getElementById('confirmRestoreBtn').disabled  = true;
    document.getElementById('restoreConfirmModal').classList.add('show');
}

/* ---------- DOWNLOAD / DELETE ---------- */
function downloadBackup(id) {
    const backup = backupHistory.find(b => b.id === id);
    if (!backup) return;
    showAlert(`Downloading ${backup.file}...`, 'success');
}

function deleteBackup(id) {
    deleteTarget = backupHistory.find(b => b.id === id);
    if (!deleteTarget) return;
    document.getElementById('deleteFileName').textContent = deleteTarget.file;
    document.getElementById('deleteBackupModal').classList.add('show');
}

function closeDeleteModal() {
    document.getElementById('deleteBackupModal').classList.remove('show');
    deleteTarget = null;
}

function confirmDeleteBackup() {
    if (!deleteTarget) return;
    backupHistory = backupHistory.filter(b => b.id !== deleteTarget.id);
    filteredHistory = [...backupHistory];
    renderBackupHistory();
    closeDeleteModal();
    showAlert(`Backup file deleted successfully`, 'success');
}

/* ---------- HELPERS ---------- */
function typeLabel(type) {
    return { full:'Full', incremental:'Incremental', db:'Database' }[type] || type;
}

function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '-';
}

function showAlert(msg, type = 'success') {
    const box  = document.getElementById('backupAlert');
    const icon = type === 'success' ? 'fa-check-circle'
               : type === 'warning' ? 'fa-exclamation-triangle'
               : 'fa-exclamation-circle';

    box.className = `alert alert-${type}`;
    box.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${msg}</span>
        <button class="alert-close" onclick="closeAlert()">
            <i class="fas fa-times"></i>
        </button>
    `;
    box.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (type === 'success') setTimeout(closeAlert, 3500);
}

function closeAlert() {
    const box = document.getElementById('backupAlert');
    if (box) box.style.display = 'none';
}

/* ---------- GLOBAL ---------- */
window.toggleSchedule     = toggleSchedule;
window.saveSchedule       = saveSchedule;
window.selectBackupOpt    = selectBackupOpt;
window.startManualBackup  = startManualBackup;
window.handleDragOver     = handleDragOver;
window.handleDragLeave    = handleDragLeave;
window.handleDrop         = handleDrop;
window.handleRestoreFile  = handleRestoreFile;
window.clearRestoreFile   = clearRestoreFile;
window.startRestore       = startRestore;
window.closeRestoreModal  = closeRestoreModal;
window.checkRestoreConfirm = checkRestoreConfirm;
window.confirmRestore     = confirmRestore;
window.restoreFromHistory = restoreFromHistory;
window.filterHistory      = filterHistory;
window.downloadBackup     = downloadBackup;
window.deleteBackup       = deleteBackup;
window.closeDeleteModal   = closeDeleteModal;
window.confirmDeleteBackup = confirmDeleteBackup;
window.closeAlert         = closeAlert;



