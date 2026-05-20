"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";

const SHUTDOWN_LINES = [
  "SAVING SESSION DATA...",
  "FLUSHING MEMORY CACHE...",
  "CLOSING SECURE CHANNEL...",
  "GOODBYE.",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "#010101",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        padding: "5rem clamp(1.5rem, 5vw, 5rem) 3rem",
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(126,249,255,0.15), transparent)" }}
      />

      <div className="container-main relative z-10">
        {/* Shutdown terminal sequence */}
        <motion.div
          className="mb-12 flex flex-col gap-1.5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {SHUTDOWN_LINES.map((line, i) => (
            <motion.div
              key={i}
              className="font-mono text-xs flex items-center gap-2"
              style={{ color: "rgba(245,245,245,0.15)", letterSpacing: "0.15em" }}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
            >
              <span style={{ color: "rgba(126,249,255,0.25)" }}>▶</span>
              {line}
              {i === SHUTDOWN_LINES.length - 1 && (
                <span style={{ color: "rgba(126,249,255,0.5)", animation: "blink 1s step-end infinite" }}>█</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-12 pt-10 text-center md:text-left" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          {/* Left — name + tagline */}
          <div>
            <div
              className="font-sans font-bold mb-1"
              style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", letterSpacing: "-0.03em", color: "var(--text-dark)", lineHeight: 1 }}
            >
              ARTH<span style={{ color: "var(--accent)" }}>.</span>
            </div>
            <div className="font-mono text-xs mt-2" style={{ color: "rgba(245,245,245,0.2)", letterSpacing: "0.2em" }}>
              AI ENGINEER · FULL-STACK DEVELOPER
            </div>
          </div>

          {/* Center — social links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { label: "GITHUB", href: siteConfig.social.github },
              { label: "LINKEDIN", href: siteConfig.social.linkedin },
              { label: "EMAIL", href: `mailto:${siteConfig.email}` },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="font-mono text-xs transition-colors duration-200"
                style={{ color: "rgba(245,245,245,0.25)", letterSpacing: "0.2em" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,245,245,0.25)")}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right — copyright */}
          <div className="font-mono text-xs text-center md:text-right" style={{ color: "rgba(245,245,245,0.12)", letterSpacing: "0.1em" }}>
            <div>© {year} ARTH AGRAWAL</div>
            <div className="mt-1.5" style={{ color: "rgba(245,245,245,0.08)" }}>
              ALL RIGHTS RESERVED
            </div>
          </div>
        </div>

        {/* Terminal shutdown line */}
        <motion.div
          className="mt-10 pt-6 flex items-center justify-center gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <span
            className="font-mono text-xs"
            style={{ color: "rgba(245,245,245,0.08)", letterSpacing: "0.3em" }}
          >
            connection terminated
          </span>
          <span
            style={{
              color: "rgba(126,249,255,0.2)",
              animation: "blink 1.5s step-end infinite",
              fontFamily: "var(--font-mono)",
            }}
          >
            _
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
