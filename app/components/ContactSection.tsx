import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Section } from "./ui";
import { CountryCodeSelect } from "./CountryCodeSelect";
import { contactLinks } from "../data/content";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjebewe";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [formKey, setFormKey] = useState(0);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const countryCode = formData.get("countryCode");
    const phone = formData.get("phone");
    if (phone) {
      formData.set("phone", `${countryCode} ${phone}`.trim());
    }
    formData.delete("countryCode");

    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setFormKey((k) => k + 1);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contacto" className="flex flex-col gap-6 py-[clamp(56px,9vw,96px)]">
      <h2 className="max-w-[520px] font-sans text-[clamp(22px,3.5vw,28px)] font-bold">
        ¿Un problema real que resolver? Escríbeme.
      </h2>
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-[minmax(280px,1fr)_minmax(220px,280px)]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 sm:p-7"
        >
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Nombre
            </label>
            <input
              type="text"
              name="name"
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
              name="email"
              placeholder="tu@email.com"
              className="rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Teléfono
            </label>
            <div className="flex gap-2">
              <CountryCodeSelect key={formKey} name="countryCode" required />
              <input
                type="tel"
                name="phone"
                required
                placeholder="999 999 999"
                className="min-w-0 flex-1 rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
              Mensaje
            </label>
            <textarea
              placeholder="Cuéntame en qué estás trabajando"
              name="message"
              rows={4}
              className="resize-y rounded-lg border border-border bg-bg px-3 py-2.5 text-sm outline-none"
            />
          </div>
          <Button type="submit" variant="primary" className="w-max" disabled={status === "sending"}>
            {status === "sending" ? "Enviando…" : "Enviar mensaje"}
          </Button>
          {status === "success" && (
            <p className="text-[13px] text-ink-soft">¡Mensaje enviado! Te responderé pronto.</p>
          )}
          {status === "error" && (
            <p className="text-[13px] text-ink-soft">
              Hubo un error al enviar. Intenta de nuevo o escríbeme directo a hola@nicolasaguirre.dev.
            </p>
          )}
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
