"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { profile } from "@/lib/profile";

export default function ContactActions() {
  const [status, setStatus] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email copied");
    } catch {
      setStatus("Please copy the email address above.");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 3500);
  }
  return (
    <div className="contact-actions">
      <div className="email-row">
        <a href={`mailto:${profile.email}`}>
          {profile.email} <ArrowUpRight size={20} aria-hidden="true" />
        </a>
        <button
          type="button"
          onClick={copyEmail}
          aria-label="Copy email address"
        >
          {status === "Email copied" ? (
            <Check size={17} aria-hidden="true" />
          ) : (
            <Copy size={17} aria-hidden="true" />
          )}
        </button>
      </div>
      <div className="contact-secondary">
        <a
          href="https://ijwlabs.com/contact/"
          target="_blank"
          rel="noopener noreferrer"
        >
          For company enquiries <ArrowUpRight size={13} aria-hidden="true" />
        </a>
        <span role="status" aria-live="polite">
          {status}
        </span>
      </div>
    </div>
  );
}
