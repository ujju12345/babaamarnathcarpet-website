/* ==========================================================================
   Gallery — category filters and lightbox
   Markup contract:
     [data-gallery-filters] button[data-filter="all|living|..."]
     [data-gallery] .masonry__item[data-category] > img (+ data-title)
     [data-lightbox] with [data-lb-img] [data-lb-title] [data-lb-category]
                          [data-lb-count] [data-lb-prev] [data-lb-next] [data-lb-close]
   ========================================================================== */
(function () {
  "use strict";

  const gallery = document.querySelector("[data-gallery]");
  if (!gallery) return;

  const items = Array.from(gallery.querySelectorAll(".masonry__item"));
  const filterBar = document.querySelector("[data-gallery-filters]");
  const countEl = document.querySelector("[data-gallery-count]");
  const lightbox = document.querySelector("[data-lightbox]");

  /* Filters --------------------------------------------------------------- */
  function visibleItems() {
    return items.filter(function (item) {
      return !item.hidden;
    });
  }

  function updateCount() {
    if (countEl) {
      const n = visibleItems().length;
      countEl.textContent = n + (n === 1 ? " image" : " images");
    }
  }

  function applyFilter(filter) {
    items.forEach(function (item) {
      const show = filter === "all" || item.dataset.category === filter;
      item.hidden = !show;
      if (show) {
        item.classList.remove("is-filtering");
        void item.offsetWidth;
        item.classList.add("is-filtering");
      }
    });
    updateCount();
  }

  if (filterBar) {
    const buttons = Array.from(filterBar.querySelectorAll("[data-filter]"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === button));
        });
        applyFilter(button.dataset.filter);
      });
    });

    // Allow deep links such as gallery.html#hotel
    const hash = window.location.hash.replace("#", "");
    const preset = hash && buttons.find(function (b) {
      return b.dataset.filter === hash;
    });
    if (preset) preset.click();
  }
  updateCount();

  /* Lightbox -------------------------------------------------------------- */
  if (!lightbox) return;

  const lbImg = lightbox.querySelector("[data-lb-img]");
  const lbTitle = lightbox.querySelector("[data-lb-title]");
  const lbCategory = lightbox.querySelector("[data-lb-category]");
  const lbCount = lightbox.querySelector("[data-lb-count]");
  const closeBtn = lightbox.querySelector("[data-lb-close]");
  let current = [];
  let index = 0;
  let opener = null;

  function show(i) {
    index = (i + current.length) % current.length;
    const item = current[index];
    const img = item.querySelector("img");
    lbImg.classList.add("is-loading");
    lbImg.onload = function () {
      lbImg.classList.remove("is-loading");
    };
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbTitle.textContent = item.dataset.title || img.alt;
    lbCategory.textContent = item.dataset.label || "";
    lbCount.textContent = index + 1 + " / " + current.length;
  }

  function open(item) {
    current = visibleItems();
    opener = item;
    show(current.indexOf(item));
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (opener) opener.focus();
  }

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      open(item);
    });
  });

  lightbox.querySelector("[data-lb-prev]").addEventListener("click", function () {
    show(index - 1);
  });
  lightbox.querySelector("[data-lb-next]").addEventListener("click", function () {
    show(index + 1);
  });
  closeBtn.addEventListener("click", close);

  // Clicking the dark backdrop (not the photo or controls) closes the lightbox
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox || event.target.classList.contains("lightbox__stage")) close();
  });

  document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") show(index + 1);
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "Tab") {
      // Trap focus within the lightbox controls
      const controls = Array.from(lightbox.querySelectorAll("button"));
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  // Basic swipe support on touch screens
  let touchX = null;
  lightbox.addEventListener(
    "touchstart",
    function (event) {
      touchX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );
  lightbox.addEventListener(
    "touchend",
    function (event) {
      if (touchX === null) return;
      const dx = event.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(dx < 0 ? index + 1 : index - 1);
      touchX = null;
    },
    { passive: true }
  );
})();
