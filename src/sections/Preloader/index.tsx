"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

// The real ASCII art — shown clearly in READY phase
const ASCII_ART = [
  "  █████╗ ██████╗ ████████╗██╗  ██╗",
  " ██╔══██╗██╔══██╗╚══██╔══╝██║  ██║",
  " ███████║██████╔╝   ██║   ███████║",
  " ██╔══██║██╔══██╗   ██║   ██╔══██║",
  " ██║  ██║██║  ██║   ██║   ██║  ██║",
  " ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝",
];

const TERMINAL_LINES = [
  "$ INITIALIZING ARTH.OS v2.0.25",
  "$ LOADING NEURAL ARCHITECTURE...",
  "$ MOUNTING AI SUBSYSTEMS............[OK]",
  "$ VERIFYING IDENTITY MATRIX..........[OK]",
  "$ DECRYPTING PORTFOLIO DATABASE.......[OK]",
  "$ SYSTEM READY",
];

const CRT_CHARS = "01█▓▒░▪▫■□▲△ABCDEFabcdef!@#$%^&*";
const PRESERVE_CHARS = new Set([" ", "╗", "╔", "╝", "╚", "║", "═"]);

function randomChar() {
  return CRT_CHARS[Math.floor(Math.random() * CRT_CHARS.length)];
}

