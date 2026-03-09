/* ================================
   UTILITY FUNCTIONS
   ================================ */

const Utils = {
    
    // Show alert message
    showAlert: function(message, type = 'danger') {
        const alertBox = document.getElementById('loginAlert');
        const alertMessage = document.getElementById('alertMessage');
        
        if (alertBox && alertMessage) {
            alertMessage.textContent = message;
            alertBox.className = `alert alert-${type}`;
            alertBox.style.display = 'flex';
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                this.hideAlert();
            }, 5000);
        }
    },
    
    // Hide alert
    hideAlert: function() {
        const alertBox = document.getElementById('loginAlert');
        if (alertBox) {
            alertBox.style.display = 'none';
        }
    },
    
    // Show loading state on button
    showButtonLoading: function(buttonId, show = true) {
        const button = document.getElementById(buttonId);
        if (!button) return;
        
        const btnText = button.querySelector('.btn-text');
        const btnLoader = button.querySelector('.btn-loader');
        
        if (show) {
            button.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'flex';
        } else {
            button.disabled = false;
            if (btnText) btnText.style.display = 'block';
            if (btnLoader) btnLoader.style.display = 'none';
        }
    },
    
    // Local Storage functions
    setLocalStorage: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    getLocalStorage: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },
    
    removeLocalStorage: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clearLocalStorage: function() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    },
    
    // Format date
    formatDate: function(date, format = 'DD/MM/YYYY') {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        
        return format
            .replace('DD', day)
            .replace('MM', month)
            .replace('YYYY', year);
    },
    
    // Format currency
    formatCurrency: function(amount, currency = 'INR') {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // Redirect to page
    redirectTo: function(url) {
        window.location.href = url;
    },
    
    // Get URL parameter
    getUrlParameter: function(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Make Utils globally available
window.Utils = Utils;

// Close alert function (used in HTML)
function closeAlert() {
    Utils.hideAlert();
}