/* ================================
   RESET PASSWORD PAGE FUNCTIONALITY
   ================================ */

// Global variables
let userEmail = '';
let resetToken = '';
let redirectCountdown = 5;
let redirectTimer = null;

// Password requirements regex
const passwordRequirements = {
    length: /.{8,}/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/
};

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get URL parameters
    userEmail = Utils.getUrlParameter('email');
    resetToken = Utils.getUrlParameter('token');
    
    // Validate reset link
    validateResetLink();
    
    // Get form elements
    const resetPasswordForm = document.getElementById('resetPasswordForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    
    // Form submit event
    if (resetPasswordForm) {
        resetPasswordForm.addEventListener('submit', handleResetPassword);
    }
    
    // Password input events
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', function() {
            Validation.clearError('newPassword');
            checkPasswordStrength(this.value);
            checkPasswordRequirements(this.value);
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            Validation.clearError('confirmPassword');
        });
    }
});

// Validate reset link
function validateResetLink() {
    // Check if email and token exist
    if (!userEmail || !resetToken) {
        showInvalidTokenMessage();
        return;
    }
    
    // Display user email
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement) {
        userEmailElement.textContent = decodeURIComponent(userEmail);
    }
    
    // In production, validate token with backend
    // For demo, we'll accept any token
    console.log('Reset link validated for:', userEmail);
    console.log('Token:', resetToken);
    
    /*
    // Real implementation would be:
    fetch(CONFIG.API_BASE_URL + '/auth/validate-reset-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userEmail,
            token: resetToken
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.valid) {
            showInvalidTokenMessage();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showInvalidTokenMessage();
    });
    */
}

// Show invalid token message
function showInvalidTokenMessage() {
    document.getElementById('resetFormContainer').style.display = 'none';
    document.getElementById('invalidTokenCard').style.display = 'block';
}

// Handle reset password form submission
function handleResetPassword(event) {
    event.preventDefault();
    
    // Clear previous errors
    Validation.clearAllErrors();
    Utils.hideAlert();
    
    // Get form values
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate new password
    const passwordValidation = validateNewPassword(newPassword);
    if (!passwordValidation.isValid) {
        Validation.showError('newPassword', passwordValidation.message);
        return;
    }
    
    // Validate confirm password
    if (!confirmPassword || confirmPassword.trim() === '') {
        Validation.showError('confirmPassword', 'Please confirm your password');
        return;
    }
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        Validation.showError('confirmPassword', 'Passwords do not match');
        return;
    }
    
    // Show loading
    Utils.showButtonLoading('resetBtn', true);
    
    // Simulate API call (Replace with actual API call)
    setTimeout(() => {
        resetPassword(newPassword);
    }, 1500);
}

// Validate new password with all requirements
function validateNewPassword(password) {
    if (!password || password.trim() === '') {
        return {
            isValid: false,
            message: 'Password is required'
        };
    }
    
    if (!passwordRequirements.length.test(password)) {
        return {
            isValid: false,
            message: 'Password must be at least 8 characters long'
        };
    }
    
    if (!passwordRequirements.uppercase.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter'
        };
    }
    
    if (!passwordRequirements.lowercase.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter'
        };
    }
    
    if (!passwordRequirements.number.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }
    
    if (!passwordRequirements.special.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one special character'
        };
    }
    
    return {
        isValid: true,
        message: ''
    };
}

function resetPassword(newPassword) {

    // Get users from localStorage
    let users = Utils.getLocalStorage('users') || [];

    const decodedEmail = decodeURIComponent(userEmail);

    // Find user
    const userIndex = users.findIndex(user => user.email === decodedEmail);

    if (userIndex !== -1) {
        // Update password
        users[userIndex].password = newPassword;

        // Save updated users
        Utils.setLocalStorage('users', users);

        console.log('Password updated successfully');
    } else {
        console.log('User not found');
    }

    // Hide loading
    Utils.showButtonLoading('resetBtn', false);

    // Show success message
    showSuccessMessage();
}


