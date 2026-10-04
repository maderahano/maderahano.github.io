# Made Rahano — Backend Infrastructure Engineer · Portfolio

An interactive, motion-graphic resume site built with **React + TypeScript + Vite + Framer Motion**.
Every word on the page comes from `Made-Rahano-CV.pdf`; the site is just a more engaging way to read it.

🌐 **Live:** https://maderahano.github.io

## What's on the page

- **Hero** — staggered load sequence (background → name → title → intro → tech keywords → CTAs), an interactive canvas "network" background, computed career stats, and an illustrative deployment-pipeline panel built from technologies in the resume.
- **About** — summary, engineering principles (efficiency / maintainability / security), a connected expertise chain (Backend → IaC → Cloud → Delivery → Reliability) and the core stack.
- **Career timeline** — sticky horizontal rail on desktop whose fill follows scroll and whose nodes light up as each role is reached; vertical rail on mobile. Each role card shows summary, highlights, an animated **impact flow** (e.g. CodeBuild/CodePipeline → GitHub Actions), tech tags and links to related projects.
- **Skills** — grouped exactly as in the resume. Hover/select a skill to see its category, a service tree (AWS → EC2, ECS, RDS, IAM, CodeBuild, CodePipeline), the roles it was used in and related projects. Sticky side panel on desktop, bottom sheet on mobile.
- **Projects** — six pieces of real work told as *problem → solution → result → contribution*, each with an animated simplified architecture diagram (before/after where relevant) in an accessible modal.
- **Education**, **Interests**, **Contact** (email, LinkedIn, GitHub, copy-email, download resume).
- 🌗 Dark / light theme (dark default), persisted in `localStorage`, applied before first paint.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build → dist/
npm run preview    # serve dist/ locally
```

## Project structure

```
index.html                    # Vite entry: meta/OG/JSON-LD, fonts, theme pre-paint script
public/assets/
  img/                        # profile.jpg, favicon.svg
  pdf/Made-Rahano-CV.pdf      # the resume served by "Download Resume"
src/
  main.tsx, App.tsx           # LazyMotion + MotionConfig(reducedMotion="user") shell
  data/
    resume.ts                 # ← single source of truth: edit content here
    types.ts                  # data model
  components/                 # Navbar, Hero, NetworkBackground, PipelinePanel, About, Timeline,
                              # ExperienceCard, Skills, SkillGraph, SkillDetail, Projects, ProjectCard,
                              # ProjectModal, ArchitectureDiagram, Education, Interests, Contact, Footer,
                              # Reveal, SectionHead, Icon  (+ *.module.css per component)
  hooks/                      # useTheme, useActiveSection, useFocusTrap, useCountUp, useMediaQuery
  utils/                      # dates (ranges/durations/years), relations (skill↔role↔project lookups,
                              # computed stats), motion (shared variants), events (open-project bus)
  styles/
    tokens.css                # design tokens (colour, type, spacing, radius, motion) for both themes
    global.css                # reset, layout primitives, buttons, chips, cards, reduced-motion
.github/workflows/deploy.yml  # builds and deploys dist/ to GitHub Pages on push to master
```

## Editing content

Open [`src/data/resume.ts`](src/data/resume.ts). Experience, projects, skills, education, interests
and contacts are plain typed arrays; every section renders from them (`experience.map(...)` etc.).
Skill ↔ role ↔ project relationships and the hero stats (years, roles, companies) are derived
automatically from that data — nothing is hard-coded in components.

## Motion & accessibility

- Motion vocabulary: fade + short slide reveals, stagger, scroll-linked progress, diagram activation,
  hover glow, modal/sheet transitions. No parallax or scroll hijacking.
- `prefers-reduced-motion` disables all animation (Framer `reducedMotion="user"` + CSS), and the
  canvas background renders a single static frame.
- Semantic landmarks and headings, skip link, visible `:focus-visible`, focus-trapped dialogs with
  Escape/return-focus, `aria-current` nav, `aria-pressed` skill toggles. axe (WCAG 2.1 AA): 0 violations.

## Deploy

GitHub Pages via Actions (Vite needs a build step). In the repo go to
**Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
Every push to `master` then runs `.github/workflows/deploy.yml` and publishes `dist/`.
