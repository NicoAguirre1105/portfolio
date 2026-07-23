"use client";

import { useEffect, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProjectsSection } from "./components/ProjectsSection";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { ProjectOverlay } from "./components/ProjectOverlay";
import { airecomprimido, cafeLuchita, mafiaAzulgrana, telegramBot } from "./data/content";

const caseStudies = {
  airecomprimido,
  mafia: mafiaAzulgrana,
  "telegram-bot": telegramBot,
  "cafe-luchita": cafeLuchita,
};

type CaseStudyId = keyof typeof caseStudies;

export default function Home() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyId | null>(null);

  const openOverlay = (id: CaseStudyId) => {
    window.history.pushState({}, "", `#/proyectos/${id}`);
    setActiveCaseStudy(id);
  };

  const closeOverlay = () => {
    window.history.pushState({}, "", window.location.pathname + window.location.search);
    setActiveCaseStudy(null);
  };

  useEffect(() => {
    if (!activeCaseStudy) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCaseStudy]);

  return (
    <div className="min-h-screen bg-bg">
      <Nav />
      <Hero />
      <ProjectsSection onOpenCaseStudy={openOverlay} />
      <AboutSection />
      <ContactSection />
      <Footer />
      {activeCaseStudy && (
        <ProjectOverlay project={caseStudies[activeCaseStudy]} onClose={closeOverlay} />
      )}
    </div>
  );
}
