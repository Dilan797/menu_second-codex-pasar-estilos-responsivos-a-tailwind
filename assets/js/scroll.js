    /* =========================================================================
    Scroll Carousel v1.0
    – desplaza verticalmente un track de imágenes dentro de un contenedor
        circular mientras el usuario hace scroll.
    – requiere: 
            <section id="menu-showcase">
            …
            <div id="imgTrack">…</div>
            </section>
    ========================================================================= */
(function () {
    // 1. Elementos principales
    const track   = document.getElementById('imgTrack');
    const section = document.getElementById('menu-showcase');

    if (!track || !section) {
        console.warn('[ScrollCarousel] No se encontraron #imgTrack o #menu-showcase.');
        return;
    }

    /* ------------------------------------------------------------
        Callback al hacer scroll – calcula qué parte de la sección
        está visible y aplica translateY negativo al track
    ------------------------------------------------------------ */
    const handleScroll = () => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
        // Desplaza hasta un 50 % del alto del track. Ajusta este factor a tu gusto
        track.style.transform = `translateY(-${progress * 50}%)`;
    };

    /* ------------------------------------------------------------
        Listeners
    ------------------------------------------------------------ */
    // Estado inicial (por si la página carga más abajo)
    handleScroll();

    // Scroll del documento
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Recalcular en resize u orientación
    window.addEventListener('resize', handleScroll, { passive: true });
})();
