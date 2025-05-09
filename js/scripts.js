/*!
* Start Bootstrap - Creative v7.0.7 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });    });    // Activate SimpleLightbox plugin for portfolio items
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });    // Initialize AOS
    AOS.init({
        duration: 1000,        // animation duration in ms
        easing: 'ease-out-back', // easing for animation
        once: true,            // whether animation should happen only once
        mirror: true,          // whether elements should animate out while scrolling past them
        offset: 120,           // offset (in px) from the original trigger point
        delay: 100,            // delay animation (ms)
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
        disable: false,        // enable animations on mobile devices
        startEvent: 'DOMContentLoaded' // name of the event dispatched on the document, that AOS should initialize on
    });
    
    // Refresh AOS when images are loaded to ensure proper positioning
    window.addEventListener('load', function() {
        AOS.refresh();
    });
    
    // Add hover effect to feature cards for touch devices
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.classList.add('hover');
            }, {passive: true});
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('hover');
                }, 300);
            }, {passive: true});
        });
    }

    // Toggle 'active' class in the language switcher based on scroll events
    const languageSwitcher = document.querySelector('.language-switcher');
    const arabicLink = languageSwitcher.querySelector('a[href="index.html"]');
    const englishLink = languageSwitcher.querySelector('a[href="index_en.html"]');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            arabicLink.classList.remove('active');
            englishLink.classList.remove('active');
        } else {
            arabicLink.classList.add('active');
            // Optionally, you can add logic to determine which link should be active.
        }
    });

});
