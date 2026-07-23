# Progreso

Estado del proyecto y qué falta. Actualizar esta lista a medida que se cierren o se agreguen ítems — es la fuente de verdad de "qué sigue" entre sesiones.

## Entregable 1 (deploy inicial) — pendiente

- [ ] Overlay / modal de caso de estudio: revisar y terminar de ajustar (contenido, comportamiento).
- [ ] Modificar la sección de hero (copy/estructura — a definir con el usuario).
- [ ] Información correcta de los proyectos (reemplazar los datos placeholder de `app/data/content.ts`).
- [ ] Agregar imágenes reales de los proyectos (hoy son `ImagePlaceholder`, sin asset real).
- [ ] Información correcta de "Sobre mí" (texto placeholder actual a revisar/reemplazar).
- [ ] Organizar las páginas aparte de Proyectos (sobre mí, contacto, etc.) — confirmar alcance exacto con el usuario cuando se llegue a este ítem.
- [ ] Animaciones básicas (transiciones/entradas — a definir alcance).

## Diferido a futuro (no entra en el entregable 1)

- [ ] Dark mode: la infraestructura de CSS sigue en `globals.css` (bloque `.dark`, dormido), pero el toggle y el estado se sacaron de `Nav`/`page.tsx`. Ver `.claude/arquitectura.md` → "Theming" para cómo reactivarlo.
- [ ] Idiomas (EN/RU además de ES): el `LanguageSwitcher` que había era solo decorativo (nunca cambiaba el copy) y se eliminó del todo. Implementar de verdad más adelante (ej. `next-intl`) en vez de reponer el placeholder.
- [ ] Videos de proyectos.

## Ya hecho

- Estructura base del sitio (Nav, Hero, Proyectos, Sobre mí, Contacto, Footer) en Next.js 16 + Tailwind v4, componentizada bajo `app/components/` con contenido en `app/data/content.ts`.
- Overlay de caso de estudio (Airecomprimido) con deep-link por hash.
- Formulario de contacto real: POST a Formspree, teléfono con selector de país buscable (Headless UI Combobox, ~195 países), validación nativa (teléfono obligatorio), email protegido de scraping (se revela solo al hacer click).
- Cards de contacto: Upwork/Contra/LinkedIn con logos SVG reales (`public/logos/`) + tooltip flotante en hover + escala leve en el footer; links reales a los tres perfiles.
- Layout: contenido con max-width (1280px) centrado, bordes/fondos de sección full-bleed; hero a la altura del viewport (descontando el nav) con divisor exacto hacia Proyectos.
- `CLAUDE.md` dividido por tema (`.claude/arquitectura.md`, `.claude/verificacion.md`, este archivo) para no cargar todo de entrada en cada sesión.
