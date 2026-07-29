'use client';

import dynamic from 'next/dynamic';

const HeroScene3D = dynamic(() => import('./3d/HeroScene3D'), {
  ssr: false,
});

interface ScrollyCanvasProps {
  onProgress?: (progress: number) => void;
}

export default function ScrollyCanvas({ onProgress }: ScrollyCanvasProps) {
  return <HeroScene3D onProgress={onProgress} />;
}
