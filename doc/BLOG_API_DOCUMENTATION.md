# API de Blog - Guía para Consulta desde la Web

Esta documentación describe cómo la web puede consultar los posts del blog de manera paginada, obtener el detalle de un post por ID y consultar estadísticas agrupadas por categoría.

---

## 1. Listar Posts Públicos (Paginado y Búsqueda)

**Endpoint:**

```
GET /api/v1/blog/public?page=0&pageSize=10&sort=-date&search={"criteria":[{"field":"category","term":"Mercado Inmobiliario","operation":"eq"}]}
```

**Parámetros de consulta:**

- `page` (opcional): Número de página, empieza en 0 (por defecto: 0)
- `pageSize` (opcional): Cantidad de posts por página (por defecto: 10)
- `sort` (opcional): Campo para ordenar, ejemplo: `date` o `-date` para descendente.
- `search` (opcional, avanzado): **Debe ser un string JSON codificado** con criterios de búsqueda.

> ⚠️ **Importante:** El parámetro `search` debe enviarse como un string JSON (no como array ni como objeto plano).  
> Ejemplo en JavaScript:
>
> ```js
> const search = JSON.stringify({
>   criteria: [
>     { field: 'category', term: 'Mercado Inmobiliario', operation: 'eq' },
>   ],
> });
> const url = `/api/v1/blog/public?page=0&pageSize=10&search=${encodeURIComponent(search)}`;
> ```

**Ejemplo de búsqueda avanzada (enviar como query string codificado):**

```
GET /api/v1/blog/public?page=0&pageSize=10&search={"criteria":[{"field":"category","term":"Mercado Inmobiliario","operation":"eq"}]}
```

**Criterios soportados:**

- `field`: campo a buscar (ej: `category`, `title`, `author`, etc.)
- `term`: valor a buscar
- `operation`: operación (`eq`, `contains`, `gt`, `lt`, etc.)

**Respuesta de ejemplo:**

```json
{
  "items": [
    {
      "_id": "123",
      "date": "08 JUL 2025",
      "title": "Título del post",
      "description": "Resumen o descripción...",
      "image_url": "https://placehold.co/800x450/007bff/ffffff?text=Ejemplo",
      "second_image_url": "https://placehold.co/800x450/ffb300/ffffff?text=Ejemplo+2",
      "quote": "Frase destacada",
      "author": "El equipo de Propietas Inmobiliaria",
      "category": "Mercado Inmobiliario",
      "keywords": ["mercado", "inmobiliario", "tendencias"],
      "createdAt": "2025-07-08T18:00:00.000Z"
    }
    // ...
  ],
  "meta": {
    "totalItems": 25,
    "itemCount": 10,
    "pageSize": 10,
    "totalPages": 3,
    "currentPage": 0
  }
}
```

---

## 2. Obtener Post Público por ID

**Endpoint:**

```
GET /api/v1/blog/:id
```

**Respuesta de ejemplo:**

```json
{
  "_id": "123",
  "date": "08 JUL 2025",
  "title": "Título del post",
  "description": "Descripción completa...",
  "image_url": "https://placehold.co/800x450/007bff/ffffff?text=Ejemplo",
  "second_image_url": "https://placehold.co/800x450/ffb300/ffffff?text=Ejemplo+2",
  "quote": "Frase destacada",
  "author": "El equipo de Propietas Inmobiliaria",
  "category": "Mercado Inmobiliario",
  "keywords": ["mercado", "inmobiliario", "tendencias"],
  "createdAt": "2025-07-08T18:00:00.000Z"
}
```

---

## 3. Estadísticas por Categoría

**Endpoint:**

```
GET /api/v1/blog/stats/categories
```

**Descripción:**  
Devuelve un array con la cantidad de posts agrupados por cada categoría.

**Respuesta de ejemplo:**

```json
[
  { "category": "Mercado Inmobiliario", "count": 12 },
  { "category": "Construcción", "count": 5 }
]
```

---

## 4. Últimos Posts Públicos

**Endpoint:**

```
GET /api/v1/blog/public/recent
```

**Descripción:**  
Devuelve un array con los 3 posts más recientes del blog.

**Respuesta de ejemplo:**

```json
[
  {
    "_id": "abc1",
    "date": "09 JUL 2025",
    "title": "Post más reciente",
    "description": "Descripción...",
    "image_url": "https://placehold.co/800x450/007bff/ffffff?text=Reciente",
    "second_image_url": "https://placehold.co/800x450/ffb300/ffffff?text=Reciente+2",
    "quote": "Frase destacada",
    "author": "El equipo de Propietas Inmobiliaria",
    "category": "Mercado Inmobiliario",
    "keywords": ["mercado", "inmobiliario", "actualidad"],
    "createdAt": "2025-07-09T18:00:00.000Z"
  }
  // ...hasta 3 posts
]
```

---

## Notas

- Los endpoints públicos no requieren autenticación.
- Usa `/api/v1/blog/public` para listados paginados.
- Usa `/api/v1/blog/:id` para obtener el detalle de un post.
- Usa `/api/v1/blog/stats/categories` para obtener estadísticas agrupadas por categoría.
- Usa `/api/v1/blog/public/recent` para obtener los 3 posts más recientes.
- Los parámetros de paginación son: `page` (desde 0) y `pageSize`.
- El formato de fecha es `"DD MMM YYYY"` para el campo `date`.
- El campo `category` acepta uno de los siguientes valores:
  - "Créditos Hipotecarios"
  - "Mercado de Alquileres"
  - "Construcción"
  - "Mercado Inmobiliario"
  - "Inversión Inmobiliaria"
  - "Financiamiento"
  - "Políticas Gubernamentales"
  - "Tendencias del Mercado"
  - "Vivienda"
- El campo `keywords` es un array de palabras clave relevantes para el post.

---
