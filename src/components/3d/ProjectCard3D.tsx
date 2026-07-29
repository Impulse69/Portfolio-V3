'use client';

import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link: string;
  tech: string[];
  accent: string;
}

export default function ProjectCard3D({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * 8; // Subtle tilt Y
    const rX = -((mouseY - height / 2) / (height / 2)) * 8; // Subtle tilt X

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: '-80px' }}
      className="group"
      style={{ perspective: '1000px' }}
    >
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        title={`View ${project.title}`}
        className="block"
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative rounded-2xl overflow-hidden bg-[#0f0f16] border border-white/10 transition-all duration-300 ease-out transform-gpu hover:border-white/20"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
            transformStyle: 'preserve-3d',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
          }}
        >
          {/* Elevated Image Container */}
          <div
            className="relative w-full aspect-[16/10] overflow-hidden bg-[#0a0a0f]"
            style={{ transform: 'translateZ(20px)' }}
          >
            <div className="absolute top-4 right-5 z-20">
              <span className="text-3xl font-bold text-white/20 font-[family-name:var(--font-display)]">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            <div className="absolute top-4 left-5 z-20">
              <span className="inline-block px-3 py-1 rounded-md text-[11px] font-medium uppercase tracking-wider bg-[#1a1a24] text-[#d0cecb] border border-white/10">
                {project.category}
              </span>
            </div>

            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              quality={90}
              priority={index === 0}
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>

          {/* Text Content */}
          <div className="p-6 z-20" style={{ transform: 'translateZ(15px)' }}>
            <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-display)] flex items-center justify-between">
              <span>{project.title}</span>
              <svg
                className="w-4 h-4 text-[#a09a90] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </h3>

            <p className="text-sm text-[#7a756d] leading-relaxed mb-5 line-clamp-2 group-hover:text-[#a09a90] transition-colors">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-[11px] font-medium rounded bg-[#161620] text-[#a09a90] border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
