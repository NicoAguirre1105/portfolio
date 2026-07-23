# Verificación

Cómo chequear cambios en este repo sin gastar de más. Leer antes de verificar cualquier cambio no trivial.

## Orden

1. `npx tsc --noEmit` después de cualquier cambio no trivial. Es barato — hacerlo antes de tocar el navegador.
2. Abrir el preview del navegador **solo** si el cambio es observable ahí (UI, estilos, interacción real). Cambios de tipos, lógica de servidor o config/scripts: alcanza con `tsc`.
3. **Nunca tomar una captura de pantalla** (ninguna acción `screenshot`/`zoom` de `computer`) para verificar un cambio — es el paso más caro y el usuario revisa el resultado visual él mismo. Verificar con herramientas de texto: `get_page_text`/`read_page` para estructura y contenido, `read_console_messages` (solo errores) y `read_network_requests` para fallos, `javascript_tool` para lo demás (ej. leer el `className` de un elemento puntual o un valor de estilo computado).
4. Dentro de `javascript_tool`, al chequear que una ruta/endpoint no se rompió, pedir solo `status` (`fetch(url).then(r => r.status)`) — nunca el body completo. La única excepción es leer los mockups de diseño bajo `design/Portafolio/` (ej. el `.dc.html`), donde el markup completo es la fuente real de lo que hay que implementar.
5. Preferir `Grep` con el patrón puntual o `Read` con `offset`/`limit` en vez de leer un archivo grande entero cuando alcanza con la parte relevante.

## Estilo por defecto

Este repo usa `ponytail:` por defecto — la solución más simple que funciona, reusando helpers/patrones existentes (`ui.tsx`, `app/data/content.ts`) antes de escribir nuevos, marcando simplificaciones deliberadas con un comentario `ponytail:`.

## Servidor de dev vs. build

`.claude/launch.json` configura el preview server `portfolio-dev` (`npm run dev` en el puerto 3000) para la tool de navegador de Claude Code.

**Nunca correr `npm run build` mientras haya una instancia de `npm run dev` (Turbopack) corriendo contra este repo** — ambos escriben en `.next/` y corrompen el filesystem cache de Turbopack (aparece como un 500 con "Could not find the module ... in the React Client Manifest", o el dev server directamente se niega a arrancar). Si pasa: parar el dev server y volver a correr `npm run dev`; Turbopack detecta la corrupción y borra/reconstruye su propio caché solo.
