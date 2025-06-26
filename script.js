document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = mobileMenu.querySelectorAll('a');
    const body = document.body;

    const toggleMenu = () => {
        hamburger.classList.toggle('is-active');
        mobileMenu.classList.toggle('is-active');
        body.classList.toggle('no-scroll');
    };

    hamburger.addEventListener('click', toggleMenu);
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    // --- 2. Dark Mode Toggle Logic ---
    const themeToggles = document.querySelectorAll('.theme-toggle-checkbox');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggles.forEach(toggle => toggle.checked = true);
        } else {
            document.body.classList.remove('dark-mode');
            themeToggles.forEach(toggle => toggle.checked = false);
        }
    };
    
    // Load saved theme or use system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemTheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    
    // Listen for changes on both toggles
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // --- 3. Scroll Animation Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px' // Trigger a bit before it's fully in view
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => observer.observe(element));

});
