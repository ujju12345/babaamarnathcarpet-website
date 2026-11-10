/* ==========================================================================
   Collections — group filters and the "Explore" detail dialog
   Short descriptions live in collections.html (good for SEO). The extended
   details shown in the dialog are kept here, keyed by each card's id.
   ========================================================================== */
(function () {
  "use strict";

  const COLLECTION_DETAILS = {
    /* ---------- Material types ---------- */
    wool: {
      intro:
        "Wool is the most trusted carpet fibre in the world. Its natural crimp gives a springy pile that recovers from footfall, lanolin helps repel spills, and it is inherently flame-retardant. We blend Indian highland and imported wools for lustre and strength, and dye in small batches for rich, even colour.",
      specs: { Fibre: "100% wool or wool blends", Construction: "Hand-knotted, tufted, woven", Feel: "Soft, springy, warm", "Ideal for": "Living rooms, bedrooms, hotel suites" },
      highlights: ["Naturally flame-retardant and soil-resistant", "Develops a soft patina with age", "Custom dyed to any shade"]
    },
    silk: {
      intro:
        "The most luxurious carpet fibre. Silk's fine, strong filament allows exceptionally high knot densities, so intricate floral and pictorial designs can be rendered with painterly precision. Its lustre shifts with the light, giving every room a quiet glow.",
      specs: { Fibre: "Pure silk or silk highlights", Construction: "Hand-knotted", Feel: "Cool, smooth, lustrous", "Ideal for": "Formal living, statement pieces" },
      highlights: ["Very high knot density for fine detail", "Colour appears to change with viewing angle", "Best placed in low-traffic areas"]
    },
    cotton: {
      intro:
        "Breathable, washable and naturally matte, cotton is the fibre behind our dhurries and flatweaves and forms the foundation (warp and weft) of most hand-knotted rugs. It takes dye beautifully, from crisp indigos to soft pastels.",
      specs: { Fibre: "100% cotton", Construction: "Flatweave, dhurrie, handloom", Feel: "Light, crisp, flat", "Ideal for": "Kitchens, kids' rooms, casual living" },
      highlights: ["Lightweight and easy to move", "Many designs are machine or hand washable", "Ideal for layering"]
    },
    jute: {
      intro:
        "Golden, earthy and renewable, jute is a fast-growing natural fibre sourced largely from eastern India. Braided, flatwoven or hand-loomed, it brings organic texture and warmth to modern and coastal interiors alike.",
      specs: { Fibre: "Jute or jute-cotton blend", Construction: "Braided, flatweave, handloom", Feel: "Textured, natural", "Ideal for": "Living areas, layering, resorts" },
      highlights: ["Biodegradable and sustainable", "Pairs well with wool for added softness", "Best in dry, indoor spaces"]
    },
    sisal: {
      intro:
        "Harvested from the agave plant, sisal is one of the strongest natural fibres. Its tight, crisp weave in boucle, herringbone and basket patterns stands up to busy hallways, staircases and workplaces while keeping a natural look.",
      specs: { Fibre: "Sisal or sisal-wool", Construction: "Boucle, herringbone, basket weave", Feel: "Firm, structured", "Ideal for": "Entrances, stairs, offices" },
      highlights: ["Highly durable and anti-static", "Finished with cotton or leather binding", "Available wall-to-wall or as area rugs"]
    },
    "bamboo-silk": {
      intro:
        "Bamboo silk is a regenerated cellulose fibre made from bamboo pulp. It offers a luminous, silk-like sheen and deep colour saturation at a more accessible price than pure silk, which makes it a favourite for contemporary hand-knotted and tufted designs.",
      specs: { Fibre: "Bamboo silk or wool blends", Construction: "Hand-knotted, hand-tufted", Feel: "Smooth, high sheen", "Ideal for": "Bedrooms, formal and accent spaces" },
      highlights: ["Vivid colour and lustre", "Beautiful in tone-on-tone designs", "Keep away from high-moisture areas"]
    },
    viscose: {
      intro:
        "A versatile cellulose fibre with a soft hand and lustrous finish. Viscose adds shimmer and tonal depth to modern designs, especially when set against matte wool to create high-low and carved effects.",
      specs: { Fibre: "Viscose or wool-viscose", Construction: "Hand-tufted, handloom", Feel: "Soft, silky", "Ideal for": "Bedrooms, low-traffic living" },
      highlights: ["An affordable alternative to silk", "Dramatic sheen in tonal designs", "Professional cleaning recommended"]
    },
    polyester: {
      intro:
        "Soft, colour-fast and budget-friendly, polyester delivers vibrant, lasting colour and a plush hand. It is the fibre of choice for many shaggy and machine-made rugs, and recycled PET options are available for greener projects.",
      specs: { Fibre: "Polyester / recycled PET", Construction: "Machine-made, tufted, shaggy", Feel: "Plush, soft", "Ideal for": "Bedrooms, kids' rooms, rental homes" },
      highlights: ["Excellent colour retention", "Naturally resists many stains", "Recycled fibre options"]
    },
    nylon: {
      intro:
        "The workhorse of commercial flooring. Nylon's resilience and abrasion resistance make it the first choice for offices, hotel corridors, auditoriums and retail spaces where carpets must look good under constant footfall.",
      specs: { Fibre: "Nylon 6 / Nylon 6,6", Construction: "Broadloom and carpet tiles", Feel: "Firm, resilient", "Ideal for": "Offices, hotels, retail, auditoriums" },
      highlights: ["Best-in-class wear resistance", "Wall-to-wall or modular tiles", "Custom logos and patterns"]
    },
    polypropylene: {
      intro:
        "Solution-dyed, moisture-resistant and cost-effective, polypropylene is ideal for indoor-outdoor use, institutional spaces and value-engineered projects that need large quantities on a tight timeline.",
      specs: { Fibre: "Polypropylene (olefin)", Construction: "Machine-woven, loop pile", Feel: "Firm, lightweight", "Ideal for": "Outdoor areas, events, institutions" },
      highlights: ["Fade- and moisture-resistant", "Easy to clean", "Short production lead times"]
    },
    "natural-fibre": {
      intro:
        "Jute, sisal, seagrass, hemp and banana fibre: our natural collection brings the texture of the earth indoors. Each fibre is sourced responsibly and woven by hand into flatweaves, braids and chunky loop textures.",
      specs: { Fibres: "Jute, sisal, seagrass, hemp, banana", Construction: "Handloom, braided, flatweave", Feel: "Organic, textural", "Ideal for": "Sustainable homes, resorts, layering" },
      highlights: ["Renewable, plant-based fibres", "Neutral palette that suits any scheme", "Can be blended with wool for softness"]
    },
    "blended-fibre": {
      intro:
        "Blends such as wool-silk, wool-viscose and wool-bamboo silk combine the durability of wool with the lustre of shinier fibres. Designers use them to play matte against shine, so patterns seem to appear and disappear as light moves across the room.",
      specs: { Fibres: "Wool with silk, viscose or bamboo silk", Construction: "Hand-knotted, hand-tufted", Feel: "Soft, dimensional", "Ideal for": "Living rooms, suites, designer projects" },
      highlights: ["Balance of durability and sheen", "Rich, dimensional colour", "Fully customisable ratios"]
    },

    /* ---------- Carpet types / craftsmanship ---------- */
    "hand-knotted": {
      intro:
        "Every knot is tied by hand on a vertical loom, then cut and packed down row by row. It is the highest expression of carpet craft: a single large rug can take a team of weavers several months, and a well-made piece lasts for generations.",
      specs: { "Knot density": "60 – 300+ knots / sq. inch", Materials: "Wool, silk, blends", "Lead time": "Approx. 12 – 20 weeks", Lifespan: "Generations" },
      highlights: ["Pattern visible on the reverse", "Can be cleaned, restored and repaired", "Every piece is unique"]
    },
    "hand-tufted": {
      intro:
        "Yarn is punched through a stretched canvas with a hand-operated tufting tool, then sheared, carved and backed. Hand-tufting gives rich pile and bold design in shorter lead times, and it is ideal for custom artwork, logos and sculpted textures.",
      specs: { Pile: "Cut, loop, or cut-and-loop", Materials: "Wool, viscose, bamboo silk", "Lead time": "Approx. 6 – 10 weeks", "Ideal for": "Residential and hospitality" },
      highlights: ["Excellent for bespoke designs", "Carved and high-low textures", "Wide range of pile heights"]
    },
    "hand-woven": {
      intro:
        "Woven on traditional handlooms by interlacing warp and weft, hand-woven carpets have a beautiful handmade irregularity and a durable, texture-rich surface, from fine ribbed weaves to chunky loops.",
      specs: { Construction: "Pit loom / frame loom", Materials: "Wool, cotton, jute, blends", Texture: "Loop, ribbed, chunky", "Ideal for": "Living rooms, studios, offices" },
      highlights: ["Handmade character", "Strong and long-lasting", "Natural and undyed options"]
    },
    flatweave: {
      intro:
        "Flatweaves have no pile. Threads are woven flat on the loom, which makes them lightweight, often reversible, and easy to roll, move and layer. They suit high-use spaces and relaxed interiors.",
      specs: { Pile: "None (flat)", Materials: "Wool, cotton, jute", Reversible: "Often", "Ideal for": "Dining rooms, hallways, layering" },
      highlights: ["Slim profile, so doors clear easily", "Simple to clean and maintain", "Great value for large sizes"]
    },
    dhurrie: {
      intro:
        "The dhurrie is India's traditional flatwoven rug. Durable cotton, wool or jute dhurries come in stripes, geometrics and block patterns, and they are made for everyday living and easy care.",
      specs: { Origin: "India", Materials: "Cotton, wool, jute", Weight: "Light to medium", "Ideal for": "Kitchens, verandas, kids' rooms" },
      highlights: ["Traditional pit-loom weaving", "Reversible in many designs", "Lightweight and versatile"]
    },
    kilim: {
      intro:
        "Kilims are tapestry-woven flatweaves with bold geometric motifs rooted in centuries-old weaving traditions from Anatolia, Persia and Central Asia. Our weavers reinterpret these patterns in classic and contemporary palettes.",
      specs: { Technique: "Slit-tapestry weave", Materials: "Wool, cotton", Pattern: "Geometric, tribal", "Ideal for": "Eclectic interiors, wall hangings" },
      highlights: ["Vibrant, graphic designs", "Lightweight and reversible", "Patchwork kilims available"]
    },
    shaggy: {
      intro:
        "Shaggy carpets have a deep, high pile with a soft, cloud-like feel that invites you to sit on the floor. They are available in solid tones, mélange yarns and subtle patterns.",
      specs: { "Pile height": "Approx. 30 – 60 mm", Materials: "Polyester, wool, viscose", Feel: "Ultra-soft, deep", "Ideal for": "Bedrooms, lounges, family rooms" },
      highlights: ["Warm and sound-absorbing", "Hand-tufted or machine-made", "Round and custom shapes"]
    },
    persian: {
      intro:
        "Medallions, arabesques and floral borders inspired by the great weaving centres of Persia, including Tabriz, Kashan, Isfahan, Nain and Heriz, interpreted by our master weavers in wool, silk and blends.",
      specs: { Inspiration: "Tabriz, Kashan, Isfahan, Nain", Construction: "Hand-knotted, hand-tufted", Materials: "Wool, silk, blends", "Ideal for": "Formal living, dining, heritage interiors" },
      highlights: ["Fine knot counts available", "Classic and muted antique palettes", "Made to size for large rooms"]
    },
    traditional: {
      intro:
        "Timeless oriental, Indo-Persian and heritage designs in rich reds, indigos, ivories and golds. These carpets anchor a room with a sense of history and pair as well with classic interiors as with modern ones.",
      specs: { Motifs: "Medallion, all-over, tribal", Palette: "Red, indigo, ivory, gold", Construction: "Hand-knotted, tufted", "Ideal for": "Classic homes, hotels, palaces" },
      highlights: ["Heritage designs from our archive", "Antique-wash finishes", "Matching runners available"]
    },
    contemporary: {
      intro:
        "Clean lines, quiet palettes and tactile textures designed for modern architecture. Our contemporary collection ranges from tonal solids and linear stripes to subtle textural plays of pile height and fibre.",
      specs: { Designs: "Solid, tonal, linear, textural", Construction: "Tufted, knotted, handloom", Palette: "Neutrals to bold accents", "Ideal for": "Modern homes, offices, boutique hotels" },
      highlights: ["Minimal, architectural designs", "Coordinated colour stories", "Any size, any shape"]
    },
    "modern-abstract": {
      intro:
        "Expressive brushstrokes, overdyed patchwork and abstract compositions turn the floor into a canvas. These are statement carpets for collectors, galleries and designers who want art underfoot.",
      specs: { Designs: "Abstract, painterly, distressed", Techniques: "Tufted, carved, overdyed", Materials: "Wool, viscose, bamboo silk", "Ideal for": "Statement spaces, designer projects" },
      highlights: ["Artist and designer collaborations", "Sculpted, carved surfaces", "Bold or tonal colourways"]
    },
    "custom-made": {
      intro:
        "Your size, your shape, your colours. Bespoke carpets are developed from your brief or drawings through CAD renders, colour poms and strike-off samples, then made in the construction and fibre that suits your space and budget.",
      specs: { Size: "Any size or shape", Colours: "Matched to Pantone, NCS or swatches", Construction: "Any technique", "Lead time": "From approx. 6 weeks" },
      highlights: ["Free design consultation", "CAD render before production", "Sample approval before weaving"]
    }
  };

  /* Group filters --------------------------------------------------------- */
  const filterBar = document.querySelector("[data-collection-filters]");
  const groups = Array.from(document.querySelectorAll("[data-collection-group]"));
  const countEl = document.querySelector("[data-collection-count]");

  function updateCount() {
    if (!countEl) return;
    const n = groups
      .filter(function (g) {
        return !g.hidden;
      })
      .reduce(function (sum, g) {
        return sum + g.querySelectorAll(".collection-card").length;
      }, 0);
    countEl.textContent = n + " collections";
  }

  if (filterBar) {
    const buttons = Array.from(filterBar.querySelectorAll("[data-filter]"));
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const filter = button.dataset.filter;
        buttons.forEach(function (b) {
          b.setAttribute("aria-pressed", String(b === button));
        });
        groups.forEach(function (group) {
          group.hidden = filter !== "all" && group.dataset.collectionGroup !== filter;
        });
        updateCount();
      });
    });
  }
  updateCount();

  /* Detail dialog --------------------------------------------------------- */
  const dialog = document.querySelector("[data-collection-dialog]");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const dImg = dialog.querySelector("[data-d-img]");
  const dType = dialog.querySelector("[data-d-type]");
  const dTitle = dialog.querySelector("[data-d-title]");
  const dIntro = dialog.querySelector("[data-d-intro]");
  const dSpecs = dialog.querySelector("[data-d-specs]");
  const dHighlights = dialog.querySelector("[data-d-highlights]");
  const dEnquire = dialog.querySelector("[data-d-enquire]");
  const dWhatsapp = dialog.querySelector("[data-d-whatsapp]");

  function openDetails(card) {
    const data = COLLECTION_DETAILS[card.id];
    if (!data) return;
    const img = card.querySelector("img");
    const title = card.querySelector("h3").textContent.trim();

    dImg.src = img.currentSrc || img.src;
    dImg.alt = img.alt;
    dType.textContent = card.dataset.type || "Collection";
    dTitle.textContent = title;
    dIntro.textContent = data.intro;

    dSpecs.innerHTML = "";
    Object.keys(data.specs).forEach(function (key) {
      const wrap = document.createElement("div");
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = key;
      dd.textContent = data.specs[key];
      wrap.append(dt, dd);
      dSpecs.appendChild(wrap);
    });

    dHighlights.innerHTML = "";
    data.highlights.forEach(function (text) {
      const li = document.createElement("li");
      li.textContent = text;
      dHighlights.appendChild(li);
    });

    dEnquire.href = "contact.html?type=collection&collection=" + encodeURIComponent(title) + "#enquiry";
    if (dWhatsapp && window.TaanaSite) {
      dWhatsapp.href = window.TaanaSite.whatsappUrl(
        "Hello, I would like to know more about your " + title + " — designs, sizes and lead times."
      );
    }

    dialog.showModal();
    document.body.classList.add("is-locked");
    dialog.querySelector(".collection-dialog__body").scrollTop = 0;
  }

  // Explore links point at the enquiry form, so they still work without JS
  document.querySelectorAll("[data-explore]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      openDetails(link.closest(".collection-card"));
    });
  });

  dialog.querySelector("[data-d-close]").addEventListener("click", function () {
    dialog.close();
  });

  // Click on the backdrop closes the dialog
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", function () {
    document.body.classList.remove("is-locked");
  });
})();
