import type { Segment } from './types';

/**
 * High-fidelity dragon renderer using the segment chain as a spine.
 * Draws a proper dragon silhouette with:
 * - Smooth body outline using quadratic curves
 * - Scales along the body
 * - Detailed head (horns, jaw, snout, nostrils, slit-pupil eyes)
 * - Bat-like wings that flap
 * - Dorsal ridge spines
 * - Tail fin / barb
 * - Ambient glow
 */

function segAngle(a: Segment, b: Segment): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function perpOffset(
  seg: Segment,
  angle: number,
  dist: number,
  side: number,
): [number, number] {
  const perp = angle + (Math.PI / 2) * side;
  return [seg.x + Math.cos(perp) * dist, seg.y + Math.sin(perp) * dist];
}

export function renderDragon(
  ctx: CanvasRenderingContext2D,
  segs: Segment[],
  dpr: number,
  time: number,
): void {
  if (segs.length < 4) return;
  ctx.save();
  ctx.scale(dpr, dpr);

  // ── BODY OUTLINE ──
  // Build left and right contour arrays from the segment spine
  const leftPts: [number, number][] = [];
  const rightPts: [number, number][] = [];

  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i];
    const prev = segs[Math.max(0, i - 1)];
    const next = segs[Math.min(segs.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const r = seg.radius;
    leftPts.push(perpOffset(seg, angle, r, -1));
    rightPts.push(perpOffset(seg, angle, r, 1));
  }

  // Draw filled body shape
  const bodyGrad = ctx.createLinearGradient(
    segs[0].x, segs[0].y,
    segs[segs.length - 1].x, segs[segs.length - 1].y,
  );
  bodyGrad.addColorStop(0, '#b8860b');   // dark goldenrod (head)
  bodyGrad.addColorStop(0.3, '#8B6914'); // darker gold
  bodyGrad.addColorStop(0.7, '#5a3e0a'); // brown
  bodyGrad.addColorStop(1, '#3d2506');   // dark brown (tail)

  ctx.beginPath();
  // Left side head → tail
  ctx.moveTo(leftPts[0][0], leftPts[0][1]);
  for (let i = 1; i < leftPts.length; i++) {
    const cpx = (leftPts[i - 1][0] + leftPts[i][0]) / 2;
    const cpy = (leftPts[i - 1][1] + leftPts[i][1]) / 2;
    ctx.quadraticCurveTo(leftPts[i - 1][0], leftPts[i - 1][1], cpx, cpy);
  }
  ctx.lineTo(leftPts[leftPts.length - 1][0], leftPts[leftPts.length - 1][1]);

  // Right side tail → head
  for (let i = rightPts.length - 1; i >= 0; i--) {
    const next = rightPts[Math.max(0, i - 1)];
    const cpx = (rightPts[i][0] + next[0]) / 2;
    const cpy = (rightPts[i][1] + next[1]) / 2;
    ctx.quadraticCurveTo(rightPts[i][0], rightPts[i][1], cpx, cpy);
  }
  ctx.closePath();

  // Ambient glow
  ctx.shadowColor = 'rgba(217, 119, 6, 0.4)';
  ctx.shadowBlur = 20;
  ctx.fillStyle = bodyGrad;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowColor = 'transparent';

  // ── BELLY STRIPE ──
  ctx.beginPath();
  for (let i = 2; i < segs.length - 3; i++) {
    const seg = segs[i];
    const prev = segs[Math.max(0, i - 1)];
    const next = segs[Math.min(segs.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const bellyR = seg.radius * 0.5;
    const [bx, by] = perpOffset(seg, angle, bellyR * 0.3, 1);
    if (i === 2) ctx.moveTo(bx, by);
    else ctx.lineTo(bx, by);
  }
  for (let i = segs.length - 4; i >= 2; i--) {
    const seg = segs[i];
    const prev = segs[Math.max(0, i - 1)];
    const next = segs[Math.min(segs.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const bellyR = seg.radius * 0.35;
    const [bx, by] = perpOffset(seg, angle, bellyR * 0.3, -1);
    ctx.lineTo(bx, by);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 220, 130, 0.15)';
  ctx.fill();

  // ── SCALES ──
  for (let i = 3; i < segs.length - 5; i += 2) {
    const seg = segs[i];
    const prev = segs[i - 1];
    const next = segs[Math.min(segs.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const t = i / segs.length;
    const scaleSize = seg.radius * 0.35;
    if (scaleSize < 1.5) continue;

    // Draw small arc scales on both sides
    for (const side of [-1, 1]) {
      const [sx, sy] = perpOffset(seg, angle, seg.radius * 0.6, side);
      ctx.beginPath();
      ctx.arc(sx, sy, scaleSize, angle - Math.PI * 0.3, angle + Math.PI * 0.3);
      ctx.strokeStyle = `rgba(139, 105, 20, ${0.4 - t * 0.3})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
  }

  // ── DORSAL SPINES ──
  for (let i = 4; i < 55; i += 2) {
    const seg = segs[i];
    const prev = segs[i - 1];
    const next = segs[Math.min(segs.length - 1, i + 1)];
    const angle = Math.atan2(next.y - prev.y, next.x - prev.x);
    const t = i / segs.length;
    const spineH = seg.radius * (0.8 - t * 0.6);
    if (spineH < 2) continue;

    const perpAngle = angle - Math.PI / 2;
    const baseW = seg.radius * 0.25;

    const [b1x, b1y] = perpOffset(seg, angle, baseW, -1);
    const [b2x, b2y] = perpOffset(seg, angle, baseW, 1);
    const tipX = seg.x + Math.cos(perpAngle) * spineH;
    const tipY = seg.y + Math.sin(perpAngle) * spineH;

    ctx.beginPath();
    ctx.moveTo(b1x, b1y);
    ctx.quadraticCurveTo(
      seg.x + Math.cos(perpAngle) * spineH * 0.7,
      seg.y + Math.sin(perpAngle) * spineH * 0.7,
      tipX, tipY,
    );
    ctx.lineTo(b2x, b2y);
    ctx.closePath();
    ctx.fillStyle = `rgba(194, 65, 12, ${0.7 - t * 0.5})`;
    ctx.fill();
  }

  // ── WINGS ──
  // Attach wings at segments 8-12 area
  const wingAttachIdx = 10;
  if (wingAttachIdx < segs.length - 2) {
    const ws = segs[wingAttachIdx];
    const wPrev = segs[wingAttachIdx - 1];
    const wNext = segs[wingAttachIdx + 1];
    const wAngle = Math.atan2(wNext.y - wPrev.y, wNext.x - wPrev.x);

    // Wing flap animation
    const flapAngle = Math.sin(time * 3.5) * 0.3 + 0.2;

    for (const side of [-1, 1]) {
      const wingPerp = wAngle + (Math.PI / 2) * side;
      const wingBaseAngle = wingPerp + flapAngle * side;

      // Wing dimensions
      const wingSpan = segs[0].radius * 3.5;
      const wingDepth = segs[0].radius * 2;

      // Wing joint points
      const baseX = ws.x;
      const baseY = ws.y;
      const elbowX = baseX + Math.cos(wingBaseAngle) * wingSpan * 0.6;
      const elbowY = baseY + Math.sin(wingBaseAngle) * wingSpan * 0.6;
      const tipX = baseX + Math.cos(wingBaseAngle - 0.3 * side) * wingSpan;
      const tipY = baseY + Math.sin(wingBaseAngle - 0.3 * side) * wingSpan;

      // Wing trailing edge
      const trailAngle = wAngle + Math.PI; // points backward
      const trail1X = elbowX + Math.cos(trailAngle) * wingDepth * 0.5;
      const trail1Y = elbowY + Math.sin(trailAngle) * wingDepth * 0.5;
      const trail2X = baseX + Math.cos(trailAngle) * wingDepth * 0.7;
      const trail2Y = baseY + Math.sin(trailAngle) * wingDepth * 0.7;

      // Wing membrane
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(tipX, tipY);
      ctx.quadraticCurveTo(
        elbowX + Math.cos(trailAngle) * wingDepth * 0.3,
        elbowY + Math.sin(trailAngle) * wingDepth * 0.3,
        trail1X, trail1Y,
      );
      ctx.lineTo(trail2X, trail2Y);
      ctx.closePath();

      const wingGrad = ctx.createLinearGradient(baseX, baseY, tipX, tipY);
      wingGrad.addColorStop(0, 'rgba(139, 90, 20, 0.6)');
      wingGrad.addColorStop(0.5, 'rgba(120, 70, 15, 0.4)');
      wingGrad.addColorStop(1, 'rgba(80, 45, 10, 0.25)');
      ctx.fillStyle = wingGrad;
      ctx.fill();

      // Wing bone lines
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      ctx.lineTo(elbowX, elbowY);
      ctx.lineTo(tipX, tipY);
      ctx.strokeStyle = 'rgba(90, 60, 10, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Secondary finger bones
      for (let f = 0; f < 3; f++) {
        const ft = (f + 1) / 4;
        const fbx = baseX + (elbowX - baseX) * ft;
        const fby = baseY + (elbowY - baseY) * ft;
        const fex = fbx + Math.cos(trailAngle) * wingDepth * (0.3 + ft * 0.3);
        const fey = fby + Math.sin(trailAngle) * wingDepth * (0.3 + ft * 0.3);
        ctx.beginPath();
        ctx.moveTo(fbx, fby);
        ctx.lineTo(fex, fey);
        ctx.strokeStyle = 'rgba(90, 60, 10, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  // ── TAIL FIN ──
  const tailEnd = segs.length - 1;
  const tailSeg = segs[tailEnd];
  const tailPrev = segs[tailEnd - 2];
  const tailAngle = Math.atan2(tailSeg.y - tailPrev.y, tailSeg.x - tailPrev.x);
  const finSize = 12;

  ctx.beginPath();
  ctx.moveTo(tailSeg.x, tailSeg.y);
  const fin1X = tailSeg.x + Math.cos(tailAngle) * finSize + Math.cos(tailAngle + Math.PI / 3) * finSize * 0.8;
  const fin1Y = tailSeg.y + Math.sin(tailAngle) * finSize + Math.sin(tailAngle + Math.PI / 3) * finSize * 0.8;
  const finTipX = tailSeg.x + Math.cos(tailAngle) * finSize * 1.8;
  const finTipY = tailSeg.y + Math.sin(tailAngle) * finSize * 1.8;
  const fin2X = tailSeg.x + Math.cos(tailAngle) * finSize + Math.cos(tailAngle - Math.PI / 3) * finSize * 0.8;
  const fin2Y = tailSeg.y + Math.sin(tailAngle) * finSize + Math.sin(tailAngle - Math.PI / 3) * finSize * 0.8;

  ctx.moveTo(tailSeg.x, tailSeg.y);
  ctx.quadraticCurveTo(fin1X, fin1Y, finTipX, finTipY);
  ctx.quadraticCurveTo(fin2X, fin2Y, tailSeg.x, tailSeg.y);
  ctx.fillStyle = '#5a3e0a';
  ctx.fill();

  // ── HEAD DETAIL ──
  const head = segs[0];
  const neck = segs[1];
  const headAngle = Math.atan2(head.y - neck.y, head.x - neck.x);
  const hr = head.radius;

  // Snout — elongated shape in front of head
  const snoutLen = hr * 1.2;
  const snoutW = hr * 0.55;
  const snoutTipX = head.x + Math.cos(headAngle) * (hr + snoutLen);
  const snoutTipY = head.y + Math.sin(headAngle) * (hr + snoutLen);
  const [jaw1x, jaw1y] = perpOffset(head, headAngle, snoutW, -1);
  const [jaw2x, jaw2y] = perpOffset(head, headAngle, snoutW, 1);

  // Upper jaw
  ctx.beginPath();
  ctx.moveTo(jaw1x + Math.cos(headAngle) * hr * 0.3, jaw1y + Math.sin(headAngle) * hr * 0.3);
  ctx.quadraticCurveTo(
    head.x + Math.cos(headAngle) * (hr + snoutLen * 0.7),
    head.y + Math.sin(headAngle) * (hr + snoutLen * 0.7) - snoutW * 0.3,
    snoutTipX, snoutTipY,
  );
  ctx.quadraticCurveTo(
    head.x + Math.cos(headAngle) * (hr + snoutLen * 0.7),
    head.y + Math.sin(headAngle) * (hr + snoutLen * 0.7) + snoutW * 0.3,
    jaw2x + Math.cos(headAngle) * hr * 0.3, jaw2y + Math.sin(headAngle) * hr * 0.3,
  );
  ctx.closePath();
  ctx.fillStyle = '#a07010';
  ctx.fill();

  // Nostrils
  for (const side of [-1, 1]) {
    const nx = snoutTipX - Math.cos(headAngle) * snoutLen * 0.15 +
      Math.cos(headAngle + Math.PI / 2 * side) * snoutW * 0.25;
    const ny = snoutTipY - Math.sin(headAngle) * snoutLen * 0.15 +
      Math.sin(headAngle + Math.PI / 2 * side) * snoutW * 0.25;
    ctx.beginPath();
    ctx.ellipse(nx, ny, 2, 1.2, headAngle, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(50, 20, 0, 0.7)';
    ctx.fill();
  }

  // Horns
  for (const side of [-1, 1]) {
    const hornBase = headAngle + Math.PI * 0.6 * side;
    const hbx = head.x + Math.cos(hornBase) * hr * 0.6;
    const hby = head.y + Math.sin(hornBase) * hr * 0.6;
    const hornLen = hr * 1.3;
    const hornAngle = headAngle + Math.PI + Math.PI * 0.25 * side;
    const htx = hbx + Math.cos(hornAngle) * hornLen;
    const hty = hby + Math.sin(hornAngle) * hornLen;
    const hMidX = (hbx + htx) / 2 + Math.cos(hornAngle + Math.PI / 4 * side) * hornLen * 0.15;
    const hMidY = (hby + hty) / 2 + Math.sin(hornAngle + Math.PI / 4 * side) * hornLen * 0.15;

    ctx.beginPath();
    ctx.moveTo(
      hbx + Math.cos(hornBase + Math.PI / 2) * 3,
      hby + Math.sin(hornBase + Math.PI / 2) * 3,
    );
    ctx.quadraticCurveTo(hMidX, hMidY, htx, hty);
    ctx.lineTo(
      hbx - Math.cos(hornBase + Math.PI / 2) * 3,
      hby - Math.sin(hornBase + Math.PI / 2) * 3,
    );
    ctx.closePath();

    const hornGrad = ctx.createLinearGradient(hbx, hby, htx, hty);
    hornGrad.addColorStop(0, '#8B6914');
    hornGrad.addColorStop(1, '#2d1a00');
    ctx.fillStyle = hornGrad;
    ctx.fill();
  }

  // Eyes
  for (const side of [-1, 1]) {
    const eyePerp = headAngle + (Math.PI / 2) * side;
    const ex = head.x + Math.cos(headAngle) * hr * 0.35 + Math.cos(eyePerp) * hr * 0.5;
    const ey = head.y + Math.sin(headAngle) * hr * 0.35 + Math.sin(eyePerp) * hr * 0.5;

    // Eye glow
    const eyeGlow = ctx.createRadialGradient(ex, ey, 0, ex, ey, 7);
    eyeGlow.addColorStop(0, 'rgba(255, 255, 180, 1)');
    eyeGlow.addColorStop(0.4, 'rgba(255, 200, 50, 0.9)');
    eyeGlow.addColorStop(0.7, 'rgba(220, 120, 20, 0.5)');
    eyeGlow.addColorStop(1, 'rgba(200, 80, 0, 0)');
    ctx.fillStyle = eyeGlow;
    ctx.beginPath();
    ctx.arc(ex, ey, 7, 0, Math.PI * 2);
    ctx.fill();

    // Eye shape — almond
    ctx.beginPath();
    const eyeAngle = headAngle;
    ctx.ellipse(ex, ey, 4.5, 3, eyeAngle, 0, Math.PI * 2);
    ctx.fillStyle = '#e6a817';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80, 40, 0, 0.6)';
    ctx.lineWidth = 0.6;
    ctx.stroke();

    // Slit pupil
    ctx.beginPath();
    ctx.ellipse(ex, ey, 1.2, 2.8, eyeAngle + Math.PI / 2, 0, Math.PI * 2);
    ctx.fillStyle = '#0a0a0f';
    ctx.fill();
  }

  ctx.restore();
}
