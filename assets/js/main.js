    /* (Menú lateral eliminado — reemplazado por barra social fija) */

/*=============== IMAGE RECOVERY: reintentar imágenes que fallan ===============*/
document.addEventListener('DOMContentLoaded', () => {
    const MAX_RETRIES = 2;
    const RETRY_DELAY = 1500;

    function retryImage(img, attempt) {
        if (attempt >= MAX_RETRIES) return;
        const originalSrc = img.dataset.originalSrc || img.getAttribute('src');
        if (!originalSrc) return;

        setTimeout(() => {
            const sep = originalSrc.includes('?') ? '&' : '?';
            img.src = originalSrc + sep + '_r=' + Date.now();
        }, RETRY_DELAY * (attempt + 1));
    }

    document.querySelectorAll('img').forEach(img => {
        img.dataset.originalSrc = img.getAttribute('src');

        img.addEventListener('error', function handler() {
            const attempt = parseInt(img.dataset.retryCount || '0', 10);
            img.dataset.retryCount = attempt + 1;
            if (attempt < MAX_RETRIES) {
                retryImage(img, attempt);
            }
        });

        // Si la imagen ya cargó pero está rota (0×0), reintentar
        if (img.complete && img.naturalWidth === 0 && img.src) {
            retryImage(img, 0);
        }
    });
});

/*=============== VIDEO SCROLL EFFECT ===============*/

    /*=============== ADD SHADOW HEADER ===============*/


    /*=============== SHOW SCROLL UP ===============*/


    /*=============== SCROLL SECTIONS ACTIVE LINK ===============*/


    /*=============== SCROLL REVEAL ANIMATION ===============*/

/*=============== SERVICIOS — MODAL + ANIMACIÓN ===============*/
(() => {
    const serviciosData = [
        {
            titulo: 'M-Sculp',
            desc: 'Energía electromagnética de alta intensidad (HIFEM) que genera contracciones supramáximales para esculpir, tonificar y levantar glúteos. Aprobado por FDA. Trabaja glúteos, abdomen, muslos, brazos y pantorrillas. Resultados visibles desde las primeras sesiones sin dolor ni tiempo de recuperación.',
            img: 'assets/img/terapias/MSCULP.jpg'
        },
        {
            titulo: 'Tensamax',
            desc: 'Radiofrecuencia monopolar capacitiva y resistiva. Reafirma la piel, reduce grasa localizada, elimina celulitis y estimula la producción de colágeno y elastina. Ideal para rostro, cuello, abdomen, brazos y piernas. Tratamiento indoloro con resultados progresivos y duraderos.',
            img: 'assets/img/terapias/TENSAMAX.jpg'
        },
        {
            titulo: 'Exilis Ultra 360',
            desc: 'Tecnología BTL que combina radiofrecuencia y ultrasonido para rejuvenecer la piel y reducir grasa de forma no invasiva e indolora. Actúa en rostro, papada, abdomen, flancos y muslos. Protocolo clínicamente probado que ofrece resultados desde la primera sesión.',
            img: 'assets/img/terapias/EXILIS.jpg'
        },
        {
            titulo: 'Gimnasia Pasiva',
            desc: 'Electroestimulación muscular que tonifica, mejora la circulación sanguínea y alivia dolores musculares sin esfuerzo físico. Perfecta para abdomen, glúteos, piernas y brazos. Complemento ideal para potenciar los resultados de otros tratamientos corporales.',
            img: 'assets/img/terapias/GIMNASIA-PASIVA.jpg'
        },
        {
            titulo: 'Cavitación',
            desc: 'Ondas ultrasónicas de baja frecuencia que destruyen las células de grasa localizada de forma selectiva. Sin cirugía, sin dolor, sin tiempo de recuperación. Resultados medibles en abdomen, flancos, muslos, espalda y brazos desde la primera sesión.',
            img: 'assets/img/terapias/CAVITACION.jpg'
        },
        {
            titulo: 'Sesión Personalizada',
            desc: 'Valoración individual completa: evaluamos tu postura, respiración, estado del suelo pélvico, diástasis (si aplica) y objetivos personales. A partir de ahí diseñamos un plan de terapia a medida con frecuencia, duración y tipo de ejercicios adaptados a ti. Incluye seguimiento periódico y ajustes del programa según tu progreso. La opción ideal si tienes una condición específica o buscas resultados óptimos.',
            img: 'assets/img/terapias/sesion-perzonalizada.jpeg'
        }
    ];

    /* --- IntersectionObserver para animar entrada --- */
    const cards = document.querySelectorAll('.servicio-card');
    if (cards.length) {
        /* Paso 1: marcar tarjetas para animación (solo si JS funciona) */
        cards.forEach(card => card.classList.add('will-animate'));

        /* Paso 2: observer para revelar al hacer scroll */
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
        }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });

        cards.forEach(card => observer.observe(card));

        /* Paso 3: seguro — si en 3s alguna sigue oculta, mostrarla */
        setTimeout(() => {
            cards.forEach(card => {
                if (!card.classList.contains('is-visible')) {
                    card.classList.add('is-visible');
                }
            });
        }, 3000);
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

    /* --- Marcar para animación + IntersectionObserver para fade-in --- */
    testimonioCards.forEach(c => c.classList.add('will-animate'));

    let tRevealedCount = 0;
    const obsT = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('is-visible'), tRevealedCount * 120);
                tRevealedCount++;
                obsT.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    testimonioCards.forEach(c => obsT.observe(c));

    /* Seguro: mostrar todo tras 3s */
    setTimeout(() => {
        testimonioCards.forEach(c => {
            if (!c.classList.contains('is-visible')) {
                c.classList.add('is-visible');
            }
        });
    }, 3000);

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

/*=============== ANIMACION TITULOS APILADOS ===============*/
(() => {
    /* Observa el h1 del hero para animar las lineas con fade-in escalonado */
    const heroTitle = document.querySelector('.inicio-desktop__title');
    if (!heroTitle) return;

    const lines = heroTitle.querySelectorAll('.st-line');
    if (!lines.length) return;

    /* Estado inicial: ocultas */
    lines.forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(18px)';
        line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const obsHero = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                lines.forEach((line, i) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                        line.style.transform = 'translateY(0)';
                    }, i * 120);
                });
                obsHero.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    obsHero.observe(heroTitle);

    /* Seguro: mostrar todo tras 3s */
    setTimeout(() => {
        lines.forEach(line => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        });
    }, 3000);
})();

