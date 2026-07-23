import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  return (
    <footer className="px-page flex flex-wrap items-center justify-between gap-4 py-6">
      <span className="text-sm font-bold text-ink-soft">Nicolás Aguirre</span>
      <LanguageSwitcher size="text-[11px]" activeClassName="text-ink-soft" />
      <div className="flex gap-4 text-[13px] text-ink-soft">
        <a href="#" className="hover:text-ink">
          Upwork
        </a>
        <a href="#" className="hover:text-ink">
          Contra
        </a>
        <a href="#" className="hover:text-ink">
          LinkedIn
        </a>
      </div>
      <span className="font-mono text-[11px] text-ink-faint">© 2026</span>
    </footer>
  );
}
