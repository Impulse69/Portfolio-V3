'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
    progress: number;
    isLoaded: boolean;
}

export default function Loader({ progress, isLoaded }: LoaderProps) {
    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080d] pointer-events-auto"
                >
                    {/* Background Ambient Glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.08, 0.15, 0.08]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] bg-[#c8956c]/20 blur-[120px] rounded-full"
                        />
                    </div>

                    <div className="relative flex flex-col items-center gap-6 sm:gap-8 px-6 text-center">
                        {/* Title/Brand */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[#f0ece4] text-2xl sm:text-3xl font-bold tracking-tighter font-[family-name:var(--font-display)] italic">
                                IKE
                            </span>
                            <div className="h-px w-8 bg-[#c8956c]/50" />
                        </motion.div>

                        {/* Progress Indicator */}
                        <div className="flex flex-col items-center gap-4 w-56 sm:w-64">
                            <div className="relative w-full h-1 bg-[#f0ece4]/[0.04] rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#a0522d] via-[#c8956c] to-[#e8b98a]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-[#c8956c] text-sm font-mono tracking-widest tabular-nums font-medium">
                                    {Math.round(progress)}%
                                </span>
                                <span className="text-[#7a756d] text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                                    Preparing
                                </span>
                            </div>
                        </div>

                        {/* Subtext */}
                        <motion.p
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xs text-[#7a756d]/60 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-medium"
                        >
                            Loading visual sequence
                        </motion.p>
                    </div>

                    {/* Footer Hint (Bottom) */}
                    <div className="absolute bottom-8 sm:bottom-12 flex flex-col items-center gap-2">
                        <div className="w-1 h-1 bg-[#c8956c]/50 rounded-full animate-ping" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
