"use client";

import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ProjectOverlay } from "./components/ProjectOverlay";

export default function Home() {
  const [dark, setDark] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  const openOverlay = () => {
    window.history.pushState({}, "", "#/proyectos/airecomprimido");
    setOverlayOpen(true);
  };

  const closeOverlay = () => {
    window.history.pushState({}, "", window.location.pathname + window.location.search);
    setOverlayOpen(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    if (!overlayOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [overlayOpen]);

  return (
    <div className="min-h-screen bg-bg">
      <Nav onToggleDark={() => setDark((d) => !d)} />
      <Hero />
      <ProjectsSection onOpenCaseStudy={openOverlay} />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ProjectOverlay open={overlayOpen} onClose={closeOverlay} />
    </div>
  );
}
