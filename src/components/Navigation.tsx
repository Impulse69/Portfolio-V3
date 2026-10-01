"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { profile } from "@/lib/profile";

const links = [
  { id: "work", label: "Selected work" },
  { id: "studio", label: "IJW Labs" },
  { id: "about", label: "About me" },
  { id: "approach", label: "Approach" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            setActive(entry.target.id === "intro" ? "" : entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    ["intro", ...links.map((link) => link.id), "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header className="site-header">
      <div className="nav-inner shell">
        <a
          className="brand"
          href="#main"
          aria-label={`${profile.name}, home`}
          onClick={() => setOpen(false)}
        >
          ia<span>.</span>
        </a>
        <span className="nav-title">
          {profile.name.toUpperCase()}<span>FOUNDER &amp; SOFTWARE ENGINEER</span>
        </span>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <nav
          id="primary-navigation"
          className={`nav-links ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              aria-current={active === link.id ? "location" : undefined}
              onClick={() => {
                setOpen(false);
                toggle.current?.focus({ preventScroll: true });
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => {
              setOpen(false);
              toggle.current?.focus({ preventScroll: true });
            }}
          >
            Let’s talk <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </header>
  );
}
