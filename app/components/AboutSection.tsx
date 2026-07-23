import { Chip, Section } from "./ui";
import { about } from "../data/content";

export function AboutSection() {
  return (
    <Section id="sobre-mi" className="flex flex-col gap-5 py-[clamp(40px,6vw,64px)]">
      <div className="flex max-w-[640px] flex-col gap-5">
        <h2 className="font-sans text-[clamp(22px,3.5vw,28px)] font-bold">Sobre mí</h2>
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
