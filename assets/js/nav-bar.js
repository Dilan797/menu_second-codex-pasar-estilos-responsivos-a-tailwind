document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('navbar');

    // Estado inicial (en top): fondo transparente
    setTransparent();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
        setSolid();
        } else {
        setTransparent();
        }
    });

    function setTransparent() {
        nav.classList.add('bg-transparent');
        nav.classList.remove('bg-[rgba(255,248,225,0.95)]', 'shadow-[0_2px_10px_rgba(0,0,0,0.1)]');
    }

    function setSolid() {
        nav.classList.add('bg-[rgba(255,248,225,0.95)]', 'shadow-[0_2px_10px_rgba(0,0,0,0.1)]');
        nav.classList.remove('bg-transparent');
    }
});
