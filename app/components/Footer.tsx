import { HoverLabel } from "./ui";
import { socialIcons } from "./BrandIcons";
import { socialLinks } from "../data/content";

export function Footer() {
  return (
    <footer className="px-page flex flex-wrap items-center justify-between gap-4 py-6">
      <span className="text-sm font-bold text-ink-soft">Nicolás Aguirre</span>
      <div className="flex items-center gap-4 text-ink-soft">
        {socialLinks.map((s) => {
          const Icon = socialIcons[s.label];
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="group relative hover:text-ink"
            >
              <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
              <HoverLabel label={s.label} />
            </a>
          );
        })}
      </div>
      <span className="font-mono text-[11px] text-ink-faint">© 2026</span>
    </footer>
  );
}
