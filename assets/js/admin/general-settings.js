/* ================================
   GENERAL SETTINGS FUNCTIONALITY
   ================================ */

let currentSection  = 'company';
let selectedTheme   = 'light';
let selectedColor   = '#4F46E5';

document.addEventListener('DOMContentLoaded', function () {
    // Weekday chip toggle
    document.querySelectorAll('.weekday-chip').forEach(chip => {
        chip.addEventListener('click', function () {
            this.classList.toggle('active');
            const cb = this.querySelector('input');
            if (cb) cb.checked = !cb.checked;
        });
    });
});

/* ---- SECTION NAVIGATION ---- */
function showSection(name) {
    // Hide all sections
    document.querySelectorAll('.settings-section').forEach(s => {
        s.classList.remove('active');
    });

    // Deactivate all nav items
    document.querySelectorAll('.settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show target
    const section = document.getElementById('section-' + name);
    if (section) section.classList.add('active');

    // Activate nav item
    const navItem = document.querySelector(
        `.settings-nav-item[data-section="${name}"]`
    );
    if (navItem) navItem.classList.add('active');

    currentSection = name;

    // Scroll to top of settings main
    const main = document.querySelector('.settings-main');
    if (main) main.scrollTop = 0;
}

/* ---- SAVE SECTION ---- */
function saveSection(section) {
    // Simulate saving
    const names = {
        company:       'Company information',
        localization:  'Localization settings',
        attendance:    'Attendance settings',
        security:      'Security settings',
        notifications: 'Notification settings',
        appearance:    'Appearance settings'
    };

    // Simulate API call delay
    const btn = event.target;
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    btn.disabled = true;

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled  = false;
        showAlert(`${names[section] || 'Settings'} saved successfully!`, 'success');
    }, 800);
}

/* ---- RESET SECTION ---- */
function resetSection(section) {
    if (!confirm(`Reset ${section} settings to default values?`)) return;

    if (section === 'company') {
        document.getElementById('companyName').value    = 'TechCorp Solutions Pvt. Ltd.';
        document.getElementById('companyCode').value    = 'TCPL';
        document.getElementById('companyEmail').value   = 'hr@company.com';
        document.getElementById('companyPhone').value   = '+91 44 4000 0000';
        document.getElementById('companyWebsite').value = 'https://www.company.com';
    } else if (section === 'localization') {
        document.getElementById('language').value     = 'en';
        document.getElementById('timezone').value     = 'Asia/Kolkata';
        document.getElementById('dateFormat').value   = 'DD/MM/YYYY';
        document.getElementById('timeFormat').value   = '12';
        document.getElementById('currency').value     = 'INR';
        document.getElementById('numberFormat').value = 'en-IN';
        document.getElementById('weekStart').value    = 'monday';
        document.getElementById('fyStart').value      = 'april';
    } else if (section === 'attendance') {
        document.getElementById('officeStart').value  = '09:00';
        document.getElementById('officeEnd').value    = '18:00';
        document.getElementById('gracePeriod').value  = '15';
        document.getElementById('minHours').value     = '8';
        document.getElementById('halfDayHours').value = '4';
        document.getElementById('overtimeHours').value = '9';
    } else if (section === 'security') {
        document.getElementById('minPassLength').value    = '8';
        document.getElementById('passExpiry').value       = '90';
        document.getElementById('sessionTimeout').value  = '30';
        document.getElementById('maxLoginAttempts').value = '5';
    }

    showAlert('Settings reset to defaults.', 'success');
}

/* ---- LOGO UPLOAD ---- */
function previewLogo(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
        showAlert('File size must be under 2 MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        const preview = document.getElementById('logoPreview');
        preview.innerHTML = `<img src="${e.target.result}" alt="Logo">`;
    };
    reader.readAsDataURL(file);
}

function removeLogo() {
    document.getElementById('logoPreview').innerHTML =
        '<i class="fas fa-building"></i>';
    document.getElementById('logoFile').value = '';
}

/* ---- THEME ---- */
function selectTheme(theme) {
    selectedTheme = theme;
    ['light', 'dark', 'system'].forEach(t => {
        document.getElementById('theme' + capitalize(t))
                .classList.toggle('active', t === theme);
    });
}

/* ---- PRIMARY COLOUR ---- */
function selectColor(color, btn) {
    selectedColor = color;

    // Remove active from all swatches
    document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));

    // Activate clicked swatch
    if (btn) btn.classList.add('active');

    // Sync custom color input
    document.getElementById('customColor').value = color;

    // Apply CSS variable live preview
    document.documentElement.style.setProperty('--primary-color', color);
}

/* ---- UTILITIES ---- */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function showAlert(msg, type = 'success') {
    const box = document.getElementById('settingsAlert');
    const icon = type === 'success'
        ? 'fa-check-circle'
        : 'fa-exclamation-circle';

    box.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${msg}</span>
        <button class="alert-close" onclick="closeAlert()">
            <i class="fas fa-times"></i>
        </button>
    `;
    box.className = `alert alert-${type}`;
    box.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(closeAlert, 3500);
}

function closeAlert() {
    const box = document.getElementById('settingsAlert');
    if (box) box.style.display = 'none';
}

/* ---- GLOBAL ---- */
window.showSection   = showSection;
window.saveSection   = saveSection;
window.resetSection  = resetSection;
window.previewLogo   = previewLogo;
window.removeLogo    = removeLogo;
window.selectTheme   = selectTheme;
window.selectColor   = selectColor;
window.closeAlert    = closeAlert;