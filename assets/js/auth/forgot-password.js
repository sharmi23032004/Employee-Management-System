/* ================================
   FORGOT PASSWORD PAGE FUNCTIONALITY
   ================================ */

// Global variables
let resendCountdown = 60;
let resendTimer = null;
let lastEmailSent = '';

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    const emailInput = document.getElementById('email');
    
    // Form submit event
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
    
    // Clear errors on input
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            Validation.clearError('email');
            Utils.hideAlert();
        });
    }
    
    // Pre-fill email from URL parameter (if redirected from login)
    const emailParam = Utils.getUrlParameter('email');
    if (emailParam && emailInput) {
        emailInput.value = decodeURIComponent(emailParam);
    }
});

// Handle forgot password form submission
function handleForgotPassword(event) {
    event.preventDefault();
    
    // Clear previous errors
    Validation.clearAllErrors();
    Utils.hideAlert();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    
    // Validate email
    const emailValidation = Validation.validateEmail(email);
    if (!emailValidation.isValid) {
        Validation.showError('email', emailValidation.message);
        return;
    }
    
    // Show loading
    Utils.showButtonLoading('submitBtn', true);
    
    // Simulate API call (Replace with actual API call)
    setTimeout(() => {
        sendPasswordResetEmail(email);
    }, 1500);
}

// Send password reset email (Demo - Replace with actual API)
function sendPasswordResetEmail(email) {
    
    // Demo - Check if email exists in demo users
    let emailExists = false;
    
    for (const userData of Object.values(CONFIG.DEMO_USERS)) {
        if (userData.email === email) {
            emailExists = true;
            break;
        }
    }
    
    // Hide loading
    Utils.showButtonLoading('submitBtn', false);
    
    // For security, always show success message even if email doesn't exist
    // This prevents email enumeration attacks
    
    // In production, you would always show success regardless
    // Here we'll show success for demo purposes
    
    lastEmailSent = email;
    showSuccessMessage(email);
    
    // In real implementation:
    /*
    fetch(CONFIG.API_BASE_URL + CONFIG.ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessMessage(email);
        } else {
            // Still show success for security
            showSuccessMessage(email);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Utils.showAlert('An error occurred. Please try again later.', 'danger');
    })
    .finally(() => {
        Utils.showButtonLoading('submitBtn', false);
    });
    */
}

// Show success message
function showSuccessMessage(email) {
    // Hide form
    document.getElementById('forgotPasswordForm').style.display = 'none';
    
    // Show success card
    const successCard = document.getElementById('successCard');
    successCard.style.display = 'block';
    
    // Set email in success message
    document.getElementById('sentEmail').textContent = email;
    
    // Start resend countdown
    startResendCountdown();
    
    // Log for demo purposes
    console.log('Password reset email sent to:', email);
    console.log('Reset link: reset-password.html?email=' + encodeURIComponent(email) + '&token=demo_token_' + Date.now());
}

// Show form again (if user wants to try different email)
function showForm() {
    // Show form
    document.getElementById('forgotPasswordForm').style.display = 'block';
    
    // Hide success card
    document.getElementById('successCard').style.display = 'none';
    
    // Clear email input
    document.getElementById('email').value = '';
    
    // Clear errors
    Validation.clearAllErrors();
    Utils.hideAlert();
    
    // Stop countdown
    if (resendTimer) {
        clearInterval(resendTimer);
        resendTimer = null;
    }
}

// Start resend countdown
function startResendCountdown() {
    resendCountdown = 60;
    updateResendUI();
    
    // Clear existing timer
    if (resendTimer) {
        clearInterval(resendTimer);
    }
    
    // Start countdown
    resendTimer = setInterval(() => {
        resendCountdown--;
        updateResendUI();
        
        if (resendCountdown <= 0) {
            clearInterval(resendTimer);
            resendTimer = null;
            enableResendButton();
        }
    }, 1000);
}

// Update resend UI
function updateResendUI() {
    const timerElement = document.getElementById('resendTimer');
    const resendText = document.getElementById('resendText');
    const resendBtn = document.getElementById('resendBtn');
    
    if (resendCountdown > 0) {
        timerElement.textContent = resendCountdown;
        resendText.style.display = 'block';
        resendBtn.style.display = 'none';
    } else {
        resendText.style.display = 'none';
        resendBtn.style.display = 'inline-flex';
    }
}

// Enable resend button
function enableResendButton() {
    const resendBtn = document.getElementById('resendBtn');
    resendBtn.style.display = 'inline-flex';
    document.getElementById('resendText').style.display = 'none';
}

// Resend email
function resendEmail() {
    if (lastEmailSent) {
        // Show loading on resend button
        const resendBtn = document.getElementById('resendBtn');
        const originalHTML = resendBtn.innerHTML;
        resendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        resendBtn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            resendBtn.innerHTML = originalHTML;
            resendBtn.disabled = false;
            
            // Show success alert
            Utils.showAlert('Reset link has been resent to ' + lastEmailSent, 'success');
            
            // Restart countdown
            startResendCountdown();
            
            // Log for demo
            console.log('Password reset email resent to:', lastEmailSent);
        }, 1500);
    }
}

// Close alert function
function closeAlert() {
    Utils.hideAlert();
}

// Make functions globally available
window.showForm = showForm;
window.resendEmail = resendEmail;
window.closeAlert = closeAlert;

// Clear timer on page unload
window.addEventListener('beforeunload', function() {
    if (resendTimer) {
        clearInterval(resendTimer);
    }
});


