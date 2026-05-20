"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { soundEngine } from "@/lib/sound";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true); // Start muted by default

  useEffect(() => {
    soundEngine.muted = muted;
  }, [muted]);

  const toggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    soundEngine.muted = newMuted;
    if (!newMuted) {
      // Play a little chime to confirm sound is on
      soundEngine.chime();
    }
  };

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-[1000] flex items-center gap-2 font-mono text-xs"
      style={{
        background: "rgba(5,5,5,0.8)",
        border: "1px solid rgba(255,255,255,0.06)",
        color: muted ? "rgba(245,245,245,0.2)" : "var(--accent)",
        padding: "0.5rem 0.75rem",
        backdropFilter: "blur(10px)",
        letterSpacing: "0.1em",
        transition: "color 0.2s ease",
      }}
      onClick={toggle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
      whileHover={{ borderColor: "rgba(126,249,255,0.2)" }}
    >
      <span style={{ fontSize: "0.8rem" }}>{muted ? "🔇" : "🔊"}</span>
      <span>{muted ? "SFX OFF" : "SFX ON"}</span>
    </motion.button>
  );
}
