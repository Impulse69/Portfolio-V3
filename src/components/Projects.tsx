'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
    {
        title: "Neon Drifter",
        category: "WebGL Experiment",
        gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
        description: "Real-time 3D racing experience built with Three.js"
    },
    {
        title: "Zenith Bank",
        category: "Fintech App",
        gradient: "from-blue-500 via-cyan-500 to-teal-500",
        description: "Next-gen digital banking platform"
    },
    {
        title: "Aether Lens",
        category: "Photography Portfolio",
        gradient: "from-amber-500 via-orange-500 to-red-500",
        description: "Award-winning photographer showcase"
    },
    {
        title: "Null Space",
        category: "VR Experience",
        gradient: "from-emerald-500 via-green-500 to-lime-500",
        description: "Immersive virtual reality art installation"
    }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        x.set((mouseX / width) - 0.5);
        y.set((mouseY / height) - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative cursor-pointer perspective-1000"
        >
            {/* Animated border gradient */}
            <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${project.gradient} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-60`} />

            {/* Card */}
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-zinc-900/80 border border-white/5 backdrop-blur-xl transition-all duration-500 group-hover:border-white/10">

                {/* Project number */}
                <div className="absolute top-6 right-6 z-10">
                    <span className="text-7xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* Gradient background blob */}
                <div className={`absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-3xl transition-all duration-700 group-hover:opacity-30 group-hover:scale-110`} />

                {/* Floating accent shapes */}
                <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(40px)" }} />
                <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border border-white/5 rounded-lg rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(30px)" }} />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end" style={{ transform: "translateZ(50px)" }}>
                    {/* Category pill */}
                    <div className="mb-4 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-white`}>
                            {project.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base translate-y-4 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
                        {project.description}
                    </p>

                    {/* View project link */}
                    <div className="mt-6 translate-y-4 opacity-0 transition-all duration-500 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                            View Project
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section className="relative z-20 min-h-screen py-32 px-6 md:px-12 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-zinc-900" />

            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
            }} />

            <div className="relative max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
                        Selected{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        A curated collection of projects showcasing creativity, technical excellence, and attention to detail.
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
