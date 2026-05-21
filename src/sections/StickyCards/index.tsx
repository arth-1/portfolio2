"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { philosophyCards } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const CARD_COLORS = ["#7ef9ff", "#a78bfa", "#f472b6", "#fb923c", "#34d399"];

// Defined at module level to avoid stale closures / re-creation on renders
const BOOT_LINES: string[] = [
  "$ arth --init session",
  "> loading consciousness...........[OK]",
  "> mounting creative stack..........[OK]",
  "> syncing neural weights...........[OK]",
  "> ready.",
  "",
  "$ whoami",
  "> arth agrawal — AI engineer + creative technologist",
  "",
  "$ ls projects/",
  "> emotional-ai/  edu-gpt/  saas-platform/  mythril/  musicplus/",
  "",
  "$ cat status.txt",
  "> AVAILABLE FOR COLLABORATION",
  "> OPEN TO INTERESTING PROBLEMS",
  "> BUILDING AT THE FRONTIER_",
];

// The 5th card — idle terminal with blinking cursor and fake log
function TerminalIdleCard() {
  const [lines, setLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    let idx = 0;
    const timer = setInterval(() => {
      if (idx < BOOT_LINES.length) {
        const nextLine = BOOT_LINES[idx];
        // Only push if it's a real string (guards against any undefined)
        if (typeof nextLine === "string") {
          setLines(prev => [...prev, nextLine]);
        }
        idx++;
      } else {
        clearInterval(timer);
      }
    }, 280);
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => { clearInterval(timer); clearInterval(blink); };
  }, []);

  return (
    <div
      style={{
        background: "#050505",
        border: "1px solid rgba(52,211,153,0.35)",
        borderTop: "2.5px solid #34d399",
        padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)",
        position: "relative",
        overflow: "hidden",
        minHeight: "360px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Chrome */}
      <div className="flex items-center gap-2 mb-8">
        {["#ff3c3c", "#f59e0b", "#22c55e"].map((c, i) => (
          <div key={i} className="rounded-full" style={{ width: "11px", height: "11px", background: c, opacity: 0.8 }} />
        ))}
        <span className="font-mono ml-4" style={{ color: "rgba(52,211,153,0.60)", fontSize: "1.02rem", letterSpacing: "0.25em" }}>
          arth.os — terminal v2.0.25
        </span>
        <div className="flex-1" />
        <span className="font-mono" style={{ color: "rgba(52,211,153,0.40)", fontSize: "0.98rem", letterSpacing: "0.15em" }}>
          05 / 05
        </span>
      </div>

      {/* Terminal output */}
      <div className="flex flex-col gap-1.5 flex-1 font-mono" style={{ fontSize: "clamp(0.85rem, 1.5vw, 1.0rem)" }}>
        {lines.filter((l): l is string => typeof l === "string").map((line, i, arr) => (
          <div
            key={i}
            style={{
              color: line.startsWith("$")
                ? "#34d399"
                : line.startsWith(">")
                  ? "rgba(245,245,245,0.80)"
                  : "rgba(245,245,245,0.30)",
              letterSpacing: line.startsWith("$") ? "0.05em" : "0.02em",
              lineHeight: "1.8",
              fontWeight: line.startsWith("$") ? 600 : 400,
            }}
          >
            {line || "\u00a0"}
            {/* Blinking cursor on last line */}
            {i === arr.length - 1 && (
              <span
                style={{
                  color: "#34d399",
                  opacity: cursorVisible ? 1 : 0,
                  transition: "opacity 0.1s",
                  marginLeft: "2px",
                }}
              >
                █
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Scanline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        }}
      />
      {/* Green corner glow */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{ width: "220px", height: "220px", background: "radial-gradient(ellipse at top right, rgba(52,211,153,0.08) 0%, transparent 70%)" }}
      />
    </div>
  );
}

export default function StickyCards() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const cards = cardsRef.current.filter(Boolean);
      const numCards = cards.length;
      const scrollPerCard = window.innerHeight;
      const totalScroll = scrollPerCard * (numCards - 1);

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
      });

      cards.forEach((card, i) => {
        if (i === 0) return;

        gsap.set(card, {
          yPercent: 105,
          rotate: i % 2 === 0 ? -1.8 : 1.8,
          scale: 0.95,
        });

        gsap.to(card, {
          yPercent: 0,
          rotate: 0,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: `top+=${(i - 1) * scrollPerCard} top`,
            end: `top+=${i * scrollPerCard} top`,
            scrub: 1,
            onEnter: () => setActiveCard(i),
            onLeaveBack: () => setActiveCard(i - 1),
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        height: `${philosophyCards.length * 100}vh`,
        background: "var(--bg-dark)",
        position: "relative",
      }}
    >
      <div
        ref={stickyRef}
        style={{
          height: "100vh",
          width: "100%",
          background: "var(--bg-dark)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Section label */}
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] font-mono"
          style={{ color: "rgba(245,245,245,0.45)", letterSpacing: "0.35em", fontSize: "1.04rem" }}
        >
          PHILOSOPHY
        </div>

        {/* Progress pills */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[100]">
          {philosophyCards.map((_, i) => (
            <div
              key={i}
              style={{
                width: "2px",
                height: i === activeCard ? "28px" : "10px",
                background: i === activeCard ? CARD_COLORS[i % CARD_COLORS.length] : "rgba(245,245,245,0.25)",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                boxShadow: i === activeCard ? `0 0 8px ${CARD_COLORS[i % CARD_COLORS.length]}80` : "none",
              }}
            />
          ))}
        </div>

        {/* Cards stack */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "860px",
            padding: "0 clamp(1rem, 4vw, 3rem)",
          }}
        >
          {philosophyCards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              style={{
                position: i === 0 ? "relative" : "absolute",
                top: 0,
                left: 0,
                right: 0,
                padding: "0 clamp(1rem, 4vw, 3rem)",
                zIndex: i + 1,
              }}
            >
              {/* 5th card is special terminal idle */}
              {card.id === "05" ? (
                <TerminalIdleCard />
              ) : (
                <div
                  style={{
                    background: "var(--surface-card)",
                    border: "1px solid var(--border)",
                    borderTop: `2.5px solid ${CARD_COLORS[i % CARD_COLORS.length]}`,
                    padding: "clamp(1.5rem, 4vw, 2.5rem) clamp(1.5rem, 4vw, 3rem)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Terminal chrome */}
                  <div className="flex items-center gap-2 mb-6">
                    {["#ff3c3c", "#f59e0b", "#22c55e"].map((color, j) => (
                      <div
                        key={j}
                        className="rounded-full"
                        style={{ width: "11px", height: "11px", background: color, opacity: 0.8 }}
                      />
                    ))}
                    <span
                      className="font-mono ml-4"
                      style={{ color: "rgba(245,245,245,0.45)", letterSpacing: "0.2em", fontSize: "1.05rem" }}
                    >
                      {card.id} / {String(philosophyCards.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Card index */}
                  <div
                    className="font-mono mb-4"
                    style={{ color: CARD_COLORS[i % CARD_COLORS.length], letterSpacing: "0.35em", opacity: 0.9, fontSize: "1.0rem" }}
                  >
                    /{card.id}
                  </div>

                  {/* Title */}
                  <h2
                    className="font-sans font-bold mb-6"
                    style={{
                      fontSize: "clamp(3rem, 7vw, 5.5rem)",
                      letterSpacing: "-0.04em",
                      lineHeight: 0.88,
                      color: "var(--text-dark)",
                    }}
                  >
                    {card.title}
                  </h2>

                  {/* Body */}
                  <p
                    className="font-sans mb-8"
                    style={{
                      color: "rgba(245,245,245,0.75)",
                      lineHeight: "1.8",
                      fontSize: "clamp(1rem, 2vw, 1.15rem)",
                      maxWidth: "520px",
                    }}
                  >
                    {card.body}
                  </p>

                  {/* Code snippet */}
                  <div
                    className="font-mono"
                    style={{
                      color: CARD_COLORS[i % CARD_COLORS.length],
                      opacity: 0.85,
                      borderLeft: `2px solid ${CARD_COLORS[i % CARD_COLORS.length]}`,
                      paddingLeft: "1rem",
                      fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
                    }}
                  >
                    {card.code}
                  </div>

                  {/* CRT scan */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)" }}
                  />
                  {/* Glow */}
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: "220px",
                      height: "220px",
                      background: `radial-gradient(ellipse at top right, ${CARD_COLORS[i % CARD_COLORS.length]}10 0%, transparent 70%)`,
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
