/* ================================
   ERROR PAGE FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    displayCurrentURL();
});

/* ---- DISPLAY CURRENT URL ---- */
function displayCurrentURL() {
    const urlElement = document.getElementById('currentURL');
    if (urlElement) {
        const path = window.location.pathname;
        const shortPath = path.length > 50 
            ? '...' + path.slice(-47) 
            : path;
        urlElement.textContent = shortPath;
        urlElement.title = path; // Full path on hover
    }
}

/* ---- NAVIGATION ---- */
function goHome() {
    // Determine home based on user role (could be stored in localStorage)
    const userRole = localStorage.getItem('userRole') || 'employee';
    
    const homePages = {
        employee: '../employee/dashboard.html',
        hr: '../hr/dashboard.html',
        admin: '../admin/dashboard.html'
    };
    
    window.location.href = homePages[userRole] || '../employee/dashboard.html';
}

function goBack() {
    // Check if there's history to go back to
    if (window.history.length > 1) {
        window.history.back();
    } else {
        goHome();
    }
}

function contactSupport() {
    window.location.href = '../common/help.html';
}

/* ---- SEARCH ---- */
function performSearch() {
    const query = document.getElementById('errorSearchInput').value.trim();
    
    if (!query) {
        alert('Please enter a search term');
        return;
    }
    
    // In production: redirect to search results page or help with query
    console.log('Searching for:', query);
    
    // For now, redirect to help page
    window.location.href = `../common/help.html?q=${encodeURIComponent(query)}`;
}

function handleSearchEnter(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

/* ---- GLOBAL ---- */
window.goHome            = goHome;
window.goBack            = goBack;
window.contactSupport    = contactSupport;
window.performSearch     = performSearch;
window.handleSearchEnter = handleSearchEnter;


