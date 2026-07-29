'use client';

import { motion } from 'framer-motion';

const easeMain = [0.25, 1, 0.5, 1] as [number, number, number, number];

const slideVariants = {
    initial: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: easeMain,
            staggerChildren: 0.1
        },
    },
};

const childVariants = {
    initial: {
        opacity: 0,
        y: 15,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: easeMain }
    }
};

export default function Overlay() {
    return (
        <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            {/* Sticky Overlays */}
            <div className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </div>

            {/* ── SECTION 1: HERO ── */}
            <div className="absolute top-0 w-full h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6">
                <motion.div
                    variants={slideVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative flex flex-col items-center"
                >
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 50 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute -top-20 left-1/2 -translate-x-1/2 w-px bg-white/20"
                    />

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 flex flex-col items-center font-[family-name:var(--font-display)]">
                        <motion.span variants={childVariants} className="text-[#f0ece4] italic">
                            ISAAC
                        </motion.span>
                        <motion.span variants={childVariants} className="text-2xl sm:text-4xl md:text-6xl mt-2 tracking-normal text-white">
                            ASAMOAH JUNIOR
                        </motion.span>
                    </h1>

                    <motion.div variants={childVariants} className="inline-block px-5 py-2.5 rounded-full bg-[#12121a] border border-white/10 shadow-xl mb-4">
                        <p className="text-base sm:text-xl font-medium tracking-wide text-[#f0ece4]">
                            Creative &amp; 3D Developer
                        </p>
                    </motion.div>

                    <motion.div variants={childVariants} className="flex flex-wrap justify-center gap-2 max-w-md">
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#14141d] text-[#a09a90] border border-white/10">
                            Three.js WebGL
                        </span>
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#14141d] text-[#a09a90] border border-white/10">
                            Next.js 16
                        </span>
                        <span className="px-3 py-1 rounded-md text-xs font-medium bg-[#14141d] text-[#a09a90] border border-white/10">
                            Full-Stack Engineering
                        </span>
                    </motion.div>

                    {/* Scroll Hint */}
                    <motion.div
                        className="absolute -bottom-20 sm:-bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="text-[11px] uppercase tracking-[0.22em] text-[#7a756d]">Scroll to Explore</span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-px h-6 bg-white/20"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* ── SECTION 2: WHAT I DO ── */}
            <div className="absolute top-[180vh] w-full h-screen flex items-center justify-start px-8 sm:px-16 md:px-24">
                <motion.div
                    variants={slideVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ amount: 0.4 }}
                    className="max-w-xs sm:max-w-lg md:max-w-2xl relative z-10"
                >
                    <div className="absolute top-0 -left-6 md:-left-12 h-full w-[2px] bg-white/20 rounded-full" />

                    <motion.span variants={childVariants} className="text-[#a09a90] text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                        What I Do
                    </motion.span>

                    <motion.h2 variants={childVariants} className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#f0ece4] mb-6 leading-[1.1] tracking-tight font-[family-name:var(--font-display)]">
                        Building <span className="italic font-serif text-[#d8c4b6]">digital products</span>.
                    </motion.h2>

                    <motion.p variants={childVariants} className="text-base sm:text-lg md:text-xl text-[#7a756d] leading-relaxed font-normal">
                        Merging technical precision with architectural structure to craft responsive, high-performance web applications.
                    </motion.p>
                </motion.div>
            </div>

            {/* ── SECTION 3: APPROACH ── */}
            <div className="absolute top-[360vh] w-full h-screen flex items-center justify-end px-8 sm:px-16 md:px-24">
                <motion.div
                    variants={slideVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ amount: 0.4 }}
                    className="max-w-xs sm:max-w-lg md:max-w-2xl text-right relative z-10"
                >
                    <div className="absolute top-0 -right-6 md:-right-12 h-full w-[2px] bg-white/20 rounded-full" />

                    <motion.span variants={childVariants} className="text-[#a09a90] text-xs font-semibold uppercase tracking-[0.2em] mb-4 block">
                        Approach
                    </motion.span>

                    <motion.h2 variants={childVariants} className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#f0ece4] mb-6 leading-[1.1] tracking-tight font-[family-name:var(--font-display)]">
                        Design &amp; <span className="italic font-serif text-[#d8c4b6]">Engineering</span>.
                    </motion.h2>

                    <motion.p variants={childVariants} className="text-base sm:text-lg md:text-xl text-[#7a756d] leading-relaxed font-normal">
                        Focused on clean code, thoughtful typography, fast page speeds, and seamless interactive experiences.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
