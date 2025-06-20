    /*=============== SHOW MENU ===============*/  
    /* Menu show */
/*=============== SHOW MENU ===============*/
(() => {
    const btn = document.getElementById('nav-toggle');
    const panel = document.getElementById('nav-menu');
    const links = panel.querySelectorAll('.nav__link');

    let isMenuOpen = false;

    const open = () => {
        panel.classList.add('menu-open');
        document.body.classList.add('overflow-hidden');
        btn.setAttribute('aria-expanded', 'true');
        isMenuOpen = true;
    };

    const close = () => {
        panel.classList.remove('menu-open');
        document.body.classList.remove('overflow-hidden');
        btn.setAttribute('aria-expanded', 'false');
        isMenuOpen = false;
    };

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        isMenuOpen ? close() : open();
    });

    links.forEach(link => {
        link.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) close();
    });

    btn.setAttribute('aria-expanded', 'false');
})();
/*=============== VIDEO SCROLL EFFECT ===============*/

    /*=============== ADD SHADOW HEADER ===============*/


    /*=============== SHOW SCROLL UP ===============*/ 


    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


    /*=============== SCROLL REVEAL ANIMATION ===============*/
