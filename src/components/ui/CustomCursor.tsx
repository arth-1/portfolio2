"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "hover" | "click" | "text";

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const dotX = useSpring(mouseX, { damping: 40, stiffness: 500 });
  const dotY = useSpring(mouseY, { damping: 40, stiffness: 500 });
  const ringX = useSpring(mouseX, { ...springConfig });
  const ringY = useSpring(mouseY, { ...springConfig });

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);

    const onMouseDown = () => setState("click");
    const onMouseUp = () => setState("default");

    // Detect hoverable elements
    const onElementEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" || target.tagName === "BUTTON" || target.dataset.cursor === "hover") {
        setState("hover");
      } else if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        setState("text");
      } else {
        setState("default");
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onElementEnter);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onElementEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  const dotSize = state === "click" ? 6 : 8;
  const ringSize = state === "hover" ? 50 : state === "click" ? 24 : 32;

  return (
    <>
      {/* Main dot — instant follow */}
      <motion.div
        className="pointer-events-none fixed z-[99999]"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          borderRadius: "50%",
          backgroundColor: "#7ef9ff",
          boxShadow: "0 0 10px rgba(126,249,255,0.8), 0 0 20px rgba(126,249,255,0.4)",
        }}
        animate={{ scale: state === "click" ? 0.8 : 1 }}
        transition={{ duration: 0.1 }}
      />

      {/* Outer ring — spring lag */}
      <motion.div
        className="pointer-events-none fixed z-[99998]"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: state === "hover" ? "4px" : "50%",
          border: "1px solid rgba(126,249,255,0.5)",
          mixBlendMode: "difference",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          borderRadius: state === "hover" ? "4px" : "50%",
          opacity: 0.8,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Terminal block cursor — only in hover state */}
      {state === "hover" && (
        <motion.div
          className="pointer-events-none fixed z-[99997] font-mono text-accent text-xs"
          style={{ x: dotX, y: dotY, marginLeft: 12, marginTop: -8 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          █
        </motion.div>
      )}
    </>
  );
}
