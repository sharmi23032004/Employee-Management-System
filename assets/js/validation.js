/* ================================
   FORM VALIDATION FUNCTIONS
   ================================ */

const Validation = {
    
    // Validate email
    validateEmail: function(email) {
        if (!email || email.trim() === '') {
            return {
                isValid: false,
                message: 'Email is required'
            };
        }
        
        if (!CONFIG.VALIDATION.EMAIL_REGEX.test(email)) {
            return {
                isValid: false,
                message: 'Please enter a valid email address'
            };
        }
        
        return {
            isValid: true,
            message: ''
        };
    },
    
    // Validate password
    validatePassword: function(password) {
        if (!password || password.trim() === '') {
            return {
                isValid: false,
                message: 'Password is required'
            };
        }
        
        if (password.length < CONFIG.VALIDATION.PASSWORD_MIN_LENGTH) {
            return {
                isValid: false,
                message: `Password must be at least ${CONFIG.VALIDATION.PASSWORD_MIN_LENGTH} characters`
            };
        }
        
        if (password.length > CONFIG.VALIDATION.PASSWORD_MAX_LENGTH) {
            return {
                isValid: false,
                message: `Password must not exceed ${CONFIG.VALIDATION.PASSWORD_MAX_LENGTH} characters`
            };
        }
        
        return {
            isValid: true,
            message: ''
        };
    },
    
    // Show error message
    showError: function(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.add('error');
        }
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    },
    
    // Clear error message
    clearError: function(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field) {
            field.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    },
    
    // Clear all errors
    clearAllErrors: function() {
        const errorElements = document.querySelectorAll('.error-message');
        const inputElements = document.querySelectorAll('.form-control');
        
        errorElements.forEach(element => {
            element.textContent = '';
            element.classList.remove('show');
        });
        
        inputElements.forEach(element => {
            element.classList.remove('error');
        });
    }
};

// Make Validation globally available
window.Validation = Validation;