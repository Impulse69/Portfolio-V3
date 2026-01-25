'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'py-4 bg-zinc-900/80 backdrop-blur-xl border-b border-white/5'
                    : 'py-6 bg-transparent'
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                {/* Logo */}
                <motion.a
                    href="#"
                    className="relative group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent">
                        I.
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                </motion.a>

                {/* Nav Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, i) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i, duration: 0.5 }}
                            className="relative text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300 group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                        </motion.a>
                    ))}
                </div>

                {/* CTA Button */}
                <motion.a
                    href="#contact"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group px-5 py-2.5 rounded-full overflow-hidden"
                >
                    {/* Gradient border */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-500 to-indigo-500 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute inset-[1px] bg-zinc-900 rounded-full" />
                    <span className="relative text-sm font-medium text-white">
                        Let's Talk
                    </span>
                </motion.a>
            </nav>
        </motion.header>
    );
}
