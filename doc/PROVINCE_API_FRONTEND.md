# Documentación API Provincias (province)

Colección: province

---

## Endpoints disponibles

- POST /api/v1/province
  Crear una nueva provincia.
- GET /api/v1/province
  Listar todas las provincias (requiere autenticación).
- GET /api/v1/province/search?name=texto
  Buscar provincias por nombre para autocompletado.
- GET /api/v1/province/:id
  Obtener provincia por ID (MongoID).
- PATCH /api/v1/province/:id
  Modificar provincia por ID.
- DELETE /api/v1/province/:id
  Eliminar provincia por ID.

---

## Ejemplo de autocompletado desde el frontend

URL:
GET http://localhost:3050/api/v1/province/search?name=buen

Respuesta:
[
{
"_id": "665f1e2b8e4b2a001e7e7e71",
"name": "Buenos Aires"
},
// ...más coincidencias...
]

---

## Ejemplo de alta

URL:
POST http://localhost:3050/api/v1/province

Body:
{
"name": "Buenos Aires"
}

Respuesta:
{
"\_id": "665f1e2b8e4b2a001e7e7e71",
"name": "Buenos Aires",
"createdAt": "2025-08-04T12:00:00.000Z",
"updatedAt": "2025-08-04T12:00:00.000Z"
}

---

## Ejemplo de consulta por ID

URL:
GET http://localhost:3050/api/v1/province/665f1e2b8e4b2a001e7e7e71

Respuesta:
{
"\_id": "665f1e2b8e4b2a001e7e7e71",
"name": "Buenos Aires",
"createdAt": "2025-08-04T12:00:00.000Z",
"updatedAt": "2025-08-04T12:00:00.000Z"
}

---

## DTO para alta/modificación

    name: string // Nombre de la provincia (requerido)

---

## Entity

    _id: string
    name: string
    createdAt: string
    updatedAt: string

---

## Errores comunes

- Si el campo name está vacío, la API devuelve error 400.
- Si el nombre ya existe, la API devuelve error 409.
- Los IDs deben ser válidos de MongoDB.

Ejemplo de error por campo faltante:
{
"statusCode": 400,
"message": ["name should not be empty"],
"error": "Bad Request"
}

Ejemplo de error por nombre duplicado:
{
"statusCode": 409,
"message": "Province name already exists",
"error": "Conflict"
}

---

## Notas

- El endpoint correcto para autocompletado es /province/search?name=...
- No existe /location/province en esta aplicación.
- Todos los ejemplos y rutas corresponden a la implementación real del backend.
