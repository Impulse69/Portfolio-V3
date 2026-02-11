'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Section 1 animations
    const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -150]);
    const o1 = useTransform(scrollYProgress, [0, 0.15, 0.3], [1, 1, 0]);
    const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

    // Section 2 animations
    const y2 = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [150, 0, -150]);
    const o2 = useTransform(scrollYProgress, [0.2, 0.35, 0.55, 0.7], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.2, 0.5], [-100, 0]);

    // Section 3 animations
    const y3 = useTransform(scrollYProgress, [0.6, 0.85], [150, 0]);
    const o3 = useTransform(scrollYProgress, [0.6, 0.75, 1], [0, 1, 1]);
    const x3 = useTransform(scrollYProgress, [0.6, 0.85], [100, 0]);

    return (
        <div ref={targetRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">

            {/* Section 1 - Hero */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
                {/* Dark vignette overlay for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

                <motion.div
                    style={{ y: y1, opacity: o1, scale: scale1 }}
                    className="text-center p-8 relative z-10"
                >
                    {/* Decorative lines */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/50 to-transparent" />

                    {/* Main name - high contrast white with shadow */}
                    <motion.h1
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 relative flex flex-col items-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        style={{
                            textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9), 0 0 60px rgba(217,119,6,0.4)'
                        }}
                    >
                        <span className="text-white drop-shadow-2xl">
                            ISAAC
                        </span>
                        <span className="text-white drop-shadow-2xl text-4xl md:text-6xl mt-2 tracking-normal bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                            ASAMOAH JUNIOR
                        </span>
                    </motion.h1>

                    {/* Subtitle with backdrop */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative"
                    >
                        <div className="inline-block px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                            <p
                                className="text-xl md:text-2xl font-medium tracking-wide"
                                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                            >
                                <span className="text-amber-300">Creative</span>{' '}
                                <span className="text-white">Developer</span>
                            </p>
                        </div>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                    >
                        <span
                            className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white/80"
                        >
                            Scroll
                        </span>
                        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Section 2 - Statement Left */}
            <div className="absolute top-[150vh] left-0 w-full h-screen flex items-center justify-start px-8 md:px-24">
                {/* Dark backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent pointer-events-none" />

                <motion.div
                    style={{ y: y2, opacity: o2, x: x2 }}
                    className="max-w-2xl relative z-10"
                >
                    {/* Accent line */}
                    <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-amber-500 via-orange-500 to-transparent rounded-full shadow-lg shadow-amber-500/50" />

                    <span
                        className="text-amber-300 text-sm font-medium uppercase tracking-widest mb-4 block"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        What I Do
                    </span>

                    <h2
                        className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                    >
                        I build{' '}
                        <span className="text-amber-300">
                            digital experiences
                        </span>
                        .
                    </h2>

                    <p
                        className="text-xl text-white/80 leading-relaxed max-w-xl"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        Merging technical precision with artistic vision to create
                        <span className="text-white font-medium"> immersive web applications </span>
                        that push the boundaries of what's possible.
                    </p>
                </motion.div>
            </div>

            {/* Section 3 - Statement Right */}
            <div className="absolute top-[350vh] left-0 w-full h-screen flex items-center justify-end px-8 md:px-24">
                {/* Dark backdrop */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent pointer-events-none" />

                <motion.div
                    style={{ y: y3, opacity: o3, x: x3 }}
                    className="max-w-2xl text-right relative z-10"
                >
                    {/* Accent line */}
                    <div className="absolute -right-8 top-0 w-1 h-full bg-gradient-to-b from-orange-500 via-amber-500 to-transparent rounded-full shadow-lg shadow-orange-500/50" />

                    <span
                        className="text-amber-300 text-sm font-medium uppercase tracking-widest mb-4 block"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        My Approach
                    </span>

                    <h2
                        className="text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1]"
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.9)' }}
                    >
                        Bridging{' '}
                        <span className="text-amber-300">
                            design & engineering
                        </span>
                        .
                    </h2>

                    <p
                        className="text-xl text-white/80 leading-relaxed max-w-xl ml-auto"
                        style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
                    >
                        From high-performance canvas animations to robust full-stack architectures,
                        I craft solutions that are both{' '}
                        <span className="text-white font-medium">beautiful and bulletproof</span>.
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
