document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('navbar');

    setTransparent();

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            setSolid();
        } else {
            setTransparent();
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
});
