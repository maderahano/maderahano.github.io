# Made Rahano — Software Engineer Portfolio

A modern, fully **static** personal portfolio website. No backend, no build step —
just open `index.html` or push to GitHub Pages and it's live.

🌐 **Live:** https://maderahano.github.io

## Features

- 🌗 **Dark / Light theme** toggle (dark by default), saved to `localStorage`
- ✨ Green glassmorphism design, animated gradient background & interactive particle network
- ⌨️ Hero typing effect, animated counters, scroll-reveal animations
- 🧭 Sticky nav with active-section highlighting, smooth scroll & mobile hamburger menu
- 📊 Skills with animated proficiency bars and colored tech logos (Devicon)
- 🗓️ Animated Experience & Education timelines
- 🖼️ Portfolio gallery with category filters + modal previews
- 💬 Auto-playing testimonials carousel (arrows, dots, swipe)
- 🎮 **Mini games:** Snake, Memory Match, and a Coding Quiz (high scores in `localStorage`)
- 🥚 Hidden easter-egg icons + Konami code with achievement popups
- 📈 GitHub-style contribution heatmap (mock data)
- 📬 Contact form (mailto by default, Formspree-ready)
- 🧩 Custom cursor, scroll progress bar, loading screen, back-to-top
- 🔎 SEO meta tags, Open Graph, JSON-LD structured data, SVG favicon
- 📱 Mobile-first responsive, respects `prefers-reduced-motion`

## Tech Stack

Plain **HTML5 · CSS3 · vanilla JavaScript** — zero dependencies, zero build.
Icons via [Unicons](https://iconscout.com/unicons) (UI) and [Devicon](https://devicon.dev) (tech logos), loaded from CDN.

## Project Structure

```
index.html                 # All sections + SEO/OG meta
assets/
  css/styles.css           # Theme tokens, glassmorphism, animations, responsive
  js/
    data.js                # ← Edit your content here (skills, experience, projects, etc.)
    main.js                # Theme, nav, rendering, animations, easter eggs
    games.js               # Snake · Memory Match · Coding Quiz
  img/                      # Photos, project images, favicon
  pdf/Made-Rahano-CV.pdf    # Resume (linked from the hero "Download Resume" button)
```

## Editing Content

Almost everything is data-driven. Open [`assets/js/data.js`](assets/js/data.js) to update:
your roles (typing effect), about cards, **skills & proficiency levels**, work experience,
education, portfolio projects (with category, GitHub/demo links), testimonials, and quiz questions.
No HTML changes needed.

## Contact Form

The form opens the visitor's email client via `mailto:` (works on any static host, no backend).
To collect submissions instead, create a [Formspree](https://formspree.io) form and set its
endpoint on the form in `index.html`:

```html
<form class="contact__form ..." id="contact-form" data-formspree="https://formspree.io/f/XXXXXXX">
```

## Deploy

Already a GitHub Pages user site — commit to `master` and it publishes automatically.
Also works as-is on Netlify or Vercel (set the publish/output directory to the repo root, no build command).

## Run Locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

---

> _Tip: there are 5 hidden easter-egg icons scattered across the site. Can you find them all? (And try the Konami code.)_
