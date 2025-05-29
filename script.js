// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Select only sections that should fade in (excluding the small-print section)
    const sections = document.querySelectorAll('section.fade-in');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});