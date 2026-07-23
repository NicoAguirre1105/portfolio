import Image from "next/image";
import { HoverLabel, Section } from "./ui";
import { techIcons } from "./TechIcons";

const stackPrimary = ["Next.js", "TypeScript", "Tailwind", "Supabase", "Vercel", "cPanel"];
const stackSecondary = ["Python", "PostgreSQL", "Figma"];

export function AboutSection() {
  return (
    <Section id="sobre-mi" className="flex flex-col gap-5 py-[clamp(40px,6vw,64px)]">
      <div className="flex flex-wrap gap-8">
        <div className="flex w-[200px] max-w-full flex-col gap-2.5">
          <div className="relative aspect-[653/869] w-full -rotate-2 overflow-hidden rounded-2xl border border-border shadow-sm transition-transform duration-300 ease-out hover:rotate-0">
            <Image
              src="/img/IMG_8100.jpg"
              alt="Nicolás Aguirre"
              fill
              sizes="200px"
              className="object-cover grayscale-[25%] sepia-[8%] contrast-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-b2b/10 mix-blend-multiply" />
          </div>
          <span className="font-mono text-[11px] tracking-wide text-ink-faint">
            San Petersburgo — invierno
          </span>
        </div>
        <div className="flex min-w-[280px] max-w-[640px] flex-1 flex-col gap-5">
          <h2 className="font-sans text-[clamp(22px,3.5vw,28px)] font-bold">Sobre mí</h2>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            Soy Nicolas Aguirre, desarrollador web freelance. Construyo herramientas internas y
            sistemas que reemplazan procesos manuales y propensos a errores por software que los
            equipos realmente usan.
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            Estoy en mi último año de{" "}
            <strong className="font-bold text-ink">
              Matemática y Ciencias de la Computación en la Universidad Estatal de San Petersburgo,
              Rusia
            </strong>{" "}
            — una base que define cómo abordo cada proyecto: tanta atención a la lógica y
            estructura de fondo como a lo que ve el usuario.
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            Más allá de las herramientas internas, también construyo plataformas para comunidades
            online, y estoy abierto a trabajo de desarrollo web en general.
          </p>
          <p className="text-[15px] leading-[1.7] text-ink-soft">
            <strong className="font-bold text-ink">Idiomas:</strong> español (nativo), inglés
            (fluido) y ruso (fluido).
          </p>
          <div className="flex flex-wrap items-center gap-5 text-ink-soft">
            {stackPrimary.map((tech) => {
              const Icon = techIcons[tech];
              return (
                <span key={tech} className="group relative cursor-pointer">
                  <Icon
                    className={`${tech === "cPanel" ? "h-6 w-auto" : "h-8 w-8"} transition-transform group-hover:scale-110`}
                  />
                  <HoverLabel label={tech} />
                </span>
              );
            })}
            <span className="h-8 w-px bg-border" aria-hidden="true" />
            {stackSecondary.map((tech) => {
              const Icon = techIcons[tech];
              return (
                <span key={tech} className="group relative cursor-pointer opacity-60">
                  <Icon className="h-8 w-8 transition-transform group-hover:scale-110" />
                  <HoverLabel label={tech} />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
