/* ================================
   USER SETTINGS FUNCTIONALITY
   ================================ */

let currentTheme = 'light';

document.addEventListener('DOMContentLoaded', () => {
    // Password input listeners
    const newPass = document.getElementById('newPassword');
    if (newPass) {
        newPass.addEventListener('input', validatePassword);
    }
});

/* ---- SECTION NAV ---- */
function showSettingsSection(name) {
    // Hide all
    document.querySelectorAll('.user-settings-section').forEach(s => {
        s.classList.remove('active');
    });

    // Deactivate nav
    document.querySelectorAll('.user-settings-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Show target
    const section = document.getElementById('section-' + name);
    if (section) section.classList.add('active');

    // Activate nav
    const navItem = document.querySelector(
        `.user-settings-nav-item[data-section="${name}"]`
    );
    if (navItem) navItem.classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ---- PROFILE PIC ---- */
function previewUserPic(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
        showAlert('File size must be under 5 MB', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        document.getElementById('userPicPreview').innerHTML =
            `<img src="${e.target.result}" alt="Profile">`;
    };
    reader.readAsDataURL(file);
}

function removeUserPic() {
    document.getElementById('userPicPreview').innerHTML =
        '<i class="fas fa-user"></i>';
    document.getElementById('userPicFile').value = '';
}

/* ---- PASSWORD ---- */
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const btn   = event.currentTarget;
    const icon  = btn.querySelector('i');

    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function validatePassword() {
    const pwd = document.getElementById('newPassword').value;

    const reqLength = document.getElementById('req-length');
    const reqUpper  = document.getElementById('req-upper');
    const reqNumber = document.getElementById('req-number');

    // Length >= 8
    if (pwd.length >= 8) {
        reqLength.classList.add('met');
    } else {
        reqLength.classList.remove('met');
    }

    // Has uppercase
    if (/[A-Z]/.test(pwd)) {
        reqUpper.classList.add('met');
    } else {
        reqUpper.classList.remove('met');
    }

    // Has number
    if (/\d/.test(pwd)) {
        reqNumber.classList.add('met');
    } else {
        reqNumber.classList.remove('met');
    }
}

/* ---- SAVE ACCOUNT ---- */
function saveAccountSettings() {
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const curr  = document.getElementById('currentPassword').value;
    const newP  = document.getElementById('newPassword').value;
    const conf  = document.getElementById('confirmPassword').value;

    // If changing password
    if (curr || newP || conf) {
        if (!curr) {
            showAlert('Please enter your current password', 'error');
            return;
        }
        if (newP.length < 8) {
            showAlert('New password must be at least 8 characters', 'error');
            return;
        }
        if (newP !== conf) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        // Simulate API call
        console.log('Updating password...');
    }

    // Simulate save
    console.log('Saving account settings:', { email, phone });
    showAlert('Account settings saved successfully!', 'success');
}

function resetAccountForm() {
    document.getElementById('email').value = 'john.doe@company.com';
    document.getElementById('phone').value = '+91 9876543210';
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value     = '';
    document.getElementById('confirmPassword').value = '';

    ['req-length', 'req-upper', 'req-number'].forEach(id => {
        document.getElementById(id).classList.remove('met');
    });
}

/* ---- SAVE NOTIFICATIONS ---- */
function saveNotificationSettings() {
    console.log('Saving notification preferences...');
    showAlert('Notification preferences saved!', 'success');
}

/* ---- SAVE PRIVACY ---- */
function savePrivacySettings() {
    console.log('Saving privacy settings...');
    showAlert('Privacy settings saved!', 'success');
}

function revokeSession(id) {
    if (!confirm('Sign out this device?')) return;
    console.log('Revoking session:', id);
    showAlert('Device signed out successfully', 'success');
}

function signOutAllDevices() {
    if (!confirm('Sign out all other devices? You will remain signed in on this device.')) return;
    console.log('Signing out all devices...');
    showAlert('All other devices have been signed out', 'success');
}

/* ---- THEME ---- */
function selectUserTheme(theme) {
    currentTheme = theme;
    ['light', 'dark', 'system'].forEach(t => {
        document.getElementById('theme-' + t)
                .classList.toggle('active', t === theme);
    });
}

/* ---- SAVE APPEARANCE ---- */
function saveAppearanceSettings() {
    const fontSize = document.getElementById('fontSize').value;
    console.log('Saving appearance:', { theme: currentTheme, fontSize });
    showAlert('Appearance settings saved!', 'success');
}

function resetAppearance() {
    selectUserTheme('light');
    document.getElementById('fontSize').value = 'medium';
    showAlert('Appearance reset to defaults', 'success');
}

/* ---- ALERT ---- */
function showAlert(msg, type = 'success') {
    const box = document.getElementById('settingsAlert');
    if (!box) return;

    box.className = `alert alert-${type}`;
    document.getElementById('alertMessage').textContent = msg;
    box.style.display = 'flex';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(closeAlert, 3500);
}

function closeAlert() {
    const box = document.getElementById('settingsAlert');
    if (box) box.style.display = 'none';
}

/* ---- GLOBAL ---- */
window.showSettingsSection      = showSettingsSection;
window.previewUserPic           = previewUserPic;
window.removeUserPic            = removeUserPic;
window.togglePassword           = togglePassword;
window.saveAccountSettings      = saveAccountSettings;
window.resetAccountForm         = resetAccountForm;
window.saveNotificationSettings = saveNotificationSettings;
window.savePrivacySettings      = savePrivacySettings;
window.revokeSession            = revokeSession;
window.signOutAllDevices        = signOutAllDevices;
window.selectUserTheme          = selectUserTheme;
window.saveAppearanceSettings   = saveAppearanceSettings;
window.resetAppearance          = resetAppearance;
window.closeAlert               = closeAlert;
