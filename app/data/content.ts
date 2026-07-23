export interface ProjectMetric {
  value: string;
  label: string;
}

export const airecomprimido = {
  tag: "b2b" as const,
  title: "Airecomprimido",
  cardDescription:
    "Reemplacé el proceso de reportes en PDF por un panel que genera cotizaciones en minutos. El cliente ahora cobra un premium por el tiempo de respuesta.",
  metrics: [
    { value: "0", label: "re-solicitudes" },
    { value: "+30%", label: "cotizaciones cerradas" },
    { value: "615", label: "visitas/semana" },
  ] as ProjectMetric[],
  overlay: {
    before:
      "El cliente cotizaba por PDF: cada solicitud implicaba ida y vuelta por correo, re-solicitudes por datos faltantes y varios días de espera antes de cerrar.",
    after:
      "Reemplacé el proceso por un panel web donde el cliente arma la cotización en minutos, con validación en el momento. Cero re-solicitudes desde que está en producción, y ahora cobra un premium por el tiempo de respuesta.",
    process:
      "Empecé mapeando el flujo real de cotización con el cliente, no el que asumía que existía. El panel se construyó en iteraciones cortas, probando cada versión con cotizaciones reales antes de seguir.",
    stack: ["React", "TypeScript", "Next.js", "PostgreSQL"],
    note: "El módulo de reportes históricos todavía está en desarrollo — por ahora el panel cubre cotización y seguimiento activo.",
  },
};

export const mafiaAzulgrana = {
  tag: "community" as const,
  title: "Mafia Azulgrana",
  description:
    "Comunidad de hinchas del Barça con calendario de partidos, chat y noticias. El panel admin todavía está en desarrollo.",
  metrics: [
    { value: "1.2k", label: "usuarios activos" },
    { value: "+40%", label: "asistencia a eventos" },
  ] as ProjectMetric[],
};

export const tertiaryProjects = [
  {
    id: "cafe-luchita",
    label: "Captura — Café Luchita",
    title: "Café Luchita",
    description: "Landing e identidad digital para una cafetería de especialidad.",
  },
  {
    id: "telegram-bot",
    label: "Captura — Telegram Bot",
    title: "Telegram Bot",
    description: "Bot para automatizar pedidos y notificaciones de un negocio pequeño.",
  },
];

export const about = {
  paragraphs: [
    "Vengo de matemática y ciencias de la computación — eso se nota en cómo pienso los sistemas antes de escribir una línea de CSS.",
    "Trabajo como freelance construyendo herramientas internas y paneles para negocios B2B: menos landing pages, más flujos que un equipo usa todos los días para cotizar, reportar o cerrar trabajo.",
    "Fuera de eso mantengo un par de proyectos propios — comunidad y bots — donde pruebo cosas sin el peso de un cliente encima.",
  ],
  stack: ["React", "TypeScript", "Next.js", "Tailwind", "PostgreSQL", "Figma"],
};

export const countryCodes = [
  { code: "+593", country: "Ecuador" },
  { code: "+57", country: "Colombia" },
  { code: "+51", country: "Perú" },
  { code: "+52", country: "México" },
  { code: "+54", country: "Argentina" },
  { code: "+56", country: "Chile" },
  { code: "+591", country: "Bolivia" },
  { code: "+58", country: "Venezuela" },
  { code: "+598", country: "Uruguay" },
  { code: "+595", country: "Paraguay" },
  { code: "+34", country: "España" },
  { code: "+1", country: "Estados Unidos / Canadá" },
  { code: "+55", country: "Brasil" },
  { code: "+44", country: "Reino Unido" },
  { code: "+49", country: "Alemania" },
  { code: "+33", country: "Francia" },
  { code: "+39", country: "Italia" },
  { code: "+351", country: "Portugal" },
];

export const contactLinks = [
  { label: "Email", value: "hola@nicolasaguirre.dev", href: "mailto:hola@nicolasaguirre.dev" },
  { label: "Upwork", value: "Ver perfil", href: "#" },
  { label: "Contra", value: "Ver perfil", href: "#" },
  { label: "LinkedIn", value: "Conectar", href: "#" },
  { label: "Telegram", value: "@nicolasaguirre", href: "#" },
];
