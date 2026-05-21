"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/lib/data";

const ENCRYPTED_FRAGMENTS = [
  "01001100 01000101 01010100",
  "53 45 43 55 52 45",
  "L3T5·BU1LD·50M3TH1NG",
  "█▓▒░ TRANSMISSION OPEN ░▒▓█",
  "AES-256 · RSA-4096 · VERIFIED",
];

export default function Collaboration() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-full relative overflow-hidden flex items-center justify-center"
      style={{
        background: "#020202",
        padding: "10rem clamp(1.5rem, 5vw, 5rem)",
        minHeight: "100vh",
      }}
    >
      {/* Floating encrypted fragments in background */}
      {ENCRYPTED_FRAGMENTS.map((frag, i) => (
        <motion.div
          key={i}
          className="absolute font-mono text-xs pointer-events-none select-none"
          style={{
            color: "rgba(126,249,255,0.15)",
            letterSpacing: "0.2em",
            top: `${15 + i * 17}%`,
            left: i % 2 === 0 ? `${5 + i * 3}%` : `${60 + i * 4}%`,
            fontSize: "1.04rem",
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{
            duration: 4 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        >
          {frag}
        </motion.div>
      ))}

      {/* Large glow in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(126,249,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-main relative z-10 flex flex-col items-center text-center">
        {/* Section header */}
        <motion.div
          className="flex items-center gap-4 mb-20 w-full max-w-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--accent)", letterSpacing: "0.3em" }}>
            /005
          </span>
          <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(245,245,245,0.70)", letterSpacing: "0.3em" }}>
            COLLABORATE
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </motion.div>

        {/* Main CTA text */}
        <div ref={headerRef} className="flex flex-col items-center gap-6 mb-16">
          <motion.div
            className="font-mono text-xs tracking-widest"
            style={{ color: "rgba(245,245,245,0.58)", letterSpacing: "0.35em" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            $ ./open_transmission.sh
          </motion.div>

          <motion.h2
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 9rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              color: "var(--text-dark)",
            }}
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            LET&apos;S BUILD
            <br />
            <span style={{ color: "var(--accent)" }}>SOMETHING</span>
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(245,245,245,0.58)",
                color: "transparent",
              }}
            >
              IMPOSSIBLE
            </span>
          </motion.h2>

          <motion.p
            className="font-sans text-base max-w-md leading-relaxed mb-6"
            style={{ color: "rgba(245,245,245,0.70)", lineHeight: "1.85", fontSize: "1.05rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Available for AI/ML projects, full-stack development, and creative technology collaborations. Let&apos;s make something the world hasn&apos;t seen yet.
          </motion.p>
        </div>

        {/* Contact CTA */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="group relative font-mono text-sm tracking-widest px-10 py-4 overflow-hidden transition-all duration-300"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
              letterSpacing: "0.2em",
            }}
          >
            {/* Hover fill */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "var(--accent)" }}
            />
            <span className="relative group-hover:text-black transition-colors duration-300">
              INITIATE CONTACT
            </span>
          </a>

          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-widest transition-colors duration-200"
            style={{ color: "rgba(245,245,245,0.70)", letterSpacing: "0.25em" }}
          >
            github.com/arth-1 →
          </a>
        </motion.div>

        {/* Email display */}
        <motion.div
          className="mt-12 font-mono text-xs tracking-widest"
          style={{ color: "rgba(245,245,245,0.75)", letterSpacing: "0.3em" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          {siteConfig.email}
        </motion.div>

        {/* Transmission status */}
        <motion.div
          className="mt-8 flex items-center gap-3 font-mono text-xs"
          style={{ color: "rgba(245,245,245,0.70)", letterSpacing: "0.2em" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "#22c55e",
              boxShadow: "0 0 8px #22c55e",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          TRANSMISSION OPEN — AWAITING RESPONSE
        </motion.div>
      </div>
    </section>
  );
}
