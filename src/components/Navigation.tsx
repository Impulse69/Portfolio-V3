'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { scrollY } = useScroll();

    const navBackground = useTransform(
        scrollY,
        [0, 100],
        ['rgba(10, 10, 15, 0)', 'rgba(10, 10, 15, 0.85)']
    );

    const navBorder = useTransform(
        scrollY,
        [0, 100],
        ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.05)']
    );

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            const offset = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <>
            <motion.header
                style={{
                    backgroundColor: navBackground,
                    borderBottomColor: navBorder,
                }}
                className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-2xl"
            >
                <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="relative group cursor-pointer"
                    >
                        <div className="flex items-baseline gap-0.5">
                            <span className="text-3xl font-black tracking-tighter text-white relative">
                                IKE
                                {/* Gradient underline on hover */}
                                <motion.span
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </span>
                        </div>
                        {/* Glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-orange-400/0 to-yellow-400/0 group-hover:from-amber-500/10 group-hover:via-orange-400/10 group-hover:to-yellow-400/10 blur-xl transition-all duration-500 -z-10" />
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.map((link, i) => (
                            <motion.button
                                key={link.label}
                                type="button"
                                onClick={() => handleNavClick(link.href)}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1 + (i * 0.1),
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="group relative px-5 py-2.5 text-[15px] font-medium text-zinc-400 hover:text-white transition-colors duration-300 cursor-pointer"
                            >
                                <span className="relative z-10">{link.label}</span>

                                {/* Hover background */}
                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-white/[0.04]"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                />

                                {/* Bottom indicator */}
                                <motion.div
                                    className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-amber-500 via-orange-400 to-yellow-400 group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"
                                />
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                        type="button"
                        onClick={() => handleNavClick('#contact')}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden lg:flex relative group items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden cursor-pointer"
                    >
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 blur-md opacity-50 group-hover:opacity-75 transition-opacity" />

                        <span className="relative z-10 text-[15px] font-semibold text-white">
                            Let's Talk
                        </span>

                        <svg
                            className="relative z-10 w-4 h-4 text-white/90 group-hover:translate-x-0.5 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08] cursor-pointer group"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <div className="w-5 flex flex-col gap-[5px]">
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                                className="block h-[2px] w-full bg-white rounded-full"
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                                className="block h-[2px] w-full bg-white rounded-full"
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                                className="block h-[2px] w-full bg-white rounded-full"
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </div>
                    </motion.button>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-zinc-950/95 backdrop-blur-2xl lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-20 right-0 left-0 z-40 lg:hidden"
                        >
                            <div className="max-w-7xl mx-auto px-6 py-8">
                                <div className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-white/[0.08] p-6 space-y-2">
                                    {navLinks.map((link, i) => (
                                        <motion.button
                                            key={link.label}
                                            type="button"
                                            onClick={() => handleNavClick(link.href)}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{
                                                duration: 0.3,
                                                delay: i * 0.05,
                                                ease: [0.16, 1, 0.3, 1]
                                            }}
                                            className="w-full text-left px-6 py-4 rounded-xl text-xl font-semibold text-white/80 hover:text-white hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                                        >
                                            {link.label}
                                        </motion.button>
                                    ))}

                                    {/* Mobile CTA */}
                                    <motion.button
                                        type="button"
                                        onClick={() => handleNavClick('#contact')}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0.15,
                                            ease: [0.16, 1, 0.3, 1]
                                        }}
                                        className="w-full mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-500 text-white text-lg font-semibold cursor-pointer"
                                    >
                                        Let's Talk
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
