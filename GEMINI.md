# Colaboración con Gemini para el Proyecto Rentia

Este archivo establece los lineamientos para una colaboración efectiva con la IA de Gemini, con el fin de desarrollar y mejorar la aplicación Rentia.

## 1. Detalles del Proyecto

- **Nombre de la Aplicación:** Rentia
- **Propósito:** Plataforma integral para la gestión de inmobiliarias, que abarca desde la administración de propiedades y alquileres hasta la gestión de cobros, inventarios y marketing.
- **Estado del Proyecto:** Existente, en fase de crecimiento y desarrollo de nuevas funcionalidades.
- **Stack Tecnológico:**
    - **Backoffice:** `Next.js 15` (con `Shadcn UI`)
    - **Frontend (Web Pública):** `Next.js 14`
    - **Backend:** `NestJS` + `MongoDB` (con `Mongoose`)
    - **Otros:** `TypeScript`, `Tailwind CSS`
- **Arquitectura de Diseño:** El Backoffice tiene una estética minimalista con componentes de `Shadcn UI`, siguiendo el estilo del repositorio `next-shadcn-dashboard-starter`.
- **Enfoque Actual:** Desarrollo y mejora del Backoffice.

## 2. Roles y Responsabilidades

### Mi Rol (Gemini)
Actuaré como un ingeniero de software experto en el stack de Rentia. Mi objetivo es proporcionarte código de alta calidad, soluciones arquitectónicas, planes de refactorización y ayuda para depurar problemas, siempre enfocándome en la eficiencia, la escalabilidad y las mejores prácticas del sector.

### Tu Rol (Desarrollador)
Serás el arquitecto principal del proyecto. Tu responsabilidad es proporcionarme contexto claro y preciso para cada tarea. Esto incluye explicar la funcionalidad que se necesita, identificar la parte del proyecto en la que se debe trabajar (Backoffice, Frontend, Backend) y proveer el código relevante o el esquema de la base de datos si es necesario para la tarea.

## 3. Solicitud de Tareas (Modo de Interacción)

Para que las respuestas sean lo más útiles posible, sigue este formato al solicitar una tarea:

> **Ejemplo de Solicitud:**
>
> **Tarea:** Crear un nuevo componente para la visualización de inventario.
>
> **Ubicación:** Backoffice (`Next.js 15`)
>
> **Contexto:** Necesito un componente que muestre una tabla paginada de los inventarios de propiedades. Debe poder filtrar por estado (disponible, alquilado, vendido).
>
> **Requisitos:**
> - Utilizar el diseño y componentes de `Shadcn UI`, siguiendo el estilo del repositorio.
> - Consumir el endpoint `/api/inventarios` del backend.
> - El modelo de datos de un inventario es el siguiente:
>   ```json
>   {
>     "item": "string",
>     "quantity": "number",
>     "room": "string",
>     "condition": "string"
>   }
>   ```

## 4. Directrices de Colaboración

- **Claridad:** Sé lo más específico posible. Cuanto más claro seas, más útil seré.
- **Iteración:** El proceso de desarrollo es iterativo. Si mi respuesta no es exactamente lo que necesitas, dímelo y ajustaremos el enfoque.
- **Retroalimentación:** Si encuentras que mi código o sugerencias no se ajustan a las mejores prácticas o a tu arquitectura, házmelo saber para que pueda aprender y mejorar.

## 5. Documentación del Backend

Toda la información clave sobre el backend ha sido integrada y ahora forma parte de mi conocimiento base para este proyecto. Puedes referirte a ella en tus solicitudes:

### Autenticación y Roles

- **Endpoints:**
  - `POST /api/v1/auth/login`
  - `POST /api/v1/auth/forgot-password`
  - `POST /api/v1/auth/reset-password`
  - `POST /api/v1/auth/check-auth-status`
- El `check-auth-status` es el método recomendado para validar la sesión y obtener el usuario actual.
- La respuesta del `login` incluye `access_token` y el objeto `user` con un array de `roles`.

### Localidades y Provincias

- **Endpoints:**
  - `GET /api/v1/location/provinces`
  - `GET /api/v1/location/localities?provinceId={id}`
- **Búsqueda con autocompletado:**
  - `GET /api/v1/province/search?name=...`
  - `GET /api/v1/locality/search?name=...&provinceId=...`
- El endpoint `/locality/with-available-properties` permite filtrar localidades que tienen propiedades publicadas para alquiler o venta.

### Propiedades e Imágenes

- **Endpoints clave:**
  - `POST /api/v1/property` (crear)
  - `GET /api/v1/property/public` (listar públicas con filtros)
  - `GET /api/v1/property/:id` (obtener por ID)
- **Gestión de imágenes (`images`):** `POST` para subir, `DELETE` para eliminar, `PATCH` para reordenar o cambiar metadatos.
- **La API distingue estrictamente entre:**
    - **Fotos (`/images`):** imágenes de la propiedad.
    - **Planos (`/floor-plans`):** solo imágenes (`jpg`, `png`, `webp`) de planos.
    - **Documentos (`/documents`):** acepta `PDF`, `DOC`, `XLS`. Los planos en PDF deben subirse por aquí.
- Los campos `province` y `locality` se guardan como `_id` y pueden ser poblados en la respuesta.

### Tasaciones (Appraisal)

- **Endpoint:** `POST /api/v1/appraisal/{propertyId}/appraise`
- No requiere autenticación, pero valida que la propiedad tenga campos mínimos como `address`, `province`, `locality`, `lat`, `lng`, `type`, `sqFt`, `buildSqFt` y `age`.
- La respuesta incluye un `completenessScore` (0-100) y el valor estimado, junto con un intervalo de confianza.
- Utiliza Google Gemini para analizar la descripción y contribuye al puntaje.

### Personas (Party)

- **Endpoints:** `POST`, `GET`, `PUT`, `DELETE` sobre `/api/v1/party`.
- **Búsqueda para autocompletado:** `GET /api/v1/party/search/owners?q={término}`.
- El `Party` puede tener `roles` (ej. `owner`) y está relacionado con propiedades.

### Catálogo de Especificaciones (Specs)

- El campo `specs` en el modelo `Property` es un array de `strings` que deben corresponder a un catálogo fijo de características (ej: `aire_acondicionado`, `piscina`).