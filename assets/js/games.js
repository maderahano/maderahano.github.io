/*==================================================================
  Mini Games — Snake · Memory Match · Coding Quiz
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

  /*======================== CODING QUIZ ========================*/
  const Quiz = (() => {
    const body = $('#quiz-body');
    if (!body) return { init() {} };
    let idx, score, qs;

    function start() {
      idx = 0; score = 0;
      qs = D.QUIZ;
      $('#quiz-total').textContent = qs.length;
      $('#quiz-score').textContent = '0';
      render();
    }

    function render() {
      const item = qs[idx];
      $('#quiz-num').textContent = idx + 1;
      $('#quiz-progress').style.width = (idx / qs.length) * 100 + '%';
      body.innerHTML = `
        <p class="quiz__question">${item.q}</p>
        <div class="quiz__options">
          ${item.options.map((o, i) => `<button class="quiz__option" data-i="${i}">${o}</button>`).join('')}
        </div>`;
      body.querySelectorAll('.quiz__option').forEach((btn) => btn.addEventListener('click', () => choose(btn, item)));
    }

    function choose(btn, item) {
      const chosen = +btn.dataset.i;
      const opts = body.querySelectorAll('.quiz__option');
      opts.forEach((o, i) => {
        o.disabled = true;
        if (i === item.answer) o.classList.add('correct');
        else if (i === chosen) o.classList.add('wrong');
      });
      if (chosen === item.answer) { score++; $('#quiz-score').textContent = score; }
      setTimeout(() => { idx++; idx < qs.length ? render() : finish(); }, 900);
    }

    function finish() {
      $('#quiz-progress').style.width = '100%';
      $('#quiz-num').textContent = qs.length;
      const pct = Math.round((score / qs.length) * 100);
      const msg = pct === 100 ? 'Flawless. Are you hiring? 😎'
        : pct >= 70 ? 'Strong work — solid fundamentals!'
        : pct >= 40 ? 'Not bad — keep grinding those docs.'
        : 'Everyone starts somewhere. Run it back!';
      body.innerHTML = `
        <div class="quiz__result">
          <div class="quiz__result-score">${score}/${qs.length}</div>
          <p class="quiz__result-msg">${msg}</p>
          <button class="button" id="quiz-restart"><i class="uil uil-redo"></i> Play Again</button>
        </div>`;
      $('#quiz-restart').addEventListener('click', start);
      if (pct === 100) window.dispatchEvent(new CustomEvent('quiz:perfect'));
    }

    function init() { start(); }
    return { init };
  })();

  /*======================== TAB SWITCHING ========================*/
  function initTabs() {
    const tabs = document.querySelectorAll('.games__tab');
    const panels = { snake: $('#game-snake'), memory: $('#game-memory'), quiz: $('#game-quiz') };
    let inited = { snake: false, memory: false, quiz: false };

    function activate(name) {
      tabs.forEach((t) => t.classList.toggle('active', t.dataset.game === name));
      Object.entries(panels).forEach(([k, p]) => p && p.classList.toggle('active', k === name));
      Snake.stop();
      if (name === 'snake') Snake.start();
      if (!inited[name]) { inited[name] = true; ({ snake: Snake, memory: Memory, quiz: Quiz })[name].init(); }
    }

    tabs.forEach((t) => t.addEventListener('click', () => activate(t.dataset.game)));

    // Lazy-start: only initialise the visible Snake game when the section scrolls in.
    const section = $('#games');
    if (section && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (!inited.snake) { inited.snake = true; Snake.init(); }
            Snake.start();
          } else {
            Snake.stop();
          }
        });
      }, { threshold: 0.25 });
      io.observe(section);
    } else {
      inited.snake = true; Snake.init(); Snake.start();
    }
  }

  document.addEventListener('DOMContentLoaded', initTabs);
})();
