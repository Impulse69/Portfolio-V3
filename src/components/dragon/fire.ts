import type { Segment, FireParticle } from './types';

export function spawnFire(segs: Segment[], particles: FireParticle[]): void {
  const head = segs[0];
  const neck = segs[1];
  const angle = Math.atan2(head.y - neck.y, head.x - neck.x);

  // Spawn more particles for a dramatic stream
  for (let i = 0; i < 6; i++) {
    const spread = (Math.random() - 0.5) * 0.8;
    const speed = 4 + Math.random() * 6;
    particles.push({
      x: head.x + Math.cos(angle) * head.radius,
      y: head.y + Math.sin(angle) * head.radius,
      vx: Math.cos(angle + spread) * speed,
      vy: Math.sin(angle + spread) * speed,
      life: 25 + Math.random() * 25,
      maxLife: 50,
      radius: 3 + Math.random() * 6,
    });
  }

  // Add ember sparks — small, fast, longer lived
  for (let i = 0; i < 3; i++) {
    const spread = (Math.random() - 0.5) * 1.4;
    const speed = 6 + Math.random() * 5;
    particles.push({
      x: head.x + Math.cos(angle) * head.radius,
      y: head.y + Math.sin(angle) * head.radius,
      vx: Math.cos(angle + spread) * speed,
      vy: Math.sin(angle + spread) * speed,
      life: 15 + Math.random() * 15,
      maxLife: 30,
      radius: 1 + Math.random() * 2,
    });
  }
}

export function updateParticles(particles: FireParticle[]): void {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy -= 0.08; // upward drift
    p.vx *= 0.97;
    p.vy *= 0.97;
    p.life--;
    p.radius *= 0.975;
    if (p.life <= 0 || p.radius < 0.3) {
      particles.splice(i, 1);
    }
  }
}

export function renderParticles(
  ctx: CanvasRenderingContext2D,
  particles: FireParticle[],
  dpr: number,
): void {
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';

  for (const p of particles) {
    const alpha = Math.max(0, p.life / p.maxLife);
    const r = p.radius * dpr;
    const px = p.x * dpr;
    const py = p.y * dpr;

    const gradient = ctx.createRadialGradient(px, py, 0, px, py, r * 3);
    // Hot white-yellow core → amber → orange → transparent
    gradient.addColorStop(0, `rgba(255, 255, 200, ${alpha})`);
    gradient.addColorStop(0.2, `rgba(251, 191, 36, ${alpha * 0.9})`);
    gradient.addColorStop(0.5, `rgba(245, 158, 11, ${alpha * 0.6})`);
    gradient.addColorStop(0.8, `rgba(220, 80, 20, ${alpha * 0.3})`);
    gradient.addColorStop(1, 'rgba(194, 65, 12, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(px, py, r * 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}
