    /* (Menú lateral eliminado — reemplazado por barra social fija) */
/*=============== VIDEO SCROLL EFFECT ===============*/

    /*=============== ADD SHADOW HEADER ===============*/


    /*=============== SHOW SCROLL UP ===============*/ 


    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


    /*=============== SCROLL REVEAL ANIMATION ===============*/

/*=============== SERVICIOS — MODAL + ANIMACIÓN ===============*/
(() => {
    const serviciosData = [
        {
            titulo: 'Hipopresivos Básico',
            desc: 'Programa de iniciación donde aprendes las posturas fundamentales, la técnica de aspiración diafragmática (apnea espiratoria) y la correcta activación de la faja abdominal. Ideal si nunca has practicado hipopresivos. Trabajamos la conciencia corporal, la alineación postural y la respiración costal antes de avanzar a secuencias más complejas. Sesiones de 45 minutos en grupos reducidos.',
            img: 'assets/img/servicios/basico.jpg'
        },
        {
            titulo: 'Hipopresivos Avanzado',
            desc: 'Para quienes ya dominan la técnica básica. Incluye secuencias dinámicas en bipedestación, cuadrupedia y decúbito con transiciones fluidas. Se intensifica el trabajo de vacío abdominal, se incorporan variantes con brazos en chandelier y crown, y se aumenta el tiempo de apnea. Mejora visible en reducción de perímetro de cintura, tono del core profundo y postura global. Sesiones de 60 minutos.',
            img: 'assets/img/servicios/avanzado.jpg'
        },
        {
            titulo: 'Recuperación Postparto',
            desc: 'Programa especializado para madres recientes (a partir de 6-8 semanas postparto o tras alta médica). Abordamos la diástasis abdominal, la recuperación del suelo pélvico y la reconexión con la musculatura profunda. El protocolo incluye valoración inicial, progresión individualizada y seguimiento con mediciones de diástasis. Complementamos con ejercicios de movilidad y fortalecimiento suave.',
            img: 'assets/img/servicios/postparto.jpg'
        },
        {
            titulo: 'Terapia de Suelo Pélvico',
            desc: 'Rehabilitación integral del suelo pélvico para tratar y prevenir incontinencia urinaria, prolapsos leves, dolor pélvico crónico e hipertonía. Combinamos hipopresivos con ejercicios específicos de conciencia perineal, técnicas manuales y electroestimulación cuando es necesario. Cada plan es 100% individualizado tras una valoración funcional completa.',
            img: 'assets/img/servicios/suelo-pelvico.jpg'
        },
        {
            titulo: 'Hipopresivos & Pilates',
            desc: 'Lo mejor de ambas disciplinas en una sola sesión. Fusionamos la técnica hipopresiva (vacío abdominal, reprogramación postural) con los principios de Pilates (control, precisión, fluidez). El resultado: un core fuerte sin presión intraabdominal, mayor flexibilidad, mejor alineación y una silueta más estilizada. Ideal para deportistas y personas activas. Sesiones de 60 minutos.',
            img: 'assets/img/servicios/pilates.jpg'
        },
        {
            titulo: 'Sesión Personalizada',
            desc: 'Valoración individual completa: evaluamos tu postura, respiración, estado del suelo pélvico, diástasis (si aplica) y objetivos personales. A partir de ahí diseñamos un plan de terapia a medida con frecuencia, duración y tipo de ejercicios adaptados a ti. Incluye seguimiento periódico y ajustes del programa según tu progreso. La opción ideal si tienes una condición específica o buscas resultados óptimos.',
            img: 'assets/img/servicios/personalizada.jpg'
        }
    ];

    /* --- IntersectionObserver para animar entrada --- */
    const cards = document.querySelectorAll('.servicio-card');
    if (cards.length) {
        let revealedCount = 0;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, revealedCount * 100);
                    revealedCount++;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });

        cards.forEach(card => observer.observe(card));

        /* Fallback: si tras 2.5s alguna tarjeta sigue oculta, forzar visibilidad */
        setTimeout(() => {
            cards.forEach(card => {
                if (!card.classList.contains('is-visible')) {
                    card.classList.add('no-js-fallback');
                }
            });
        }, 2500);
    }

    /* --- Modal --- */
    const modal = document.getElementById('servicio-modal');
    if (!modal) return;

    const backdrop = modal.querySelector('.servicio-modal__backdrop');
    const closeBtn = modal.querySelector('.servicio-modal__close');
    const modalImg = modal.querySelector('.servicio-modal__img');
    const modalTitle = modal.querySelector('.servicio-modal__content h3');
    const modalDesc = modal.querySelector('.servicio-modal__content p');

    const openModal = (index) => {
        const data = serviciosData[index];
        if (!data) return;
        modalImg.src = data.img;
        modalImg.alt = data.titulo;
        modalTitle.textContent = data.titulo;
        modalDesc.textContent = data.desc;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('overflow-hidden');
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('overflow-hidden');
    };

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const idx = card.getAttribute('data-service');
            openModal(parseInt(idx, 10));
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
})();

