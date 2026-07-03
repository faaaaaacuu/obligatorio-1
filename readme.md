# Music Archive

**Estudiante:** Facundo Pakciarz
**Nº de estudiante:** 348124

---

Aplicación web de catálogo musical de múltiples páginas, construida con HTML, CSS y JavaScript puro. Permite explorar álbumes, EPs y singles; seguir artistas en gira; y enviar nuevos proyectos al archivo.

---

## Páginas

| Archivo | Descripción |
|---|---|
| `index.html` | Inicio — playlist del día, artistas en gira, últimos proyectos, promesas |
| `catalogo.html` | Catálogo — grilla filtrable con todos los proyectos |
| `detalle.html` | Detalle — información completa de un proyecto |
| `form.html` | Collab — formulario para enviar un nuevo proyecto |

---

## Estructura de archivos

```
/
├── index.html
├── catalogo.html
├── detalle.html
├── form.html
├── estilos.css
├── datos.js              ← array de datos (40 proyectos)
├── ontour.js             ← función utilitaria de estado de gira
├── codigoIndex.js        ← lógica de index.html
├── codigoCatalogo.js     ← lógica de catalogo.html
├── codigoAmpliacion.js   ← lógica de detalle.html
├── Form.js               ← lógica de form.html
└── img/
    ├── covers/
    └── artists/
```

---

## Funcionalidades

### Inicio (`index.html`)
- **Playlist del día** — 12 canciones aleatorias de proyectos lanzados, se renueva cada 24 horas con `setInterval`.
- **En gira** — carrusel rotativo de artistas actualmente en gira, cambia cada 5 segundos.
- **Últimos proyectos** — los 3 proyectos más recientes, ordenados por `releaseDate`.
- **Promesas** — hasta 5 artistas con popularidad menor a 45.

### Catálogo (`catalogo.html`)
- Muestra todos los proyectos como tarjetas con enlace a su página de detalle.
- **Filtros** — por artista, país, tipo y búsqueda de texto libre, todos aplicados en simultáneo.
- **Checkbox "En gira"** — filtra solo los artistas actualmente de gira.
- **Parámetros URL** — `?onTour=true` activa el filtro de gira; `?onAlbum=true` preselecciona el tipo Álbum; `?artist=Nombre` preselecciona un artista específico.
- **Botón limpiar** — resetea todos los filtros a la vez.
- Contador de proyectos en tiempo real en el encabezado de resultados.

### Detalle (`detalle.html`)
- Se construye dinámicamente a partir del parámetro `?id=` en la URL.
- Muestra portada, título, género, artista, fecha de lanzamiento, popularidad, descripción y tracklist completa.
- **Botón de estado de gira** — badge con el estado actual (`On Tour`, `Up Coming`, `Finished` o sin gira).
- **Sección relacionados** — 3 proyectos del mismo tipo.

### Formulario Collab (`form.html`)
- Validación en tiempo real en cada evento `input` / `change`.
- **Reglas cruzadas entre campos:**
  - Single → exactamente 1 canción
  - EP → menos de 6 canciones
  - Álbum → 6 canciones o más
  - *Coming Soon* → la fecha debe ser futura
  - *Released* → la fecha debe ser pasada
- Imagen de portada limitada a 2 MB.
- Al enviar con éxito: muestra mensaje de confirmación, resetea el formulario y agrega una tarjeta resumen a la lista "Proyectos que agregaste".

---

## Datos (`datos.js`)

Cada objeto del array `proyectos` contiene:

```js
{
  id,           // coincide con el índice del array
  title,
  artist,
  country,      // array de strings
  type,         // "album" | "EP" | "Single"
  genre,
  status,       // "released" | "coming"
  releaseDate,  // "YYYY-MM-DD"
  coverImage,
  artistImage,
  tracks,       // array con los nombres de las canciones
  totalTracks,
  popularity,   // 0–100
  spotifyUrl,
  description,
  tourStart,    // "YYYY-MM-DD" o null
  tourEnd       // "YYYY-MM-DD" o null
}
```

---

## Lógica de gira (`ontour.js`)

La función `onTour(tourStart, tourEnd)` devuelve uno de estos cuatro valores según la fecha actual:

- `"On Tour"` — actualmente entre las fechas de inicio y fin
- `"Up Coming"` — la gira todavía no comenzó
- `"Finished"` — la gira ya terminó
- `"status-no-tour"` — alguna de las fechas es `null`

Es usada tanto en `codigoIndex.js` como en `codigoCatalogo.js`.

---


## Tecnologías

HTML5 · CSS3 · JavaScript 