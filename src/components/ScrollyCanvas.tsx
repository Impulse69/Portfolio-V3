'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import frames from './frames.json';

interface ScrollyCanvasProps {
  onProgress?: (progress: number) => void;
}

export default function ScrollyCanvas({ onProgress }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Preload Images
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = frames.length;

    imagesRef.current = new Array(totalFrames);

    frames.forEach((frame, index) => {
      const img = new Image();
      img.src = `/sequence/${frame}`;
      img.onload = () => {
        loadedCount++;
        const currentProgress = (loadedCount / totalFrames) * 100;
        onProgress?.(currentProgress);
        
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      // For frames that might already be cached or fail
      img.onerror = () => {
        loadedCount++;
        onProgress?.((loadedCount / totalFrames) * 100);
      };
      imagesRef.current[index] = img;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);

      if (imagesLoaded) {
        renderFrame(frameIndexRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];

    if (canvas && ctx && img) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const imgRatio = img.width / img.height;
      const canvasRatio = w / h;

      let drawW, drawH, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        offsetX = 0;
        offsetY = (h - drawH) / 2;
      } else {
        drawW = h * imgRatio;
        drawH = h;
        offsetX = (w - drawW) / 2;
        offsetY = 0;
      }

      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;

    const frameIndex = Math.min(
      frames.length - 1,
      Math.floor(latest * frames.length)
    );

    if (frameIndex !== frameIndexRef.current) {
      frameIndexRef.current = frameIndex;
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  useEffect(() => {
    if (imagesLoaded) {
      renderFrame(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-neutral-900">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover"
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>
    </div>
  );
}
