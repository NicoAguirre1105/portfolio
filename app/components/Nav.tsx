import { LanguageSwitcher } from "./LanguageSwitcher";

export function Nav({ onToggleDark }: { onToggleDark: () => void }) {
  return (
    <nav className="px-page flex flex-wrap items-center justify-between gap-4 border-b border-border py-5">
      <div className="font-sans text-base font-bold">Nicolás Aguirre</div>
      <div className="flex flex-wrap items-center gap-4 sm:gap-8">
        <a href="#proyectos" className="text-[13px] text-ink-soft hover:text-ink">
          Proyectos
        </a>
        <a href="#sobre-mi" className="text-[13px] text-ink-soft hover:text-ink">
          Sobre mí
        </a>
        <a href="#contacto" className="text-[13px] text-ink-soft hover:text-ink">
          Contacto
        </a>
        <LanguageSwitcher />
        <button
          onClick={onToggleDark}
          aria-label="Cambiar tema"
          className="flex h-7 w-7 items-center justify-center rounded-lg border border-border hover:border-ink"
        >
          <span className="h-3 w-3 rounded-full bg-ink" />
        </button>
      </div>
    </nav>
  );
}
