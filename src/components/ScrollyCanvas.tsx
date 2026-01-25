'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import styles from './frames.json'; // Importing JSON list of frames

// If JSON import fails in TS, we might need a declaration or just use require, 
// but Next.js usually handles it. 
// We expect styles to be an array of strings like "frame_000.png"
const frames = styles as string[];

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

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

  // Rental Loop / Scroll Listener
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];

    if (canvas && ctx && img) {
      // Handle resizing / object-fit cover logic
      // Ideally we set canvas size to window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const w = canvas.width;
      const h = canvas.height;
      
      // Draw image to cover
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
      
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!imagesLoaded) return;
    
    // Map 0-1 to 0-(frames.length - 1)
    const frameIndex = Math.min(
      frames.length - 1,
      Math.floor(latest * frames.length)
    );
    
    requestAnimationFrame(() => renderFrame(frameIndex));
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
        />
        {!imagesLoaded && (
            <div className="absolute inset-0 flex items-center justify-center text-white/50">
                Loading Sequence...
            </div>
        )}
      </div>
    </div>
  );
}
