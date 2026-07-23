export function Nav() {
  return (
    <nav className="h-[var(--nav-h)] border-b border-border">
      <div className="px-page flex h-full flex-wrap items-center justify-between gap-4">
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
        </div>
      </div>
    </nav>
  );
}
