    /*=============== SHOW MENU ===============*/  
    /* Menu show */
(() => {
    const btn   = document.getElementById('nav-toggle');
    const panel = document.getElementById('nav-menu');
    const links = panel.querySelectorAll('.nav__link');

    /* clases que controlan la posición */
    const HIDDEN = '-translate-x-[100%]';  // Estado cerrado
    const VISIBLE = 'translate-x-[50%]';  // Estado abierto    

    const open = () => {
        panel.classList.remove(HIDDEN);
        panel.classList.add(VISIBLE);
        document.body.classList.add('overflow-hidden');
        btn.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
        panel.classList.remove(VISIBLE);
        panel.classList.add(HIDDEN);
        document.body.classList.remove('overflow-hidden');
        btn.setAttribute('aria-expanded', 'false');
    };

    /* toggle con el botón */
    btn.addEventListener('click', () =>
        btn.getAttribute('aria-expanded') === 'true' ? close() : open()
    );

    /* cerrar al seleccionar un enlace */
    links.forEach(l => l.addEventListener('click', close));

    /* cerrar con la tecla ESC */
    document.addEventListener('keydown', e => e.key === 'Escape' && close());
})();
/*=============== VIDEO SCROLL EFFECT ===============*/

    /*=============== ADD SHADOW HEADER ===============*/


    /*=============== SHOW SCROLL UP ===============*/ 


    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


    /*=============== SCROLL REVEAL ANIMATION ===============*/
