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
            {/* Sticky Overlays - stay with the user as they scroll through the experience */}
            <div className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/70" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
            </div>

            {/* ── SECTION 1: HERO ── */}
            <div className="absolute top-0 w-full h-screen flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    variants={slideVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative flex flex-col items-center"
                >
                    {/* Decorative vertical line */}
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 60 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="absolute -top-24 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-amber-500/50 to-transparent"
                    />

                    <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 flex flex-col items-center">
                        <motion.span variants={childVariants} className="text-white drop-shadow-2xl">
                            ISAAC
                        </motion.span>
                        <motion.span variants={childVariants} className="text-2xl sm:text-4xl md:text-6xl mt-2 tracking-normal bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent drop-shadow-2xl">
                            ASAMOAH JUNIOR
                        </motion.span>
                    </h1>

                    <motion.div variants={childVariants} className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        <p className="text-base sm:text-xl md:text-2xl font-medium tracking-wide text-white">
                            <span className="text-amber-300">Creative</span> Developer
                        </p>
                    </motion.div>

                    {/* Simple Scroll Hint */}
                    <motion.div
                        className="absolute -bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-px h-6 bg-amber-500/30"
                        />
                    </motion.div>
                </motion.div>
            </div>

            {/* ── SECTION 2: WHAT I DO ── */}
            <div className="absolute top-[180vh] w-full h-screen flex items-center justify-start px-8 sm:px-16 md:px-24">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent pointer-events-none" />

                <motion.div
                    variants={slideVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ amount: 0.4 }}
                    className="max-w-xs sm:max-w-lg md:max-w-2xl relative z-10"
                >
                    <div className="absolute top-0 -left-6 md:-left-12 h-full w-1 bg-gradient-to-b from-amber-500 via-orange-500 to-transparent rounded-full shadow-lg shadow-amber-500/20" />

                    <motion.span variants={childVariants} className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                        What I Do
                    </motion.span>

                    <motion.h2 variants={childVariants} className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        I build <span className="text-amber-300">digital experiences</span>.
                    </motion.h2>

                    <motion.p variants={childVariants} className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                        Merging technical precision with artistic vision to create immersive web applications that push the boundaries of what&apos;s possible.
                    </motion.p>
                </motion.div>
            </div>

            {/* ── SECTION 3: APPROACH ── */}
            <div className="absolute top-[360vh] w-full h-screen flex items-center justify-end px-8 sm:px-16 md:px-24">
                <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />

                <motion.div
                    variants={slideVariants}
                    initial="initial"
                    whileInView="visible"
                    viewport={{ amount: 0.4 }}
                    className="max-w-xs sm:max-w-lg md:max-w-2xl text-right relative z-10"
                >
                    <div className="absolute top-0 -right-6 md:-right-12 h-full w-1 bg-gradient-to-b from-orange-500 via-amber-500 to-transparent rounded-full shadow-lg shadow-orange-500/20" />

                    <motion.span variants={childVariants} className="text-amber-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                        My Approach
                    </motion.span>

                    <motion.h2 variants={childVariants} className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                        Bridging <span className="text-amber-300">design &amp; engineering</span>.
                    </motion.h2>

                    <motion.p variants={childVariants} className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed font-medium">
                        From high-performance canvas animations to robust full-stack architectures, I craft solutions that are both beautiful and bulletproof.
                    </motion.p>
                </motion.div>
            </div>
        </div>
    );
}
