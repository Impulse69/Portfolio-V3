import type { Segment } from './types';

const SEGMENT_COUNT = 80;
const HEAD_RADIUS = 28;
const TAIL_RADIUS = 4;
const SEGMENT_DISTANCE = 6;
const LERP_FACTOR = 0.12;

export function createSegments(cx: number, cy: number): Segment[] {
  const segs: Segment[] = [];
  for (let i = 0; i < SEGMENT_COUNT; i++) {
    const t = i / (SEGMENT_COUNT - 1);
    segs.push({
      x: cx,
      y: cy + i * SEGMENT_DISTANCE,
      radius: HEAD_RADIUS + (TAIL_RADIUS - HEAD_RADIUS) * t,
      angle: 0,
    });
  }
  return segs;
}

export function updateHead(segs: Segment[], mouseX: number, mouseY: number): void {
  segs[0].x += (mouseX - segs[0].x) * LERP_FACTOR;
  segs[0].y += (mouseY - segs[0].y) * LERP_FACTOR;
}

export function updateChain(segs: Segment[], time: number): void {
  for (let i = 1; i < segs.length; i++) {
    const dx = segs[i].x - segs[i - 1].x;
    const dy = segs[i].y - segs[i - 1].y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Store angle for rendering
    segs[i].angle = Math.atan2(dy, dx);

    if (dist > SEGMENT_DISTANCE) {
      segs[i].x = segs[i - 1].x + (dx / dist) * SEGMENT_DISTANCE;
      segs[i].y = segs[i - 1].y + (dy / dist) * SEGMENT_DISTANCE;
    }

    // Sine-wave undulation perpendicular to body direction
    const wave = Math.sin(time * 4 + i * 0.3) * (i / segs.length) * 1.5;
    const perpX = -Math.sin(segs[i].angle);
    const perpY = Math.cos(segs[i].angle);
    segs[i].x += perpX * wave;
    segs[i].y += perpY * wave;
  }

  // Head angle
  segs[0].angle = Math.atan2(segs[0].y - segs[1].y, segs[0].x - segs[1].x);
}

export function getHeadAngle(segs: Segment[]): number {
  return Math.atan2(segs[0].y - segs[1].y, segs[0].x - segs[1].x);
}
