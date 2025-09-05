document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for same-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Mobile nav toggle: support multiple .nav instances and add outside-click close
    document.querySelectorAll('.nav').forEach(nav => {
        const toggle = nav.querySelector('.nav__toggle');
        if (!toggle) return;

        const closeNav = () => {
            if (nav.classList.contains('nav--open')) {
                nav.classList.remove('nav--open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-label', 'Open menu');
            }
        };

        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = nav.classList.toggle('nav--open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
        });

        // Close when a nav link is clicked (handy for single-page anchors)
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => closeNav());
        });

        // Close when clicking outside the nav
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target)) closeNav();
        });

        // Optional: close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeNav();
        });
    });
});