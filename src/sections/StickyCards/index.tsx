"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { philosophyCards } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const CARD_COLORS = ["#7ef9ff", "#a78bfa", "#f472b6", "#fb923c"];

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
      // Each card gets its own full viewport of scroll distance
      const scrollPerCard = window.innerHeight;
      const totalScroll = scrollPerCard * (numCards - 1);

      // Pin the sticky container for the total scroll distance
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: `+=${totalScroll}`,
        pin: sticky,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Each subsequent card slides up and covers the previous one
      cards.forEach((card, i) => {
        if (i === 0) return;

        // Set initial state — each card starts below the viewport
        gsap.set(card, {
          yPercent: 105,
          rotate: i % 2 === 0 ? -1.8 : 1.8,
          scale: 0.95,
        });

        // Each card animates in during its dedicated scroll segment
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
    // Wrapper defines total scroll height
    <div
      ref={wrapperRef}
      style={{
        height: `${philosophyCards.length * 100}vh`,
        background: "var(--bg-dark)",
        position: "relative",
      }}
    >
      {/* Sticky container — stays pinned while wrapper scrolls */}
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
          className="absolute top-8 left-1/2 -translate-x-1/2 z-[100] font-mono text-xs"
          style={{ color: "rgba(245,245,245,0.18)", letterSpacing: "0.35em" }}
        >
          PHILOSOPHY
        </div>

        {/* Progress pills — right side */}
        <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-[100]">
          {philosophyCards.map((_, i) => (
            <div
              key={i}
              style={{
                width: "2px",
                height: i === activeCard ? "28px" : "10px",
                background: i === activeCard ? CARD_COLORS[i % CARD_COLORS.length] : "rgba(245,245,245,0.12)",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                boxShadow: i === activeCard ? `0 0 8px ${CARD_COLORS[i % CARD_COLORS.length]}80` : "none",
              }}
            />
          ))}
        </div>

        {/* Cards stack — all absolutely positioned, layered by z-index */}
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
              {/* Card body */}
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
                      style={{ width: "10px", height: "10px", background: color, opacity: 0.75 }}
                    />
                  ))}
                  <span
                    className="font-mono text-xs ml-4"
                    style={{ color: "rgba(245,245,245,0.18)", letterSpacing: "0.2em" }}
                  >
                    {card.id} / {String(philosophyCards.length).padStart(2, "0")}
                  </span>
                </div>

                {/* Card index */}
                <div
                  className="font-mono text-xs mb-4"
                  style={{ color: CARD_COLORS[i % CARD_COLORS.length], letterSpacing: "0.35em", opacity: 0.9 }}
                >
                  /{card.id}
                </div>

                {/* Title */}
                <h2
                  className="font-sans font-bold mb-5"
                  style={{
                    fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
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
                    color: "rgba(245,245,245,0.48)",
                    lineHeight: "1.75",
                    fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
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
                    opacity: 0.75,
                    borderLeft: `2px solid ${CARD_COLORS[i % CARD_COLORS.length]}`,
                    paddingLeft: "1rem",
                    fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                  }}
                >
                  {card.code}
                </div>

                {/* CRT scan overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                  }}
                />

                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 pointer-events-none"
                  style={{
                    width: "200px",
                    height: "200px",
                    background: `radial-gradient(ellipse at top right, ${CARD_COLORS[i % CARD_COLORS.length]}12 0%, transparent 70%)`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
