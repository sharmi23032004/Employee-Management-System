/* ================================
   LOGIN PAGE FUNCTIONALITY
   ================================ */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMeCheckbox = document.getElementById('rememberMe');
    
    // Check if user is already logged in
    checkExistingSession();
    
    // Load remembered email if exists
    loadRememberedEmail();
    
    // Form submit event
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Clear errors on input
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            Validation.clearError('email');
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            Validation.clearError('password');
        });
    }
});

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    // Clear previous errors
    Validation.clearAllErrors();
    Utils.hideAlert();
    
    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate email
    const emailValidation = Validation.validateEmail(email);
    if (!emailValidation.isValid) {
        Validation.showError('email', emailValidation.message);
        return;
    }
    
    // Validate password
    const passwordValidation = Validation.validatePassword(password);
    if (!passwordValidation.isValid) {
        Validation.showError('password', passwordValidation.message);
        return;
    }
    
    // Show loading
    Utils.showButtonLoading('loginBtn', true);
    
    // Simulate API call (Replace with actual API call)
    setTimeout(() => {
        authenticateUser(email, password, rememberMe);
    }, 1500);
}

// Authenticate user (Demo - Replace with actual API)
function authenticateUser(email, password, rememberMe) {
    
    // Demo authentication - Check against demo users
    let authenticatedUser = null;
    
    for (const [role, userData] of Object.entries(CONFIG.DEMO_USERS)) {
        if (userData.email === email && userData.password === password) {
            authenticatedUser = userData;
            break;
        }
    }
    
    // Hide loading
    Utils.showButtonLoading('loginBtn', false);
    
    if (authenticatedUser) {
        // Save user data
        Utils.setLocalStorage(CONFIG.STORAGE_KEYS.USER, authenticatedUser);
        Utils.setLocalStorage(CONFIG.STORAGE_KEYS.TOKEN, 'demo_token_' + Date.now());
        
        // Save email if remember me is checked
        if (rememberMe) {
            Utils.setLocalStorage(CONFIG.STORAGE_KEYS.REMEMBER_ME, email);
        } else {
            Utils.removeLocalStorage(CONFIG.STORAGE_KEYS.REMEMBER_ME);
        }
        
        // Show success message
        Utils.showAlert('Login successful! Redirecting...', 'success');
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            const dashboardUrl = CONFIG.DASHBOARD_URLS[authenticatedUser.role];
            Utils.redirectTo(dashboardUrl);
        }, 1000);
        
    } else {
        // Show error message
        Utils.showAlert('Invalid email or password. Please try again.', 'danger');
    }
}

// Quick login as specific role (Demo purpose)
function loginAsRole(role) {
    if (CONFIG.DEMO_USERS[role]) {
        const userData = CONFIG.DEMO_USERS[role];
        
        // Fill form
        document.getElementById('email').value = userData.email;
        document.getElementById('password').value = userData.password;
        
        // Submit form
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
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

// Check if user is already logged in
function checkExistingSession() {
    const user = Utils.getLocalStorage(CONFIG.STORAGE_KEYS.USER);
    const token = Utils.getLocalStorage(CONFIG.STORAGE_KEYS.TOKEN);
    
    if (user && token) {
        // User already logged in, redirect to dashboard
        const dashboardUrl = CONFIG.DASHBOARD_URLS[user.role];
        Utils.redirectTo(dashboardUrl);
    }
}

// Load remembered email
function loadRememberedEmail() {
    const rememberedEmail = Utils.getLocalStorage(CONFIG.STORAGE_KEYS.REMEMBER_ME);
    if (rememberedEmail) {
        document.getElementById('email').value = rememberedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

// Make functions globally available
window.togglePassword = togglePassword;
window.loginAsRole = loginAsRole;