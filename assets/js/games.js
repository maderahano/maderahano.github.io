/*==================================================================
  Mini Games — Snake · Memory Match · Dinosaur Run
  Pure vanilla JS + Canvas. High scores persisted in LocalStorage.
==================================================================*/
(function () {
  'use strict';
  const D = window.PORTFOLIO_DATA;
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const css = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim();
  const ls = {
    get: (k, f) => { try { const v = localStorage.getItem(k); return v === null ? f : JSON.parse(v); } catch { return f; } },
    set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  };

  /*======================== SNAKE ========================*/
  const Snake = (() => {
    const canvas = $('#snake-canvas');
    if (!canvas) return { init() {} };
    const ctx = canvas.getContext('2d');
    const GRID = 20;
    const CELL = canvas.width / GRID;
    let snake, dir, nextDir, food, score, best, dead, loopId, lastStep, speed, running;

    function reset() {
      snake = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
      dir = { x: 1, y: 0 };
      nextDir = { x: 1, y: 0 };
      score = 0;
      speed = 130;
      dead = false;
      lastStep = 0;
      placeFood();
      best = ls.get('snake-best', 0);
      $('#snake-score').textContent = '0';
      $('#snake-best').textContent = best;
    }

    function placeFood() {
      do {
        food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
      } while (snake.some((s) => s.x === food.x && s.y === food.y));
    }

    function setDir(nx, ny) {
      // prevent 180° reversal
      if (snake.length > 1 && nx === -dir.x && ny === -dir.y) return;
      nextDir = { x: nx, y: ny };
    }

    function step() {
      dir = nextDir;
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
      if (head.x < 0 || head.y < 0 || head.x >= GRID || head.y >= GRID ||
          snake.some((s) => s.x === head.x && s.y === head.y)) {
        return gameOver();
      }
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        $('#snake-score').textContent = score;
        if (speed > 70) speed -= 2;
        placeFood();
      } else {
        snake.pop();
      }
    }

    function gameOver() {
      dead = true;
      if (score > best) { best = score; ls.set('snake-best', best); $('#snake-best').textContent = best; }
      draw();
      ctx.fillStyle = 'rgba(15,23,42,0.78)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = css('--green-3') || '#4ADE80';
      ctx.textAlign = 'center';
      ctx.font = '700 26px Inter, sans-serif';
      ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 8);
      ctx.fillStyle = css('--text-soft') || '#94A3B8';
      ctx.font = '500 14px Inter, sans-serif';
      ctx.fillText('Score ' + score + ' · Press Restart', canvas.width / 2, canvas.height / 2 + 20);
      window.dispatchEvent(new CustomEvent('snake:over', { detail: { score } }));
    }

    function draw() {
      ctx.fillStyle = css('--bg-2') || '#0b1120';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // food
      ctx.fillStyle = '#ef4444';
      roundRect(food.x * CELL + 3, food.y * CELL + 3, CELL - 6, CELL - 6, 5);
      ctx.fill();
      // snake
      snake.forEach((s, i) => {
        const t = i / snake.length;
        ctx.fillStyle = i === 0 ? (css('--green-3') || '#4ADE80') : `rgba(34,197,94,${1 - t * 0.6})`;
        roundRect(s.x * CELL + 1.5, s.y * CELL + 1.5, CELL - 3, CELL - 3, 5);
        ctx.fill();
      });
    }

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    function frame(ts) {
      loopId = requestAnimationFrame(frame);
      if (!running || dead) { draw(); return; }
      if (ts - lastStep >= speed) { lastStep = ts; step(); }
      draw();
    }

    function start() { running = true; }
    function stop() { running = false; }

    function init() {
      reset();
      draw();
      cancelAnimationFrame(loopId);
      loopId = requestAnimationFrame(frame);

      const keymap = {
        ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
        w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0],
        W: [0, -1], S: [0, 1], A: [-1, 0], D: [1, 0],
      };
      document.addEventListener('keydown', (e) => {
        if (!running) return;
        const k = keymap[e.key];
        if (k) { e.preventDefault(); setDir(k[0], k[1]); }
      });
      $('#snake-restart').addEventListener('click', () => { reset(); draw(); });
      document.querySelectorAll('.snake__dpad button').forEach((b) => {
        b.addEventListener('click', () => {
          const m = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[b.dataset.dir];
          if (m) setDir(m[0], m[1]);
        });
      });
    }
    return { init, start, stop };
  })();

  /*======================== MEMORY MATCH ========================*/
  const Memory = (() => {
    const board = $('#memory-board');
    if (!board) return { init() {} };
    let first, lock, moves, matches, timer, seconds, started;

    function shuffle(a) {
      const arr = a.slice();
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }

    function fmt(s) { return s + 's'; }

    function tick() { seconds++; $('#memory-time').textContent = fmt(seconds); }

    function reset() {
      clearInterval(timer);
      first = null; lock = false; moves = 0; matches = 0; seconds = 0; started = false;
      $('#memory-moves').textContent = '0';
      $('#memory-matches').textContent = '0';
      $('#memory-time').textContent = '0s';
      const best = ls.get('memory-best', null);
      $('#memory-best').textContent = best ? best + 's' : '—';

      const deck = shuffle([...D.MEMORY_ICONS, ...D.MEMORY_ICONS]);
      board.innerHTML = deck.map((icon) => `
        <div class="memory__card" data-icon="${icon}">
          <div class="memory__inner">
            <div class="memory__face memory__front"><i class="uil uil-process"></i></div>
            <div class="memory__face memory__back">${icon}</div>
          </div>
        </div>`).join('');
      board.querySelectorAll('.memory__card').forEach((c) => c.addEventListener('click', () => flip(c)));
    }

    function flip(card) {
      if (lock || card.classList.contains('flipped') || card.classList.contains('matched')) return;
      if (!started) { started = true; timer = setInterval(tick, 1000); }
      card.classList.add('flipped');
      if (!first) { first = card; return; }

      moves++; $('#memory-moves').textContent = moves;
      if (first.dataset.icon === card.dataset.icon) {
        first.classList.add('matched'); card.classList.add('matched');
        first = null;
        matches++; $('#memory-matches').textContent = matches;
        if (matches === D.MEMORY_ICONS.length) win();
      } else {
        lock = true;
        const a = first, b = card;
        setTimeout(() => { a.classList.remove('flipped'); b.classList.remove('flipped'); first = null; lock = false; }, 750);
      }
    }

    function win() {
      clearInterval(timer);
      const best = ls.get('memory-best', null);
      if (best === null || seconds < best) { ls.set('memory-best', seconds); $('#memory-best').textContent = seconds + 's'; }
      window.dispatchEvent(new CustomEvent('toast', { detail: { msg: `Solved in ${moves} moves & ${seconds}s! 🎉` } }));
    }

    function init() {
      reset();
      $('#memory-restart').addEventListener('click', reset);
    }
    function stop() { clearInterval(timer); }
    return { init, stop };
  })();

  /*======================== CUBE RUN ========================*/
  const Dino = (() => {
    const canvas = $('#dino-canvas');
    if (!canvas) return { init() {} };
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const BASE = H - 30;              // y of the ground baseline (where feet rest)
    const STAND_H = 30, DUCK_H = 18, DINO_W = 24;
    const GRAVITY = 0.7;
    const JUMP_V = -12.5;

    let dino, obstacles, score, best, speed, spawnIn, dead, started;
    let loopId, milestoneHit;

    function reset() {
      dino = { x: 48, y: BASE - STAND_H, vy: 0, ducking: false, onGround: true };
      obstacles = [];
      score = 0;
      speed = 5;
      spawnIn = 60;
      dead = false;
      started = false;
      milestoneHit = false;
      best = ls.get('dino-best', 0);
      $('#dino-score').textContent = '0';
      $('#dino-best').textContent = best;
    }

    function jump() {
      if (dead) return;
      started = true;
      if (dino.onGround) { dino.vy = JUMP_V; dino.onGround = false; }
    }

    function duck(on) {
      if (dead) return;
      dino.ducking = on && dino.onGround;
    }

    function spawn() {
      // Two obstacle flavours: a ground cactus and a higher "bird" that you duck under.
      const bird = Math.random() < 0.25 && Math.floor(score / 5) > 30;
      if (bird) {
        obstacles.push({ x: W + 10, y: BASE - 46, w: 30, h: 18, bird: true });
      } else {
        const h = 24 + Math.floor(Math.random() * 22);
        const w = 12 + Math.floor(Math.random() * 14);
        obstacles.push({ x: W + 10, y: BASE - h, w, h, bird: false });
      }
    }

    function hit(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    function dinoBox() {
      const h = dino.ducking ? DUCK_H : STAND_H;
      return { x: dino.x, y: dino.ducking ? BASE - DUCK_H : dino.y, w: DINO_W, h };
    }

    function update() {
      if (!started || dead) return;

      // Dino physics — dino.y is the top edge; floor depends on standing/ducking height.
      dino.vy += GRAVITY;
      dino.y += dino.vy;
      const floor = BASE - (dino.ducking ? DUCK_H : STAND_H);
      if (dino.y >= floor) { dino.y = floor; dino.vy = 0; dino.onGround = true; }
      else { dino.onGround = false; }
      const box = dinoBox();

      // Score + difficulty
      score++;
      $('#dino-score').textContent = Math.floor(score / 5);
      if (score % 250 === 0) speed += 0.6;
      if (!milestoneHit && Math.floor(score / 5) >= 100) {
        milestoneHit = true;
        window.dispatchEvent(new CustomEvent('dino:milestone'));
      }

      // Obstacles
      if (--spawnIn <= 0) {
        spawn();
        spawnIn = Math.max(45, 90 - Math.floor(speed * 3)) + Math.floor(Math.random() * 40);
      }
      for (let i = obstacles.length - 1; i >= 0; i--) {
        const o = obstacles[i];
        o.x -= speed;
        if (o.x + o.w < 0) { obstacles.splice(i, 1); continue; }
        if (hit(box, o)) return gameOver();
      }
    }

    function gameOver() {
      dead = true;
      const s = Math.floor(score / 5);
      if (s > best) { best = s; ls.set('dino-best', best); $('#dino-best').textContent = best; }
      window.dispatchEvent(new CustomEvent('dino:over', { detail: { score: s } }));
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = css('--bg-2') || '#0b1120';
      ctx.fillRect(0, 0, W, H);

      // ground
      ctx.strokeStyle = css('--text-soft') || '#94A3B8';
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, BASE + 1);
      ctx.lineTo(W, BASE + 1);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // dino
      const green = css('--green-3') || '#4ADE80';
      ctx.fillStyle = green;
      const b = dinoBox();
      roundRect(b.x, b.y, b.w, b.h, 5);
      ctx.fill();
      // little eye
      ctx.fillStyle = css('--bg-2') || '#0b1120';
      ctx.fillRect(b.x + b.w - 7, b.y + 5, 3, 3);

      // obstacles
      obstacles.forEach((o) => {
        ctx.fillStyle = o.bird ? (css('--green-2') || '#22C55E') : '#ef4444';
        roundRect(o.x, o.y, o.w, o.h, 4);
        ctx.fill();
      });

      // overlays
      ctx.textAlign = 'center';
      if (!started) {
        ctx.fillStyle = css('--text-soft') || '#94A3B8';
        ctx.font = '500 15px Inter, sans-serif';
        ctx.fillText('Press Space / ↑ or tap to start', W / 2, H / 2);
      } else if (dead) {
        ctx.fillStyle = 'rgba(15,23,42,0.78)';
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle = green;
        ctx.font = '700 26px Inter, sans-serif';
        ctx.fillText('Game Over', W / 2, H / 2 - 6);
        ctx.fillStyle = css('--text-soft') || '#94A3B8';
        ctx.font = '500 14px Inter, sans-serif';
        ctx.fillText('Score ' + Math.floor(score / 5) + ' · Press Restart / tap', W / 2, H / 2 + 18);
      }
    }

    function roundRect(x, y, w, h, r) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    }

    let running = false;
    function frame() {
      loopId = requestAnimationFrame(frame);
      if (running) update();
      draw();
    }

    function start() { running = true; }
    function stop() { running = false; }

    function onKey(e) {
      if (!running) return;
      if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        if (dead) { reset(); } else { jump(); }
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        duck(true);
      }
    }
    function onKeyUp(e) {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') duck(false);
    }

    function init() {
      reset();
      draw();
      cancelAnimationFrame(loopId);
      loopId = requestAnimationFrame(frame);
      document.addEventListener('keydown', onKey);
      document.addEventListener('keyup', onKeyUp);
      canvas.addEventListener('pointerdown', () => { if (dead) reset(); else jump(); });
      $('#dino-restart').addEventListener('click', reset);
    }

    return { init, start, stop };
  })();

  /*======================== TAB SWITCHING ========================*/
  function initTabs() {
    const tabs = document.querySelectorAll('.games__tab');
    const panels = { snake: $('#game-snake'), memory: $('#game-memory'), dino: $('#game-dino') };
    const mods = { snake: Snake, memory: Memory, dino: Dino };
    let inited = { snake: false, memory: false, dino: false };
    let current = 'snake';

    function ensure(name) { if (!inited[name]) { inited[name] = true; mods[name].init(); } }

    function activate(name) {
      current = name;
      tabs.forEach((t) => t.classList.toggle('active', t.dataset.game === name));
      Object.entries(panels).forEach(([k, p]) => p && p.classList.toggle('active', k === name));
      Snake.stop(); Dino.stop();
      ensure(name);
      if (name === 'snake') Snake.start();
      if (name === 'dino') Dino.start();
    }

    tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.game)));

    // Lazy-start: only run the active canvas game while the section is on-screen.
    const section = $('#games');
    if (section && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ensure('snake');
            if (current === 'snake') Snake.start();
            else if (current === 'dino') Dino.start();
          } else {
            Snake.stop(); Dino.stop();
          }
        });
      }, { threshold: 0.25 });
      io.observe(section);
    } else {
      ensure('snake'); Snake.start();
    }
  }

  document.addEventListener('DOMContentLoaded', initTabs);
})();
