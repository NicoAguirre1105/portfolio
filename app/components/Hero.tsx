import Image from "next/image";
import { Button } from "./ui";

export function Hero() {
  return (
    <header className="flex min-h-[calc(100vh-var(--nav-h))] flex-col justify-center border-b border-border">
      <div className="px-page flex flex-col items-center gap-[clamp(32px,6vw,56px)] py-[clamp(56px,10vw,110px)] md:flex-row md:justify-between">
        <div className="flex flex-col gap-[18px]">
          <div className="font-mono text-xs uppercase tracking-[0.08em] text-b2b">
            Freelance web developer — B2B internal tools
          </div>
          <h1 className="max-w-[720px] font-heading text-[clamp(28px,5vw,34px)] font-bold leading-[1.3] tracking-[-0.01em]">
          Herramientas internas pensadas para las personas que las usan cada día.
          </h1>
          <p className="max-w-[520px] text-lg leading-relaxed text-ink-soft">
          Full-stack freelance especializado en paneles y flujos B2B, pensados para el ritmo real de trabajo de un equipo.
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Button href="#proyectos" variant="primary">
              Ver proyectos
            </Button>
            <Button href="#contacto" variant="secondary">
              Contactar
            </Button>
          </div>
        </div>

        <div className="relative flex h-[260px] w-[240px] shrink-0 items-center justify-center sm:h-[300px] sm:w-[270px] md:h-[clamp(320px,32vw,420px)] md:w-[clamp(280px,28vw,360px)]">
          <div className="absolute aspect-square w-[85%] rounded-full bg-b2b" />
          <div className="relative h-full w-full">
            <Image
              src="/img/hero_color.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="(min-width: 768px) 360px, 270px"
              className="scale-110 object-cover object-[center_18%] blur-xl"
            />
            <Image
              src="/img/hero_color.png"
              alt="Nicolás Aguirre"
              fill
              sizes="(min-width: 768px) 360px, 270px"
              priority
              className="object-cover object-[center_18%] [mask-image:radial-gradient(ellipse_62%_64%_at_center_46%,black_35%,rgba(0,0,0,0.5)_72%,transparent_100%)]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
