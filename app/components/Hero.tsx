import { Button } from "./ui";

export function Hero() {
  return (
    <header className="px-page flex flex-col gap-[18px] py-[clamp(56px,10vw,110px)]">
      <div className="font-mono text-xs uppercase tracking-[0.08em] text-b2b">
        Freelance frontend — B2B internal tools
      </div>
      <h1 className="max-w-[720px] font-heading text-[clamp(28px,5vw,34px)] font-bold leading-[1.3] tracking-[-0.01em]">
        Construyo herramientas internas que resuelven problemas reales de negocio.
      </h1>
      <p className="max-w-[520px] text-[15px] leading-relaxed text-ink-soft">
        Frontend freelance enfocado en paneles y flujos B2B. Menos demos, más sistemas
        que la gente usa todos los días.
      </p>
      <div className="mt-2 flex flex-wrap gap-3">
        <Button href="#proyectos" variant="primary">
          Ver proyectos
        </Button>
        <Button href="#contacto" variant="secondary">
          Contactar
        </Button>
      </div>
    </header>
  );
}
