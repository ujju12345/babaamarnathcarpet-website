# Taana Carpets: Business Showcase Website

A premium, responsive corporate website for a carpet manufacturing and trading company. Visitors can explore collections, materials and craftsmanship, then send a business enquiry.

This is **not an e-commerce site**. It has no prices, cart, checkout or payments.

- **Built with:** HTML5, CSS3 and vanilla JavaScript. There are no frameworks, libraries or build tools.
- **Fonts:** Cormorant Garamond (headings) and Jost (body), loaded from Google Fonts.
- **Brand name:** "Taana" is a placeholder. It is the Hindi word for the warp threads of a loom. See [Rebranding](#rebranding).

---

## Pages

| Page | File | Highlights |
|---|---|---|
| Home | `index.html` | Announcement bar, hero, story and stats, collection grid, materials explorer, craftsmanship, why choose us, custom solutions, gallery preview, enquiry CTA, testimonials |
| Collections | `collections.html` | 12 material types and 12 carpet types/styles, filter bar, a detail dialog for each collection |
| About Us | `about.html` | Overview, craftsmanship, sourcing, 6-stage process, design philosophy, values, why clients choose us |
| Craftsmanship | `craftsmanship.html` | Timeline of the 6 manufacturing stages with a scroll-progress line, technique comparison, quality promise |
| Custom Solutions | `custom-solutions.html` | Custom sizes, designs and colours; residential, hospitality and commercial work; designer and architect collaborations; how it works |
| Gallery | `gallery.html` | Masonry grid of 32 images in 7 filterable categories, plus a lightbox (keyboard and swipe) |
| Contact Us | `contact.html` | Validated enquiry form, WhatsApp buttons, contact details, map placeholder, FAQ |

## Folder structure

```
carpet-business-website/
├── index.html, about.html, collections.html, craftsmanship.html,
│   custom-solutions.html, gallery.html, contact.html
├── css/
│   ├── style.css         Design tokens, layout and all components
│   ├── animations.css    Scroll reveals, hero entrance, keyframes, reduced-motion rules
│   └── responsive.css    Breakpoints: 1280 / 1180 / 900 / 640 / 420 px
├── js/
│   ├── config.js         ← Company contact details (edit this first)
│   ├── navigation.js     Sticky header, active link, mobile drawer
│   ├── main.js           Config injection, reveals, counters, tabs, slider, form validation
│   ├── collections.js    Collection filters and detail dialog content
│   └── gallery.js        Gallery filters and lightbox
├── assets/
│   ├── images/  hero/ carpets/ materials/ about/ process/ custom/ gallery/
│   └── icons/   favicon.svg, logo-mark.svg
├── IMAGE-CREDITS.md      Source of every photo, with file sizes
└── README.md
```

## Running locally

You can open `index.html` directly in a browser. For behaviour that matches a live server, start a local web server from this folder:

```bash
# Node.js
npx serve .

# or Python 3
python -m http.server 8000
```

Then visit the address the command prints, for example http://localhost:8000.

---

## Editing company information

### Contact details: `js/config.js`

The phone number, WhatsApp number, email address, postal address, business hours, social links and Google Map are all set in **one file**. Every page reads them from there.

```js
window.SITE_CONFIG = {
  phoneDisplay: "+91 00000 00000",
  phoneLink: "+910000000000",
  whatsappNumber: "910000000000",   // digits only, with country code
  email: "enquiry@yourcompany.com",
  addressLines: ["...", "...", "..."],
  hours: "Mon – Sat · 10:00 am – 7:00 pm",
  social: { instagram: "...", facebook: "...", linkedin: "...", pinterest: "..." },
  mapEmbedUrl: ""                   // Google Maps → Share → Embed a map → copy the src URL
};
```

The HTML also contains the same placeholder text, so pages still read correctly without JavaScript. For the best SEO, use find-and-replace across the `.html` files once you have the real details:

- `+91 00000 00000` and `+910000000000`
- `910000000000` (the WhatsApp number in `wa.me` links)
- `enquiry@yourcompany.com`
- `Your Showroom / Factory Address`

To hide a social icon, set its value in `social` to `""`.

### Rebranding

Find and replace across all files:

- `Taana Carpets` → your company name
- `>Taana<` → the short wordmark in the logo
- `Carpets &amp; Rugs` → the line under the logo

The logo mark is an inline SVG (a woven lozenge) in each page header and footer, and also in `assets/icons/logo-mark.svg`. Replace it with your own logo SVG, or with an `<img>`. The favicon is `assets/icons/favicon.svg`.

Colours and fonts are CSS variables at the top of `css/style.css`. Change `--clay`, `--gold`, `--ivory` and the other tokens to restyle the whole site.

### Placeholder content to replace before launch

| What | Where |
|---|---|
| Company statistics (25+ years, 500+ artisans, 30+ countries, 5,000+ projects) | `index.html`, About section. Look for the comment `EDIT: replace these figures` |
| Testimonials (attributed to roles, not real people) | `index.html`. Look for the comment `EDIT: replace with genuine client testimonials` |
| Lead times, MOQ and shipping answers | `contact.html` FAQ, `craftsmanship.html` comparison, `js/collections.js` |
| Sourcing claims (wool origins and so on) | `about.html`, `js/collections.js` |
| Gallery photos (stock inspiration images, not the company's own projects) | `gallery.html`. Swap in real project photography |

---

## Images

- All photos are stored locally in `assets/images/` and are already cropped and compressed.
- **To replace an image:** save the new photo with the same file name and a similar aspect ratio. `IMAGE-CREDITS.md` lists every file's size.
- If the new image has different proportions, also update the `width` and `height` attributes on its `<img>` tag. They prevent layout shift while the page loads.
- Keep photos under about 300 KB. Export JPGs at 1600–1920px wide for heroes and 720–960px for cards, at quality 60–70.
- Update the `alt` text to describe the new photo.

Photos come from Unsplash under the Unsplash License (free for commercial use). Images from the reference websites were deliberately **not** copied, because they are the copyright of those businesses.

## Collections

Each collection card in `collections.html` holds an image, title and short description, which search engines can index. The extended text shown in the **Explore** dialog is in `js/collections.js`, in the `COLLECTION_DETAILS` object, keyed by the card's `id`.

**To add a collection:**

1. Copy an `<article class="collection-card">` block in `collections.html`.
2. Give it a unique `id`, for example `id="seagrass"`.
3. Add a matching entry to `COLLECTION_DETAILS`.

Without JavaScript, the **Explore** links go to the contact form with that collection already filled in.

Pages can link straight to a card, for example `collections.html#wool`. They can also link to a gallery category, for example `gallery.html#hotel`.

## Enquiry form

The form in `contact.html` validates name, email, phone, enquiry type, message and consent in the browser. Errors are announced to screen readers.

- **Pre-filling:** `contact.html?type=custom&collection=Silk%20Carpets` selects the enquiry type and drafts the message. Valid `type` values match the `<option value>` list: `collection`, `custom`, `residential`, `hospitality`, `commercial`, `trade`, `export`, `showroom` and `other`.
- **Send via WhatsApp:** opens WhatsApp with whatever the visitor has already typed.
- **Receiving submissions:** no backend is connected yet. At the moment, submitting only shows a success message. To deliver enquiries to your inbox, connect a form service. For example, with [Formspree](https://formspree.io):
  1. Set the form's `action` to your Formspree endpoint.
  2. In `js/main.js` (section 8), replace the `setTimeout` block with:

     ```js
     fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
       .then(res => { if (!res.ok) throw new Error(); /* show success, as now */ })
       .catch(() => { /* show an error message */ });
     ```

## Accessibility and performance

- Uses semantic landmarks, a skip link, one `<h1>` per page, labelled controls, visible focus styles, and keyboard support for tabs, dialogs and the lightbox (Esc and arrow keys).
- Respects `prefers-reduced-motion`: animations, the marquee and the auto-advancing slider are turned off.
- Scroll-reveal content stays visible if JavaScript is disabled.
- Images below the hero use `loading="lazy"` with explicit dimensions, and the hero image is preloaded.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, including iOS and Android. The collection dialog uses the native `<dialog>` element. Where it is unsupported, the **Explore** links fall back to the enquiry form.
