import Image from "next/image";
import { ImagePlaceholder, Metric, Section, Tag } from "./ui";
import { airecomprimido, cafeLuchita, mafiaAzulgrana, telegramBot } from "../data/content";

type TertiaryCaseStudy = typeof telegramBot | typeof cafeLuchita;

function LeadProjectCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex cursor-pointer flex-wrap gap-8 rounded-xl border border-border bg-surface p-5 text-left transition-transform hover:scale-[1.02] sm:p-8"
    >
      <div className="relative aspect-[1901/1078] min-w-[280px] flex-1 basis-[380px] self-center overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          src="/projects/airecomprimidoec.png"
          alt="Captura del sitio de Airecomprimido"
          fill
          sizes="(min-width: 640px) 380px, 100vw"
          className="object-contain"
        />
      </div>
      <div className="flex min-w-[280px] flex-1 basis-[380px] flex-col justify-center gap-4">
        <Tag tone={airecomprimido.tag}>{airecomprimido.tagLabel}</Tag>
        <h3 className="font-sans text-[clamp(20px,3vw,22px)] font-bold">
          {airecomprimido.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          {airecomprimido.cardDescription}
        </p>
        <div className="mt-2 flex flex-wrap gap-[clamp(20px,4vw,40px)]">
          {airecomprimido.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} color="b2b" />
          ))}
        </div>
      </div>
    </button>
  );
}

function SecondaryProjectCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex cursor-pointer flex-wrap gap-7 rounded-xl border border-border bg-surface p-[18px] text-left transition-transform hover:scale-[1.02] sm:p-7"
    >
      <div className="relative aspect-[1901/1078] min-w-[260px] flex-1 basis-[320px] self-center overflow-hidden rounded-xl border border-border bg-surface">
        <Image
          src="/projects/mafiaazulgrana.png"
          alt="Captura del sitio de Mafia Azul Grana"
          fill
          sizes="(min-width: 640px) 320px, 100vw"
          className="object-contain"
        />
      </div>
      <div className="flex min-w-[260px] flex-1 basis-[320px] flex-col justify-center gap-3.5">
        <Tag tone={mafiaAzulgrana.tag}>{mafiaAzulgrana.tagLabel}</Tag>
        <h3 className="font-sans text-[clamp(17px,2.4vw,19px)] font-bold">
          {mafiaAzulgrana.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">{mafiaAzulgrana.cardDescription}</p>
        <div className="mt-1 flex flex-wrap gap-[clamp(20px,4vw,40px)]">
          {mafiaAzulgrana.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} color="community" size="sm" />
          ))}
        </div>
      </div>
    </button>
  );
}

function TertiaryCaseStudyCard({
  project,
  image,
  onOpen,
}: {
  project: TertiaryCaseStudy;
  image?: { src: string; alt: string };
  onOpen: () => void;
}) {
  return (
    <button
      onClick={onOpen}
      className="flex cursor-pointer flex-col gap-2.5 rounded-xl border border-border bg-surface p-4 text-left transition-transform hover:scale-[1.02]"
    >
      {image ? (
        <div className="relative aspect-[1901/1078] w-full overflow-hidden rounded-xl border border-border bg-surface">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 260px, 100vw"
            className="object-contain"
          />
        </div>
      ) : (
        <ImagePlaceholder
          label={`Captura — ${project.title}`}
          className="aspect-[1901/1078] w-full"
        />
      )}
      <Tag tone={project.tag}>{project.tagLabel}</Tag>
      <h3 className="font-sans text-[15px] font-bold">{project.title}</h3>
      <p className="text-[13px] leading-relaxed text-ink-soft">{project.cardDescription}</p>
    </button>
  );
}

export function ProjectsSection({
  onOpenCaseStudy,
}: {
  onOpenCaseStudy: (id: "airecomprimido" | "mafia" | "telegram-bot" | "cafe-luchita") => void;
}) {
  return (
    <Section id="proyectos" className="flex flex-col gap-6 py-[clamp(40px,6vw,64px)] sm:gap-8">
      <h2 className="font-sans text-[clamp(22px,3.5vw,28px)] font-bold">Proyectos</h2>
      <LeadProjectCard onOpen={() => onOpenCaseStudy("airecomprimido")} />
      <SecondaryProjectCard onOpen={() => onOpenCaseStudy("mafia")} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        <TertiaryCaseStudyCard
          project={telegramBot}
          image={{ src: "/projects/telegram-bot.png", alt: "Captura del bot de Telegram" }}
          onOpen={() => onOpenCaseStudy("telegram-bot")}
        />
        <TertiaryCaseStudyCard
          project={cafeLuchita}
          image={{ src: "/projects/cafeluchita.png", alt: "Captura del sitio de Café Luchita" }}
          onOpen={() => onOpenCaseStudy("cafe-luchita")}
        />
      </div>
    </Section>
  );
}
