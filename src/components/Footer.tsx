'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

// ⚠️ Replace with your Web3Forms access key from https://web3forms.com
const WEB3FORMS_KEY = '8bedd31f-2813-47c8-8b2c-d2621140116f';

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/Impulse69',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/junior_ike_/',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
        ),
    },
    {
        label: 'Telegram',
        href: 'https://t.me/Ghost_of_Uchiiha',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
        ),
    },
];

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Footer() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<FormStatus>('idle');
    const [focused, setFocused] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `New message from ${formData.name} — Portfolio`,
                    from_name: 'Portfolio Contact Form',
                }),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const inputClasses = (field: string) =>
        `w-full bg-white/[0.04] border ${focused === field
            ? 'border-amber-500/50 ring-1 ring-amber-500/20'
            : 'border-white/[0.08] hover:border-white/[0.15]'
        } rounded-xl px-5 py-3.5 text-white text-base placeholder:text-zinc-500 outline-none transition-all duration-300`;

    return (
        <footer id="contact" className="relative z-20 overflow-hidden">
            {/* Contact Section */}
            <section className="relative py-24 md:py-32 px-6 md:px-12">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-amber-500/10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-3xl" />

                <div className="relative max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

                        {/* Left — CTA Text */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-amber-400 text-sm font-medium uppercase tracking-widest mb-4 block">
                                Get In Touch
                            </span>

                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
                                Let&apos;s create{' '}
                                <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 bg-clip-text text-transparent">
                                    something amazing
                                </span>
                                .
                            </h2>

                            <p className="text-lg text-zinc-400 leading-relaxed mb-10 max-w-md">
                                Have a project in mind? I&apos;d love to hear about it. Fill out the form and I&apos;ll get back to you within 24 hours.
                            </p>

                            {/* Contact info cards */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-400">Email</p>
                                        <p className="text-white font-medium">juniorike69@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-400">Location</p>
                                        <p className="text-white font-medium">Ghana, West Africa</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="flex items-center gap-3 mt-8">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.label}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ y: -3, scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-amber-500/30 hover:bg-amber-500/10 flex items-center justify-center text-zinc-400 hover:text-amber-400 transition-all duration-300"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right — Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            viewport={{ once: true }}
                        >
                            <form
                                ref={formRef}
                                onSubmit={handleSubmit}
                                className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm"
                            >
                                {/* Subtle glow accent */}
                                <div className="absolute -top-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                                <h3 className="text-xl font-semibold text-white mb-6">
                                    Send me a message
                                </h3>

                                {/* Honeypot anti-spam field — must stay hidden */}
                                <input
                                    type="checkbox"
                                    name="botcheck"
                                    className="hidden"
                                    style={{ display: 'none' }}
                                />

                                <div className="space-y-5">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm text-zinc-400 mb-2 font-medium">
                                            Your Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('name')}
                                            onBlur={() => setFocused(null)}
                                            className={inputClasses('name')}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm text-zinc-400 mb-2 font-medium">
                                            Your Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('email')}
                                            onBlur={() => setFocused(null)}
                                            className={inputClasses('email')}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm text-zinc-400 mb-2 font-medium">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            placeholder="Tell me about your project..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            onFocus={() => setFocused('message')}
                                            onBlur={() => setFocused(null)}
                                            className={`${inputClasses('message')} resize-none`}
                                        />
                                    </div>

                                    {/* Submit button */}
                                    <motion.button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                                        whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                                        className={`w-full relative group flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-[15px] overflow-hidden transition-all duration-300 cursor-pointer ${status === 'sending'
                                            ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed'
                                            : 'text-white'
                                            }`}
                                    >
                                        {status !== 'sending' && (
                                            <>
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-[length:200%_auto] animate-gradient" />
                                                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                                            </>
                                        )}

                                        <span className="relative z-10">
                                            {status === 'sending' ? 'Sending...' : 'Send Message'}
                                        </span>

                                        {status === 'sending' ? (
                                            <div className="relative z-10 w-5 h-5 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin" />
                                        ) : (
                                            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                            </svg>
                                        )}
                                    </motion.button>
                                </div>

                                {/* Status Messages */}
                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm text-emerald-300">
                                                Message sent successfully! I&apos;ll get back to you soon.
                                            </p>
                                        </motion.div>
                                    )}

                                    {status === 'error' && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                                        >
                                            <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <p className="text-sm text-red-300">
                                                Something went wrong. Please try again or email me directly.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer bottom */}
            <div className="relative border-t border-white/5 py-8 px-6 md:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Copyright */}
                    <p className="text-zinc-500 text-sm">
                        © 2026 Isaac. Crafted with precision.
                    </p>

                    {/* Back to top */}
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        whileHover={{ y: -2 }}
                        className="text-zinc-500 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 cursor-pointer"
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
