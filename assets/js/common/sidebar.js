/* ================================
   SIDEBAR FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // Get elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainContent = document.querySelector('.main-content');
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Sidebar toggle (close button)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
    
    // Submenu toggle
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const menuItem = this.closest('.menu-item');
            menuItem.classList.toggle('open');
        });
    });
    
    // Close sidebar on outside click (mobile)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Set active menu based on current page
    setActiveMenu();
});

// Set active menu item
function setActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop();
    const menuItems = document.querySelectorAll('.menu-item a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.closest('.menu-item').classList.add('active');
            
            // Open parent submenu if exists
            const parentSubmenu = item.closest('.submenu');
            if (parentSubmenu) {
                parentSubmenu.closest('.menu-item').classList.add('open');
            }
        }
    });
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear local storage
        Utils.removeLocalStorage(CONFIG.STORAGE_KEYS.USER);
        Utils.removeLocalStorage(CONFIG.STORAGE_KEYS.TOKEN);
        
        // Redirect to login
        window.location.href = '../login.html';
    }
}

// Make logout globally available
window.logout = logout;