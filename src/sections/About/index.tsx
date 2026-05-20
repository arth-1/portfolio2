"use client";

import { useRef, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { siteConfig, experience, leadership, achievements } from "@/lib/data";
import WireframeOrb from "@/components/three/WireframeOrb";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-full relative overflow-hidden"
      style={{
        background: "var(--bg-dark)",
        padding: "8rem clamp(1.5rem, 5vw, 5rem) 6rem",
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at left center, rgba(126,249,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="container-main relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="font-mono text-xs" style={{ color: "var(--accent)", letterSpacing: "0.3em" }}>
            /002
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="font-mono text-xs" style={{ color: "rgba(245,245,245,0.2)", letterSpacing: "0.3em" }}>
            IDENTITY
          </span>
        </div>

        {/* Main grid — stacks on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: Text content ── */}
          <div className="flex flex-col gap-8 order-2 lg:order-1">

            {/* Label */}
            <motion.div
              className="font-mono text-xs"
              style={{ color: "rgba(245,245,245,0.28)", letterSpacing: "0.22em" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              [ IDENTITY_VERIFIED ] ◆ NMIMS · MUMBAI
            </motion.div>

            {/* Large heading */}
            <motion.h2
              className="font-sans font-bold"
              style={{
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.04em",
                lineHeight: 0.88,
                color: "var(--text-dark)",
              }}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              ABOUT
              <br />
              <span style={{ color: "var(--accent)" }}>ME_</span>
            </motion.h2>

            {/* Bio */}
            <div className="flex flex-col gap-5">
              {siteConfig.bio.map((line, i) => (
                <motion.p
                  key={i}
                  className="font-sans"
                  style={{
                    color: "rgba(245,245,245,0.52)",
                    lineHeight: "1.8",
                    fontSize: "clamp(0.92rem, 1.8vw, 1.05rem)",
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Experience */}
            <motion.div
              className="mt-2"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className="font-mono text-xs mb-5" style={{ color: "rgba(245,245,245,0.22)", letterSpacing: "0.28em" }}>
                EXPERIENCE
              </div>
              {experience.map((exp, i) => (
                <div
                  key={i}
                  className="border-l-2 pl-5 py-4"
                  style={{ borderColor: "var(--accent)", background: "rgba(126,249,255,0.02)", marginBottom: "0.5rem" }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-sans font-semibold text-sm" style={{ color: "var(--text-dark)" }}>
                      {exp.role}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--secondary)" }}>
                      {exp.period}
                    </span>
                  </div>
                  <div className="font-mono text-xs mb-3" style={{ color: "var(--accent)", opacity: 0.75, letterSpacing: "0.1em" }}>
                    @ {exp.company}
                  </div>
                  <ul className="flex flex-col gap-2">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="font-sans text-sm flex items-start gap-2"
                        style={{ color: "rgba(245,245,245,0.4)", lineHeight: "1.6" }}
                      >
                        <span style={{ color: "var(--accent)", opacity: 0.5, flexShrink: 0, marginTop: "0.15em" }}>▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <div className="font-mono text-xs mb-5" style={{ color: "rgba(245,245,245,0.22)", letterSpacing: "0.28em" }}>
                ACHIEVEMENTS
              </div>
              <div className="flex flex-col gap-3">
                {achievements.map((a, i) => (
                  <div
                    key={i}
                    className="font-mono text-xs flex items-start gap-3"
                    style={{ color: "rgba(245,245,245,0.42)", lineHeight: "1.6" }}
                  >
                    <span style={{ color: "var(--accent)", opacity: 0.6, flexShrink: 0 }}>▶</span>
                    {a}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Globe + leadership card ── */}
          <div className="flex flex-col gap-8 order-1 lg:order-2">

            {/* 3D Globe — contained properly on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{
                position: "relative",
                // Responsive height
                height: "clamp(260px, 45vw, 420px)",
                // Prevent overflow on mobile
                overflow: "hidden",
                borderRadius: "2px",
              }}
            >
              <Canvas
                camera={{ position: [0, 0, 4], fov: 48 }}
                dpr={[1, 1.5]}
                style={{ width: "100%", height: "100%" }}
              >
                <Suspense fallback={null}>
                  <WireframeOrb />
                </Suspense>
              </Canvas>

              {/* Canvas overlay labels */}
              <div
                className="absolute top-3 right-3 font-mono text-xs pointer-events-none"
                style={{ color: "rgba(126,249,255,0.35)", letterSpacing: "0.2em", fontSize: "0.6rem" }}
              >
                SCANNING...
              </div>
              <div
                className="absolute bottom-3 left-3 font-mono pointer-events-none"
                style={{ color: "rgba(245,245,245,0.14)", letterSpacing: "0.15em", fontSize: "0.58rem" }}
              >
                ENTITY: ARTH_AGRAWAL
              </div>

              {/* Subtle border frame */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ border: "1px solid rgba(126,249,255,0.08)", borderRadius: "2px" }}
              />
            </motion.div>

            {/* Leadership terminal card */}
            <motion.div
              className="terminal-card"
              style={{ padding: "clamp(1.25rem, 3vw, 1.75rem)" }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              {/* Terminal chrome */}
              <div
                className="flex items-center gap-2 pb-4 mb-5"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                {["#ff3c3c", "#f59e0b", "#22c55e"].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.75 }} />
                ))}
                <span className="font-mono text-xs ml-2" style={{ color: "rgba(245,245,245,0.2)", letterSpacing: "0.12em" }}>
                  leadership.sh
                </span>
              </div>

              <div
                className="font-mono text-xs mb-5"
                style={{ color: "var(--accent)", letterSpacing: "0.15em", opacity: 0.8 }}
              >
                $ cat leadership.txt
              </div>

              <div className="flex flex-col gap-4">
                {leadership.map((l, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09 }}
                  >
                    <span className="font-mono text-xs mt-1 flex-shrink-0" style={{ color: "var(--accent)", opacity: 0.6 }}>▸</span>
                    <div>
                      <div className="font-sans text-sm font-semibold mb-0.5" style={{ color: "var(--text-dark)" }}>
                        {l.role}
                      </div>
                      <div className="font-mono text-xs" style={{ color: "var(--secondary)", letterSpacing: "0.08em" }}>
                        {l.org}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
