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
            desc: 'Tecnología HIFEM (High-Intensity Focused Electromagnetic) que genera más de 20.000 contracciones supramáximales por sesión, activando el 100% de las fibras musculares — algo imposible mediante el ejercicio voluntario. Esculpe, tonifica y fortalece glúteos, abdomen, muslos, brazos y pantorrillas. Estudios clínicos demuestran un aumento del 25% en masa muscular y una reducción del 30% en grasa tras un ciclo de 4 sesiones de 30 minutos. Sin dolor, sin anestesia y sin tiempo de recuperación. Protocolo aprobado por la FDA con una tasa de satisfacción del 96%.',
            img: 'assets/img/terapias/MSCULP.jpg'
        },
        {
            titulo: 'Tensamax',
            desc: 'Sistema de radiofrecuencia monopolar capacitiva y resistiva que genera un efecto térmico profundo en los tejidos. Eleva la temperatura interna estimulando la producción natural de colágeno y elastina, los dos pilares de la firmeza cutánea. Reafirma la piel, reduce celulitis, grasa visceral y fibrosis, redefine contornos corporales y mejora la textura de estrías y cicatrices recientes. Aplicable en rostro, cuello, abdomen, brazos y piernas. Resultados visibles a partir de la 4ta sesión, sin molestias ni tiempo de recuperación.',
            img: 'assets/img/terapias/TENSAMAX.jpg'
        },
        {
            titulo: 'Exilis Ultra 360',
            desc: 'Equipo de última generación de BTL que combina por primera vez radiofrecuencia monopolar con ultrasonido focalizado en un solo dispositivo. Esta doble acción permite reducir depósitos de grasa localizada, estimular la producción de colágeno, combatir la flacidez y suavizar líneas de expresión. Aprobado por la FDA, actúa en rostro, cuello, papada, abdomen, flancos, muslos y áreas íntimas. Tratamiento completamente no invasivo con resultados visibles desde la primera sesión que mejoran progresivamente durante las semanas siguientes.',
            img: 'assets/img/terapias/EXILIS.jpg'
        },
        {
            titulo: 'Gimnasia Pasiva',
            desc: 'Electroestimulación muscular (EMS) que reproduce las señales eléctricas del sistema nervioso para activar la contracción muscular sin esfuerzo físico. Tonifica y define la musculatura, mejora la circulación sanguínea y linfática, combate la flacidez y alivia dolores musculares y la sensación de piernas pesadas. Ideal para abdomen, glúteos, piernas y brazos. Sesiones de 30 a 45 minutos que complementan y potencian los resultados de otros tratamientos corporales. Perfecta para quienes buscan resultados sin impacto articular.',
            img: 'assets/img/terapias/GIMNASIA-PASIVA.jpg'
        },
        {
            titulo: 'Cavitación',
            desc: 'Lipocavitación ultrasónica de baja frecuencia que genera microburbujas dentro del tejido adiposo. Al implosionar, estas burbujas rompen selectivamente las membranas de las células grasas (adipocitos), liberando los triglicéridos que el cuerpo elimina de forma natural a través del sistema linfático y urinario. Alternativa segura y no invasiva a la liposucción, sin anestesia ni tiempo de recuperación. Eficaz en abdomen, flancos, muslos, espalda y brazos. Sesiones de 40 minutos con resultados medibles desde la primera aplicación.',
            img: 'assets/img/terapias/CAVITACION.jpg'
        },
        {
            titulo: 'Sesión Personalizada',
            desc: 'Valoración integral donde evaluamos tu postura, patrón respiratorio, estado del suelo pélvico, posible diástasis abdominal y tus objetivos específicos. A partir de este diagnóstico, diseñamos un plan terapéutico completamente a medida con técnicas hipopresivas adaptadas a tu etapa: recuperación postparto (desde 6-8 semanas en parto vaginal o 10-12 semanas post-cesárea), fortalecimiento del core profundo, rehabilitación del suelo pélvico o mejora postural. Incluye seguimiento periódico y ajustes progresivos del programa. Los hipopresivos además estimulan la producción de serotonina y dopamina, contribuyendo al bienestar emocional.',
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

