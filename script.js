document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. MOBILE MENU TOGGLE
    // =========================================================
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle menu visibility
            navLinks.classList.toggle('active');
            
            // Change icon (Hamburger <-> Close)
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }


    // =========================================================
    // 2. Q&A ACCORDION
    // =========================================================
    const qnaToggles = document.querySelectorAll('.qna-toggle');

    qnaToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const answer = toggle.nextElementSibling;
            
            toggle.classList.toggle('active');

            // Use scrollHeight for a smooth slide animation
            if (answer.style.maxHeight) {
                // Close the accordion
                answer.style.maxHeight = null;
            } else {
                // Open the accordion
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // =========================================================
    // 3. SCROLL REVEAL ANIMATION (Fade-in/Slide-up)
    // =========================================================
    
    // Configuration: Triggers when 15% of the element is visible
    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.15 
    };

    const elementsToObserve = [
        ...document.querySelectorAll('.product-card'),
        ...document.querySelectorAll('.section:not(#home)'), // Observe all sections except Hero
        ...document.querySelectorAll('.review-card')
    ];

    // Intersection Observer Callback
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class to trigger CSS transition
                entry.target.classList.add('visible');
                // Stop observing once element is visible
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Start observing all targeted elements
    elementsToObserve.forEach(el => {
        // Ensure non-hero elements have initial opacity/transform for the effect
        if (!el.classList.contains('hero')) {
             // Initial CSS setup for elements that don't have it explicitly
             el.style.opacity = el.style.opacity || '0';
             el.style.transform = el.style.transform || 'translateY(20px)';
        }
        observer.observe(el);
    });
});