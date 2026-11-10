/* ==========================================================================
   Main interactions — shared across all pages
   1. Company details from config.js     6. Testimonials slider
   2. Announcement rotator               7. Timeline progress line
   3. Scroll reveal                      8. Contact form validation
   4. Animated counters                  9. Back to top + footer year
   5. Materials explorer tabs
   ========================================================================== */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Company details ---------------------------------------------------- */
  function whatsappUrl(message) {
    const cfg = window.SITE_CONFIG || {};
    const text = encodeURIComponent(message || cfg.whatsappMessage || "");
    return "https://wa.me/" + (cfg.whatsappNumber || "") + (text ? "?text=" + text : "");
  }

  function applyConfig() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    document.querySelectorAll("[data-config]").forEach(function (el) {
      switch (el.dataset.config) {
        case "phone":
          if (el.tagName === "A" && cfg.phoneNumbers && cfg.phoneNumbers.length) {
            // All numbers share one inline wrapper so they stay on one line,
            // even where the parent stacks its children (e.g. the footer list).
            const group = document.createElement("span");
            group.className = "phone-group";
            el.before(group);
            group.appendChild(el);
            cfg.phoneNumbers.forEach(function (phone, i) {
              const link = i === 0 ? el : document.createElement("a");
              link.textContent = phone.display;
              link.href = "tel:" + phone.link;
              if (i) {
                const sep = document.createElement("span");
                sep.className = "phone-sep";
                sep.textContent = ", ";
                group.append(sep, link);
              }
            });
          } else {
            el.textContent = cfg.phoneDisplay;
            if (el.tagName === "A") el.href = "tel:" + cfg.phoneLink;
          }
          break;
        case "tel":
          // Updates the link only, keeping the button label (e.g. "Call Us")
          el.href = "tel:" + cfg.phoneLink;
          break;
        case "email":
          el.textContent = cfg.email;
          if (el.tagName === "A") el.href = "mailto:" + cfg.email;
          break;
        case "address":
          el.innerHTML = "";
          cfg.addressLines.forEach(function (line, i) {
            if (i) el.appendChild(document.createElement("br"));
            el.appendChild(document.createTextNode(line));
          });
          break;
        case "hours":
          el.textContent = cfg.hours;
          break;
        case "whatsapp":
          el.href = whatsappUrl(el.dataset.waMessage);
          break;
      }
    });

    document.querySelectorAll("[data-social]").forEach(function (el) {
      const url = cfg.social && cfg.social[el.dataset.social];
      if (url) el.href = url;
      else el.hidden = true;
    });

    const map = document.querySelector("[data-map]");
    if (map && cfg.mapEmbedUrl) {
      const iframe = document.createElement("iframe");
      iframe.src = cfg.mapEmbedUrl;
      iframe.title = "Map showing our showroom location";
      iframe.loading = "lazy";
      iframe.referrerPolicy = "no-referrer-when-downgrade";
      iframe.allowFullscreen = true;
      map.innerHTML = "";
      map.appendChild(iframe);
    }
  }

  /* 2. Announcement rotator ---------------------------------------------- */
  function initRotator() {
    const rotator = document.querySelector("[data-rotator]");
    if (!rotator) return;
    const messages = rotator.querySelectorAll(".announcement__msg");
    if (messages.length < 2 || prefersReducedMotion) return;

    let index = 0;
    let timer = null;

    function next() {
      messages[index].classList.remove("is-active");
      index = (index + 1) % messages.length;
      messages[index].classList.add("is-active");
    }

    function start() {
      timer = window.setInterval(next, 5000);
    }

    rotator.addEventListener("mouseenter", function () {
      window.clearInterval(timer);
    });
    rotator.addEventListener("mouseleave", start);
    start();
  }

  /* 3. Scroll reveal ------------------------------------------------------ */
  function initReveal() {
    // Children of [data-stagger] reveal one after another
    document.querySelectorAll("[data-stagger]").forEach(function (group) {
      const step = parseFloat(group.dataset.stagger) || 0.1;
      Array.from(group.children).forEach(function (child, i) {
        child.style.setProperty("--delay", (i * step).toFixed(2) + "s");
      });
    });

    const targets = document.querySelectorAll(".reveal, .reveal-media, .timeline__item");
    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* 4. Animated counters -------------------------------------------------- */
  function initCounters() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    function format(value) {
      return Math.round(value).toLocaleString("en-IN");
    }

    function run(el) {
      const end = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      if (prefersReducedMotion) {
        el.textContent = format(end) + suffix;
        return;
      }
      const duration = 1800;
      const startTime = performance.now();
      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(end * eased) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }

    if (!("IntersectionObserver" in window)) {
      counters.forEach(run);
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          run(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* 5. Materials explorer tabs ------------------------------------------- */
  function initMaterialTabs() {
    const tablist = document.querySelector("[data-material-tabs]");
    if (!tablist) return;
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (t) {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (!panel) return;
        panel.hidden = !selected;
        if (selected) {
          panel.classList.remove("is-entering");
          void panel.offsetWidth; // restart the entrance animation
          panel.classList.add("is-entering");
        }
      });
      if (focus) tab.focus();
      if (window.matchMedia("(max-width: 1180px)").matches) {
        tab.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest", inline: "center" });
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () {
        select(tab, false);
      });
      tab.addEventListener("keydown", function (event) {
        let nextIndex = null;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (i + 1) % tabs.length;
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (i - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        select(tabs[nextIndex], true);
      });
    });
  }

  /* 6. Testimonials slider ------------------------------------------------ */
  function initTestimonials() {
    const root = document.querySelector("[data-testimonials]");
    if (!root) return;
    const slides = Array.from(root.querySelectorAll(".testimonial"));
    const dotsWrap = root.querySelector("[data-dots]");
    const prev = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");
    let index = 0;
    let timer = null;

    const dots = slides.map(function (_, i) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Show testimonial " + (i + 1));
      dot.addEventListener("click", function () {
        go(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function go(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (slide, n) {
        const active = n === index;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
      });
      dots.forEach(function (dot, n) {
        dot.setAttribute("aria-current", String(n === index));
      });
    }

    function restart() {
      window.clearInterval(timer);
      if (!prefersReducedMotion) {
        timer = window.setInterval(function () {
          go(index + 1);
        }, 7000);
      }
    }

    prev.addEventListener("click", function () {
      go(index - 1);
      restart();
    });
    next.addEventListener("click", function () {
      go(index + 1);
      restart();
    });
    root.addEventListener("mouseenter", function () {
      window.clearInterval(timer);
    });
    root.addEventListener("mouseleave", restart);
    root.addEventListener("focusin", function () {
      window.clearInterval(timer);
    });

    go(0);
    restart();
  }

  /* 7. Timeline progress line -------------------------------------------- */
  function initTimeline() {
    const timeline = document.querySelector("[data-timeline]");
    if (!timeline) return;
    let ticking = false;

    function update() {
      const rect = timeline.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport * 0.6 - rect.top) / rect.height;
      timeline.style.setProperty("--progress", Math.max(0, Math.min(1, progress)).toFixed(3));
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          requestAnimationFrame(update);
          ticking = true;
        }
      },
      { passive: true }
    );
    update();
  }

  /* 8. Contact form ------------------------------------------------------- */
  function initContactForm() {
    const form = document.querySelector("[data-enquiry-form]");
    if (!form) return;
    const status = form.querySelector("[data-form-status]");

    // Pre-fill from links such as contact.html?type=custom&collection=Wool%20Carpets
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    const collection = params.get("collection");
    if (type && form.elements.enquiryType) {
      const option = form.elements.enquiryType.querySelector('option[value="' + CSS.escape(type) + '"]');
      if (option) form.elements.enquiryType.value = type;
    }
    if (collection) {
      if (form.elements.enquiryType && !type) form.elements.enquiryType.value = "collection";
      if (form.elements.message && !form.elements.message.value) {
        form.elements.message.value =
          "I'm interested in your " + collection + ". Please share available designs, sizes and lead times.";
      }
    }

    const rules = {
      name: function (v) {
        if (!v) return "Please enter your full name.";
        if (v.length < 2) return "Name looks too short.";
        return "";
      },
      email: function (v) {
        if (!v) return "Please enter your email address.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address.";
        return "";
      },
      phone: function (v) {
        if (!v) return "Please enter your phone number.";
        const digits = v.replace(/\D/g, "");
        if (!/^[+\d\s()-]+$/.test(v) || digits.length < 8 || digits.length > 15) {
          return "Please enter a valid phone number, including country code.";
        }
        return "";
      },
      enquiryType: function (v) {
        return v ? "" : "Please choose an enquiry type.";
      },
      message: function (v) {
        if (!v) return "Please tell us a little about your requirement.";
        if (v.length < 20) return "Please add a few more details (at least 20 characters).";
        return "";
      },
      consent: function (_, el) {
        return el.checked ? "" : "Please agree so we can respond to your enquiry.";
      }
    };

    function validateField(el) {
      const rule = rules[el.name];
      if (!rule) return true;
      const field = el.closest(".field") || el.closest(".form-consent");
      const errorEl = field && field.querySelector(".field__error");
      const message = rule(el.value.trim(), el);
      if (field) {
        field.classList.toggle("is-invalid", !!message);
        field.classList.toggle("is-valid", !message && el.type !== "checkbox");
      }
      el.setAttribute("aria-invalid", String(!!message));
      if (errorEl) errorEl.textContent = message;
      return !message;
    }

    Array.from(form.elements).forEach(function (el) {
      if (!rules[el.name]) return;
      el.addEventListener("blur", function () {
        if (el.value.trim() || el.type === "checkbox") validateField(el);
      });
      el.addEventListener("input", function () {
        if (el.getAttribute("aria-invalid") === "true") validateField(el);
      });
      el.addEventListener("change", function () {
        validateField(el);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let firstInvalid = null;
      Array.from(form.elements).forEach(function (el) {
        if (rules[el.name] && !validateField(el) && !firstInvalid) firstInvalid = el;
      });

      status.classList.remove("is-visible", "is-error");

      if (firstInvalid) {
        status.textContent = "Please review the highlighted fields and try again.";
        status.classList.add("is-visible", "is-error");
        firstInvalid.focus();
        return;
      }

      const fields = form.elements;
      const enquiryLabel = fields.enquiryType.options[fields.enquiryType.selectedIndex].text;
      const body = [
        "Name: " + fields.name.value.trim(),
        "Email: " + fields.email.value.trim(),
        "Phone: " + fields.phone.value.trim(),
        "Company / Studio: " + (fields.company.value.trim() || "Not provided"),
        "Enquiry type: " + enquiryLabel,
        "",
        fields.message.value.trim()
      ].join("\n");
      const recipient = (window.SITE_CONFIG && window.SITE_CONFIG.email) || "amarnathrugs@gmail.com";
      const subject = "Website enquiry — " + fields.name.value.trim();

      status.textContent = "Your email app should open with your enquiry ready. Please press Send there. If it does not open, use the WhatsApp button.";
      status.classList.add("is-visible");
      window.location.href = "mailto:" + encodeURIComponent(recipient) +
        "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });

    // "Send via WhatsApp" builds a message from whatever the visitor has typed
    const waButton = document.querySelector("[data-wa-from-form]");
    if (waButton) {
      waButton.addEventListener("click", function (event) {
        const f = form.elements;
        const parts = ["Hello, I have an enquiry."];
        if (f.name.value.trim()) parts.push("Name: " + f.name.value.trim());
        if (f.company.value.trim()) parts.push("Company: " + f.company.value.trim());
        if (f.enquiryType.value) parts.push("Enquiry: " + f.enquiryType.options[f.enquiryType.selectedIndex].text);
        if (f.message.value.trim()) parts.push(f.message.value.trim());
        event.preventDefault();
        window.open(whatsappUrl(parts.join("\n")), "_blank", "noopener");
      });
    }
  }

  /* 9. Back to top + footer year ----------------------------------------- */
  function initBackToTop() {
    const button = document.querySelector("[data-back-to-top]");
    if (!button) return;
    function update() {
      button.classList.toggle("is-visible", window.scrollY > window.innerHeight * 0.9);
    }
    window.addEventListener("scroll", update, { passive: true });
    button.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
    update();
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  applyConfig();
  initRotator();
  initReveal();
  initCounters();
  initMaterialTabs();
  initTestimonials();
  initTimeline();
  initContactForm();
  initBackToTop();
  setYear();

  // Exposed for collections.js / gallery.js
  window.TaanaSite = { whatsappUrl: whatsappUrl };
})();
