import { ImagePlaceholder, Metric, Section, Tag } from "./ui";
import { airecomprimido, mafiaAzulgrana, tertiaryProjects } from "../data/content";

function LeadProjectCard({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="flex flex-wrap gap-8 rounded-xl border border-border bg-surface p-5 text-left sm:p-8"
    >
      <div className="min-w-[280px] flex-1 basis-[380px]">
        <ImagePlaceholder
          label="Captura del panel — Airecomprimido"
          className="h-full min-h-[280px] w-full"
        />
      </div>
      <div className="flex min-w-[280px] flex-1 basis-[380px] flex-col justify-center gap-4">
        <Tag tone={airecomprimido.tag}>B2B</Tag>
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

function SecondaryProjectCard() {
  return (
    <div className="flex flex-wrap gap-7 rounded-xl border border-border bg-surface p-[18px] sm:p-7">
      <div className="min-w-[260px] flex-1 basis-[320px]">
        <ImagePlaceholder
          label="Captura del sitio — Mafia Azulgrana"
          className="h-full min-h-[220px] w-full"
        />
      </div>
      <div className="flex min-w-[260px] flex-1 basis-[320px] flex-col justify-center gap-3.5">
        <Tag tone={mafiaAzulgrana.tag}>COMMUNITY</Tag>
        <h3 className="font-sans text-[clamp(17px,2.4vw,19px)] font-bold">
          {mafiaAzulgrana.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-soft">
          {mafiaAzulgrana.description}
        </p>
        <div className="mt-1 flex flex-wrap gap-[clamp(20px,4vw,40px)]">
          {mafiaAzulgrana.metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} color="community" size="sm" />
          ))}
        </div>
      </div>
    </div>
  );
}

function TertiaryProjectCard({ project }: { project: (typeof tertiaryProjects)[number] }) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border bg-surface p-4">
      <ImagePlaceholder label={project.label} className="h-[180px] w-full" />
      <Tag tone="otros">OTROS</Tag>
      <h3 className="font-sans text-[15px] font-bold">{project.title}</h3>
      <p className="text-[13px] leading-relaxed text-ink-soft">{project.description}</p>
    </div>
  );
}

export function ProjectsSection({ onOpenCaseStudy }: { onOpenCaseStudy: () => void }) {
  return (
    <Section id="proyectos" className="flex flex-col gap-6 py-[clamp(40px,6vw,64px)] sm:gap-8">
      <h2 className="font-sans text-[clamp(22px,3.5vw,28px)] font-bold">Proyectos</h2>
      <LeadProjectCard onOpen={onOpenCaseStudy} />
      <SecondaryProjectCard />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
        {tertiaryProjects.map((project) => (
          <TertiaryProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}
