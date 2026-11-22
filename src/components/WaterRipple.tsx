'use client';

import React, { useEffect, useRef } from 'react';

// =========================================================================
// WATER RIPPLE SETTINGS — EASILY TUNED
// =========================================================================
const CELL_SIZE = 6;              // Grid resolution: 1 cell per 6 screen pixels
const DAMP = 0.982;               // Ripple lifetime / persistence (about 0.982)
const MOVE_STRENGTH = 1.2;        // Subtle wave disturbance from pointer movement
const CLICK_STRENGTH = 4.8;       // Slightly larger wave splash from click / tap
const AMBIENT_STRENGTH = 1.8;     // Tiny ambient water droplet strength (~3 seconds)
const CREST_MAX_ALPHA = 46;       // Max alpha for crest (about 46/255, soft aqua #AFCCCF)
const TROUGH_MAX_ALPHA = 22;      // Max alpha for trough (about 22/255, faint brand teal #072427)

export default function WaterRipple() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion: disable simulation entirely
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let cols = 0;
    let rows = 0;
    let buffer1: Float32Array | null = null;
    let buffer2: Float32Array | null = null;
    let imageData: ImageData | null = null;

    let lastPointerX = 0;
    let lastPointerY = 0;
    let lastPointerTime = performance.now();
    let hasPointer = false;
    let lastAmbientTime = performance.now();
    let animId = 0;

    // Rebuild simulation grid on resize
    function resizeGrid() {
      if (!canvas || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cols = Math.ceil(w / CELL_SIZE);
      rows = Math.ceil(h / CELL_SIZE);
      const size = cols * rows;

      buffer1 = new Float32Array(size);
      buffer2 = new Float32Array(size);

      canvas.width = cols;
      canvas.height = rows;
      imageData = ctx.createImageData(cols, rows);
    }

    resizeGrid();

    let resizeTimer: NodeJS.Timeout | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeGrid, 120);
    };
    window.addEventListener('resize', handleResize);

    // Add disturbance to water surface with smooth cosine bell profile
    function disturb(cx: number, cy: number, strength: number, radiusPx: number) {
      if (!buffer1) return;
      const gx = Math.floor(cx / CELL_SIZE);
      const gy = Math.floor(cy / CELL_SIZE);
      const r = Math.max(1, Math.round(radiusPx / CELL_SIZE));
      const rSq = r * r;

      const minX = Math.max(1, gx - r);
      const maxX = Math.min(cols - 2, gx + r);
      const minY = Math.max(1, gy - r);
      const maxY = Math.min(rows - 2, gy + r);

      for (let y = minY; y <= maxY; y++) {
        const dy = y - gy;
        const dySq = dy * dy;
        const rowOffset = y * cols;

        for (let x = minX; x <= maxX; x++) {
          const dx = x - gx;
          const dSq = dx * dx + dySq;
          if (dSq <= rSq) {
            const dist = Math.sqrt(dSq);
            const factor = Math.cos((dist / r) * (Math.PI / 2));
            const idx = rowOffset + x;
            buffer1[idx] = Math.max(-50, Math.min(50, buffer1[idx] + strength * factor));
          }
        }
      }
    }

    // Pointer event listeners (supporting mouse, stylus, and touch)
    // Suppress ripples when pointer is over any card, button, or control
    const handlePointerMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest && target.closest('button, .product-card-wrap, .product-card-inner, .story-card, .card-surface, #main-nav, #cart-panel, #cart-drawer-root, a, input, select, textarea')) {
        hasPointer = false;
        return;
      }

      const now = performance.now();
      const dt = Math.max(1, now - lastPointerTime);
      const currX = e.clientX;
      const currY = e.clientY;

      if (hasPointer) {
        const dist = Math.hypot(currX - lastPointerX, currY - lastPointerY);
        const speed = dist / dt; // px per ms

        // Faster movement creates slightly bigger waves
        const strength = Math.min(MOVE_STRENGTH * 2.8, MOVE_STRENGTH + speed * 1.2);
        const radius = Math.min(20, Math.max(8, 9 + speed * 2.2));

        // Interpolate points between events to ensure smooth continuous ripples
        const steps = Math.min(6, Math.max(1, Math.floor(dist / (CELL_SIZE * 1.5))));
        for (let s = 1; s <= steps; s++) {
          const t = s / steps;
          const ix = lastPointerX + (currX - lastPointerX) * t;
          const iy = lastPointerY + (currY - lastPointerY) * t;
          disturb(ix, iy, strength, radius);
        }
      } else {
        hasPointer = true;
        disturb(currX, currY, MOVE_STRENGTH, 10);
      }

      lastPointerX = currX;
      lastPointerY = currY;
      lastPointerTime = now;
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest && target.closest('button, .product-card-wrap, .product-card-inner, .story-card, .card-surface, #main-nav, #cart-panel, #cart-drawer-root, a, input, select, textarea')) {
        return;
      }

      disturb(e.clientX, e.clientY, CLICK_STRENGTH, 20);
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastPointerTime = performance.now();
      hasPointer = true;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    // Main 60fps simulation and render loop
    function tick(now: number) {
      if (!buffer1 || !buffer2 || !imageData || !ctx) return;

      // Tiny ambient drop every ~3 seconds (never drops on cards or buttons)
      if (now - lastAmbientTime > 3000) {
        const pad = 80;
        const rx = Math.random() * (window.innerWidth - pad * 2) + pad;
        const ry = Math.random() * (window.innerHeight - pad * 2) + pad;
        const targetEl = document.elementFromPoint(rx, ry);
        if (!targetEl || !targetEl.closest('button, .product-card-wrap, .product-card-inner, .story-card, .card-surface, #main-nav, #cart-panel, a, input')) {
          disturb(rx, ry, AMBIENT_STRENGTH, 14);
        }
        lastAmbientTime = now + (Math.random() * 600 - 300);
      }

      // 2D Wave Height-Field simulation:
      // new[i] = ((left + right + up + down) / 2 - new[i]) * damping
      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols;
        for (let x = 1; x < cols - 1; x++) {
          const i = rowOffset + x;
          const left = buffer1[i - 1];
          const right = buffer1[i + 1];
          const up = buffer1[i - cols];
          const down = buffer1[i + cols];

          buffer2[i] = ((left + right + up + down) * 0.5 - buffer2[i]) * DAMP;
        }
      }

      // Swap buffers
      const temp = buffer1;
      buffer1 = buffer2;
      buffer2 = temp;

      // Slope-based rendering (light on crest, shadow in trough)
      const data = imageData.data;
      const heroEl = document.getElementById('hero');
      const heroBottom = heroEl ? heroEl.getBoundingClientRect().bottom : 0;
      const heroGridRow = Math.max(0, Math.floor(heroBottom / CELL_SIZE));

      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols;
        const isHero = y < heroGridRow;

        for (let x = 1; x < cols - 1; x++) {
          const i = rowOffset + x;
          const p = i * 4;

          // Slope calculation with directional light from top-left
          const slope = (buffer1[i - 1] - buffer1[i + 1]) + (buffer1[i - cols] - buffer1[i + cols]);

          if (slope > 0.02) {
            // Wave crest:
            // On darker hero section: lighter crest tint (white/aqua max alpha ~40/255)
            // On open light pages: soft aqua tint #AFCCCF (rgb 175, 204, 207, max alpha ~46/255)
            if (isHero) {
              const alpha = Math.min(58, Math.floor(slope * 42));
              data[p] = 250;
              data[p + 1] = 252;
              data[p + 2] = 255;
              data[p + 3] = alpha;
            } else {
              const alpha = Math.min(CREST_MAX_ALPHA, Math.floor(slope * 32));
              data[p] = 175;     // #AFCCCF
              data[p + 1] = 204;
              data[p + 2] = 207;
              data[p + 3] = alpha;
            }
          } else if (slope < -0.02) {
            // Wave trough: faint brand teal #072427 (rgb 7, 36, 39, max alpha ~22/255)
            const alpha = Math.min(isHero ? 32 : TROUGH_MAX_ALPHA, Math.floor(-slope * 20));
            data[p] = 7;
            data[p + 1] = 36;
            data[p + 2] = 39;
            data[p + 3] = alpha;
          } else {
            data[p + 3] = 0;
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <canvas
      id="water-ripple-canvas"
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
