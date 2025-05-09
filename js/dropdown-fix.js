// Language switcher tests and fixes
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dropdown debug script loaded');
    
    // Test if Bootstrap JS is loaded
    if (typeof bootstrap !== 'undefined') {
        console.log('Bootstrap JS is loaded', bootstrap.version);
        
        // Try to initialize all dropdowns on the page
        const allDropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        console.log('Total dropdown toggles found:', allDropdownToggles.length);
        
        allDropdownToggles.forEach((toggleElement, index) => {
            console.log(`Dropdown toggle ${index}:`, toggleElement);
            try {
                // Force initialize this dropdown
                const dropdownInstance = new bootstrap.Dropdown(toggleElement);
                console.log(`Dropdown ${index} initialized manually:`, dropdownInstance);
            } catch (e) {
                console.error(`Error initializing dropdown ${index}:`, e);
            }
        });
    } else {
        console.error('Bootstrap JS is NOT loaded!');
        
        // Try to load Bootstrap JS dynamically
        const bootstrapScript = document.createElement('script');
        bootstrapScript.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js';
        bootstrapScript.onload = function() {
            console.log('Bootstrap JS loaded dynamically');
            // Re-initialize dropdowns after loading
            setTimeout(initializeDropdowns, 500);
        };
        document.head.appendChild(bootstrapScript);
    }
    
    // Check for specific language dropdown
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
        console.log('Language dropdown element found:', dropdown);
        
        // Add direct click handler to toggle dropdown
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Language dropdown clicked');
            
            // Get dropdown menu
            const dropdownMenu = document.querySelector('.dropdown-menu[aria-labelledby="languageDropdown"]');
            if (dropdownMenu) {
                console.log('Found dropdown menu:', dropdownMenu);
                
                // Toggle show class manually
                dropdownMenu.classList.toggle('show');
                dropdown.setAttribute('aria-expanded', dropdownMenu.classList.contains('show'));
            } else {
                console.error('Dropdown menu not found!');
            }
        });
        
        // Check for language items
        const languageItems = document.querySelectorAll('[data-language]');
        console.log('Language items found:', languageItems.length);
        
        // Add click listeners to language items
        languageItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-language');
                console.log('Language selected:', lang);
                
                // Try to set language if function exists
                if (typeof setLanguage === 'function') {
                    setLanguage(lang);
                } else {
                    console.error('setLanguage function not found!');
                    
                    // Store language selection anyway
                    localStorage.setItem('tadaber-language', lang);
                    console.log('Language stored in localStorage:', lang);
                    
                    // Update UI manually
                    const currentLangElement = document.getElementById('current-language');
                    if (currentLangElement) {
                        currentLangElement.textContent = lang === 'ar' ? 'العربية' : 'English';
                    }
                    
                    // Update checkmarks
                    const checkAr = document.getElementById('check-ar');
                    const checkEn = document.getElementById('check-en');
                    
                    if (checkAr && checkEn) {
                        checkAr.style.visibility = lang === 'ar' ? 'visible' : 'hidden';
                        checkEn.style.visibility = lang === 'en' ? 'visible' : 'hidden';
                    }
                    
                    // Force reload to apply language
                    window.location.reload();
                }
            });
        });
    } else {
        console.error('Language dropdown element not found!');
    }
});

// Function to initialize all dropdowns
function initializeDropdowns() {
    if (typeof bootstrap !== 'undefined') {
        const allDropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        console.log('Initializing all dropdowns:', allDropdownToggles.length);
        
        allDropdownToggles.forEach((element, index) => {
            try {
                const dropdown = new bootstrap.Dropdown(element);
                console.log(`Dropdown ${index} initialized`);
            } catch (e) {
                console.error(`Failed to initialize dropdown ${index}:`, e);
            }
        });
    } else {
        console.error('Bootstrap still not loaded');
    }
}
