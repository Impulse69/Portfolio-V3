'use client';

import { motion } from 'framer-motion';
import ProjectCard3D from './3d/ProjectCard3D';

const projects = [
    {
        title: "Custom Portfolio Builder",
        category: "SaaS Platform",
        description: "No-code portfolio builder with drag-and-drop, live preview, and Supabase integration",
        image: "/projects/portfolio-builder-v2.png",
        link: "https://v0-custom-portfolio-builder-ivory.vercel.app/",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Supabase"],
        accent: "#8b7ec8",
    },
    {
        title: "Presscraft & Logistics",
        category: "Business Website",
        description: "Modern, responsive website for a premium printing and logistics company in Ghana",
        image: "/projects/presscraft-v2.png",
        link: "https://presscraft.vercel.app/",
        tech: ["HTML5", "Tailwind CSS", "JavaScript"],
        accent: "#6ba5a0",
    },
    {
        title: "ExpenseTracker",
        category: "Android App",
        description: "Material Design Android app for tracking daily expenses with category insights and spending analytics",
        image: "/projects/expense-tracker-v2.png",
        link: "https://github.com/Impulse69/ExpenseTracker",
        tech: ["Kotlin", "Android", "Material Design", "Room DB"],
        accent: "#7aab8a",
    },
    {
        title: "UniHostel Booking",
        category: "Full-Stack Web App",
        description: "University hostel booking platform for students to find accommodation and managers to update hostel statuses",
        image: "/projects/hostel-booking-v2.png",
        link: "https://hostelfrontend.vercel.app/",
        tech: ["React", "Next.js", "Vercel", "REST API"],
        accent: "#c8956c",
    }
];

export default function Projects() {
    return (
        <section className="relative z-20 min-h-screen py-20 sm:py-32 px-4 sm:px-6 md:px-12 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08080d]/80 to-[#08080d]" />

            {/* Subtle dot grid */}
            <div className="absolute inset-0 opacity-[0.012]" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(240,236,228,0.5) 1px, transparent 0)`,
                backgroundSize: '48px 48px'
            }} />

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-20"
                >
                    <span className="text-[#c8956c] text-xs font-semibold uppercase tracking-[0.2em] mb-5 block">
                        Interactive 3D Portfolio
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#f0ece4] mb-4 sm:mb-6 tracking-tight font-[family-name:var(--font-display)]">
                        Selected{' '}
                        <span className="bg-gradient-to-r from-[#e8b98a] via-[#c8956c] to-[#a0522d] bg-clip-text text-transparent italic">
                            Works
                        </span>
                    </h2>
                    <p className="text-[#7a756d] text-base max-w-lg mx-auto leading-relaxed">
                        Explore projects in 3D. Hover and move your cursor over cards to experience real-time 3D depth and lighting physics.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {projects.map((project, i) => (
                        <ProjectCard3D key={i} project={project} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