/*=============== TESTIMONIOS — SLIDER + ANIMACIÓN ===============*/
(() => {
    const slider = document.querySelector('.testimonios-slider');
    const testimonioCards = document.querySelectorAll('.testimonio-card');
    const dotsContainer = document.querySelector('.testimonios-dots');
    if (!slider || !testimonioCards.length || !dotsContainer) return;

    /* --- IntersectionObserver para fade-in --- */
    let tRevealedCount = 0;
    const obsT = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('is-visible'), tRevealedCount * 120);
                tRevealedCount++;
                obsT.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 50px 0px' });
    testimonioCards.forEach(c => obsT.observe(c));

    /* Fallback: forzar visibilidad si el observer no dispara */
    setTimeout(() => {
        testimonioCards.forEach(c => {
            if (!c.classList.contains('is-visible')) {
                c.classList.add('no-js-fallback');
            }
        });
    }, 2500);

    /* --- Calcular cuántas tarjetas se ven a la vez --- */
    const getVisible = () => {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    };

    let current = 0;
    const gap = 32; /* 2rem */

    const totalSlides = () => Math.max(testimonioCards.length - getVisible() + 1, 1);

    /* --- Crear dots --- */
    const buildDots = () => {
        dotsContainer.innerHTML = '';
        const count = totalSlides();
        for (let i = 0; i < count; i++) {
            const btn = document.createElement('button');
            btn.setAttribute('aria-label', `Testimonio ${i + 1}`);
            if (i === current) btn.classList.add('active');
            btn.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(btn);
        }
    };

    const updateDots = () => {
        dotsContainer.querySelectorAll('button').forEach((btn, i) => {
            btn.classList.toggle('active', i === current);
        });
    };

    const goTo = (index) => {
        current = Math.max(0, Math.min(index, totalSlides() - 1));
        const cardWidth = testimonioCards[0].getBoundingClientRect().width;
        slider.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
        updateDots();
    };

    /* --- Swipe táctil --- */
    let startX = 0;
    let isDragging = false;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goTo(current + 1) : goTo(current - 1);
        }
    }, { passive: true });

    /* --- Auto-play (pausa al hover) --- */
    let autoTimer = setInterval(() => {
        current >= totalSlides() - 1 ? goTo(0) : goTo(current + 1);
    }, 5000);

    const section = document.getElementById('testimonios');
    section.addEventListener('mouseenter', () => clearInterval(autoTimer));
    section.addEventListener('mouseleave', () => {
        autoTimer = setInterval(() => {
            current >= totalSlides() - 1 ? goTo(0) : goTo(current + 1);
        }, 5000);
    });

    /* --- Init + resize --- */
    buildDots();
    window.addEventListener('resize', () => {
        current = Math.min(current, totalSlides() - 1);
        buildDots();
        goTo(current);
    });
})();
