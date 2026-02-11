'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

const projects = [
    {
        title: "Custom Portfolio Builder",
        category: "SaaS Platform",
        description: "No-code portfolio builder with drag-and-drop, live preview, and Supabase integration",
        image: "/projects/portfolio-builder-v2.png",
        link: "https://v0-custom-portfolio-builder-ivory.vercel.app/",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Supabase"],
        accent: "#8b5cf6",
    },
    {
        title: "Presscraft & Logistics",
        category: "Business Website",
        description: "Modern, responsive website for a premium printing and logistics company in Ghana",
        image: "/projects/presscraft-v2.png",
        link: "https://presscraft.vercel.app/",
        tech: ["HTML5", "Tailwind CSS", "JavaScript"],
        accent: "#06b6d4",
    },
    {
        title: "ExpenseTracker",
        category: "Android App",
        description: "Material Design Android app for tracking daily expenses with category insights and spending analytics",
        image: "/projects/expense-tracker-v2.png",
        link: "https://github.com/Impulse69/ExpenseTracker",
        tech: ["Kotlin", "Android", "Material Design", "Room DB"],
        accent: "#10b981",
    },
    {
        title: "UniHostel Booking",
        category: "Full-Stack Web App",
        description: "University hostel booking platform for students to find accommodation and managers to update hostel statuses",
        image: "/projects/hostel-booking-v2.png",
        link: "https://hostelfrontend.vercel.app/",
        tech: ["React", "Next.js", "Vercel", "REST API"],
        accent: "#f59e0b",
    }
];

function ProjectCard({ project, index }: { project: typeof projects[0], index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, margin: "-80px" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group"
        >
            <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-white/[0.06] transition-all duration-500 hover:border-white/[0.12] hover:bg-zinc-900/80"
                style={{
                    boxShadow: isHovered
                        ? `0 20px 60px -15px ${project.accent}20, 0 0 0 1px ${project.accent}15`
                        : '0 4px 24px -4px rgba(0,0,0,0.3)',
                    transition: 'box-shadow 0.5s ease, border-color 0.5s ease, background-color 0.5s ease',
                }}
            >
                {/* Image Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-800/50">
                    {/* Gradient overlay on image */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                    {/* Project Number - top right of image */}
                    <div className="absolute top-4 right-5 z-20">
                        <span
                            className="text-5xl font-bold transition-all duration-500"
                            style={{
                                color: isHovered ? `${project.accent}30` : 'rgba(255,255,255,0.06)',
                                WebkitTextStroke: isHovered ? `1px ${project.accent}50` : '1px rgba(255,255,255,0.08)',
                            }}
                        >
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    {/* Category pill - top left of image */}
                    <div className="absolute top-4 left-5 z-20">
                        <span
                            className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md transition-all duration-500"
                            style={{
                                background: isHovered ? `${project.accent}20` : 'rgba(255,255,255,0.06)',
                                color: isHovered ? project.accent : 'rgba(255,255,255,0.5)',
                                border: `1px solid ${isHovered ? `${project.accent}30` : 'rgba(255,255,255,0.08)'}`,
                            }}
                        >
                            {project.category}
                        </span>
                    </div>

                    {/* Image */}
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                </div>

                {/* Content Area */}
                <div className="relative p-6 pb-7">
                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300 group-hover:text-white">
                        {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-zinc-400 leading-relaxed mb-5 line-clamp-2 group-hover:text-zinc-300 transition-colors duration-300">
                        {project.description}
                    </p>

                    {/* Bottom row: Tech + Arrow */}
                    <div className="flex items-end justify-between gap-4">
                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.slice(0, 4).map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-2.5 py-1 text-[11px] font-medium rounded-md transition-all duration-300"
                                    style={{
                                        background: isHovered ? `${project.accent}10` : 'rgba(255,255,255,0.04)',
                                        color: isHovered ? `${project.accent}` : 'rgba(255,255,255,0.4)',
                                        border: `1px solid ${isHovered ? `${project.accent}20` : 'rgba(255,255,255,0.06)'}`,
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Arrow Icon */}
                        <div
                            className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                            style={{
                                background: isHovered ? `${project.accent}15` : 'rgba(255,255,255,0.04)',
                                border: `1px solid ${isHovered ? `${project.accent}30` : 'rgba(255,255,255,0.06)'}`,
                            }}
                        >
                            <svg
                                className="w-4 h-4 transition-all duration-300"
                                style={{
                                    color: isHovered ? project.accent : 'rgba(255,255,255,0.3)',
                                    transform: isHovered ? 'translate(2px, -2px)' : 'translate(0, 0)',
                                }}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section className="relative z-20 min-h-screen py-32 px-6 md:px-12 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950" />

            {/* Subtle grid texture */}
            <div className="absolute inset-0 opacity-[0.015]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="relative max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="text-amber-500 text-xs font-semibold uppercase tracking-[0.2em] mb-5 block">
                        Portfolio
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        Selected{' '}
                        <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                            Works
                        </span>
                    </h2>
                    <p className="text-zinc-500 text-base max-w-lg mx-auto leading-relaxed">
                        A curated collection of projects showcasing creativity, technical excellence, and attention to detail.
                    </p>
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((project, i) => (
                        <ProjectCard key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
