document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    // Ensure mobileMenu exists before adding event listeners to its links
    if (mobileMenu) {
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
    }


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
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemTheme.matches) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // --- 3. Scroll Animation Logic ---
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px'
    });
    
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(element => animationObserver.observe(element));

    // --- 4. Active Nav Link on Scroll Logic ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-desktop .nav-links a');

    const activateNavLink = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
                
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };
    
    if (sections.length > 0 && navLinks.length > 0) {
        const navObserver = new IntersectionObserver(activateNavLink, {
            rootMargin: '-50% 0px -50% 0px'
        });
        sections.forEach(section => navObserver.observe(section));
    }
});
