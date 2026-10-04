/*==================================================================
  main.js — theme, nav, rendering, reveal animations & interactions.
  Depends on data.js (window.PORTFOLIO_DATA).
==================================================================*/
(function () {
  'use strict';
  const D = window.PORTFOLIO_DATA || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ls = {
    get: (k, f) => { try { const v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch { return f; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };
  const icon = (name) => `<i class="uil ${name}" aria-hidden="true"></i>`;
  /* Individual Devicon SVGs (a few KB each) instead of the 1.2 MB icon font */
  const LOGO_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/';
  const tags = (list, cls = '') => `<ul class="tag-list" aria-label="Technologies">${list.map((t) => `<li class="tag ${cls}">${t}</li>`).join('')}</ul>`;
  const externalAttrs = (href) => (href && !href.startsWith('#') ? 'target="_blank" rel="noopener"' : '');

  /*==================== THEME ====================*/
  (function theme() {
    const btn = $('#theme-button');
    const root = document.documentElement;
    const meta = $('meta[name="theme-color"]');
    const apply = (t) => {
      const light = t === 'light';
      root.classList.toggle('light', light);
      if (btn) {
        btn.innerHTML = icon(light ? 'uil-sun' : 'uil-moon');
        btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
        btn.setAttribute('aria-pressed', String(light));
      }
      if (meta) meta.setAttribute('content', light ? '#F6F8FB' : '#0B1120');
    };
    apply(ls.get('theme', 'dark'));
    btn && btn.addEventListener('click', () => {
      const next = root.classList.contains('light') ? 'dark' : 'light';
      apply(next); ls.set('theme', next);
    });
  })();

  /*==================== NAV ====================*/
  (function nav() {
    const menu = $('#nav-menu');
    const toggle = $('#nav-toggle');
    const close = $('#nav-close');
    const backdrop = $('#nav-backdrop');
    const header = $('#header');
    if (!menu || !toggle) return;

    const open = () => {
      menu.classList.add('show-menu'); backdrop.classList.add('show');
      document.body.classList.add('no-scroll');
      toggle.setAttribute('aria-expanded', 'true');
      close && close.focus();
    };
    const hide = (refocus) => {
      if (!menu.classList.contains('show-menu')) return;
      menu.classList.remove('show-menu'); backdrop.classList.remove('show');
      document.body.classList.remove('no-scroll');
      toggle.setAttribute('aria-expanded', 'false');
      if (refocus) toggle.focus();
    };

    toggle.addEventListener('click', open);
    close && close.addEventListener('click', () => hide(true));
    backdrop.addEventListener('click', () => hide(false));
    $$('.nav__link, .nav__menu-footer a', menu).forEach((l) => l.addEventListener('click', () => hide(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(true); });
    window.matchMedia('(min-width: 981px)').addEventListener('change', (e) => { if (e.matches) hide(false); });

    // header hairline on scroll
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // scroll-spy
    const links = $$('.nav__link');
    const map = {};
    links.forEach((l) => { const id = l.getAttribute('href').slice(1); if (id) map[id] = l; });
    const sections = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => { l.classList.remove('active-link'); l.removeAttribute('aria-current'); });
          const link = map[e.target.id];
          if (link) { link.classList.add('active-link'); link.setAttribute('aria-current', 'true'); }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      sections.forEach((s) => io.observe(s));
    }
  })();

  /*==================== SCROLL PROGRESS + BACK TO TOP ====================*/
  (function scrollUi() {
    const bar = $('#scroll-progress');
    const up = $('#scroll-up');
    let ticking = false;
    const update = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? h.scrollTop / max : 0;
      if (bar) bar.style.transform = `scaleX(${p})`;
      if (up) up.classList.toggle('show', h.scrollTop > 600);
      ticking = false;
    };
    update();
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  })();

  /*==================== SCROLL REVEAL ====================*/
  const revealIO = ('IntersectionObserver' in window && !reduceMotion)
    ? new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' })
    : null;
  function observeReveals(scope = document) {
    const els = $$('.reveal', scope);
    if (!revealIO) { els.forEach((el) => el.classList.add('in')); return; }
    els.forEach((el) => revealIO.observe(el));
  }

  /*==================== RENDER: HERO ====================*/
  (function hero() {
    const H = D.HERO;
    if (!H) return;
    const set = (id, v) => { const el = $(id); if (el && v != null) el.textContent = v; };
    set('#hero-role', H.role); set('#hero-company', H.company);
    set('#hero-headline', H.headline); set('#hero-intro', H.intro);
    set('#hero-location', H.location);
    set('#card-name', H.name); set('#card-role', H.role); set('#card-company', H.company);
    const resume = $('#hero-resume'); if (resume && H.resume) resume.href = H.resume;

    const socialHtml = (H.socials || []).map((s) =>
      `<li><a href="${s.href}" ${externalAttrs(s.href)} class="icon-button icon-button--sm" aria-label="${s.label}">${icon(s.icon)}</a></li>`).join('');
    const hs = $('#hero-social'); if (hs) hs.innerHTML = socialHtml;
    const fs = $('#footer-social'); if (fs) fs.innerHTML = socialHtml;

    const facts = $('#card-facts');
    if (facts && H.facts) facts.innerHTML = H.facts.map((f) => `<div class="syscard__row"><dt>${f.key}</dt><dd>${f.value}</dd></div>`).join('');

    const pipe = $('#card-pipeline');
    if (pipe && H.pipeline) {
      pipe.innerHTML = `
        <div class="syscard__pipeline-title">Delivery pipeline</div>
        <div class="pipe">
          <div class="pipe__track" aria-hidden="true"><span class="pipe__packet"></span></div>
          ${H.pipeline.map((n) => `
            <div class="pipe__node">
              <span class="pipe__icon">${icon(n.icon)}</span>
              <span class="pipe__label">${n.label}</span>
              <span class="pipe__sub">${n.sub}</span>
            </div>`).join('')}
        </div>`;
    }
  })();

  /*==================== RENDER: ABOUT ====================*/
  (function about() {
    const A = D.ABOUT;
    if (!A) return;
    const text = $('#about-text');
    if (text) text.innerHTML = A.paragraphs.map((p) => `<p>${p}</p>`).join('');
    const chips = $('#about-chips');
    if (chips) chips.innerHTML = A.chips.map((c) => `<li class="chip chip--accent">${c}</li>`).join('');
    const stats = $('#about-stats');
    if (stats) stats.innerHTML = A.stats.map((s) => `
      <div class="about__stat">
        <dt>${s.label}</dt>
        <dd><span data-count="${s.value}">0</span>${s.suffix ? `<sup>${s.suffix}</sup>` : ''}</dd>
      </div>`).join('');
    const cards = $('#about-cards');
    if (cards) cards.innerHTML = A.cards.map((c) => `
      <li class="about__card">
        ${icon(c.icon)}
        <div><h3>${c.title}</h3><p>${c.text}</p></div>
      </li>`).join('');
  })();

  /*==================== RENDER: SKILLS ====================*/
  (function skills() {
    const box = $('#skills-container');
    if (!box || !D.SKILLS) return;
    box.innerHTML = D.SKILLS.map((g, i) => `
      <section class="skills__group reveal" data-delay="${(i % 2) + 1}" aria-labelledby="skills-g${i}">
        <div class="skills__group-head">
          ${icon(g.icon)}
          <h3 class="skills__group-title" id="skills-g${i}">${g.title}</h3>
          <span class="skills__count">${String(g.items.length).padStart(2, '0')}</span>
        </div>
        <ul class="chip-list">
          ${g.items.map((s) => `<li class="chip"><img class="chip__logo${s.mono ? ' chip__logo--mono' : ''}" src="${LOGO_BASE}${s.logo}.svg" alt="" width="18" height="18" loading="lazy" decoding="async">${s.name}</li>`).join('')}
        </ul>
      </section>`).join('');
    observeReveals(box);
  })();

  /*==================== RENDER: TIMELINES ====================*/
  function renderTimeline(elId, items, opts = {}) {
    const box = $(elId);
    if (!box || !items) return;
    box.innerHTML = items.map((it) => {
      const title = it.role || it.title;
      const org = it.company || it.place;
      const meta = `
        <span class="timeline__date">${it.date}</span>
        <span class="timeline__company">${org}</span>
        ${it.location ? `<span class="timeline__location">${it.location}</span>` : ''}`;
      return `
      <li class="timeline__item reveal ${it.current ? 'timeline__item--current' : ''}">
        <div class="timeline__meta" aria-hidden="true">${meta}</div>
        <div class="timeline__body">
          <div class="timeline__mobile-meta">
            <span class="timeline__date">${it.date}</span>
            <span class="timeline__org"><span class="timeline__company">${org}</span>${it.location ? `<span class="timeline__location"> · ${it.location}</span>` : ''}</span>
          </div>
          <h3 class="timeline__role">${title}${it.current ? '<span class="timeline__badge">Current</span>' : ''}</h3>
          <p class="timeline__summary">${it.summary || it.desc}</p>
          ${opts.points && it.points ? `<ul class="timeline__points">${it.points.map((p) => `<li>${p}</li>`).join('')}</ul>` : ''}
          ${it.tags ? tags(it.tags) : ''}
        </div>
      </li>`;
    }).join('');
    observeReveals(box);
  }
  renderTimeline('#experience-timeline', D.EXPERIENCE, { points: true });
  renderTimeline('#education-timeline', D.EDUCATION);

  /*==================== RENDER: PROJECTS ====================*/
  (function projects() {
    const featuredBox = $('#projects-featured');
    const grid = $('#projects-grid');
    if (!D.PROJECTS) return;

    const links = (p, size = '') => [
      p.github ? `<a href="${p.github}" ${externalAttrs(p.github)} class="icon-button ${size}" aria-label="${p.title} on GitHub" title="GitHub">${icon('uil-github-alt')}</a>` : '',
      p.demo ? `<a href="${p.demo}" ${externalAttrs(p.demo)} class="icon-button ${size}" aria-label="${p.demoLabel || 'Live demo'}: ${p.title}" title="${p.demoLabel || 'Live demo'}">${icon(p.demo.startsWith('#') ? 'uil-arrow-down' : 'uil-external-link-alt')}</a>` : '',
    ].join('');

    const node = (n) => `
      <div class="diagram__node ${n.accent ? 'diagram__node--accent' : ''}">
        ${n.icon ? icon(n.icon) : ''}
        <b>${n.label}</b>
        ${n.sub ? `<small>${n.sub}</small>` : ''}
      </div>`;
    const arrow = () => `<span class="diagram__arrow" aria-hidden="true">${icon('uil-arrow-right')}</span>`;

    const diagram = (d, title) => {
      if (!d) return '';
      const parts = [];
      const w = d.wrap;
      d.nodes.forEach((n, i) => {
        if (w && i === w.from) {
          const group = d.nodes.slice(w.from, w.to + 1).map(node).join('');
          parts.push(`<div class="diagram__group"><span class="diagram__group-label">${w.label}</span>${group}</div>`);
        } else if (w && i > w.from && i <= w.to) {
          return;
        } else {
          parts.push(node(n));
        }
      });
      const flow = parts.join(arrow());
      const before = d.before ? `<div class="diagram__before"><span>replaces</span> <s>${d.before}</s> <span>→</span> <em>${d.nodes.find((n) => n.accent)?.label || ''}</em></div>` : '';
      return `<div class="diagram" role="img" aria-label="Architecture of ${title}: ${d.nodes.map((n) => n.label).join(' → ')}">
        <div class="diagram__flow">${flow}</div>${before}
      </div>`;
    };

    const featured = D.PROJECTS.filter((p) => p.featured);
    if (featuredBox) featuredBox.innerHTML = featured.map((p, i) => `
      <article class="case reveal" aria-labelledby="case-${i}">
        <div class="case__visual">
          <span class="case__visual-label">Architecture</span>
          ${diagram(p.diagram, p.title)}
        </div>
        <div class="case__content">
          <span class="case__kind">${p.kind}</span>
          <h3 class="case__title" id="case-${i}">${p.title}</h3>
          <p class="case__desc">${p.desc}</p>
          <dl class="case__story">
            <div class="case__story-row"><dt>Problem</dt><dd>${p.context}</dd></div>
            <div class="case__story-row"><dt>Approach</dt><dd>${p.approach}</dd></div>
            <div class="case__story-row"><dt>Outcome</dt><dd>${p.outcome}</dd></div>
          </dl>
          <div class="case__foot">
            ${tags(p.tags)}
            <div class="case__links">${links(p, 'icon-button--sm')}</div>
          </div>
        </div>
      </article>`).join('');

    const rest = D.PROJECTS.filter((p) => !p.featured);
    if (grid) grid.innerHTML = rest.map((p, i) => `
      <li class="project reveal" data-delay="${(i % 3) + 1}">
        <div class="project__top">
          <span class="project__icon">${icon(p.icon || 'uil-folder')}</span>
          <span class="project__kind">${p.kind}</span>
        </div>
        <h4 class="project__title">${p.title}</h4>
        <p class="project__desc">${p.desc}</p>
        <div class="project__foot">
          ${tags(p.tags)}
          <div class="project__links">${links(p, 'icon-button--sm')}</div>
        </div>
      </li>`).join('');

    observeReveals($('#projects'));
  })();

  /*==================== RENDER: TESTIMONIALS ====================*/
  (function testimonials() {
    const grid = $('#testimonial-grid');
    if (!grid || !D.TESTIMONIALS) return;
    grid.innerHTML = D.TESTIMONIALS.map((t, i) => `
      <li>
        <figure class="quote reveal" data-delay="${(i % 3) + 1}">
          <blockquote><p>${t.text}</p></blockquote>
          <figcaption>
            <img src="${t.img}" alt="" class="quote__avatar" width="40" height="40" loading="lazy" decoding="async">
            <div><span class="quote__name">${t.name}</span><span class="quote__role">${t.role}</span></div>
          </figcaption>
        </figure>
      </li>`).join('');
    observeReveals(grid);
  })();

  /*==================== ANIMATED COUNTERS ====================*/
  (function counters() {
    const items = $$('[data-count]');
    if (!items.length) return;
    const run = (el) => {
      const target = +el.dataset.count;
      if (reduceMotion || target <= 1) { el.textContent = target; return; }
      const start = performance.now(), dur = 900;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
      }, { threshold: 0.6 });
      items.forEach((i) => io.observe(i));
    } else items.forEach(run);
  })();

  /*==================== CONTACT FORM ====================*/
  (function contact() {
    const form = $('#contact-form');
    if (!form) return;
    const status = $('#cf-status');
    const note = (msg, cls) => { if (status) { status.textContent = msg; status.className = 'contact__form-note ' + (cls || ''); } };
    const fields = ['name', 'email', 'message'].map((n) => form.elements[n]);
    fields.forEach((f) => f && f.addEventListener('input', () => f.removeAttribute('aria-invalid')));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let firstInvalid = null;
      fields.forEach((f) => {
        const bad = !f.value.trim() || (f.type === 'email' && !f.checkValidity());
        f.toggleAttribute('aria-invalid', bad);
        if (bad) { f.setAttribute('aria-invalid', 'true'); firstInvalid = firstInvalid || f; }
      });
      if (firstInvalid) { firstInvalid.focus(); note('Please fill in your name, a valid email and a message.', 'err'); return; }

      const data = Object.fromEntries(new FormData(form));
      const endpoint = form.dataset.formspree;
      const btn = form.querySelector('[type="submit"]');
      if (endpoint) {
        btn.disabled = true; note('Sending…');
        try {
          const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error('bad response');
          note("Message sent — I'll get back to you soon.", 'ok'); toast("Message sent — I'll be in touch soon.");
          form.reset();
        } catch {
          note('Something went wrong. Please email me directly at ' + (D.HERO?.email || 'maderahano@gmail.com') + '.', 'err');
          toast('Could not send. Try emailing me directly.', true);
        } finally { btn.disabled = false; }
      } else {
        const subject = encodeURIComponent(data.subject || `Portfolio contact from ${data.name}`);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
        window.location.href = `mailto:${D.HERO?.email || 'maderahano@gmail.com'}?subject=${subject}&body=${body}`;
        note('Opening your email app…', 'ok');
        form.reset();
      }
    });
  })();

  /*==================== TOASTS ====================*/
  function toast(msg, isError) {
    const wrap = $('#toast-wrap');
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast' + (isError ? ' error' : '');
    el.innerHTML = `${icon(isError ? 'uil-exclamation-triangle' : 'uil-check-circle')}<span>${msg}</span>`;
    wrap.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 400); }, 3800);
  }
  window.addEventListener('toast', (e) => toast(e.detail.msg));

  /*==================== ACHIEVEMENTS ====================*/
  function achievement(title, sub) {
    const el = $('#achv');
    if (!el) return;
    $('#achv-title').textContent = title;
    $('#achv-sub').textContent = sub;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 4200);
  }
  function unlock(id, title, sub) {
    const all = new Set(ls.get('achievements', []));
    all.add(id);
    ls.set('achievements', [...all]);
    achievement(title, sub);
  }
  window.addEventListener('dino:milestone', () => unlock('dino-runner', 'Cube Runner 🦖', 'Scored 100+ in Cube Run!'));
  window.addEventListener('snake:over', (e) => { if (e.detail.score >= 100) unlock('snake-100', 'Snake Charmer 🐍', 'Scored 100+ in Snake!'); });

  /*==================== EASTER EGGS ====================*/
  (function eggs() {
    const SPOTS = [
      { id: 'about', sel: '#about', icon: 'uil-rocket', css: 'top:14%;right:4%;', name: 'Liftoff', msg: 'You found the rocket! 🚀' },
      { id: 'skills', sel: '#skills', icon: 'uil-bug', css: 'bottom:8%;left:3%;', name: 'Bug Hunter', msg: 'Squashed a hidden bug! 🐛' },
      { id: 'exp', sel: '#experience', icon: 'uil-coffee', css: 'top:18%;right:3%;', name: 'Fuel Up', msg: 'Coffee located. Productivity +10! ☕' },
      { id: 'projects', sel: '#projects', icon: 'uil-keyboard', css: 'bottom:10%;right:4%;', name: 'Keystroke', msg: 'A wild keyboard appears! ⌨️' },
      { id: 'games', sel: '#games', icon: 'uil-game-structure', css: 'top:22%;left:3%;', name: 'Player Two', msg: 'Secret game token! 🎮' },
    ];
    const found = new Set(ls.get('eggs-found', []));
    const counter = $('#egg-count');
    if (counter) counter.textContent = found.size;

    SPOTS.forEach((spot) => {
      const host = $(spot.sel);
      if (!host) return;
      host.style.position = 'relative';
      const egg = document.createElement('button');
      egg.type = 'button';
      egg.className = 'egg' + (found.has(spot.id) ? ' found' : '');
      egg.style.cssText = spot.css;
      egg.setAttribute('aria-label', 'Hidden easter egg');
      egg.innerHTML = icon(spot.icon);
      egg.addEventListener('click', () => {
        if (found.has(spot.id)) return;
        found.add(spot.id);
        ls.set('eggs-found', [...found]);
        egg.classList.add('found');
        if (counter) counter.textContent = found.size;
        unlock('egg-' + spot.id, spot.name, spot.msg);
        if (found.size === SPOTS.length) {
          setTimeout(() => unlock('egg-master', 'Easter Egg Master 🥚', 'You found every hidden icon. True explorer!'), 1500);
        }
      });
      host.appendChild(egg);
    });

    // Konami code
    const seq = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
      if (!e.key) return;
      pos = (e.key.toLowerCase() === seq[pos]) ? pos + 1 : 0;
      if (pos === seq.length) {
        pos = 0;
        document.documentElement.style.filter = 'hue-rotate(60deg)';
        setTimeout(() => { document.documentElement.style.filter = ''; }, 2500);
        unlock('konami', 'Konami Code! 🕹️', 'You speak the ancient language of gamers.');
      }
    });
  })();

  /*==================== MISC ====================*/
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // observe static reveal elements present at load
  observeReveals(document);
})();
