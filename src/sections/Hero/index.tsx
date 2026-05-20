"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { siteConfig } from "@/lib/data";
import ParticleField from "@/components/three/ParticleField";

const ENCRYPTION_LINES = [
  "$ sudo ./decrypt --identity=ARTH",
  "ENCRYPTING ASSETS...",
  "SECURING MEMORY STACK...",
  "MOUNTING PORTFOLIO DATABASE...",
  "TRANSFER COMPLETE. ██████████ 100%",
  "WELCOME.",
];

export default function Hero() {
  const [encryptVisible, setEncryptVisible] = useState(false);
  const [encryptLines, setEncryptLines] = useState<string[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const runEncryption = () => {
    setEncryptVisible(true);
    setEncryptLines([]);
    ENCRYPTION_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setEncryptLines(prev => [...prev, line]);
        if (i === ENCRYPTION_LINES.length - 1) {
          setTimeout(() => setEncryptVisible(false), 1800);
        }
      }, i * 350);
      timeouts.current.push(t);
    });
  };

  useEffect(() => {
    return () => timeouts.current.forEach(clearTimeout);
  }, []);

  return (
    <section
      id="home"
      className="section-full relative overflow-hidden"
      style={{ background: "var(--bg-dark)", minHeight: "100vh" }}
    >
      {/* 3D Particle Canvas — full background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <ParticleField />
        </Canvas>
      </div>

      {/* Radial gradient overlay — deep atmosphere */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, rgba(5,5,5,0.5) 60%, rgba(5,5,5,0.95) 100%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none bg-grid opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(126,249,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(126,249,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Bottom void fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5] pointer-events-none"
        style={{
          height: "40vh",
          background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,5,0.8) 60%, var(--bg-dark) 100%)",
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{
          minHeight: "100vh",
          padding: "8rem clamp(1.5rem, 5vw, 5rem) 6rem",
        }}
      >
        {/* System label */}
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{
              background: "#22c55e",
              boxShadow: "0 0 10px #22c55e, 0 0 20px rgba(34,197,94,0.5)",
              animation: "blink 2s ease-in-out infinite",
            }}
          />
          <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(245,245,245,0.35)", letterSpacing: "0.3em" }}>
            ARTH.OS v2.0.25 / ONLINE
          </span>
        </motion.div>

        {/* Main name — hero typography */}
        <div className="relative text-center" onClick={runEncryption}>
          {/* Huge name */}
          <motion.h1
            className="text-hero font-sans font-bold relative select-none"
            style={{
              color: "var(--text-dark)",
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
            }}
            initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="hover"
          >
            ARTH
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(245,245,245,0.3)",
                color: "transparent",
              }}
            >
              AGRAWAL
            </span>
          </motion.h1>

          {/* Accent line through middle */}
          <motion.div
            className="absolute left-0 right-0"
            style={{
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
              top: "50%",
              opacity: 0.3,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* Tagline */}
        <motion.div
          className="flex flex-col items-center gap-3 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p
            className="font-mono text-xs tracking-widest text-center"
            style={{ color: "rgba(245,245,245,0.35)", letterSpacing: "0.3em", lineHeight: 1.6 }}
          >
            AI ENGINEER · FULL-STACK DEVELOPER · CREATIVE TECHNOLOGIST
          </p>
          <p
            className="font-mono text-xs"
            style={{ color: "rgba(245,245,245,0.2)", letterSpacing: "0.15em" }}
          >
            NMIMS Mumbai · MBA Tech · Computer Engineering
          </p>
        </motion.div>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mt-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <a
            href="#projects"
            className="font-mono text-xs tracking-widest border px-8 py-4 transition-all duration-300 hover:bg-accent hover:text-bg-dark hover:border-accent"
            style={{
              borderColor: "var(--accent)",
              color: "var(--accent)",
              letterSpacing: "0.2em",
            }}
          >
            VIEW WORK
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-mono text-xs tracking-widest transition-all duration-300 px-8 py-4"
            style={{ color: "rgba(245,245,245,0.4)", letterSpacing: "0.2em" }}
          >
            GET IN TOUCH →
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <span className="font-mono text-2xs tracking-widest" style={{ color: "rgba(245,245,245,0.2)", fontSize: "0.55rem" }}>
            SCROLL
          </span>
          <motion.div
            className="w-px h-10"
            style={{ background: "linear-gradient(to bottom, var(--accent), transparent)", opacity: 0.4 }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Encryption terminal overlay */}
      {encryptVisible && (
        <motion.div
          className="absolute inset-0 z-[50] flex items-center justify-center"
          style={{ background: "rgba(5,5,5,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="font-mono text-sm flex flex-col gap-2 p-8 border border-accent border-opacity-20 max-w-sm w-full mx-4">
            <div className="flex items-center gap-2 mb-4" style={{ color: "var(--accent)" }}>
              <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em" }}>ARTH.OS TERMINAL</span>
              <div className="flex-1 h-px" style={{ background: "rgba(126,249,255,0.2)" }} />
            </div>
            {encryptLines.map((line, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-2"
                style={{
                  color: i === encryptLines.length - 1 && line === "WELCOME." ? "var(--accent)" : "rgba(245,245,245,0.7)",
                }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span style={{ color: "var(--accent)", opacity: 0.6 }}>▶</span>
                {line}
                {i === encryptLines.length - 1 && (
                  <span style={{ animation: "blink 0.7s step-end infinite", color: "var(--accent)" }}>█</span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
