"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

const PROJECT_ACCENT_COLORS = ["#7ef9ff", "#a78bfa", "#f472b6", "#fb923c", "#34d399"];

// Mobile: swipeable card stack
function MobileProjects() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];
  const color = PROJECT_ACCENT_COLORS[activeProject];

  return (
    <div className="flex flex-col gap-6">
      {/* Project navigation dots */}
      <div className="flex items-center gap-3 justify-center">
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveProject(i)}
            className="font-mono text-xs transition-all duration-200"
            style={{
              color: i === activeProject ? PROJECT_ACCENT_COLORS[i] : "rgba(245,245,245,0.70)",
              letterSpacing: "0.1em",
              paddingBottom: "4px",
              borderBottom: i === activeProject ? `1px solid ${PROJECT_ACCENT_COLORS[i]}` : "1px solid transparent",
            }}
          >
            {p.id}
          </button>
        ))}
      </div>

      {/* Active project card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{
            border: `1px solid ${color}30`,
            background: "var(--surface-card)",
          }}
        >
          {/* Terminal chrome */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.04)" }}
          >
            {["#ff3c3c", "#f59e0b", "#22c55e"].map((c, i) => (
              <div key={i} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
            <span className="font-mono text-xs ml-2 flex-1 text-center" style={{ color: "rgba(245,245,245,0.78)", fontSize: "1.04rem" }}>
              {project.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
            <span className="font-mono" style={{ color, opacity: 0.7, fontSize: "1.04rem", letterSpacing: "0.1em" }}>
              {project.status}
            </span>
          </div>

          <div className="p-5">
            {/* Category */}
            <div className="font-mono text-xs mb-3" style={{ color, letterSpacing: "0.2em", opacity: 0.85 }}>
              {project.category}
            </div>

            {/* Title */}
            <h3
              className="font-sans font-bold mb-2"
              style={{ fontSize: "clamp(1.4rem, 6vw, 2rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-dark)" }}
            >
              {project.title}
            </h3>

            {/* Subtitle */}
            <div className="font-sans text-sm mb-5" style={{ color: "rgba(245,245,245,0.72)", lineHeight: "1.5" }}>
              {project.subtitle}
            </div>

            {/* Divider */}
            <div className="mb-5 h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />

            {/* Description */}
            <p
              className="font-sans text-sm mb-6"
              style={{ color: "rgba(245,245,245,0.82)", lineHeight: "1.75" }}
            >
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-mono"
                  style={{
                    border: `1px solid ${color}25`,
                    color: "rgba(245,245,245,0.72)",
                    fontSize: "1.04rem",
                    padding: "3px 10px",
                    letterSpacing: "0.08em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveProject(Math.max(0, activeProject - 1))}
          disabled={activeProject === 0}
          className="font-mono text-xs transition-colors duration-200"
          style={{ color: activeProject === 0 ? "rgba(245,245,245,0.70)" : "rgba(245,245,245,0.75)", letterSpacing: "0.15em" }}
        >
          ← PREV
        </button>
        <span className="font-mono text-xs" style={{ color: "rgba(245,245,245,0.70)", letterSpacing: "0.15em" }}>
          {String(activeProject + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => setActiveProject(Math.min(projects.length - 1, activeProject + 1))}
          disabled={activeProject === projects.length - 1}
          className="font-mono text-xs transition-colors duration-200"
          style={{ color: activeProject === projects.length - 1 ? "rgba(245,245,245,0.70)" : "rgba(245,245,245,0.75)", letterSpacing: "0.15em" }}
        >
          NEXT →
        </button>
      </div>
    </div>
  );
}

// Desktop: split sidebar + detail panel
function DesktopProjects() {
  const [activeProject, setActiveProject] = useState(0);
  const project = projects[activeProject];
  const color = PROJECT_ACCENT_COLORS[activeProject];

  return (
    <div className="grid grid-cols-5 gap-6" style={{ minHeight: "70vh" }}>
      {/* Sidebar */}
      <div className="col-span-2 flex flex-col gap-1.5">
        <div className="font-mono text-xs mb-5" style={{ color: "rgba(245,245,245,0.78)", letterSpacing: "0.22em" }}>
          SELECT PROJECT /
        </div>
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => setActiveProject(i)}
            className="text-left relative overflow-hidden transition-all duration-300"
            style={{
              padding: "1.1rem 1.4rem",
              border: `1px solid ${i === activeProject ? PROJECT_ACCENT_COLORS[i] + "60" : "var(--border)"}`,
              background: i === activeProject ? `${PROJECT_ACCENT_COLORS[i]}08` : "transparent",
            }}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="font-mono text-xs mb-1" style={{ color: i === activeProject ? PROJECT_ACCENT_COLORS[i] : "var(--secondary)" }}>
              {p.id}
            </div>
            <div className="font-sans font-semibold text-sm leading-tight" style={{ color: i === activeProject ? "var(--text-dark)" : "rgba(245,245,245,0.78)" }}>
              {p.title}
            </div>
            <div className="font-mono mt-1" style={{ color: "rgba(245,245,245,0.78)", fontSize: "0.96rem", letterSpacing: "0.18em" }}>
              {p.category}
            </div>
            {i === activeProject && (
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{ background: PROJECT_ACCENT_COLORS[i] }}
                layoutId="activeIndicator"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="col-span-3 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            className="flex-1 flex flex-col"
            initial={{ opacity: 0, x: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Terminal frame */}
            <div className="flex-1 relative" style={{ border: `1px solid ${color}30`, background: "var(--surface-card)" }}>
              {/* Chrome bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.04)" }}
              >
                {["#ff3c3c", "#f59e0b", "#22c55e"].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
                ))}
                <div className="flex-1 text-center font-mono text-xs" style={{ color: "rgba(245,245,245,0.78)" }}>
                  {project.title.toLowerCase().replace(/\s+/g, "-")}.project
                </div>
                <div className="font-mono text-xs" style={{ color, opacity: 0.75, letterSpacing: "0.1em" }}>
                  {project.status}
                </div>
              </div>

              {/* CRT overlay */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)" }}
              />

              <div className="p-8 lg:p-10 relative">
                <div className="font-mono text-xs mb-4" style={{ color, letterSpacing: "0.22em", opacity: 0.85 }}>
                  {project.category}
                </div>
                <h2
                  className="font-sans font-bold mb-3"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--text-dark)" }}
                >
                  {project.title}
                </h2>
                <div className="font-sans text-base mb-6" style={{ color: "rgba(245,245,245,0.72)", lineHeight: "1.55" }}>
                  {project.subtitle}
                </div>
                <div className="h-px mb-6" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
                <p className="font-sans mb-8" style={{ color: "rgba(245,245,245,0.82)", lineHeight: "1.8", fontSize: "clamp(0.88rem, 1.5vw, 1rem)" }}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-mono"
                      style={{ border: `1px solid ${color}28`, color: "rgba(245,245,245,0.72)", fontSize: "1.04rem", padding: "4px 12px", letterSpacing: "0.08em" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Terminal log */}
                <div
                  className="font-mono text-xs p-4"
                  style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--border)", color: "rgba(245,245,245,0.60)", lineHeight: "1.9" }}
                >
                  <span style={{ color, opacity: 0.7 }}>$ </span>git log --oneline {project.title.toLowerCase().replace(/\s+/g, "-")}
                  <br />
                  <span style={{ color: "rgba(245,245,245,0.78)" }}>&gt; {project.tags.slice(0, 3).join(" · ")}</span>
                  <br />
                  <span style={{ color: "rgba(245,245,245,0.70)" }}>
                    &gt; status: {project.status.toLowerCase()}
                    <span style={{ animation: "blink 1s step-end infinite", color }}>█</span>
                  </span>
                </div>
              </div>

              {/* Corner glow */}
              <div
                className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at top right, ${color}07 0%, transparent 70%)` }}
              />
            </div>

            {/* Dots navigation */}
            <div className="flex items-center justify-between mt-4">
              <button
                className="font-mono text-xs transition-colors duration-200"
                style={{ color: "rgba(245,245,245,0.60)", letterSpacing: "0.15em" }}
                onClick={() => setActiveProject(Math.max(0, activeProject - 1))}
                disabled={activeProject === 0}
              >
                ← PREV
              </button>
              <div className="flex gap-2">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className="cursor-pointer rounded-full transition-all duration-300"
                    style={{
                      width: i === activeProject ? "20px" : "6px",
                      height: "6px",
                      background: i === activeProject ? PROJECT_ACCENT_COLORS[activeProject] : "var(--border)",
                    }}
                    onClick={() => setActiveProject(i)}
                  />
                ))}
              </div>
              <button
                className="font-mono text-xs transition-colors duration-200"
                style={{ color: "rgba(245,245,245,0.60)", letterSpacing: "0.15em" }}
                onClick={() => setActiveProject(Math.min(projects.length - 1, activeProject + 1))}
                disabled={activeProject === projects.length - 1}
              >
                NEXT →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-full relative overflow-hidden"
      style={{ background: "#030303", padding: "8rem clamp(1.5rem, 5vw, 5rem) 6rem" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(126,249,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(126,249,255,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-main relative z-10">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-xs" style={{ color: "var(--accent)", letterSpacing: "0.3em" }}>/003</span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="font-mono text-xs" style={{ color: "rgba(245,245,245,0.70)", letterSpacing: "0.3em" }}>PROJECTS</span>
        </div>

        {/* Mobile layout — shown only on small screens */}
        <div className="block xl:hidden">
          <MobileProjects />
        </div>

        {/* Desktop layout — hidden on small screens */}
        <div className="hidden xl:block">
          <DesktopProjects />
        </div>
      </div>
    </section>
  );
}
