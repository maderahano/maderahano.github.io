/*==================================================================
  main.js — theme, nav, animations, rendering & interactions.
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

  /*==================== LOADER ====================*/
  window.addEventListener('load', () => {
    const loader = $('#loader');
    if (loader) setTimeout(() => loader.classList.add('hide'), 500);
  });

  /*==================== THEME ====================*/
  (function theme() {
    const btn = $('#theme-button');
    const root = document.documentElement;
    const saved = ls.get('theme', 'dark');
    apply(saved);
    function apply(t) {
      root.classList.toggle('light', t === 'light');
      if (btn) btn.className = 'uil change-theme ' + (t === 'light' ? 'uil-sun' : 'uil-moon');
      const meta = $('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', t === 'light' ? '#F8FAFC' : '#0F172A');
    }
    function toggle() {
      const next = root.classList.contains('light') ? 'dark' : 'light';
      apply(next); ls.set('theme', next);
    }
    if (btn) {
      btn.addEventListener('click', toggle);
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    }
  })();

  /*==================== NAV ====================*/
  (function nav() {
    const menu = $('#nav-menu');
    const toggle = $('#nav-toggle');
    const close = $('#nav-close');
    const backdrop = $('#nav-backdrop');
    const header = $('#header');

    const open = () => { menu.classList.add('show-menu'); backdrop.classList.add('show'); };
    const hide = () => { menu.classList.remove('show-menu'); backdrop.classList.remove('show'); };

    toggle && toggle.addEventListener('click', open);
    close && close.addEventListener('click', hide);
    backdrop && backdrop.addEventListener('click', hide);
    $$('.nav__link').forEach((l) => l.addEventListener('click', hide));

    // header elevation on scroll
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
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
          if (e.isIntersecting) {
            links.forEach((l) => l.classList.remove('active-link'));
            map[e.target.id] && map[e.target.id].classList.add('active-link');
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach((s) => io.observe(s));
    }
  })();

  /*==================== SCROLL PROGRESS + BACK TO TOP ====================*/
  (function scrollUi() {
    const bar = $('#scroll-progress');
    const up = $('#scroll-up');
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (bar) bar.style.width = (scrolled * 100) + '%';
      if (up) up.classList.toggle('show', h.scrollTop > 500);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  /*==================== TYPING EFFECT ====================*/
  (function typing() {
    const el = $('#typed');
    if (!el || !D.TYPED_ROLES) return;
    const roles = D.TYPED_ROLES;
    if (reduceMotion) { el.textContent = roles[0]; return; }
    let r = 0, i = 0, deleting = false;
    function loop() {
      const word = roles[r];
      el.textContent = word.slice(0, i);
      if (!deleting && i < word.length) { i++; setTimeout(loop, 90); }
      else if (!deleting && i === word.length) { deleting = true; setTimeout(loop, 1600); }
      else if (deleting && i > 0) { i--; setTimeout(loop, 45); }
      else { deleting = false; r = (r + 1) % roles.length; setTimeout(loop, 350); }
    }
    loop();
  })();

  /*==================== SCROLL REVEAL ====================*/
  const revealIO = ('IntersectionObserver' in window) ? new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        // animate skill bars when revealed
        $$('.skill__fill', e.target).forEach((f) => { f.style.width = (f.dataset.level || 0) + '%'; });
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 }) : null;

  function observeReveals(scope = document) {
    if (!revealIO) { $$('.reveal,.reveal-l,.reveal-r', scope).forEach((el) => el.classList.add('in')); return; }
    $$('.reveal,.reveal-l,.reveal-r', scope).forEach((el) => revealIO.observe(el));
  }

  /*==================== ANIMATED COUNTERS ====================*/
  (function counters() {
    const items = $$('[data-count]');
    if (!items.length) return;
    const run = (el) => {
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (reduceMotion) { el.textContent = target + suffix; return; }
      let n = 0; const stepN = Math.max(1, Math.ceil(target / 40));
      const t = setInterval(() => {
        n += stepN;
        if (n >= target) { n = target; clearInterval(t); }
        el.textContent = n + suffix;
      }, 30);
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => { if (e.isIntersecting) { run(e.target); obs.unobserve(e.target); } });
      }, { threshold: 0.5 });
      items.forEach((i) => io.observe(i));
    } else items.forEach(run);
  })();

  /*==================== CUSTOM CURSOR ====================*/
  (function cursor() {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0, has = false;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY; has = true;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    function raf() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(raf);
    }
    if (!reduceMotion) raf();
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .portfolio__card, .games__tab, .memory__card, [role="button"], input, textarea'))
        ring.classList.add('grow');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, .portfolio__card, .games__tab, .memory__card, [role="button"], input, textarea'))
        ring.classList.remove('grow');
    });
  })();

  /*==================== PARTICLES ====================*/
  (function particles() {
    const canvas = $('#particles');
    if (!canvas || reduceMotion) return;
    const ctx = canvas.getContext('2d');
    let w, h, pts, raf, mouse = { x: -999, y: -999 };

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(80, Math.floor((w * h) / 18000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.8 + 0.8,
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        // mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.hypot(dx, dy);
        if (dist < 120) { p.x += dx / dist * 0.8; p.y += dy / dist * 0.8; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34,197,94,0.55)';
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(34,197,94,${0.14 * (1 - d / 120)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout', () => { mouse.x = mouse.y = -999; });
    window.addEventListener('resize', resize);
    resize(); draw();
  })();

  /*==================== RENDER: ABOUT ====================*/
  (function about() {
    const chips = $('#about-chips');
    if (chips && D.ABOUT_CHIPS) chips.innerHTML = D.ABOUT_CHIPS.map((c) => `<span class="about__chip">${c}</span>`).join('');
    const cards = $('#about-cards');
    if (cards && D.ABOUT_CARDS) cards.innerHTML = D.ABOUT_CARDS.map((c) => `
      <div class="about__card glass">
        <i class="uil ${c.icon}"></i>
        <h4>${c.title}</h4>
        <p>${c.text}</p>
      </div>`).join('');
  })();

  /*==================== RENDER: SKILLS ====================*/
  (function skills() {
    const box = $('#skills-container');
    if (!box || !D.SKILLS) return;
    box.innerHTML = D.SKILLS.map((cat, ci) => `
      <div class="skills__card glass reveal" data-delay="${(ci % 3) + 1}">
        <div class="skills__card-header">
          <span class="skills__icon"><i class="uil ${cat.icon}"></i></span>
          <h3 class="skills__card-title">${cat.title}</h3>
        </div>
        ${cat.items.map((s) => `
          <div class="skill">
            <div class="skill__top">
              <span class="skill__name"><i class="${s.icon} colored"></i> ${s.name}</span>
              <span class="skill__pct">${s.level}%</span>
            </div>
            <div class="skill__bar"><span class="skill__fill" data-level="${s.level}"></span></div>
          </div>`).join('')}
      </div>`).join('');
    observeReveals(box);
  })();

  /*==================== RENDER: TIMELINES ====================*/
  function renderTimeline(elId, items, withPoints) {
    const box = $(elId);
    if (!box || !items) return;
    box.innerHTML = items.map((it, i) => `
      <div class="timeline__item reveal" data-delay="${(i % 3) + 1}">
        <span class="timeline__dot"></span>
        <div class="timeline__content glass">
          <div class="timeline__head">
            <span class="timeline__logo"><i class="uil ${it.icon}"></i></span>
            <div>
              <h3 class="timeline__title">${it.role || it.title}</h3>
              <span class="timeline__place">${it.company || it.place}${it.location ? ' · ' + it.location : ''}</span>
            </div>
          </div>
          <span class="timeline__date"><i class="uil uil-calendar-alt"></i> ${it.date}</span>
          <p class="timeline__description">${it.summary || it.desc}</p>
          ${withPoints && it.points ? `<ul class="timeline__list">${it.points.map((p) => `<li><i class="uil uil-check-circle"></i> ${p}</li>`).join('')}</ul>` : ''}
          ${it.tags ? `<div class="timeline__tags">${it.tags.map((t) => `<span>${t}</span>`).join('')}</div>` : ''}
        </div>
      </div>`).join('');
    observeReveals(box);
  }
  renderTimeline('#experience-timeline', D.EXPERIENCE, true);
  renderTimeline('#education-timeline', D.EDUCATION, false);

  /*==================== RENDER: PORTFOLIO + FILTER + MODAL ====================*/
  (function portfolio() {
    const grid = $('#portfolio-grid');
    const filters = $('#portfolio-filters');
    if (!grid || !D.PROJECTS) return;
    const CATS = [
      { key: 'all', label: 'All' },
      { key: 'backend', label: 'Backend' },
      { key: 'frontend', label: 'Frontend' },
      { key: 'fullstack', label: 'Full Stack' },
      { key: 'personal', label: 'Personal' },
    ];
    const present = new Set(D.PROJECTS.map((p) => p.category));
    filters.innerHTML = CATS.filter((c) => c.key === 'all' || present.has(c.key))
      .map((c, i) => `<button class="portfolio__filter ${i === 0 ? 'active' : ''}" data-cat="${c.key}">${c.label}</button>`).join('');

    grid.innerHTML = D.PROJECTS.map((p, i) => `
      <article class="portfolio__card glass reveal" data-cat="${p.category}" data-i="${i}" data-delay="${(i % 3) + 1}">
        <div class="portfolio__img-wrapper">
          <span class="portfolio__cat">${labelFor(p.category)}</span>
          <img src="${p.img}" alt="${p.title}" class="portfolio__img" loading="lazy">
          <div class="portfolio__overlay">
            ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="portfolio__link" aria-label="GitHub" data-stop><i class="uil uil-github-alt"></i></a>` : ''}
            ${p.demo ? `<a href="${p.demo}" ${p.demo.startsWith('#') ? '' : 'target="_blank" rel="noopener"'} class="portfolio__link" aria-label="Live demo" data-stop><i class="uil uil-external-link-alt"></i></a>` : ''}
          </div>
        </div>
        <div class="portfolio__info">
          <h3 class="portfolio__title">${p.title}</h3>
          <p class="portfolio__description">${p.desc}</p>
          <div class="portfolio__tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        </div>
      </article>`).join('');
    observeReveals(grid);

    function labelFor(k) { return (CATS.find((c) => c.key === k) || {}).label || k; }

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.portfolio__filter');
      if (!btn) return;
      $$('.portfolio__filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      $$('.portfolio__card', grid).forEach((card) => {
        card.classList.toggle('hide', !(cat === 'all' || card.dataset.cat === cat));
      });
    });

    // Modal
    const modal = $('#project-modal');
    const openModal = (p) => {
      $('#modal-img').src = p.img; $('#modal-img').alt = p.title;
      $('#modal-title').textContent = p.title;
      $('#modal-desc').textContent = p.desc;
      $('#modal-tags').innerHTML = p.tags.map((t) => `<span>${t}</span>`).join('');
      $('#modal-actions').innerHTML =
        (p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="button button--ghost"><i class="uil uil-github-alt"></i> Code</a>` : '') +
        (p.demo ? `<a href="${p.demo}" ${p.demo.startsWith('#') ? '' : 'target="_blank" rel="noopener"'} class="button"><i class="uil uil-external-link-alt"></i> Live Demo</a>` : '');
      modal.classList.add('show');
    };
    const closeModal = () => modal.classList.remove('show');

    grid.addEventListener('click', (e) => {
      if (e.target.closest('[data-stop]')) return; // let links work
      const card = e.target.closest('.portfolio__card');
      if (card) openModal(D.PROJECTS[+card.dataset.i]);
    });
    $('#modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
  })();

  /*==================== RENDER: TESTIMONIALS CAROUSEL ====================*/
  (function testimonials() {
    const track = $('#testimonial-track');
    const dots = $('#testimonial-dots');
    if (!track || !D.TESTIMONIALS) return;
    const items = D.TESTIMONIALS;
    let idx = 0, timer;

    track.innerHTML = items.map((t) => `
      <div class="testimonial__card">
        <div class="testimonial__quote"><i class="uil uil-comment-alt-dots"></i></div>
        <p class="testimonial__text">${t.text}</p>
        <div class="testimonial__author">
          <img src="${t.img}" alt="${t.name}" class="testimonial__author-img" loading="lazy">
          <div>
            <h4 class="testimonial__author-name">${t.name}</h4>
            <span class="testimonial__author-role">${t.role}</span>
          </div>
        </div>
      </div>`).join('');
    dots.innerHTML = items.map((_, i) => `<button class="testimonial__dot ${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`).join('');

    function go(n) {
      idx = (n + items.length) % items.length;
      track.style.transform = `translateX(-${idx * 100}%)`;
      $$('.testimonial__dot', dots).forEach((d, i) => d.classList.toggle('active', i === idx));
    }
    function auto() { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => go(idx + 1), 5500); }

    $('#t-next').addEventListener('click', () => { go(idx + 1); auto(); });
    $('#t-prev').addEventListener('click', () => { go(idx - 1); auto(); });
    dots.addEventListener('click', (e) => { const b = e.target.closest('.testimonial__dot'); if (b) { go(+b.dataset.i); auto(); } });
    const carousel = $('.testimonial__carousel');
    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', auto);
    // swipe
    let sx = 0;
    carousel.addEventListener('touchstart', (e) => sx = e.touches[0].clientX, { passive: true });
    carousel.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) { go(idx + (dx < 0 ? 1 : -1)); auto(); }
    });
    auto();
  })();

  /*==================== HEATMAP (mock data) ====================*/
  (function heatmap() {
    const grid = $('#heatmap-grid');
    if (!grid) return;
    const WEEKS = 26; // ~6 months
    const cells = WEEKS * 7;
    let total = 0;
    let html = '';
    for (let i = 0; i < cells; i++) {
      // pseudo activity with weekend dip
      const dow = i % 7;
      let r = Math.random();
      if (dow === 0 || dow === 6) r *= 0.5;
      const level = r < 0.45 ? 0 : r < 0.65 ? 1 : r < 0.82 ? 2 : r < 0.93 ? 3 : 4;
      total += level;
      html += `<span class="heatmap__cell" data-l="${level}"></span>`;
    }
    grid.innerHTML = html;
    const t = $('#heatmap-total');
    if (t) t.textContent = `${total * 3 + 120} contributions in the last 6 months`;
  })();

  /*==================== CONTACT FORM ====================*/
  (function contact() {
    const form = $('#contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      if (!data.name || !data.email || !data.message) { toast('Please fill in all required fields.', true); return; }

      const endpoint = form.dataset.formspree;
      if (endpoint) {
        try {
          const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
          if (res.ok) { toast("Message sent — I'll be in touch soon! 🚀"); form.reset(); }
          else throw new Error('bad response');
        } catch { toast('Something went wrong. Try emailing me directly.', true); }
      } else {
        // mailto fallback (no backend)
        const subject = encodeURIComponent(data.subject || `Portfolio contact from ${data.name}`);
        const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
        window.location.href = `mailto:mdrahano12@gmail.com?subject=${subject}&body=${body}`;
        toast('Opening your email app… 📬');
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
    el.innerHTML = `<i class="uil ${isError ? 'uil-exclamation-triangle' : 'uil-check-circle'}"></i><span>${msg}</span>`;
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
  // game-driven achievements
  window.addEventListener('quiz:perfect', () => unlock('quiz-ace', 'Quiz Ace 🧠', 'Perfect score on the coding quiz!'));
  window.addEventListener('snake:over', (e) => { if (e.detail.score >= 100) unlock('snake-100', 'Snake Charmer 🐍', 'Scored 100+ in Snake!'); });

  /*==================== EASTER EGGS ====================*/
  (function eggs() {
    const SPOTS = [
      { id: 'about', sel: '#about', icon: 'uil-rocket', css: 'top:14%;right:6%;', name: 'Liftoff', msg: 'You found the rocket! 🚀' },
      { id: 'skills', sel: '#skills', icon: 'uil-bug', css: 'bottom:8%;left:4%;', name: 'Bug Hunter', msg: 'Squashed a hidden bug! 🐛' },
      { id: 'exp', sel: '#experience', icon: 'uil-coffee', css: 'top:18%;left:3%;', name: 'Fuel Up', msg: 'Coffee located. Productivity +10! ☕' },
      { id: 'portfolio', sel: '#portfolio', icon: 'uil-keyboard', css: 'bottom:10%;right:5%;', name: 'Keystroke', msg: 'A wild keyboard appears! ⌨️' },
      { id: 'games', sel: '#games', icon: 'uil-game-structure', css: 'top:22%;right:4%;', name: 'Player Two', msg: 'Secret game token! 🎮' },
    ];
    const found = new Set(ls.get('eggs-found', []));
    const counter = $('#egg-count');
    if (counter) counter.textContent = found.size;

    SPOTS.forEach((spot) => {
      const host = $(spot.sel);
      if (!host) return;
      const egg = document.createElement('i');
      egg.className = 'uil ' + spot.icon + ' egg' + (found.has(spot.id) ? ' found' : '');
      egg.style.cssText = spot.css;
      egg.title = 'A hidden something…';
      egg.addEventListener('click', (e) => {
        e.stopPropagation();
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
    const seq = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'];
    let pos = 0;
    document.addEventListener('keydown', (e) => {
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
