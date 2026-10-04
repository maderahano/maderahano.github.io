import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import styles from './NetworkBackground.module.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

/**
 * Subtle "distributed system" network: slowly drifting nodes connected by faint lines,
 * nodes near the pointer brighten slightly. Pauses when off-screen, renders a single
 * static frame when the user prefers reduced motion, and caps DPR for performance.
 */
export function NetworkBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };
    const LINK = 150;

    const css = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        accent: s.getPropertyValue('--accent').trim() || '#22c55e',
        light: s.getPropertyValue('color-scheme').trim() === 'light',
      };
    };

    const seed = () => {
      const count = Math.round(Math.min(90, Math.max(28, (width * height) / 22000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: 1 + Math.random() * 1.4,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) draw(false);
    };

    const draw = (step: boolean) => {
      const { accent, light } = css();
      ctx.clearRect(0, 0, width, height);
      const lineBase = light ? 'rgba(15, 23, 42,' : 'rgba(148, 163, 184,';

      for (const n of nodes) {
        if (step) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < -10) n.x = width + 10;
          else if (n.x > width + 10) n.x = -10;
          if (n.y < -10) n.y = height + 10;
          else if (n.y > height + 10) n.y = -10;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > LINK * LINK) continue;
          const t = 1 - Math.sqrt(d2) / LINK;
          ctx.strokeStyle = `${lineBase}${(light ? 0.12 : 0.16) * t})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const dx = n.x - pointer.x;
        const dy = n.y - pointer.y;
        const near = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 180);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + near * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = near > 0.05 ? accent : `${lineBase}${light ? 0.35 : 0.55})`;
        ctx.globalAlpha = 0.6 + near * 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    };

    const loop = () => {
      if (!visible) return;
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    });
    const ro = new ResizeObserver(resize);
    const mo = new MutationObserver(() => reduce && draw(false));

    resize();
    io.observe(canvas);
    ro.observe(canvas);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (!reduce) {
      const parent = canvas.parentElement ?? canvas;
      parent.addEventListener('pointermove', onPointer, { passive: true });
      parent.addEventListener('pointerleave', onLeave);
      return () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        mo.disconnect();
        parent.removeEventListener('pointermove', onPointer);
        parent.removeEventListener('pointerleave', onLeave);
      };
    }
    return () => {
      io.disconnect();
      ro.disconnect();
      mo.disconnect();
    };
  }, [reduce]);

  return <canvas ref={ref} className={styles.canvas} aria-hidden="true" />;
}
