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
        ['rgba(8, 8, 13, 0)', 'rgba(8, 8, 13, 0.9)']
    );

    const navBorder = useTransform(
        scrollY,
        [0, 100],
        ['rgba(240, 236, 228, 0)', 'rgba(240, 236, 228, 0.04)']
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
                            <span className="text-3xl font-black tracking-tighter text-[#f0ece4] font-[family-name:var(--font-display)] italic relative">
                                IKE
                                <motion.span
                                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c8956c] to-[#e8b98a] origin-left"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-[#c8956c]/0 group-hover:bg-[#c8956c]/5 blur-xl transition-all duration-500 -z-10 rounded-full" />
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
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
                                className="group relative px-5 py-2.5 text-[14px] font-medium text-[#7a756d] hover:text-[#f0ece4] transition-colors duration-300 cursor-pointer uppercase tracking-[0.12em]"
                            >
                                <span className="relative z-10">{link.label}</span>

                                <motion.div
                                    className="absolute inset-0 rounded-lg bg-[#f0ece4]/[0.03]"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileHover={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                />

                                <motion.div
                                    className="absolute bottom-0 left-1/2 w-0 h-px bg-gradient-to-r from-[#c8956c] to-[#e8b98a] group-hover:w-3/4 -translate-x-1/2 transition-all duration-300"
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
                        className="hidden lg:flex relative group items-center gap-2 px-6 py-2.5 rounded-full overflow-hidden cursor-pointer border border-[#c8956c]/30 hover:border-[#c8956c]/60 transition-colors duration-300"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#c8956c]/10 to-[#e8b98a]/10 group-hover:from-[#c8956c]/20 group-hover:to-[#e8b98a]/20 transition-all duration-300" />

                        <span className="relative z-10 text-[13px] font-semibold text-[#e8b98a] uppercase tracking-[0.1em]">
                            Let&apos;s Talk
                        </span>

                        <svg
                            className="relative z-10 w-4 h-4 text-[#c8956c] group-hover:translate-x-0.5 transition-transform duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </motion.button>

                    {/* Mobile Menu Button */}
                    <motion.button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-[#f0ece4]/[0.04] border border-[#f0ece4]/[0.08] cursor-pointer group"
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        <div className="w-5 flex flex-col gap-[5px]">
                            <motion.span
                                animate={mobileOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                                className="block h-[2px] w-full bg-[#f0ece4] rounded-full"
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.span
                                animate={mobileOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
                                className="block h-[2px] w-full bg-[#f0ece4] rounded-full"
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.span
                                animate={mobileOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
                                className="block h-[2px] w-full bg-[#f0ece4] rounded-full"
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
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 bg-[#08080d]/97 backdrop-blur-2xl lg:hidden"
                            onClick={() => setMobileOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-20 right-0 left-0 z-40 lg:hidden"
                        >
                            <div className="max-w-7xl mx-auto px-6 py-8">
                                <div className="bg-[#0f0f14]/80 backdrop-blur-xl rounded-2xl border border-[#f0ece4]/[0.06] p-6 space-y-2">
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
                                            className="w-full text-left px-6 py-4 rounded-xl text-xl font-semibold text-[#f0ece4]/80 hover:text-[#f0ece4] hover:bg-[#f0ece4]/[0.04] transition-all duration-200 cursor-pointer font-[family-name:var(--font-display)]"
                                        >
                                            {link.label}
                                        </motion.button>
                                    ))}

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
                                        className="w-full mt-4 px-6 py-4 rounded-xl bg-gradient-to-r from-[#c8956c] to-[#a0522d] text-[#f0ece4] text-lg font-semibold cursor-pointer"
                                    >
                                        Let&apos;s Talk
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
