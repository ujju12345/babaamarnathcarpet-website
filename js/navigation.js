/* ==========================================================================
   Navigation — sticky header state, active links, mobile drawer
   ========================================================================== */
(function () {
  "use strict";

  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const drawer = document.querySelector("[data-mobile-nav]");
  let lastFocused = null;

  /* Sticky header: add a border/shadow once the page has scrolled */
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Active link: match the current file name against each nav href */
  const current = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav__link, .mobile-nav__list a").forEach(function (link) {
    const target = (link.getAttribute("href") || "").split("#")[0].split("?")[0].toLowerCase();
    if (target === current) link.setAttribute("aria-current", "page");
  });

  if (!toggle || !drawer) return;

  const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function openDrawer() {
    lastFocused = document.activeElement;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    document.body.classList.add("is-locked");
    const first = drawer.querySelector(".mobile-nav__list a");
    // Wait for the panel to become visible before moving focus into it
    window.setTimeout(function () {
      if (first) first.focus();
    }, 60);
  }

  function closeDrawer() {
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-locked");
    if (lastFocused) lastFocused.focus();
  }

  toggle.addEventListener("click", function () {
    if (drawer.classList.contains("is-open")) closeDrawer();
    else openDrawer();
  });

  drawer.querySelectorAll("[data-nav-close]").forEach(function (el) {
    el.addEventListener("click", closeDrawer);
  });

  drawer.querySelectorAll(".mobile-nav__list a").forEach(function (link) {
    link.addEventListener("click", function () {
      drawer.classList.remove("is-open");
      document.body.classList.remove("is-locked");
    });
  });

  document.addEventListener("keydown", function (event) {
    if (!drawer.classList.contains("is-open")) return;

    if (event.key === "Escape") {
      closeDrawer();
      return;
    }

    // Keep keyboard focus inside the open drawer
    if (event.key === "Tab") {
      const items = Array.from(drawer.querySelectorAll(focusableSelector));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  /* Close the drawer if the viewport grows past the mobile breakpoint */
  window.matchMedia("(min-width: 1181px)").addEventListener("change", function (mq) {
    if (mq.matches && drawer.classList.contains("is-open")) closeDrawer();
  });
})();
