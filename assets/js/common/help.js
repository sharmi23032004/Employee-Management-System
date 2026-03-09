/* ================================
   HELP & SUPPORT FUNCTIONALITY
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
    detectBrowser();
});

/* ---- FAQ TOGGLE ---- */
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isOpen  = faqItem.classList.contains('open');

    // Close all FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('open');
    });

    // Open clicked FAQ if it wasn't already open
    if (!isOpen) {
        faqItem.classList.add('open');
    }
}

/* ---- SEARCH ---- */
function searchHelp() {
    const query = document.getElementById('helpSearchInput').value.toLowerCase();

    if (!query) {
        // Show all if search is empty
        document.querySelectorAll('.faq-item').forEach(item => {
            item.style.display = 'block';
        });
        document.querySelectorAll('.faq-category').forEach(cat => {
            cat.style.display = 'block';
        });
        return;
    }

    let hasResults = false;

    document.querySelectorAll('.faq-category').forEach(category => {
        let categoryHasResults = false;

        category.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer   = item.querySelector('.faq-answer').textContent.toLowerCase();

            if (question.includes(query) || answer.includes(query)) {
                item.style.display = 'block';
                categoryHasResults = true;
                hasResults = true;

                // Auto-expand matching FAQ
                item.classList.add('open');
            } else {
                item.style.display = 'none';
            }
        });

        // Hide category if no results
        category.style.display = categoryHasResults ? 'block' : 'none';
    });

    // Could show "no results" message here if needed
    if (!hasResults) {
        console.log('No results found for:', query);
    }
}

/* ---- SCROLL TO SECTION ---- */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });

        // Open first FAQ in that section after scroll
        setTimeout(() => {
            const firstFaq = section.querySelector('.faq-item');
            if (firstFaq && !firstFaq.classList.contains('open')) {
                firstFaq.classList.add('open');
            }
        }, 500);
    }
}

/* ---- DETECT BROWSER ---- */
function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown';

    if (userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Edg') === -1) {
        browserName = 'Google Chrome';
    } else if (userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1) {
        browserName = 'Safari';
    } else if (userAgent.indexOf('Firefox') > -1) {
        browserName = 'Mozilla Firefox';
    } else if (userAgent.indexOf('Edg') > -1) {
        browserName = 'Microsoft Edge';
    } else if (userAgent.indexOf('MSIE') > -1 || userAgent.indexOf('Trident') > -1) {
        browserName = 'Internet Explorer';
    }

    const browserInfo = document.getElementById('browserInfo');
    if (browserInfo) {
        browserInfo.textContent = browserName;
    }
}

/* ---- GLOBAL ---- */
window.toggleFAQ         = toggleFAQ;
window.searchHelp        = searchHelp;
window.scrollToSection   = scrollToSection;

