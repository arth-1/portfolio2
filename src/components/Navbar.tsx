"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/data";
import { useTextScramble } from "@/hooks/useTextScramble";

function NavLink({ label, href }: { label: string; href: string }) {
  const { displayText, startScramble, stopScramble, setDisplayText } = useTextScramble(true);

  useEffect(() => {
    setDisplayText(label);
  }, [label, setDisplayText]);

  return (
    <a
      href={href}
      className="font-mono text-xs tracking-widest transition-colors duration-200 hover:text-accent relative group"
      style={{ color: "rgba(245,245,245,0.5)", letterSpacing: "0.2em" }}
      onMouseEnter={() => startScramble(label, 400)}
      onMouseLeave={() => stopScramble(label)}
    >
      <span className="text-accent opacity-40 mr-1">[</span>
      {displayText}
      <span className="text-accent opacity-40 ml-1">]</span>
      <span
        className="absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 w-0 group-hover:w-full"
        style={{ background: "var(--accent)" }}
      />
    </a>
  );
}

export default function Navbar({ visible = true }: { visible?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between"
      style={{
        padding: "1.5rem clamp(1.5rem, 5vw, 5rem)",
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.04)" : "none",
        transition: "all 0.4s ease",
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Logo */}
      <a
        href="#"
        className="font-mono font-bold tracking-widest text-sm"
        style={{ color: "var(--accent)", letterSpacing: "0.3em" }}
      >
        {siteConfig.handle}
        <span className="animate-[blink_1s_step-end_infinite] ml-0.5" style={{ color: "var(--accent)" }}>_</span>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(link => (
          <NavLink key={link.href} {...link} />
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <motion.span
          className="block w-6 h-px bg-text-dark"
          style={{ background: menuOpen ? "var(--accent)" : "var(--text-dark)" }}
          animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
        />
        <motion.span
          className="block w-4 h-px"
          style={{ background: "var(--text-dark)" }}
          animate={{ opacity: menuOpen ? 0 : 1 }}
        />
        <motion.span
          className="block w-6 h-px"
          style={{ background: menuOpen ? "var(--accent)" : "var(--text-dark)" }}
          animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0 }}
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 flex flex-col gap-6 p-8"
            style={{ background: "rgba(5,5,5,0.98)", borderBottom: "1px solid var(--border)" }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-mono text-lg tracking-widest"
                style={{ color: "var(--text-dark)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setMenuOpen(false)}
              >
                <span style={{ color: "var(--accent)" }}>/ </span>
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