// Show success message
function showSuccessMessage() {
    // Hide form
    document.getElementById('resetPasswordForm').style.display = 'none';
    
    // Show success card
    document.getElementById('successCard').style.display = 'block';
    
    // Start redirect countdown
    startRedirectCountdown();
}

// Start redirect countdown
function startRedirectCountdown() {
    redirectCountdown = 5;
    updateRedirectUI();
    
    redirectTimer = setInterval(() => {
        redirectCountdown--;
        updateRedirectUI();
        
        if (redirectCountdown <= 0) {
            clearInterval(redirectTimer);
            redirectTimer = null;
            Utils.redirectTo('login.html');
        }
    }, 1000);
}

// Update redirect UI
function updateRedirectUI() {
    const timerElement = document.getElementById('redirectTimer');
    if (timerElement) {
        timerElement.textContent = redirectCountdown;
    }
}

// Check password strength
function checkPasswordStrength(password) {
    const strengthMeterFill = document.getElementById('strengthMeterFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthMeterFill.className = 'strength-meter-fill';
        strengthText.className = 'strength-text';
        strengthText.textContent = 'Password Strength';
        return;
    }
    
    let strength = 0;
    
    // Check each requirement
    if (passwordRequirements.length.test(password)) strength++;
    if (passwordRequirements.uppercase.test(password)) strength++;
    if (passwordRequirements.lowercase.test(password)) strength++;
    if (passwordRequirements.number.test(password)) strength++;
    if (passwordRequirements.special.test(password)) strength++;
    
    // Update meter
    strengthMeterFill.className = 'strength-meter-fill';
    strengthText.className = 'strength-text';
    
    if (strength <= 2) {
        strengthMeterFill.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak Password';
    } else if (strength === 3) {
        strengthMeterFill.classList.add('fair');
        strengthText.classList.add('fair');
        strengthText.textContent = 'Fair Password';
    } else if (strength === 4) {
        strengthMeterFill.classList.add('good');
        strengthText.classList.add('good');
        strengthText.textContent = 'Good Password';
    } else if (strength === 5) {
        strengthMeterFill.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong Password';
    }
}

// Check password requirements
function checkPasswordRequirements(password) {
    // Length requirement
    const lengthReq = document.getElementById('req-length');
    if (passwordRequirements.length.test(password)) {
        lengthReq.classList.add('valid');
    } else {
        lengthReq.classList.remove('valid');
    }
    
    // Uppercase requirement
    const uppercaseReq = document.getElementById('req-uppercase');
    if (passwordRequirements.uppercase.test(password)) {
        uppercaseReq.classList.add('valid');
    } else {
        uppercaseReq.classList.remove('valid');
    }
    
    // Lowercase requirement
    const lowercaseReq = document.getElementById('req-lowercase');
    if (passwordRequirements.lowercase.test(password)) {
        lowercaseReq.classList.add('valid');
    } else {
        lowercaseReq.classList.remove('valid');
    }
    
    // Number requirement
    const numberReq = document.getElementById('req-number');
    if (passwordRequirements.number.test(password)) {
        numberReq.classList.add('valid');
    } else {
        numberReq.classList.remove('valid');
    }
    
    // Special character requirement
    const specialReq = document.getElementById('req-special');
    if (passwordRequirements.special.test(password)) {
        specialReq.classList.add('valid');
    } else {
        specialReq.classList.remove('valid');
    }
}

// Toggle password visibility
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const toggleIcon = document.getElementById('toggleIcon' + (fieldId === 'newPassword' ? 'New' : 'Confirm'));
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Close alert function
function closeAlert() {
    Utils.hideAlert();
}

// Make functions globally available
window.togglePassword = togglePassword;
window.closeAlert = closeAlert;

// Clear timer on page unload
window.addEventListener('beforeunload', function() {
    if (redirectTimer) {
        clearInterval(redirectTimer);
    }
});

