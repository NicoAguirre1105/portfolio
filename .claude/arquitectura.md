# Arquitectura

Detalle de cómo está armado el código. Leer solo cuando la tarea toque estructura de componentes, theming/CSS, o el formulario de contacto — no hace falta cargar esto para cambios de copy o de una sola clase.

## Composición y convenciones

- `app/page.tsx` es un `"use client"` delgado: solo tiene el estado de página (`overlayOpen`, el modal de caso de estudio) y renderiza una sección por componente en orden. Sin router, sin state manager global.
- Las secciones viven en `app/components/` (un archivo por sección: `Nav`, `Hero`, `ProjectsSection`, `AboutSection`, `ContactSection`, `Footer`, `ProjectOverlay`). Piezas chicas reutilizadas en más de una sección (`Tag`, `Chip`, `Metric`, `ImagePlaceholder`, `Section`, `Button`, `HoverLabel`) viven juntas en `app/components/ui.tsx` en vez de un archivo por cada una.
- El copy y contenido estructurado (proyectos, métricas, links de contacto, texto de sobre mí, códigos de país) vive en `app/data/content.ts`, no inline en el JSX.
- **Convención**: UI nueva va en `app/components/`, copy/datos nuevos en `app/data/`, y `page.tsx` no debe crecer más allá de ser el punto de composición. Reusar algo de `ui.tsx` antes de escribir un `<span>`/`<div>` suelto con clases repetidas.
- El overlay pushea/poppea un hash de URL (`#/proyectos/airecomprimido`) vía `window.history.pushState` al abrir/cerrar, y cierra con `Escape`, click en el backdrop, o su botón de cerrar — ver `openOverlay`/`closeOverlay` en `app/page.tsx`.
- Los slots de imagen de proyectos (`ImagePlaceholder`) son placeholders estilizados, todavía no hay screenshots reales de ningún proyecto.

## Layout: max-width y altura del hero

- [app/globals.css](../app/globals.css) define el utility `px-page` con `@utility`: agrega `max-width: 1280px`, `margin-inline: auto` y el padding horizontal fluido (`clamp(20px,5vw,80px)`). Nav, Hero y cada `Section` separan el elemento con borde/fondo full-bleed (todo el ancho del viewport) del contenido centrado: el borde vive en el elemento exterior, `px-page` en un `<div>` interior. No pegar `px-page` en el mismo elemento que necesita el borde de punta a punta — lo va a encoger.
- El nav tiene una altura fija vía la variable CSS `--nav-h` (70px, definida en `:root` en `globals.css`). El hero usa `min-h-[calc(100vh-var(--nav-h))]` en vez de `min-h-screen` para que nav + hero sumen exactamente un viewport y el divisor entre hero y proyectos quede pegado al borde inferior visible sin necesitar scroll. Si cambia la altura real del nav (padding, tamaño de fuente), hay que actualizar `--nav-h` a mano para que ambos sigan coincidiendo.

## Theming (dark mode — desactivado por ahora)

El modo oscuro se sacó de la UI para el primer entregable (ver `.claude/progreso.md`), pero la infraestructura de CSS sigue en el repo, dormida:

- [app/globals.css](../app/globals.css) define cada token de diseño (`--color-bg`, `--color-ink`, `--color-b2b`, etc.) dos veces: una en `:root` (claro) y otra bajo `.dark` (oscuro), expuestas vía `@theme inline` para que Tailwind genere las utilities (`bg-bg`, `text-ink`, ...).
- Actualmente nada le agrega la clase `.dark` a `<html>` — el toggle y el `useEffect` que la togglaba se sacaron de `app/page.tsx`/`Nav.tsx`. El bloque `.dark { ... }` queda inerte (no rompe nada, simplemente nunca matchea) hasta que se reintroduzca el toggle.
- `--color-on-primary` es un token fijo (no cambia entre claro/oscuro a propósito) para que el texto de los botones primary siempre sea claro — sigue siendo válido aunque el modo oscuro esté desactivado.
- Al reactivar dark mode: agregar de nuevo el estado `dark` + el `useEffect` que hace `document.documentElement.classList.toggle("dark", dark)` en `page.tsx`, y el botón de toggle en `Nav.tsx` (buscar en el historial de git cómo estaba armado antes de sacarlo).

## Tailwind + nombres de clase dinámicos

Tailwind v4 solo detecta nombres de clase que aparecen como strings literales en el código fuente — no puede ver clases armadas con template literals como `` `text-${color}` ``. Donde una clase deba elegirse dinámicamente (ver los lookup objects `tagTones`/`metricColors` en `app/components/ui.tsx`), mapear la variante a un string de clase **completo y literal** en un objeto/switch primero, y recién ahí interpolar el resultado del lookup. No reintroducir interpolación directa `` `text-${var}` ``.

## Formulario de contacto

`ContactSection` (`app/components/ContactSection.tsx`) es un formulario real, no un mockup:

- El submit lee el formulario vía `new FormData(e.currentTarget)` (inputs no controlados — todo campo necesita `name`) y hace `POST` a Formspree con `Accept: application/json`. El estado (`idle`/`sending`/`success`/`error`) maneja el label/disabled del botón y un mensaje inline; no hay librería de toasts.
- El campo de teléfono está partido en `CountryCodeSelect` (un `Combobox` de Headless UI) más un `<input type="tel" name="phone">` plano. Al enviar, `countryCode` + `phone` se combinan en un solo valor `phone` antes del POST para que la notificación de Formspree muestre un campo legible en vez de dos.
- `CountryCodeSelect` (`app/components/CountryCodeSelect.tsx`) tiene su propio estado `selected`/`query` — **no** es un `<select>` nativo, así que `form.reset()` no lo toca. `ContactSection` lo resuelve con un contador `formKey` pasado como `key` del componente, incrementado al enviar con éxito para remontarlo de vuelta a su país por defecto. Cualquier otro control no nativo que se agregue después necesita el mismo tratamiento si se espera que el form se limpie completo tras enviar.
- La lista completa de países (~195, mantenida a mano, nombres en español) vive en `countryCodes` en `app/data/content.ts` — decisión deliberada en vez de sumar un paquete de países, ya que el repo evita dependencias nuevas cuando una lista estática alcanza.
- El email real (`nicofrancis2002@gmail.com`) no viaja en el HTML servido — la card de Email solo lo arma en el cliente después de un click en "Mostrar email" (`EmailCard` en `ContactSection.tsx`), para que scrapers simples no lo puedan cosechar del HTML estático.
- Los logos de Upwork/Contra/LinkedIn son SVG reales del usuario en `public/logos/`, referenciados desde `app/components/BrandIcons.tsx` (`socialIcons`, compartido entre `ContactSection` y `Footer`).

## Fuente del diseño (`design/`)

`design/Portafolio/` (raíz del repo, **no** bajo `public/`) contiene el export original de claude.ai/design (`Portafolio Nicolas Aguirre.dc.html`, `support.js`, `image-slot.js`, `uploads/`). Es un formato propietario "DC" (placeholders `{{}}` + un bloque de script `DCLogic`), no es HTML/React ejecutable — existe solo como referencia visual y no se importa, buildea, ni sirve. Está excluido del lint vía `design/**` en `eslint.config.mjs`. No moverlo de vuelta a `public/` — eso lo expondría públicamente y reintroduciría fallos de lint.
