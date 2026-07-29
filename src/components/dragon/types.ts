export interface Segment {
  x: number;
  y: number;
  radius: number;
  angle: number;
}

export interface FireParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  radius: number;
}

export interface TextFragment {
  text: string;
  x: number;
  y: number;
  width: number;
}
