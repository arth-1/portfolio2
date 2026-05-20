"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const DOMAIN_COLORS: Record<string, string> = {
  "AI / ML": "#7ef9ff",
  "FULL STACK": "#a78bfa",
  "3D / CREATIVE": "#f472b6",
  "SYSTEMS": "#fb923c",
  "OTHER": "#34d399",
};

function SkillItem({ text, delay, color }: { text: string; delay: number; color: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.span
      ref={ref}
      className="font-mono text-xs px-4 py-2 transition-all duration-300 cursor-default"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        color: "rgba(245,245,245,0.4)",
        letterSpacing: "0.1em",
        fontSize: "0.75rem",
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{
        borderColor: `${color}60`,
        color: color,
        backgroundColor: `${color}08`,
        transition: { duration: 0.15 },
      }}
    >
      {text}
    </motion.span>
  );
}

function DomainSection({
  domain,
  items,
  color,
  index,
}: {
  domain: string;
  items: string[];
  color: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className="py-12 md:py-16 border-b"
      style={{ borderColor: "var(--border)" }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-start gap-8 flex-wrap">
        {/* Domain label — big */}
        <div className="flex items-center gap-4" style={{ minWidth: "220px" }}>
          <div
            className="w-1 h-8 rounded-full"
            style={{ background: color }}
          />
          <div>
            <div
              className="font-sans font-bold"
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 2rem)",
                letterSpacing: "-0.02em",
                color: "var(--text-dark)",
                lineHeight: 1,
              }}
            >
              {domain}
            </div>
            <div
              className="font-mono text-xs mt-1"
              style={{ color: color, opacity: 0.6, letterSpacing: "0.2em" }}
            >
              {String(items.length).padStart(2, "0")} TOOLS
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="flex flex-wrap gap-3 flex-1">
          {items.map((skill, i) => (
            <SkillItem
              key={skill}
              text={skill}
              delay={i * 0.04}
              color={color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Marquee of all skills
function SkillMarquee() {
  const allSkills = skills.flatMap(s => s.items);

  return (
    <div className="overflow-hidden py-6" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 35s linear infinite" }}
      >
        {[...allSkills, ...allSkills].map((skill, i) => (
          <span key={i} className="font-mono text-xs mx-6" style={{ color: "rgba(245,245,245,0.12)", letterSpacing: "0.2em" }}>
            {skill}
            <span className="mx-6" style={{ color: "var(--accent)", opacity: 0.3 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section
      id="skills"
      className="section-full relative overflow-hidden"
      style={{ background: "var(--bg-dark)", padding: "8rem clamp(1.5rem, 5vw, 5rem)" }}
    >
      <div className="container-main relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs tracking-widest" style={{ color: "var(--accent)", letterSpacing: "0.3em" }}>
            /004
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: "rgba(245,245,245,0.2)", letterSpacing: "0.3em" }}>
            DOMAINS & SKILLS
          </span>
        </div>

        {/* Big diagnostic header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.div
            className="font-mono text-xs mb-4 tracking-widest"
            style={{ color: "var(--accent)", letterSpacing: "0.3em", opacity: 0.7 }}
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 0.7 } : {}}
            transition={{ duration: 0.5 }}
          >
            $ RUNNING SYSTEM DIAGNOSTICS...
          </motion.div>

          <motion.h2
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(3rem, 9vw, 10rem)",
              letterSpacing: "-0.06em",
              lineHeight: 0.85,
              color: "var(--text-dark)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            SKILLS
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(245,245,245,0.2)",
                color: "transparent",
              }}
            >
              & DOMAINS
            </span>
          </motion.h2>
        </div>

        {/* Marquee */}
        <SkillMarquee />

        {/* Domain sections */}
        <div className="mt-0">
          {skills.map((group, i) => (
            <DomainSection
              key={group.domain}
              domain={group.domain}
              items={group.items}
              color={DOMAIN_COLORS[group.domain] || "var(--accent)"}
              index={i}
            />
          ))}
        </div>

        {/* Diagnostic complete */}
        <motion.div
          className="mt-8 font-mono text-xs"
          style={{ color: "rgba(245,245,245,0.2)", letterSpacing: "0.2em" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          $ DIAGNOSTICS COMPLETE — ALL SYSTEMS NOMINAL
          <span style={{ animation: "blink 1s step-end infinite", color: "var(--accent)" }}>█</span>
        </motion.div>
      </div>
    </section>
  );
}
