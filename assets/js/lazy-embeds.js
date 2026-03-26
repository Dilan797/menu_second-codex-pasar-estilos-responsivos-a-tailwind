/*  ============================================================
    Lazy Embed Loader — Instagram, Facebook & Google Maps
    Carga embeds solo cuando son visibles (IntersectionObserver)
    + el SDK de Instagram se inyecta una sola vez.
    ============================================================ */
(function () {
  "use strict";

  let instagramSDKLoaded = false;
  let instagramSDKLoading = false;
  const instagramQueue = [];

  /* ---------- Utilidad: inyectar SDK de Instagram ---------- */
  function loadInstagramSDK(callback) {
    if (instagramSDKLoaded) {
      callback();
      return;
    }
    instagramQueue.push(callback);
    if (instagramSDKLoading) return;
    instagramSDKLoading = true;

    const s = document.createElement("script");
    s.src = "https://www.instagram.com/embed.js";
    s.async = true;
    s.onload = function () {
      instagramSDKLoaded = true;
      instagramQueue.forEach(function (cb) { cb(); });
      instagramQueue.length = 0;
    };
    document.body.appendChild(s);
  }

  /* ---------- Cargar un embed de Instagram ---------- */
  function activateInstagram(container) {
    var url = container.getAttribute("data-lazy-url");
    var placeholder = container.querySelector(".lazy-embed__placeholder");

    // Mostrar spinner
    if (placeholder) {
      placeholder.innerHTML = '<div class="lazy-embed__spinner"></div><span>Cargando…</span>';
    }

    // Insertar blockquote
    var bq = document.createElement("blockquote");
    bq.className = "instagram-media";
    bq.setAttribute("data-instgrm-captioned", "");
    bq.setAttribute("data-instgrm-permalink", url);
    bq.setAttribute("data-instgrm-version", "14");
    var a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    bq.appendChild(a);
    container.appendChild(bq);

    loadInstagramSDK(function () {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process(container);
      }
      // Ocultar placeholder cuando el iframe cargue
      waitForIframe(container, placeholder);
    });
  }

  /* ---------- Cargar un embed de Facebook ---------- */
  function activateFacebook(container) {
    var url = container.getAttribute("data-lazy-url");
    var placeholder = container.querySelector(".lazy-embed__placeholder");

    if (placeholder) {
      placeholder.innerHTML = '<div class="lazy-embed__spinner"></div><span>Cargando…</span>';
    }

    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.allowFullscreen = true;
    iframe.setAttribute("allow", "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share");
    container.appendChild(iframe);

    waitForIframe(container, placeholder);
  }

  /* ---------- Cargar mapa de Google ---------- */
  function activateMap(mapContainer) {
    var url = mapContainer.getAttribute("data-lazy-fallback");
    var placeholder = mapContainer.querySelector(".lazy-map__placeholder");

    if (placeholder) {
      placeholder.innerHTML = '<div class="lazy-embed__spinner"></div><span>Cargando mapa…</span>';
    }

    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    mapContainer.insertBefore(iframe, mapContainer.firstChild);

    iframe.addEventListener("load", function () {
      if (placeholder) placeholder.style.display = "none";
    });
    // Fallback: ocultar placeholder tras 8s
    setTimeout(function () {
      if (placeholder) placeholder.style.display = "none";
    }, 8000);
  }

  /* ---------- Esperar a que aparezca el iframe ---------- */
  function waitForIframe(container, placeholder) {
    if (!placeholder) return;
    var attempts = 0;
    var check = setInterval(function () {
      var iframe = container.querySelector("iframe");
      attempts++;
      if (iframe) {
        iframe.addEventListener("load", function () {
          placeholder.style.display = "none";
        });
        // Fallback si el load ya ocurrio
        setTimeout(function () {
          placeholder.style.display = "none";
        }, 5000);
        clearInterval(check);
      }
      if (attempts > 40) { // 8 segundos max
        placeholder.style.display = "none";
        clearInterval(check);
      }
    }, 200);
  }

  /* ---------- Intersection Observer para videos ---------- */
  var videoObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var el = entry.target;
      var type = el.getAttribute("data-lazy-type");
      el.classList.add("lazy-embed--loading");

      if (type === "instagram") {
        activateInstagram(el);
      } else if (type === "facebook") {
        activateFacebook(el);
      }

      videoObserver.unobserve(el);
    });
  }, { rootMargin: "200px 0px" }); // Empieza a cargar 200px antes de ser visible

  /* ---------- Intersection Observer para mapa ---------- */
  var mapObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      activateMap(entry.target);
      mapObserver.unobserve(entry.target);
    });
  }, { rootMargin: "300px 0px" });

  /* ---------- Inicializar ---------- */
  document.querySelectorAll(".lazy-embed[data-lazy-type]").forEach(function (el) {
    videoObserver.observe(el);
  });

  document.querySelectorAll(".lazy-map[data-lazy-map]").forEach(function (el) {
    mapObserver.observe(el);
  });
})();
