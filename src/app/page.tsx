"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Preloader from "@/sections/Preloader";
import Hero from "@/sections/Hero";
import StickyCards from "@/sections/StickyCards";
import About from "@/sections/About";
import Projects from "@/sections/Projects";
import Skills from "@/sections/Skills";
import Collaboration from "@/sections/Collaboration";
import Footer from "@/sections/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Preloader — always rendered until dismissed */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/*
        Main site — rendered immediately (hidden behind preloader) so it preloads.
        Revealed with a fade after preloader exits.
      */}
      <motion.main
        style={{
          background: "var(--bg-dark)",
          // Hidden while preloader is showing — opacity 0 but still in DOM for preloading
          pointerEvents: preloaderDone ? "auto" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: preloaderDone ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Navbar visible={preloaderDone} />
        <Hero />
        <StickyCards />
        <About />
        <Projects />
        <Skills />
        <Collaboration />
        <Footer />
      </motion.main>
    </>
  );
}
