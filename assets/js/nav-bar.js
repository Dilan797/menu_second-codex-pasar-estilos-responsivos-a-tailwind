document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    setTransparent();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            setSolid();
        } else {
            setTransparent();
            closeMenu();
        }
    });

    function setTransparent() {
        nav.classList.add('bg-transparent');
        nav.classList.remove('nav--solid', 'shadow-[0_2px_12px_rgba(107,76,90,0.12)]');
    }

    function setSolid() {
        nav.classList.add('nav--solid', 'shadow-[0_2px_12px_rgba(107,76,90,0.12)]');
        nav.classList.remove('bg-transparent');
    }

    /* --- Menú animado móvil --- */
    function closeMenu() {
        navLinks.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', () => {
        const willOpen = !navLinks.classList.contains('is-open');
        navLinks.classList.toggle('is-open');
        toggle.classList.toggle('is-active');
        toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    // Cerrar menú al hacer clic en un link
    navLinks.querySelectorAll('.nav-links__item').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('is-open')) {
            closeMenu();
        }
    });
});
