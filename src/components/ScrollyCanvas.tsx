'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import frames from './frames.json';

export default function ScrollyCanvas() {
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

    // Initialize array
    imagesRef.current = new Array(totalFrames);

    frames.forEach((frame, index) => {
      const img = new Image();
      img.src = `/sequence/${frame}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };
      imagesRef.current[index] = img;
    });
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

      // Re-render current frame after resize
      if (imagesLoaded) {
        renderFrame(frameIndexRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, [imagesLoaded]);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];

    if (canvas && ctx && img) {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Clear canvas
      ctx.clearRect(0, 0, w, h);

      // Calculate cover dimensions
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

    // Only render if frame changed to avoid redundant draws
    if (frameIndex !== frameIndexRef.current) {
      frameIndexRef.current = frameIndex;
      requestAnimationFrame(() => renderFrame(frameIndex));
    }
  });

  // Initial render when loaded
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
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-white/70 font-medium tracking-wide">Loading Experience...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
