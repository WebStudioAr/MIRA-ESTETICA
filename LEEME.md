# MIRÁ Estética — tu landing page

Carpeta lista para subir a Hostinger (o Netlify, Vercel, etc.). No necesita instalar nada.

## 1. ⚠️ Poné tu número de WhatsApp (lo más importante)

Todos los botones de "Reservar" abren WhatsApp. Hoy apuntan a un número de
prueba. Cambialo **una sola vez**:

1. Abrí el archivo `lib/manifest.js`.
2. Buscá la línea (casi arriba de todo):
   `var WA = "5491100000000";`
3. Reemplazá ese número por el real, con código de país y sin signos.
   - Formato Argentina (celular): `54 9 11 1234 5678` → `"5491112345678"`
4. Guardá. Listo: todos los botones quedan actualizados.

El Instagram (`@estetica_mira_`) y la dirección ya están cargados en el mismo archivo.

## 2. Agregar fotos reales (opcional, recomendado)

Ahora las zonas de imagen muestran un fondo cálido con una etiqueta
(“Recepción”, “Cabina de masajes”, etc.). Para poner fotos de verdad:

1. Guardá tus fotos en `assets/img/` (mejor en formato `.webp` o `.jpg`).
2. En `index.html`, buscá los bloques con `class="photo-slot"`.
3. Agregá tu imagen así, por ejemplo:
   `<div class="photo-slot has-photo" style="background-image:url('assets/img/mi-foto.webp')">`
   (agregá `has-photo` y el `style` con tu imagen).

Si preferís, mandame las fotos y te las dejo colocadas.

## 3. Subir a internet

- **Hostinger:** entrá al Administrador de archivos → carpeta `public_html` →
  arrastrá *todo el contenido* de esta carpeta adentro (incluido el archivo
  `.htaccess`). Eso es todo.
- **Netlify / Vercel:** arrastrá la carpeta entera a su panel.

## 4. Archivos

- `index.html` — la página.
- `styles.css` — todo el diseño.
- `main.js` — animaciones e interacciones.
- `lib/manifest.js` — **tus datos** (WhatsApp, Instagram, dirección, precios).
- `assets/img/` — logo y favicon (y tus fotos).
- `.htaccess` — configuración del servidor (no lo borres).
- `tools/` — script interno; podés ignorarlo o borrarlo.
