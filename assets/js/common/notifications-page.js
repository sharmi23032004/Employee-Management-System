/* ================================
   NOTIFICATIONS PAGE FUNCTIONALITY
   ================================ */

/* ---------- SAMPLE DATA ---------- */
const notificationsData = [
    { id:1, title:'Leave Request Approved', message:'Your casual leave request for Feb 20-21 has been approved by Sarah Johnson.',
      type:'leave', category:'success', read:false, time:'5 minutes ago', datetime:'2026-02-17 14:05' },
    { id:2, title:'Payslip Generated', message:'Your salary slip for January 2026 is now available for download.',
      type:'payroll', category:'info', read:false, time:'1 hour ago', datetime:'2026-02-17 13:10' },
    { id:3, title:'Attendance Marked Late', message:'You were marked late today. Check-in time: 09:25 AM (Grace period: 15 min).',
      type:'attendance', category:'warning', read:false, time:'2 hours ago', datetime:'2026-02-17 12:00' },
    { id:4, title:'System Maintenance Notice', message:'Scheduled maintenance on Feb 19, 2026 from 12:00 AM to 4:00 AM. System will be unavailable.',
      type:'system', category:'warning', read:false, time:'3 hours ago', datetime:'2026-02-17 11:15' },
    { id:5, title:'Happy Birthday! 🎉', message:'Team EMS wishes you a very happy birthday! Have a wonderful day ahead.',
      type:'system', category:'celebration', read:false, time:'5 hours ago', datetime:'2026-02-17 09:00' },
    { id:6, title:'Leave Balance Update', message:'Your leave balance has been updated. Casual Leave: 8 days remaining.',
      type:'leave', category:'info', read:false, time:'1 day ago', datetime:'2026-02-16 16:30' },
    { id:7, title:'Performance Review Scheduled', message:'Your annual performance review is scheduled for Feb 25, 2026 at 3:00 PM with Mike Wilson.',
      type:'system', category:'info', read:false, time:'1 day ago', datetime:'2026-02-16 14:00' },
    { id:8, title:'Tax Declaration Reminder', message:'Please submit your tax declaration documents before Feb 28, 2026.',
      type:'payroll', category:'warning', read:false, time:'2 days ago', datetime:'2026-02-15 10:00' },
    { id:9, title:'Attendance Record Updated', message:'Your attendance for Feb 14, 2026 has been updated by HR.',
      type:'attendance', category:'info', read:false, time:'2 days ago', datetime:'2026-02-15 09:30' },
    { id:10, title:'Leave Request Submitted', message:'Your privilege leave request for Mar 10-12 has been submitted for approval.',
      type:'leave', category:'success', read:false, time:'3 days ago', datetime:'2026-02-14 15:45' },
    { id:11, title:'Profile Update Required', message:'Please update your emergency contact information in your profile.',
      type:'system', category:'warning', read:false, time:'3 days ago', datetime:'2026-02-14 11:00' },
    { id:12, title:'Overtime Approved', message:'Your overtime request for 4 hours on Feb 13, 2026 has been approved.',
      type:'attendance', category:'success', read:false, time:'4 days ago', datetime:'2026-02-13 17:00' },
    { id:13, title:'Payroll Processed', message:'Salary for January 2026 has been processed. Credit to your account on Feb 1, 2026.',
      type:'payroll', category:'success', read:true, time:'5 days ago', datetime:'2026-02-12 10:00' },
    { id:14, title:'Leave Request Approved', message:'Your sick leave for Feb 10, 2026 has been approved.',
      type:'leave', category:'success', read:true, time:'7 days ago', datetime:'2026-02-10 16:20' },
    { id:15, title:'Password Changed Successfully', message:'Your account password was changed successfully on Feb 9, 2026.',
      type:'system', category:'info', read:true, time:'8 days ago', datetime:'2026-02-09 14:30' },
    { id:16, title:'Attendance Alert', message:'You have been absent for 2 consecutive days. Please update your leave status.',
      type:'attendance', category:'error', read:true, time:'10 days ago', datetime:'2026-02-07 09:00' },
    { id:17, title:'Team Meeting Scheduled', message:'Department team meeting scheduled for Feb 5, 2026 at 2:00 PM.',
      type:'system', category:'info', read:true, time:'12 days ago', datetime:'2026-02-05 10:00' },
    { id:18, title:'Leave Encashment Processed', message:'Your leave encashment of 5 days has been processed and added to January salary.',
      type:'leave', category:'success', read:true, time:'15 days ago', datetime:'2026-02-02 11:00' }
];

let filteredNotifications = [...notificationsData];
let currentFilter = 'all';
let selectedNotification = null;

/* ---------- INIT ---------- */
document.addEventListener('DOMContentLoaded', () => {
    renderNotifications();
    updateCounts();
});