// Generate a fully scrambled version of the ASCII art
function generateScrambled(): string[] {
  return ASCII_ART.map(line =>
    line.split("").map(ch =>
      PRESERVE_CHARS.has(ch) ? ch : randomChar()
    ).join("")
  );
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [phase, setPhase] = useState<"boot" | "ready" | "exit">("boot");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [cursorLine, setCursorLine] = useState(0);
  // START fully scrambled — resolves to real art on ready
  const [asciiDisplay, setAsciiDisplay] = useState<string[]>(generateScrambled);
  const [enterHovered, setEnterHovered] = useState(false);
  const [enterText, setEnterText] = useState("[ CLICK ANYWHERE TO ENTER ]");
  const scrambleFrame = useRef<number>(0);
  const lineTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Track resolution per character per line
  const resolvedRef = useRef<boolean[][]>(
    ASCII_ART.map(line => new Array(line.length).fill(false))
  );
  const bootProgressRef = useRef(0); // 0–1 progress through boot

  // BOOT PHASE: continuously scramble but gradually resolve chars as boot progresses
  useEffect(() => {
    if (phase !== "boot") return;

    const animate = () => {
      const progress = bootProgressRef.current;
      setAsciiDisplay(
        ASCII_ART.map((line, li) =>
          line.split("").map((ch, ci) => {
            if (PRESERVE_CHARS.has(ch)) return ch;
            // Resolve character based on position in line and boot progress
            const resolveThreshold = (ci / line.length) * 0.6 + 0.1;
            if (progress > resolveThreshold && !resolvedRef.current[li][ci]) {
              if (Math.random() > 0.85) resolvedRef.current[li][ci] = true;
            }
            return resolvedRef.current[li][ci] ? randomChar() : randomChar();
          }).join("")
        )
      );
      scrambleFrame.current = requestAnimationFrame(animate);
    };

    scrambleFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(scrambleFrame.current);
  }, [phase]);

  // READY PHASE: smoothly resolve all scrambled chars to actual ASCII art
  useEffect(() => {
    if (phase !== "ready") return;

    cancelAnimationFrame(scrambleFrame.current);

    // Reset resolved state
    resolvedRef.current = ASCII_ART.map(line => new Array(line.length).fill(false));
    let frame = 0;
    const totalFrames = 40; // ~660ms at 60fps

    const resolve = () => {
      frame++;
      const progress = frame / totalFrames;

      setAsciiDisplay(
        ASCII_ART.map((line, li) =>
          line.split("").map((ch, ci) => {
            if (PRESERVE_CHARS.has(ch)) return ch;
            const threshold = (ci / line.length) * 0.7;
            if (progress > threshold && !resolvedRef.current[li][ci]) {
              if (Math.random() > 0.4) resolvedRef.current[li][ci] = true;
            }
            return resolvedRef.current[li][ci] ? ch : randomChar();
          }).join("")
        )
      );

      if (frame < totalFrames + 20) {
        scrambleFrame.current = requestAnimationFrame(resolve);
      } else {
        // Fully resolved — show clean art
        setAsciiDisplay(ASCII_ART);
      }
    };

    scrambleFrame.current = requestAnimationFrame(resolve);
    return () => cancelAnimationFrame(scrambleFrame.current);
  }, [phase]);

  // Boot sequence — type terminal lines + update boot progress
  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let currentLines: string[] = [];
    const totalChars = TERMINAL_LINES.reduce((a, b) => a + b.length, 0);
    let typedChars = 0;

    const typeNextChar = () => {
      if (lineIndex >= TERMINAL_LINES.length) {
        bootProgressRef.current = 1;
        setTimeout(() => setPhase("ready"), 300);
        return;
      }

      const targetLine = TERMINAL_LINES[lineIndex];
      charIndex++;

      if (charIndex <= targetLine.length) {
        currentLines = [
          ...currentLines.slice(0, lineIndex),
          targetLine.slice(0, charIndex),
        ];
        setTerminalLines([...currentLines]);
        setCursorLine(lineIndex);
        typedChars++;
        bootProgressRef.current = typedChars / totalChars;

        const delay = charIndex === 1 ? 40 : Math.random() * 16 + 6;
        lineTimeout.current = setTimeout(typeNextChar, delay);
      } else {
        lineIndex++;
        charIndex = 0;
        lineTimeout.current = setTimeout(typeNextChar, 120);
      }
    };

    setTimeout(() => typeNextChar(), 200);
    return () => clearTimeout(lineTimeout.current);
  }, []);

  // Enter text scramble on hover
  const handleEnterHover = useCallback((hovering: boolean) => {
    setEnterHovered(hovering);
    if (hovering) {
      const target = "[ CLICK ANYWHERE TO ENTER ]";
      let frame = 0;
      const resolved = new Array(target.length).fill(false);

      const animate = () => {
        const progress = frame / 30;
        let result = "";
        for (let i = 0; i < target.length; i++) {
          if (target[i] === " " || target[i] === "[" || target[i] === "]") {
            result += target[i];
            continue;
          }
          if (progress > i / target.length && !resolved[i]) {
            if (Math.random() > 0.4) resolved[i] = true;
          }
          result += resolved[i] ? target[i] : randomChar();
        }
        setEnterText(result);
        frame++;
        if (frame < 50) scrambleFrame.current = requestAnimationFrame(animate);
        else setEnterText(target);
      };
      animate();
    } else {
      setEnterText("[ CLICK ANYWHERE TO ENTER ]");
    }
  }, []);

  const handleEnter = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("exit");
    setTimeout(onComplete, 1200);
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center crt-scanlines"
          style={{ background: "#f0ede8", cursor: phase === "ready" ? "pointer" : "default" }}
          onClick={handleEnter}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(24px) brightness(3)",
            transition: { duration: 1.1, ease: [0.7, 0, 0.84, 0] },
          }}
        >
          {/* CRT flicker */}
          <div className="pointer-events-none absolute inset-0 crt-flicker" style={{ background: "rgba(180,170,150,0.04)" }} />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.18) 100%)" }}
          />

          {/* Horizontal scan sweep */}
          <motion.div
            className="pointer-events-none absolute left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)" }}
            animate={{ top: ["0%", "105%"] }}
            transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatDelay: 3 }}
          />

          {/* Main content */}
          <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-xl px-6">

            {/* Status indicator */}
            <motion.div
              className="flex items-center gap-2 font-mono text-xs"
              style={{ color: "#1a1a1a80", letterSpacing: "0.2em" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: phase === "ready" ? "#22c55e" : "#f59e0b",
                  boxShadow: phase === "ready" ? "0 0 8px #22c55e" : "0 0 8px #f59e0b",
                  animation: "blink 1s step-end infinite",
                  flexShrink: 0,
                }}
              />
              <span>{phase === "ready" ? "SYSTEM READY" : "INITIALIZING..."}</span>
            </motion.div>

            {/* ASCII Logo — scrambled during boot, resolves to name on ready */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5 }}
            >
              {asciiDisplay.map((line, i) => (
                <pre
                  key={i}
                  className="font-mono leading-snug select-none"
                  style={{
                    color: phase === "ready" ? "#050505" : `rgba(5,5,5,${0.35 + (i / ASCII_ART.length) * 0.45})`,
                    fontSize: "clamp(0.38rem, 1.4vw, 0.8rem)",
                    textShadow: phase === "ready" ? "0 0 10px rgba(0,0,0,0.2)" : "none",
                    transition: "color 0.4s ease",
                  }}
                >
                  {line}
                </pre>
              ))}
            </motion.div>

            {/* Terminal boot lines */}
            <motion.div
              className="font-mono flex flex-col gap-1.5 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {terminalLines.map((line, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs leading-relaxed"
                  style={{
                    color: i === terminalLines.length - 1 && phase === "boot" ? "#050505cc" : "#1a1a1a77",
                  }}
                >
                  <span style={{ color: "#22c55e", opacity: 0.8, flexShrink: 0 }}>▶</span>
                  <span>{line}</span>
                  {i === cursorLine && phase === "boot" && (
                    <span style={{ color: "#050505", animation: "blink 0.7s step-end infinite" }}>█</span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Enter CTA — only when ready */}
            <AnimatePresence>
              {phase === "ready" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center gap-4 mt-2 w-full"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div style={{ flex: 1, height: "1px", background: "rgba(5,5,5,0.15)" }} />
                    <span className="font-mono" style={{ color: "#05050540", fontSize: "1.02rem" }}>■</span>
                    <div style={{ flex: 1, height: "1px", background: "rgba(5,5,5,0.15)" }} />
                  </div>

                  <motion.button
                    className="font-mono outline-none bg-transparent border-none transition-all duration-200"
                    style={{
                      color: enterHovered ? "#050505" : "#05050570",
                      letterSpacing: "0.22em",
                      fontSize: "0.96rem",
                    }}
                    onMouseEnter={() => handleEnterHover(true)}
                    onMouseLeave={() => handleEnterHover(false)}
                  >
                    {enterText}
                  </motion.button>

                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#050505", opacity: 0.25 }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.25, 0, 0.25] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner labels */}
          {(["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"] as const).map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} font-mono opacity-25`}
              style={{ color: "#050505", fontSize: "1.02rem", letterSpacing: "0.2em" }}
            >
              {i === 0 && "ARTH.OS"}
              {i === 1 && "v2.0.25"}
              {i === 2 && "MUM-IND"}
              {i === 3 && "[ SECURE ]"}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
