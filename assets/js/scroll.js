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
    const tracks  = document.querySelectorAll('.img-track');
    const section = document.getElementById('menu-showcase');

    if (!tracks.length || !section) return;

    /* Callback al hacer scroll – desplaza cada track de imágenes */
    const handleScroll = () => {
        const rect = section.getBoundingClientRect();
        const progress = Math.min(Math.max(-rect.top / rect.height, 0), 1);
        tracks.forEach(track => {
            track.style.transform = `translateY(-${progress * 50}%)`;
        });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
})();

