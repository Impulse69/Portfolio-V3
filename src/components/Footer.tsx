'use client';

import { motion } from 'framer-motion';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com' },
    { label: 'Twitter', href: 'https://twitter.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
    { label: 'Dribbble', href: 'https://dribbble.com' },
];

export default function Footer() {
    return (
        <footer id="contact" className="relative z-20 overflow-hidden">
            {/* CTA Section */}
            <section className="relative py-32 px-6 md:px-12">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-indigo-500/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-3xl" />

                <div className="relative max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-4 block">
                            Get In Touch
                        </span>

                        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
                            Let's create{' '}
                            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                something amazing
                            </span>
                            .
                        </h2>

                        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
                        </p>

                        <motion.a
                            href="mailto:hello@isaac.dev"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 text-white font-medium text-lg shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow animate-gradient bg-[length:200%_auto]"
                        >
                            <span>Start a Conversation</span>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Footer bottom */}
            <div className="relative border-t border-white/5 py-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <p className="text-zinc-500 text-sm">
                        © 2026 Isaac. Crafted with precision.
                    </p>

                    {/* Social links */}
                    <div className="flex items-center gap-6">
                        {socialLinks.map((link) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -2 }}
                                className="text-zinc-500 hover:text-white text-sm transition-colors duration-300"
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </div>

                    {/* Back to top */}
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ y: -2 }}
                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2"
                    >
                        Back to top
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