/* ---------- RENDER ---------- */
function renderNotifications() {
    const container = document.getElementById('notificationsList');
    const empty     = document.getElementById('notifEmptyState');

    if (filteredNotifications.length === 0) {
        container.innerHTML = '';
        empty.style.display = 'flex';
        return;
    }

    empty.style.display = 'none';

    container.innerHTML = filteredNotifications.map(n => `
        <div class="notification-item-full ${n.read ? '' : 'unread'}" id="notif-${n.id}">
            <div class="notif-item-icon-full ${n.category}">
                <i class="fas fa-${getNotifIcon(n.type)}"></i>
            </div>
            <div class="notif-item-content-full">
                <div class="notif-item-header-full">
                    <div>
                        <div class="notif-item-title-full">${n.title}</div>
                        <span class="notif-type-badge ${n.type}">${capitalize(n.type)}</span>
                    </div>
                    <span class="notif-item-time-full">${n.time}</span>
                </div>
                <p class="notif-item-message-full">${n.message}</p>
                <div class="notif-item-actions-full">
                    <button class="notif-action-btn primary" onclick="viewNotification(${n.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    ${!n.read ? `
                    <button class="notif-action-btn secondary" onclick="markAsRead(${n.id})">
                        <i class="fas fa-check"></i> Mark as Read
                    </button>
                    ` : ''}
                </div>
            </div>
            <div class="notif-item-menu">
                <button class="notif-menu-btn" onclick="toggleNotifMenu(${n.id}, event)">
                    <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="notif-item-dropdown" id="notifMenu-${n.id}">
                    ${!n.read ? `
                    <a href="#" onclick="markAsRead(${n.id}); return false;">
                        <i class="fas fa-check"></i> Mark as Read
                    </a>
                    ` : ''}
                    <a href="#" onclick="deleteNotification(${n.id}); return false;" class="danger">
                        <i class="fas fa-trash"></i> Delete
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    updateCounts();
}

/* ---------- FILTER ---------- */
function filterNotifications(type) {
    currentFilter = type;

    // Update tab active state
    document.querySelectorAll('.notif-tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.filter === type);
    });

    if (type === 'all') {
        filteredNotifications = [...notificationsData];
    } else if (type === 'unread') {
        filteredNotifications = notificationsData.filter(n => !n.read);
    } else {
        filteredNotifications = notificationsData.filter(n => n.type === type);
    }

    renderNotifications();
}

/* ---------- COUNTS ---------- */
function updateCounts() {
    const unreadCount = notificationsData.filter(n => !n.read).length;
    document.getElementById('notifCount').textContent = `${unreadCount} unread`;

    document.getElementById('countAll').textContent        = notificationsData.length;
    document.getElementById('countUnread').textContent     = unreadCount;
    document.getElementById('countLeave').textContent      = notificationsData.filter(n => n.type === 'leave').length;
    document.getElementById('countPayroll').textContent    = notificationsData.filter(n => n.type === 'payroll').length;
    document.getElementById('countAttendance').textContent = notificationsData.filter(n => n.type === 'attendance').length;
    document.getElementById('countSystem').textContent     = notificationsData.filter(n => n.type === 'system').length;
}

/* ---------- ACTIONS ---------- */
function markAsRead(id) {
    const notif = notificationsData.find(n => n.id === id);
    if (notif) notif.read = true;

    // Re-filter to update unread view if active
    filterNotifications(currentFilter);
    closeNotifMenus();
}

function markAllRead() {
    notificationsData.forEach(n => n.read = true);
    filterNotifications(currentFilter);
}

function deleteNotification(id) {
    if (!confirm('Delete this notification?')) return;
    const idx = notificationsData.findIndex(n => n.id === id);
    if (idx !== -1) notificationsData.splice(idx, 1);
    filterNotifications(currentFilter);
    closeNotifMenus();
}

function clearAllNotifications() {
    if (!confirm('Clear all notifications? This cannot be undone.')) return;
    notificationsData.length = 0;
    filteredNotifications = [];
    renderNotifications();
    updateCounts();
}

/* ---------- VIEW DETAIL ---------- */
function viewNotification(id) {
    selectedNotification = notificationsData.find(n => n.id === id);
    if (!selectedNotification) return;

    document.getElementById('modalNotifIcon').className   = `notif-detail-icon ${selectedNotification.category}`;
    document.getElementById('modalNotifIcon').innerHTML   = `<i class="fas fa-${getNotifIcon(selectedNotification.type)}"></i>`;
    document.getElementById('modalNotifTitle').textContent  = selectedNotification.title;
    document.getElementById('modalNotifTime').textContent   = selectedNotification.time;
    document.getElementById('modalNotifMessage').textContent = selectedNotification.message;
    document.getElementById('modalNotifType').textContent   = capitalize(selectedNotification.type);
    document.getElementById('modalNotifDate').textContent   = selectedNotification.datetime;

    const readBtn = document.getElementById('modalMarkReadBtn');
    if (selectedNotification.read) {
        readBtn.style.display = 'none';
    } else {
        readBtn.style.display = 'inline-flex';
    }

    document.getElementById('notificationDetailModal').classList.add('show');
}

function closeNotificationModal() {
    document.getElementById('notificationDetailModal').classList.remove('show');
    selectedNotification = null;
}

function markNotificationRead() {
    if (selectedNotification && !selectedNotification.read) {
        selectedNotification.read = true;
        filterNotifications(currentFilter);
        closeNotificationModal();
    }
}

/* ---------- MENU ---------- */
function toggleNotifMenu(id, e) {
    e.stopPropagation();
    const menu = document.getElementById(`notifMenu-${id}`);
    const isOpen = menu.classList.contains('show');
    closeNotifMenus();
    if (!isOpen) menu.classList.add('show');
}

function closeNotifMenus() {
    document.querySelectorAll('.notif-item-dropdown').forEach(m => m.classList.remove('show'));
}

document.addEventListener('click', closeNotifMenus);

/* ---------- HELPERS ---------- */
function getNotifIcon(type) {
    const icons = {
        leave: 'calendar-alt',
        payroll: 'money-check-alt',
        attendance: 'clock',
        system: 'info-circle'
    };
    return icons[type] || 'bell';
}

function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : '-';
}

/* ---------- GLOBAL ---------- */
window.filterNotifications    = filterNotifications;
window.markAsRead             = markAsRead;
window.markAllRead            = markAllRead;
window.deleteNotification     = deleteNotification;
window.clearAllNotifications  = clearAllNotifications;
window.viewNotification       = viewNotification;
window.closeNotificationModal = closeNotificationModal;
window.markNotificationRead   = markNotificationRead;
window.toggleNotifMenu        = toggleNotifMenu;
