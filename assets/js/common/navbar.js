/* ================================
   NAVBAR FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Notification dropdown
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
            
            // Close profile dropdown if open
            const profileDropdown = document.getElementById('profileDropdown');
            if (profileDropdown) {
                profileDropdown.classList.remove('show');
            }
        });
    }
    
    // Profile dropdown
    const userProfileBtn = document.getElementById('userProfileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (userProfileBtn && profileDropdown) {
        userProfileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            profileDropdown.classList.toggle('show');
            
            // Close notification dropdown if open
            if (notificationDropdown) {
                notificationDropdown.classList.remove('show');
            }
        });
    }
    
    // Close dropdowns on outside click
    document.addEventListener('click', function() {
        if (notificationDropdown) {
            notificationDropdown.classList.remove('show');
        }
        if (profileDropdown) {
            profileDropdown.classList.remove('show');
        }
    });
    
    // Load user data
    loadUserData();
    
    // Update current date
    updateCurrentDate();
});

// Load user data from localStorage
function loadUserData() {
    const user = Utils.getLocalStorage(CONFIG.STORAGE_KEYS.USER);
    
    if (user) {
        // Update user name in navbar
        const userNameNav = document.getElementById('userNameNav');
        if (userNameNav) {
            userNameNav.textContent = user.name;
        }
        
        // Update user name in dropdown
        const userNameDropdown = document.getElementById('userNameDropdown');
        if (userNameDropdown) {
            userNameDropdown.textContent = user.name;
        }
        
        // Update user email
        const userEmailDropdown = document.getElementById('userEmailDropdown');
        if (userEmailDropdown) {
            userEmailDropdown.textContent = user.email;
        }
        
        // Update sidebar user name
        const userName = document.getElementById('userName');
        if (userName) {
            userName.textContent = user.name;
        }
        
        // Update welcome message
        const welcomeUserName = document.getElementById('welcomeUserName');
        if (welcomeUserName) {
            welcomeUserName.textContent = user.name.split(' ')[0]; // First name only
        }
    } else {
        // No user data, redirect to login
        window.location.href = '../login.html';
    }
}

// Update current date
function updateCurrentDate() {
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date();
        currentDateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}