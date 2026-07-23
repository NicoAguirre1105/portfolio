import { Chip, Section } from "./ui";
import { about } from "../data/content";

export function AboutSection() {
  return (
    <Section id="sobre-mi" className="flex flex-col gap-5 py-[clamp(40px,6vw,64px)]">
      <div className="flex max-w-[640px] flex-col gap-5">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-ink-faint">
          Sobre mí
        </span>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-[1.7] text-ink-soft">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-wrap gap-2">
          {about.stack.map((tech) => (
            <Chip key={tech}>{tech}</Chip>
          ))}
        </div>
      </div>
    </Section>
  );
}
