"use client";

import { useState, useCallback, useRef } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789█▓▒░▪▫■□▲△▼▽◆◇○●";
const TERMINAL_CHARS = "01█▓▒░ABCDEFabcdef!@#$%^";

export function useTextScramble(terminalMode = false) {
  const [displayText, setDisplayText] = useState("");
  const frameRef = useRef<number>(0);
  const resolvedRef = useRef<boolean[]>([]);

  const startScramble = useCallback((target: string, duration = 600) => {
    const chars = terminalMode ? TERMINAL_CHARS : CHARS;
    const startTime = Date.now();
    resolvedRef.current = new Array(target.length).fill(false);

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      let result = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") {
          result += " ";
          continue;
        }

        if (progress > i / target.length && !resolvedRef.current[i]) {
          if (Math.random() > 0.3) {
            resolvedRef.current[i] = true;
          }
        }

        if (resolvedRef.current[i]) {
          result += target[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(target);
      }
    };

    cancelAnimationFrame(frameRef.current);
    animate();
  }, [terminalMode]);

  const stopScramble = useCallback((target: string) => {
    cancelAnimationFrame(frameRef.current);
    setDisplayText(target);
  }, []);

  return { displayText, startScramble, stopScramble, setDisplayText };
}
