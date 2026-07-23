import { Button, Section } from "./ui";
import { contactLinks } from "../data/content";

export function ContactSection() {
  return (
    <Section id="contacto" className="flex flex-col gap-6 py-[clamp(56px,9vw,96px)]">
      <h2 className="max-w-[520px] font-sans text-[clamp(22px,3.5vw,28px)] font-bold">
        ¿Un problema real que resolver? Escríbeme.
      </h2>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,1fr)_minmax(220px,280px)]">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:p-7"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Tu nombre"
              className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Mensaje
            </label>
            <textarea
              placeholder="Contame en qué estás trabajando"
              rows={4}
              className="resize-y rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </div>
          {/* ponytail: formulario solo visual, conectar a Resend/Formspree cuando haya backend de contacto */}
          <Button type="submit" variant="primary" className="w-max">
            Enviar mensaje
          </Button>
        </form>

        <div className="flex flex-col gap-3">
          {contactLinks.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="flex flex-col gap-1 rounded-xl border border-border bg-surface px-4 py-3.5 hover:border-ink"
            >
              <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                {c.label}
              </span>
              <span className="text-[13px]">{c.value}</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
