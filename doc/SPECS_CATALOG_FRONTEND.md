# Catálogo de Especificaciones de Inmuebles (Specs) - Manual para Frontend

Este documento describe el catálogo oficial de especificaciones/características ("specs") de inmuebles, su uso en el frontend y su relación directa con el campo `specs` del modelo `Property`.

---

## 📦 ¿Qué es el catálogo de specs?

El catálogo de specs es una lista fija y centralizada de características que puede tener un inmueble (ejemplo: aire acondicionado, cochera, piscina, etc). Cada spec tiene:

- **key**: identificador único (string, se guarda en el backend y en el campo `specs` de la propiedad)
- **label**: nombre legible para mostrar en la UI
- **emoji**: ícono visual para mejorar la experiencia de usuario
- **description**: descripción opcional

---

## 🗂️ Listado literal de specs disponibles

| Emoji | Label              | Key                | Descripción             |
| ----- | ------------------ | ------------------ | ----------------------- |
| ❄️    | Aire Acondicionado | aire_acondicionado |                         |
| 🔥    | Calefacción        | calefaccion        |                         |
| 🚪    | Portero            | portero            |                         |
| 🛗    | Ascensor           | ascensor           |                         |
| 🚗    | Cochera            | cochera            |                         |
| 🏊    | Piscina            | piscina            |                         |
| 🌿    | Jardín             | jardin             |                         |
| 🔥    | Parrilla           | parrilla           |                         |
| 🏢    | Balcón             | balcon             |                         |
| 🌅    | Terraza            | terraza            |                         |
| 🧺    | Lavadero           | lavadero           |                         |
| 📦    | Baulera            | baulera            |                         |
| 🎉    | SUM                | sum                | Salón de Usos Múltiples |
| 💪    | Gimnasio           | gimnasio           |                         |
| 🛡️    | Seguridad 24h      | seguridad_24h      |                         |

---

## 🔗 Relación con el modelo Property

El campo `specs` en la entidad `Property` es un array de strings. Cada string debe ser un `key` válido del catálogo. Ejemplo:

```json
{
  "specs": ["aire_acondicionado", "cochera", "piscina"]
}
```

---

## 🌍 Endpoint: Localidades con propiedades disponibles

### Ruta

`GET /locality/with-available-properties`

#### Parámetro opcional: `type`

- Permite filtrar las localidades según el tipo de publicación disponible:
  - `all` (por defecto): localidades con propiedades en venta **o** alquiler.
  - `sale`: solo localidades con propiedades publicadas para **venta**.
  - `rent`: solo localidades con propiedades publicadas para **alquiler**.

**Ejemplos de uso:**
- Todas las localidades con propiedades publicadas (venta o alquiler):
  ```http
  GET /locality/with-available-properties
  ```
- Solo localidades con propiedades en venta:
  ```http
  GET /locality/with-available-properties?type=sale
  ```
- Solo localidades con propiedades en alquiler:
  ```http
  GET /locality/with-available-properties?type=rent
  ```

### Descripción

Devuelve el listado de localidades (ciudades) donde existen propiedades publicadas (en venta o alquiler). Cada elemento incluye el ID de la localidad, el nombre de la ciudad y el nombre de la provincia.

### Ejemplo de respuesta

```json
[
  {
    "_id": "66a25b0d1f1570568e03e9c4",
    "nombre": "La Floresta",
    "provincia": "Córdoba"
  },
  {
    "_id": "66a25b0d1f1570568e03e1e8",
    "nombre": "Villa Allende",
    "provincia": "Córdoba"
  }
]
```

### Uso recomendado en el frontend
- Utiliza este endpoint para poblar selectores de ciudades o filtros de búsqueda.
- El campo `_id` es el identificador único de la localidad (útil para búsquedas o filtros).
- El campo `provincia` es el nombre legible de la provincia, ideal para mostrar en la UI junto al nombre de la ciudad.
- Si necesitas mostrar el nombre de la ciudad junto a la provincia: `La Floresta, Córdoba`.

---

## 🎛️ Uso recomendado en el frontend

- **Selección múltiple**: Permite al usuario elegir varias características para una propiedad.
- **Mostrar con emoji y label**: Utiliza el emoji y label para una UI más amigable.
- **Validación**: Solo se deben enviar keys válidas del catálogo.
- **Internacionalización**: El label puede ser traducido si la app es multilenguaje, pero el key nunca cambia.

### Ejemplo de renderizado en React

```jsx
import { PROPERTY_SPECS_CATALOG } from '.../specs.constants';

function SpecsSelector({ value, onChange }) {
  return (
    <div>
      {PROPERTY_SPECS_CATALOG.map((spec) => (
        <label key={spec.key}>
          <input
            type="checkbox"
            checked={value.includes(spec.key)}
            onChange={(e) => {
              if (e.target.checked) onChange([...value, spec.key]);
              else onChange(value.filter((k) => k !== spec.key));
            }}
          />
          <span>
            {spec.emoji} {spec.label}
          </span>
        </label>
      ))}
    </div>
  );
}
```

---

## 🚦 Buenas prácticas

- Sincroniza el catálogo con el backend: nunca inventes keys nuevas en el frontend.
- Si el backend agrega o cambia specs, actualiza el catálogo en el frontend.
- Usa el endpoint `/api/v1/catalogs/specs` para obtener el catálogo dinámicamente si lo deseas.
- El campo `specs` puede estar vacío, pero nunca debe contener valores fuera del catálogo.

---

¿Dudas o necesitas ejemplos para otro framework? Solicítalo aquí.
