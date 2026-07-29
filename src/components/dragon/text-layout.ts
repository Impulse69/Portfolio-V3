import type { Segment, TextFragment } from './types';
import type { PreparedTextWithSegments, LayoutCursor, LayoutLine } from '@chenglou/pretext';

interface Interval {
  left: number;
  right: number;
}

function circleInterval(
  cx: number,
  cy: number,
  r: number,
  bandTop: number,
  bandBot: number,
): Interval | null {
  if (bandTop >= cy + r || bandBot <= cy - r) return null;
  const minDy =
    cy >= bandTop && cy <= bandBot
      ? 0
      : cy < bandTop
        ? bandTop - cy
        : cy - bandBot;
  if (minDy >= r) return null;
  const dx = Math.sqrt(r * r - minDy * minDy);
  return { left: cx - dx, right: cx + dx };
}

function mergeIntervals(intervals: Interval[]): Interval[] {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a.left - b.left);
  const merged: Interval[] = [{ ...intervals[0] }];
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i].left <= last.right) {
      last.right = Math.max(last.right, intervals[i].right);
    } else {
      merged.push({ ...intervals[i] });
    }
  }
  return merged;
}

function carveSlots(
  containerLeft: number,
  containerRight: number,
  blocked: Interval[],
): Interval[] {
  let slots: Interval[] = [{ left: containerLeft, right: containerRight }];
  for (const b of blocked) {
    const next: Interval[] = [];
    for (const slot of slots) {
      if (b.right <= slot.left || b.left >= slot.right) {
        next.push(slot);
        continue;
      }
      if (b.left > slot.left) next.push({ left: slot.left, right: b.left });
      if (b.right < slot.right) next.push({ left: b.right, right: slot.right });
    }
    slots = next;
  }
  return slots.filter((s) => s.right - s.left >= 30);
}

export function layoutAllLines(
  prepared: PreparedTextWithSegments,
  containerWidth: number,
  containerHeight: number,
  lineHeight: number,
  segs: Segment[],
  layoutNextLineFn: (
    prepared: PreparedTextWithSegments,
    start: LayoutCursor,
    maxWidth: number,
  ) => LayoutLine | null,
): TextFragment[] {
  const fragments: TextFragment[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let done = false;

  for (let y = 0; y < containerHeight && !done; y += lineHeight) {
    const bandTop = y;
    const bandBot = y + lineHeight;

    // Compute exclusion zones from dragon segments
    const intervals: Interval[] = [];
    for (const seg of segs) {
      const iv = circleInterval(seg.x, seg.y, seg.radius + 6, bandTop, bandBot);
      if (iv) intervals.push(iv);
    }
    const blocked = mergeIntervals(intervals);
    const slots = carveSlots(0, containerWidth, blocked);

    if (slots.length === 0) {
      // No room on this line — skip it but don't advance cursor
      continue;
    }

    for (const slot of slots) {
      const line = layoutNextLineFn(prepared, cursor, slot.right - slot.left);
      if (!line) {
        done = true;
        break;
      }
      fragments.push({
        text: line.text,
        x: slot.left,
        y: y,
        width: line.width,
      });
      cursor = line.end;
    }
  }

  return fragments;
}
