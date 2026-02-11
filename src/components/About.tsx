'use client';

import { motion } from 'framer-motion';

const skills = [
    { name: 'React / Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Three.js / WebGL', level: 85 },
    { name: 'UI/UX Design', level: 88 },
    { name: 'Node.js', level: 82 },
];

const stats = [
    { value: '3+', label: 'Years Experience' },
    { value: '20+', label: 'Projects Completed' },
    { value: '10+', label: 'Happy Clients' },
];

export default function About() {
    return (
        <section id="about" className="relative z-20 py-32 px-6 md:px-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-zinc-900/50 to-transparent" />
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-3xl -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-3xl" />

            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-amber-500 text-sm font-medium uppercase tracking-widest mb-4 block">
                        About Me
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        The person behind{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            the pixels
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left — Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            I&apos;m a <span className="text-white font-medium">Creative Developer</span> based
                            in Ghana, passionate about crafting immersive digital experiences that live at the
                            intersection of design and technology.
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed mb-10">
                            With expertise spanning front-end development, 3D graphics, and UX design,
                            I bring ideas to life through clean code and meticulous attention to detail.
                            Every project is an opportunity to push creative boundaries.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="text-center p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                                >
                                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right — Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-gradient-to-r from-amber-500 to-orange-500" />
                            Core Skills
                        </h3>

                        <div className="space-y-6">
                            {skills.map((skill, i) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-zinc-300">
                                            {skill.name}
                                        </span>
                                        <span className="text-xs text-zinc-500">
                                            {skill.level}%
                                        </span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                                            viewport={{ once: true }}
                                            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Download resume hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="mt-10 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-4"
                        >
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                                <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-zinc-300 font-medium">Want the full picture?</p>
                                <p className="text-xs text-zinc-500">Resume available upon request</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
