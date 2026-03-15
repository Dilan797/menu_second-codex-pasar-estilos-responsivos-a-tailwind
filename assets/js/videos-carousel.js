/*=============== VIDEOS CAROUSEL — scroll horizontal con snap ===============*/
;(function () {
   const track = document.querySelector('.videos-track');
   const dotsWrap = document.querySelector('.videos-dots');
   const btnL = document.querySelector('.videos-arrow--left');
   const btnR = document.querySelector('.videos-arrow--right');
   if (!track || !dotsWrap) return;

   const cards = Array.from(track.querySelectorAll('.video-card'));
   const total = cards.length;

   /* ——— Crear dots ——— */
   cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Video ' + (i + 1));
      dot.addEventListener('click', () => scrollToCard(i));
      dotsWrap.appendChild(dot);
   });
   const dots = Array.from(dotsWrap.querySelectorAll('.dot'));

   /* ——— Scroll a una tarjeta ——— */
   function scrollToCard(idx) {
      const card = cards[idx];
      if (!card) return;
      const trackRect = track.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const offset = cardRect.left - trackRect.left - (trackRect.width / 2) + (cardRect.width / 2);
      track.scrollBy({ left: offset, behavior: 'smooth' });
   }

   /* ——— Detectar tarjeta activa al hacer scroll ——— */
   function getActiveIndex() {
      const center = track.scrollLeft + track.offsetWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
         const cardCenter = card.offsetLeft + card.offsetWidth / 2;
         const dist = Math.abs(center - cardCenter);
         if (dist < minDist) { minDist = dist; closest = i; }
      });
      return closest;
   }

   function updateUI() {
      const idx = getActiveIndex();
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));

      if (btnL && btnR) {
         btnL.disabled = track.scrollLeft <= 10;
         btnR.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 10;
      }
   }

   /* ——— Scroll event (con throttle) ——— */
   let ticking = false;
   track.addEventListener('scroll', () => {
      if (!ticking) {
         requestAnimationFrame(() => { updateUI(); ticking = false; });
         ticking = true;
      }
   }, { passive: true });

   /* ——— Flechas ——— */
   function scrollByCards(dir) {
      const idx = getActiveIndex();
      const next = Math.max(0, Math.min(total - 1, idx + dir));
      scrollToCard(next);
   }
   if (btnL) btnL.addEventListener('click', () => scrollByCards(-1));
   if (btnR) btnR.addEventListener('click', () => scrollByCards(1));

   /* ——— Init ——— */
   updateUI();
})();
