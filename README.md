# Made Rahano — Backend Infrastructure Engineer · Portfolio

A fully **static** personal portfolio. No backend, no build step —
open `index.html` or push to GitHub Pages and it's live.

🌐 **Live:** https://maderahano.github.io

## What's on the page

- **Hero** — who I am, what I build, and a "system card" showing my real stack and delivery pipeline (code → CI/CD → IaC → cloud)
- **About** — short intro, primary technologies, and a few facts
- **Experience** — scannable timeline: period, company, role, impact bullets, tech tags
- **Projects** — featured case studies (problem → approach → outcome) with an architecture preview, plus a compact grid of smaller projects
- **Skills** — grouped by where they sit in the stack (backend, DevOps & cloud, databases, tooling)
- **Education**, **Testimonials**, **Contact** (form + direct links)
- 🎮 **Mini games** — Snake, Memory Match and Cube Run in plain canvas JS, high scores in `localStorage`
- 🥚 Five hidden easter-egg icons + the Konami code, with achievement popups

## Design & engineering notes

- 🌗 Dark / light theme (dark by default), saved to `localStorage`, applied before first paint
- Design system in CSS custom properties: colour, type scale, spacing, radius, motion
- Inter for UI, JetBrains Mono for metadata — no icon sprites beyond Unicons (UI) and Devicon (tech logos) from CDN
- Scroll-reveal, hover elevation and a subtle pipeline animation; everything respects `prefers-reduced-motion`
- Semantic HTML, labelled form fields, keyboard-operable tabs and menu, visible focus states, skip link
- SEO meta tags, Open Graph, JSON-LD `Person` structured data, SVG favicon

## Tech stack

Plain **HTML5 · CSS3 · vanilla JavaScript** — zero dependencies, zero build.

## Project structure

```
index.html                 # Page structure + SEO/OG meta
assets/
  css/styles.css           # Design tokens, components, responsive rules
  js/
    data.js                # ← Edit your content here (hero, about, skills, experience, projects, testimonials)
    main.js                # Theme, nav, rendering, reveal animations, contact form, easter eggs
    games.js               # Snake · Memory Match · Cube Run
  img/                     # Photos, favicon
  pdf/Made-Rahano-CV.pdf   # Résumé (linked from the hero and contact section)
```

## Editing content

Everything is data-driven. Open [`assets/js/data.js`](assets/js/data.js) to update the hero
(role, headline, stack facts, pipeline), about text and stats, skills, experience, education,
projects (featured case studies take `context` / `approach` / `outcome` and a small `diagram`),
and testimonials. No HTML changes needed.

## Contact form

With `data-formspree` set on the form in `index.html`, submissions are POSTed to
[Formspree](https://formspree.io). Remove the attribute to fall back to opening the visitor's
email client via `mailto:` (works on any static host, no backend).

## Deploy

Already a GitHub Pages user site — commit to `master` and it publishes automatically.
Also works as-is on Netlify or Vercel (publish directory = repo root, no build command).

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
