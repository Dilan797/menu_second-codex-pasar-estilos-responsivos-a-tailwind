/* =============== COMPARISON SLIDER — Antes y Después =============== */
(function () {
  'use strict';

  document.querySelectorAll('.comparison-slider').forEach(function (slider) {
    var wrapper = slider.querySelector('.comparison-slider__wrapper');
    var before  = slider.querySelector('.comparison-slider__before');
    var handle  = slider.querySelector('.comparison-slider__handle');
    var isDragging = false;

    var labelBefore = slider.querySelector('.comparison-slider__label--before');
    var labelAfter  = slider.querySelector('.comparison-slider__label--after');

    function setPosition(pct) {
      pct = Math.max(0, Math.min(100, pct));
      before.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      handle.style.left = pct + '%';

      /* Ocultar etiquetas cuando el slider llega al extremo */
      if (labelBefore) labelBefore.style.opacity = pct < 5 ? '0' : '1';
      if (labelAfter)  labelAfter.style.opacity  = pct > 95 ? '0' : '1';
    }

    function getPercent(clientX) {
      var rect = wrapper.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    /* --- Mouse events --- */
    handle.addEventListener('mousedown', function (e) {
      e.preventDefault();
      isDragging = true;
      wrapper.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', function (e) {
      if (!isDragging) return;
      setPosition(getPercent(e.clientX));
    });

    window.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        wrapper.classList.remove('is-dragging');
      }
    });

    /* --- Touch events --- */
    handle.addEventListener('touchstart', function (e) {
      isDragging = true;
      wrapper.classList.add('is-dragging');
    }, { passive: true });

    window.addEventListener('touchmove', function (e) {
      if (!isDragging) return;
      var touch = e.touches[0];
      setPosition(getPercent(touch.clientX));
    }, { passive: true });

    window.addEventListener('touchend', function () {
      if (isDragging) {
        isDragging = false;
        wrapper.classList.remove('is-dragging');
      }
    });

    /* --- Click on wrapper to jump --- */
    wrapper.addEventListener('click', function (e) {
      if (e.target.closest('.comparison-slider__handle')) return;
      setPosition(getPercent(e.clientX));
    });

    /* --- Initial position + intro animation --- */
    var customEnd = parseFloat(slider.getAttribute('data-end')) || 50;
    setPosition(30);
    setTimeout(function () {
      slider.classList.add('is-ready');
      var start = 30;
      var end = customEnd;
      var duration = 600;
      var startTime = null;

      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        setPosition(start + (end - start) * eased);
        if (progress < 1) requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    }, 400);
  });
})();
