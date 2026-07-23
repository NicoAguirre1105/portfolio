import { Chip, Metric, Tag } from "./ui";
import { airecomprimido } from "../data/content";

export function ProjectOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 px-3 py-4 sm:px-6 sm:py-16 dark:bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-[760px] flex-col gap-7 rounded-xl border border-border bg-bg p-7 sm:p-14"
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg border border-border hover:border-ink"
        >
          <span className="absolute h-[1.5px] w-3.5 rotate-45 bg-ink" />
          <span className="absolute h-[1.5px] w-3.5 -rotate-45 bg-ink" />
        </button>

        <div className="flex flex-col gap-2.5">
          <Tag tone={airecomprimido.tag}>B2B</Tag>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
            Resultado de negocio
          </span>
          <h2 className="font-sans text-[clamp(22px,3.5vw,28px)] font-bold">
            {airecomprimido.title}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          <span className="text-[13px] font-medium">Antes</span>
          <p className="text-sm leading-[1.7] text-ink-soft">{airecomprimido.overlay.before}</p>
          <span className="text-[13px] font-medium">Después</span>
          <p className="text-sm leading-[1.7] text-ink-soft">{airecomprimido.overlay.after}</p>
        </div>

        <div className="flex flex-wrap gap-[clamp(20px,4vw,40px)] border-y border-border py-5">
          {airecomprimido.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} color="b2b" />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-medium">Proceso</span>
          <p className="text-sm leading-[1.7] text-ink-soft">{airecomprimido.overlay.process}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-[13px] font-medium">Stack</span>
          <div className="flex flex-wrap gap-2">
            {airecomprimido.overlay.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </div>

        <p className="border-l-2 border-border pl-3 text-[13px] leading-relaxed text-ink-faint">
          {airecomprimido.overlay.note}
        </p>
      </div>
    </div>
  );
}
