'use client';

import { useEffect, useRef, useCallback } from 'react';
import { prepareWithSegments, layoutNextLine } from '@chenglou/pretext';
import type { PreparedTextWithSegments } from '@chenglou/pretext';
import { createSegments, updateHead, updateChain } from './dragon/physics';
import { layoutAllLines } from './dragon/text-layout';
import { spawnFire, updateParticles, renderParticles } from './dragon/fire';
import { renderDragon } from './dragon/renderer';
import type { Segment, FireParticle, TextFragment } from './dragon/types';

interface DragonTextProps {
  text: string;
  className?: string;
}

const FONT = '18px Outfit, system-ui, sans-serif';
const LINE_HEIGHT = 28;
const SPAN_POOL_SIZE = 300;

export default function DragonText({ text, className }: DragonTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const preparedRef = useRef<PreparedTextWithSegments | null>(null);
  const segmentsRef = useRef<Segment[]>([]);
  const particlesRef = useRef<FireParticle[]>([]);
  const mouseRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const spanPoolRef = useRef<HTMLSpanElement[]>([]);
  const containerSizeRef = useRef({ width: 0, height: 0 });
  const isFiringRef = useRef(false);
  const lastMouseMoveRef = useRef(0);
  const idlePhaseRef = useRef(0);
  const timeRef = useRef(0);
  const initializedRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    lastMouseMoveRef.current = performance.now();
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !e.touches[0]) return;
    mouseRef.current.x = e.touches[0].clientX - rect.left;
    mouseRef.current.y = e.touches[0].clientY - rect.top;
    lastMouseMoveRef.current = performance.now();
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const textLayer = textLayerRef.current;
    if (!container || !canvas || !textLayer) return;

    // Create span pool
    const spans: HTMLSpanElement[] = [];
    for (let i = 0; i < SPAN_POOL_SIZE; i++) {
      const span = document.createElement('span');
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.style.color = '#a09a90';
      span.style.font = FONT;
      span.style.lineHeight = `${LINE_HEIGHT}px`;
      span.style.willChange = 'transform';
      span.style.display = 'none';
      textLayer.appendChild(span);
      spans.push(span);
    }
    spanPoolRef.current = spans;

    // Measure container
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      containerSizeRef.current.width = rect.width;
      containerSizeRef.current.height = rect.height;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };
    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    // Initialize dragon at center
    const { width, height } = containerSizeRef.current;
    segmentsRef.current = createSegments(width / 2, height / 2);

    // Prepare text after font loads
    document.fonts.ready.then(() => {
      try {
        preparedRef.current = prepareWithSegments(text, FONT);
      } catch {
        preparedRef.current = prepareWithSegments(text, '18px system-ui, sans-serif');
      }
      startLoop();
    });

    // Event listeners — use document-level for mouseup so release is always caught
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    const handleDown = (e: MouseEvent | TouchEvent) => {
      isFiringRef.current = true;
      // Also update mouse position on click
      if (e instanceof MouseEvent) {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        lastMouseMoveRef.current = performance.now();
      }
    };
    const handleUp = () => {
      isFiringRef.current = false;
    };

    container.addEventListener('mousedown', handleDown);
    container.addEventListener('touchstart', handleDown, { passive: true });
    document.addEventListener('mouseup', handleUp);
    document.addEventListener('touchend', handleUp);

    function startLoop() {
      const ctx = canvas?.getContext('2d');
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;

      function frame() {
        if (!ctx || !canvas) return;
        const prepared = preparedRef.current;
        const segs = segmentsRef.current;
        const particles = particlesRef.current;
        const { width: cw, height: ch } = containerSizeRef.current;
        if (!prepared || cw === 0) {
          rafRef.current = requestAnimationFrame(frame);
          return;
        }

        timeRef.current += 1 / 60;

        // Idle animation: Lissajous orbit when mouse inactive
        const now = performance.now();
        const idleTime = now - lastMouseMoveRef.current;
        if (idleTime > 2000) {
          idlePhaseRef.current += 0.008;
          const t = idlePhaseRef.current;
          mouseRef.current.x = cw / 2 + Math.sin(t * 1.3) * cw * 0.3;
          mouseRef.current.y = ch / 2 + Math.sin(t * 0.9) * ch * 0.25;
        }

        // Update physics
        updateHead(segs, mouseRef.current.x, mouseRef.current.y);
        updateChain(segs, timeRef.current);

        // Fire
        if (isFiringRef.current) {
          spawnFire(segs, particles);
        }
        updateParticles(particles);

        // Layout text
        const fragments: TextFragment[] = layoutAllLines(
          prepared,
          cw,
          ch,
          LINE_HEIGHT,
          segs,
          layoutNextLine,
        );

        // Update span pool
        const spans = spanPoolRef.current;
        for (let i = 0; i < spans.length; i++) {
          if (i < fragments.length) {
            const f = fragments[i];
            spans[i].textContent = f.text;
            spans[i].style.transform = `translate3d(${f.x}px, ${f.y}px, 0)`;
            spans[i].style.display = '';
          } else {
            spans[i].style.display = 'none';
          }
        }

        // Draw dragon body + fire on canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderDragon(ctx, segs, dpr, timeRef.current);
        renderParticles(ctx, particles, dpr);

        rafRef.current = requestAnimationFrame(frame);
      }

      rafRef.current = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('mousedown', handleDown);
      container.removeEventListener('touchstart', handleDown);
      document.removeEventListener('mouseup', handleUp);
      document.removeEventListener('touchend', handleUp);
    };
  }, [text, handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', minHeight: '400px', cursor: 'crosshair' }}
      aria-label={text}
    >
      <div
        ref={textLayerRef}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    </div>
  );
}
