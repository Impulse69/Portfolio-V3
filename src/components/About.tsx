'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const SkillMatrix3D = dynamic(() => import('./3d/SkillMatrix3D'), {
    ssr: false,
});

const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '10+', label: 'Happy Clients' },
];

export default function About() {
    return (
        <section id="about" className="relative z-20 py-20 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden bg-[#08080d]">
            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 sm:mb-24"
                >
                    <span className="text-[#a09a90] text-xs font-semibold uppercase tracking-[0.25em] mb-4 block">
                        About
                    </span>
                    <h2 className="text-3xl sm:text-5xl md:text-7xl font-bold text-[#f0ece4] tracking-tight font-[family-name:var(--font-display)]">
                        The person behind <span className="italic font-serif text-[#d8c4b6]">the code</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid: Photo + Bio */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
                    {/* Photo Column (5 cols on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 flex justify-center"
                    >
                        <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-[#12121a] shadow-2xl">
                            <Image
                                src="/Isaac Asamoah.png"
                                alt="Isaac Asamoah Junior"
                                fill
                                sizes="(max-width: 768px) 100vw, 500px"
                                quality={95}
                                priority
                                className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#08080d]/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-lg font-bold text-[#f0ece4]">Isaac Asamoah Junior</p>
                                <p className="text-xs text-[#a09a90] uppercase tracking-wider">Creative &amp; 3D Developer — Ghana</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio & Details Column (7 cols on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-7 space-y-8"
                    >
                        <div className="p-8 rounded-2xl bg-[#0f0f16] border border-white/10 space-y-6">
                            <p className="text-lg sm:text-xl text-[#f0ece4] leading-relaxed font-light">
                                I&apos;m a <span className="font-semibold text-white">Creative Developer</span> based in Ghana, bridging the gap between design vision and high-performance WebGL engineering.
                            </p>

                            <p className="text-base text-[#a09a90] leading-relaxed font-normal">
                                My work focuses on building interactive 3D web applications, clean front-end systems, and robust full-stack architectures. I prioritize technical precision, elegant typography, and maintainable code.
                            </p>

                            <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                                {['Three.js', 'WebGL', 'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Kotlin'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3.5 py-1.5 rounded-md text-xs font-medium bg-[#1a1a24] text-[#d0cecb] border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="p-5 rounded-2xl bg-[#0f0f16] border border-white/10 text-center"
                                >
                                    <div className="text-3xl sm:text-4xl font-bold text-white font-[family-name:var(--font-display)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-[11px] text-[#7a756d] uppercase tracking-wider mt-1 font-medium">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Resume Card */}
                        <a
                            href="/resume.pdf"
                            download="Isaac_Asamoah_Junior_Resume.pdf"
                            className="p-5 rounded-2xl bg-[#0f0f16] border border-white/10 hover:border-white/20 flex items-center justify-between transition-colors group no-underline"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#1a1a24] border border-white/10 flex items-center justify-center text-white">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">Curriculum Vitae</p>
                                    <p className="text-xs text-[#7a756d]">Download Resume (PDF)</p>
                                </div>
                            </div>
                            <svg className="w-4 h-4 text-[#7a756d] group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>

                {/* 3D Skill Matrix Constellation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <SkillMatrix3D />
                </motion.div>
            </div>
        </section>
    );
}
