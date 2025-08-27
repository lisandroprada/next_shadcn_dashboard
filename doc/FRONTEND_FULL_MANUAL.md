# Manual de Integración Frontend - Backend

Este manual contiene toda la información necesaria para que

---

## 1. Autenticación y Usuarios

### 1.1. Login

**Endpoint:**

```
POST /api/v1/auth/login
```

**Body:**

```json
{
  "email": "usuario@dominio.com",
  "password": "contraseña123",
  "rememberMe": false
}
```

**Respuesta:**

```json
{
  "access_token": "jwt-token",
  "user": {
    "_id": "665f1e2b8e4b2a001e7e7e7e",
    "name": "Juan",
    "lastName": "Pérez",
    "email": "juan@test.com",
    "roles": ["admin", "user"],
    "party": {
      "_id": "665f1e2b8e4b2a001e7e7e7f",
      "identityCard": "12345678",
      "phone": "123456789",
      "address": "Calle 123",
      "locality": {
        "_id": "665f1e2b8e4b2a001e7e7e70",
        "name": "La Plata",
        "province": {
          "_id": "665f1e2b8e4b2a001e7e7e71",
          "name": "Buenos Aires"
        }
      }
    }
  }
}
```

- El token JWT debe enviarse en el header `Authorization: Bearer <token>` en todas las requests protegidas.

### 1.2. Validación de Sesión

**Endpoint:**

```
POST /api/v1/auth/check-auth-status
```

**Header:**

```
Authorization: Bearer <token>
```

**Respuesta:**

```json
{
  "user": {
    "_id": "665f1e2b8e4b2a001e7e7e7e",
    "name": "Juan",
    "lastName": "Pérez",
    "email": "juan@test.com",
    "roles": ["admin", "user"],
    "party": {
      "_id": "665f1e2b8e4b2a001e7e7e7f",
      "identityCard": "12345678",
      "phone": "123456789",
      "address": "Calle 123",
      "locality": {
        "_id": "665f1e2b8e4b2a001e7e7e70",
        "name": "La Plata",
        "province": {
          "_id": "665f1e2b8e4b2a001e7e7e71",
          "name": "Buenos Aires"
        }
      }
    }
  }
}
```

### 1.3. Registro de Usuario

**Endpoint:**

```
POST /api/v1/auth/register
```

**Body:**

```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@test.com",
  "password": "contraseña123"
}
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e7e",
  "name": "Juan",
  "lastName": "Pérez",
  "email": "juan@test.com",
  "roles": ["user"],
  "party": null
}
```

### 1.4. Roles y Seguridad

- Los roles determinan el acceso a rutas y acciones.
- Ejemplo de roles: `admin`, `user`, `owner`, `provider`, `tenant`.
- El frontend debe mostrar/ocultar funcionalidades según el rol del usuario.
- El backend valida los permisos en cada endpoint.

---

## 2. Estructura de Datos y Endpoints

### 2.1. Party (Personas, Propietarios, Proveedores)

**Colección:** `party`

### Campos de la entidad Party

| Campo          | Tipo     | Descripción completa                                                         |
| -------------- | -------- | ---------------------------------------------------------------------------- |
| `_id`          | string   | Identificador único MongoId.                                                 |
| `name`         | string   | Nombre de la persona. Requerido.                                             |
| `lastName`     | string   | Apellido de la persona. Requerido.                                           |
| `identityCard` | string   | DNI, CUIT o documento identificatorio. Requerido.                            |
| `email`        | string   | Email de contacto. Debe ser único. Requerido.                                |
| `phone`        | string   | Teléfono de contacto. Opcional.                                              |
| `roles`        | string[] | Roles asociados: `owner`, `provider`, `tenant`, etc. Requerido.              |
| `address`      | string   | Dirección completa. Opcional.                                                |
| `locality`     | objeto   | Localidad. Objeto con `_id` y `name`. Requerido.                             |
| `province`     | objeto   | Provincia. Objeto con `_id` y `name`. Opcional si está embebido en locality. |
| `properties`   | string[] | Array de IDs de propiedades que posee. Opcional.                             |
| `contracts`    | string[] | Array de IDs de contratos asociados. Opcional.                               |
| `createdAt`    | string   | Fecha de creación (ISO).                                                     |
| `updatedAt`    | string   | Fecha de última modificación (ISO).                                          |

### Endpoints Party

- **Crear persona:** `POST /api/v1/party`
- **Obtener persona:** `GET /api/v1/party/:id`
- **Modificar persona:** `PATCH /api/v1/party/:id`
- **Eliminar persona:** `DELETE /api/v1/party/:id`
- **Buscar propietarios (autocomplete):** `GET /api/v1/party/search/owners?q=...&limit=...`
- **Listar personas (paginado):** `GET /api/v1/party?page=1&limit=10`

### Ejemplo de alta (POST)

**URL:**

```
POST http://localhost:3050/api/v1/party
```

**Body:**

```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "123456789",
  "roles": ["owner"],
  "address": "Calle 123",
  "locality": "665f1e2b8e4b2a001e7e7e70",
  "province": "665f1e2b8e4b2a001e7e7e71"
}
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e7f",
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "123456789",
  "roles": ["owner"],
  "address": "Calle 123",
  "locality": {
    "_id": "665f1e2b8e4b2a001e7e7e70",
    "name": "La Plata"
  },
  "province": {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  },
  "properties": [],
  "contracts": [],
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:00:00.000Z"
}
```

### Ejemplo de modificación (PATCH)

**URL:**

```
PATCH http://localhost:3050/api/v1/party/665f1e2b8e4b2a001e7e7e7f
```

**Body:**

```json
{
  "phone": "1122334455",
  "address": "Calle Nueva 456"
}
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e7f",
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "1122334455",
  "roles": ["owner"],
  "address": "Calle Nueva 456",
  "locality": {
    "_id": "665f1e2b8e4b2a001e7e7e70",
    "name": "La Plata"
  },
  "province": {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  },
  "properties": [],
  "contracts": [],
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:10:00.000Z"
}
```

### Ejemplo de borrado (DELETE)

**URL:**

```
DELETE http://localhost:3050/api/v1/party/665f1e2b8e4b2a001e7e7e7f
```

**Respuesta:**

```json
{
  "deleted": true
}
```

### Ejemplo de consulta por ID (GET)

**URL:**

```
GET http://localhost:3050/api/v1/party/665f1e2b8e4b2a001e7e7e7f
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e7f",
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "1122334455",
  "roles": ["owner"],
  "address": "Calle Nueva 456",
  "locality": {
    "_id": "665f1e2b8e4b2a001e7e7e70",
    "name": "La Plata"
  },
  "province": {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  },
  "properties": ["665f1e2b8e4b2a001e7e7e80"],
  "contracts": ["665f1e2b8e4b2a001e7e7e90"],
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:10:00.000Z"
}
```

### Ejemplo de búsqueda/autocomplete

**URL:**

```
GET http://localhost:3050/api/v1/party/search/owners?q=juan&limit=5
```

**Respuesta:**

```json
[
  {
    "_id": "665f1e2b8e4b2a001e7e7e7f",
    "name": "Juan",
    "lastName": "Pérez",
    "identityCard": "12345678",
    "email": "juan@test.com"
  }
]
```

### Ejemplo de paginación

**URL:**

```
GET http://localhost:3050/api/v1/party?page=2&limit=10
```

**Respuesta:**

```json
{
  "data": [
    {
      "_id": "665f1e2b8e4b2a001e7e7e7f",
      "name": "Juan",
      "lastName": "Pérez",
      "identityCard": "12345678",
      "email": "juan@test.com"
    }
    // ...más personas...
  ],
  "meta": {
    "totalItems": 100,
    "itemCount": 10,
    "itemsPerPage": 10,
    "totalPages": 10,
    "currentPage": 2
  }
}
```

### DTO completo para alta/modificación

```typescript
export class CreateUpdatePartyDto {
  name: string; // Nombre de la persona (requerido)
  lastName: string; // Apellido (requerido)
  identityCard: string; // DNI/CUIT (requerido)
  email: string; // Email (requerido)
  phone?: string; // Teléfono (opcional)
  roles: string[]; // Roles (requerido)
  address?: string; // Dirección (opcional)
  locality: string; // ID de localidad (requerido)
  province?: string; // ID de provincia (opcional)
}
```

### Entity completa Party

```typescript
export class Party {
  _id: string;
  name: string;
  lastName: string;
  identityCard: string;
  email: string;
  phone?: string;
  roles: string[];
  address?: string;
  locality: {
    _id: string;
    name: string;
  };
  province?: {
    _id: string;
    name: string;
  };
  properties?: string[];
  contracts?: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Explicación de cada campo

- `name`: Nombre de la persona. Obligatorio.
- `lastName`: Apellido. Obligatorio.
- `identityCard`: DNI/CUIT. Obligatorio.
- `email`: Email único. Obligatorio.
- `phone`: Teléfono. Opcional.
- `roles`: Array de roles. Obligatorio. Ejemplo: `["owner"]`.
- `address`: Dirección. Opcional.
- `locality`: ID de localidad. Obligatorio en DTO, objeto en entity.
- `province`: ID de provincia. Opcional en DTO, objeto en entity.
- `properties`: Array de IDs de propiedades asociadas. Opcional.
- `contracts`: Array de IDs de contratos asociados. Opcional.
- `createdAt`: Fecha de creación. Automático.
- `updatedAt`: Fecha de última modificación. Automático.

### Consideraciones y errores comunes

- Todos los campos obligatorios deben ser enviados, de lo contrario la API devolverá error 400.
- El email debe ser único, si ya existe la API devolverá error 409.
- Los IDs de localidad y provincia deben existir en la base de datos.
- Los roles deben ser válidos (`owner`, `provider`, `tenant`, etc.).
- Para búsquedas/autocomplete usar el endpoint específico y limitar la cantidad de resultados.
- La paginación se realiza con los parámetros `page` y `limit`.
- Las respuestas incluyen metadatos de paginación cuando corresponda.

### Ejemplo de error por campo faltante

```json
{
  "statusCode": 400,
  "message": ["name should not be empty"],
  "error": "Bad Request"
}
```

### Ejemplo de error por email duplicado

```json
{
  "statusCode": 409,
  "message": "Email already exists",
  "error": "Conflict"
}
```

### 2.2. Property (Propiedades)

**Colección:** `property`

### Campos de la entidad Property

| Campo         | Tipo         | Descripción completa                                                         |
| ------------- | ------------ | ---------------------------------------------------------------------------- |
| `_id`         | string       | Identificador único MongoId.                                                 |
| `title`       | string       | Título de la propiedad. Requerido. Ejemplo: "Depto 2 Ambientes".             |
| `description` | string       | Descripción detallada. Requerido. Ejemplo: "Departamento en el centro".      |
| `address`     | string       | Dirección completa. Requerido.                                               |
| `locality`    | objeto       | Localidad. Objeto con `_id` y `name`. Requerido.                             |
| `province`    | objeto       | Provincia. Objeto con `_id` y `name`. Opcional si está embebido en locality. |
| `owners`      | string[]/obj | Array de IDs u objetos Party propietarios. Requerido.                        |
| `mainOwner`   | string/obj   | ID u objeto Party principal. Requerido.                                      |
| `contracts`   | string[]     | Array de IDs de contratos asociados. Opcional.                               |
| `images`      | string[]     | Array de URLs de imágenes. Opcional.                                         |
| `createdAt`   | string       | Fecha de creación (ISO).                                                     |
| `updatedAt`   | string       | Fecha de última modificación (ISO).                                          |

### Endpoints Property

- **Crear propiedad:** `POST /api/v1/property`
- **Obtener propiedad:** `GET /api/v1/property/:id`
- **Modificar propiedad:** `PATCH /api/v1/property/:id`
- **Eliminar propiedad:** `DELETE /api/v1/property/:id`
- **Buscar propiedades (filtros):** `GET /api/v1/property?title=...&locality=...&owner=...`
- **Listar propiedades (paginado):** `GET /api/v1/property?page=1&limit=10`

### Ejemplo de alta (POST)

**URL:**

```
POST http://localhost:3050/api/v1/property
```

**Body:**

```json
{
  "title": "Depto 2 Ambientes",
  "description": "Departamento en el centro",
  "address": "Calle 456",
  "locality": "665f1e2b8e4b2a001e7e7e70",
  "province": "665f1e2b8e4b2a001e7e7e71",
  "owners": ["665f1e2b8e4b2a001e7e7e7f"],
  "mainOwner": "665f1e2b8e4b2a001e7e7e7f",
  "images": ["https://img.com/depto1.jpg"]
}
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e80",
  "title": "Depto 2 Ambientes",
  "description": "Departamento en el centro",
  "address": "Calle 456",
  "locality": {
    "_id": "665f1e2b8e4b2a001e7e7e70",
    "name": "La Plata"
  },
  "province": {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  },
  "owners": [
    {
      "_id": "665f1e2b8e4b2a001e7e7e7f",
      "name": "Juan",
      "lastName": "Pérez"
    }
  ],
  "mainOwner": {
    "_id": "665f1e2b8e4b2a001e7e7e7f",
    "name": "Juan",
    "lastName": "Pérez"
  },
  "images": ["https://img.com/depto1.jpg"],
  "contracts": [],
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:00:00.000Z"
}
```

### Ejemplo de modificación (PATCH)

**URL:**

```
PATCH http://localhost:3050/api/v1/property/665f1e2b8e4b2a001e7e7e80
```

**Body:**

```json
{
  "description": "Departamento remodelado",
  "images": ["https://img.com/depto1.jpg", "https://img.com/depto1b.jpg"]
}
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e80",
  "title": "Depto 2 Ambientes",
  "description": "Departamento remodelado",
  "address": "Calle 456",
  "locality": {
    "_id": "665f1e2b8e4b2a001e7e7e70",
    "name": "La Plata"
  },
  "province": {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  },
  "owners": [
    {
      "_id": "665f1e2b8e4b2a001e7e7e7f",
      "name": "Juan",
      "lastName": "Pérez"
    }
  ],
  "mainOwner": {
    "_id": "665f1e2b8e4b2a001e7e7e7f",
    "name": "Juan",
    "lastName": "Pérez"
  },
  "images": ["https://img.com/depto1.jpg", "https://img.com/depto1b.jpg"],
  "contracts": [],
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:10:00.000Z"
}
```

### Ejemplo de borrado (DELETE)

**URL:**

```
DELETE http://localhost:3050/api/v1/property/665f1e2b8e4b2a001e7e7e80
```

**Respuesta:**

```json
{
  "deleted": true
}
```

### Ejemplo de consulta por ID (GET)

**URL:**

```
GET http://localhost:3050/api/v1/property/665f1e2b8e4b2a001e7e7e80
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e80",
  "title": "Depto 2 Ambientes",
  "description": "Departamento remodelado",
  "address": "Calle 456",
  "locality": {
    "_id": "665f1e2b8e4b2a001e7e7e70",
    "name": "La Plata"
  },
  "province": {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  },
  "owners": [
    {
      "_id": "665f1e2b8e4b2a001e7e7e7f",
      "name": "Juan",
      "lastName": "Pérez"
    }
  ],
  "mainOwner": {
    "_id": "665f1e2b8e4b2a001e7e7e7f",
    "name": "Juan",
    "lastName": "Pérez"
  },
  "images": ["https://img.com/depto1.jpg", "https://img.com/depto1b.jpg"],
  "contracts": ["665f1e2b8e4b2a001e7e7e90"],
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:10:00.000Z"
}
```

### Ejemplo de búsqueda/filtros

**URL:**

```
GET http://localhost:3050/api/v1/property?title=Depto&locality=665f1e2b8e4b2a001e7e7e70&owner=665f1e2b8e4b2a001e7e7e7f&page=1&limit=5
```

**Respuesta:**

```json
{
  "data": [
    {
      "_id": "665f1e2b8e4b2a001e7e7e80",
      "title": "Depto 2 Ambientes",
      "address": "Calle 456",
      "locality": {
        "_id": "665f1e2b8e4b2a001e7e7e70",
        "name": "La Plata"
      },
      "owners": [
        {
          "_id": "665f1e2b8e4b2a001e7e7e7f",
          "name": "Juan"
        }
      ]
    }
    // ...más propiedades...
  ],
  "meta": {
    "totalItems": 20,
    "itemCount": 5,
    "itemsPerPage": 5,
    "totalPages": 4,
    "currentPage": 1
  }
}
```

### DTO completo para alta/modificación

```typescript
export class CreateUpdatePropertyDto {
  title: string; // Título (requerido)
  description: string; // Descripción (requerido)
  address: string; // Dirección (requerido)
  locality: string; // ID de localidad (requerido)
  province?: string; // ID de provincia (opcional)
  owners: string[]; // IDs de propietarios (requerido)
  mainOwner: string; // ID de propietario principal (requerido)
  images?: string[]; // URLs de imágenes (opcional)
}
```

### Entity completa Property

```typescript
export class Property {
  _id: string;
  title: string;
  description: string;
  address: string;
  locality: {
    _id: string;
    name: string;
  };
  province?: {
    _id: string;
    name: string;
  };
  owners: Array<{
    _id: string;
    name: string;
    lastName: string;
  }>;
  mainOwner: {
    _id: string;
    name: string;
    lastName: string;
  };
  images?: string[];
  contracts?: string[];
  createdAt: string;
  updatedAt: string;
}
```

### Explicación de cada campo

- `title`: Título de la propiedad. Obligatorio.
- `description`: Descripción detallada. Obligatorio.
- `address`: Dirección completa. Obligatorio.
- `locality`: ID de localidad en DTO, objeto en entity. Obligatorio.
- `province`: ID de provincia en DTO, objeto en entity. Opcional.
- `owners`: Array de IDs en DTO, array de objetos en entity. Obligatorio.
- `mainOwner`: ID en DTO, objeto en entity. Obligatorio.
- `images`: Array de URLs de imágenes. Opcional.
- `contracts`: Array de IDs de contratos asociados. Opcional.
- `createdAt`: Fecha de creación. Automático.
- `updatedAt`: Fecha de última modificación. Automático.

### Consideraciones y errores comunes

- Todos los campos obligatorios deben ser enviados, de lo contrario la API devolverá error 400.
- Los IDs de localidad, provincia y propietarios deben existir en la base de datos.
- El título debe ser único por dirección, si ya existe la API devolverá error 409.
- Para búsquedas y filtros usar los parámetros disponibles en el endpoint GET.
- La paginación se realiza con los parámetros `page` y `limit`.
- Las respuestas incluyen metadatos de paginación cuando corresponda.

### Ejemplo de error por campo faltante

```json
{
  "statusCode": 400,
  "message": ["title should not be empty"],
  "error": "Bad Request"
}
```

### Ejemplo de error por título/dirección duplicado

```json
{
  "statusCode": 409,
  "message": "Property already exists at this address",
  "error": "Conflict"
}
```

### 2.3. Location (Province y Locality)

**Colección:** `province`

### Campos de la entidad Province

| Campo       | Tipo   | Descripción completa                          |
| ----------- | ------ | --------------------------------------------- |
| `_id`       | string | Identificador único MongoId.                  |
| `name`      | string | Nombre de la provincia. Requerido.            |
| `createdAt` | string | Fecha de creación (ISO). Opcional.            |
| `updatedAt` | string | Fecha de última modificación (ISO). Opcional. |

**Colección:** `locality`

### Campos de la entidad Locality

| Campo       | Tipo   | Descripción completa                           |
| ----------- | ------ | ---------------------------------------------- |
| `_id`       | string | Identificador único MongoId.                   |
| `name`      | string | Nombre de la localidad. Requerido.             |
| `province`  | objeto | Objeto Province con `_id` y `name`. Requerido. |
| `createdAt` | string | Fecha de creación (ISO). Opcional.             |
| `updatedAt` | string | Fecha de última modificación (ISO). Opcional.  |

### Endpoints Location

### Endpoints Province

- **Listar provincias:** `GET /api/v1/province` (requiere autenticación)
- **Buscar provincia por nombre:** `GET /api/v1/province/search?name=...`
- **Obtener provincia por ID:** `GET /api/v1/province/:id`
- **Crear provincia:** `POST /api/v1/province`
- **Modificar provincia:** `PATCH /api/v1/province/:id`
- **Eliminar provincia:** `DELETE /api/v1/province/:id`

### Endpoints Locality

- **Listar todas las localidades:** `GET /api/v1/locality` (requiere autenticación)
- **Buscar localidades por nombre y provincia:** `GET /api/v1/locality/search?name=...&provinceId=...`
- **Listar localidades por ID de provincia:** `GET /api/v1/locality/byId/:id` (id de provincia)
- **Obtener localidad por ID:** `GET /api/v1/locality/:id`
- **Crear localidad:** `POST /api/v1/locality`
- **Modificar localidad:** `PATCH /api/v1/locality/:id`
- **Eliminar localidad:** `DELETE /api/v1/locality/:id`
- **Localidades con propiedades disponibles:** `GET /api/v1/locality/with-available-properties?type=sale|rent|all`

### Ejemplo de alta de provincia (POST)

**URL:**

```
POST http://localhost:3050/api/v1/location/provinces
```

**Body:**

```json
{
  "name": "Buenos Aires"
}
```

**Colección:** `province`

### Campos de la entidad Province

| Campo       | Tipo   | Descripción completa                |
| ----------- | ------ | ----------------------------------- |
| `_id`       | string | Identificador único MongoId.        |
| `name`      | string | Nombre de la provincia. Requerido.  |
| `createdAt` | string | Fecha de creación (ISO).            |
| `updatedAt` | string | Fecha de última modificación (ISO). |

### Endpoints Province

- **Crear provincia:** `POST /api/v1/province`
- **Listar provincias:** `GET /api/v1/province` (requiere autenticación)
- **Buscar provincias (autocomplete):** `GET /api/v1/province/search?name=...`
- **Obtener provincia por ID:** `GET /api/v1/province/:id`
- **Modificar provincia:** `PATCH /api/v1/province/:id`
- **Eliminar provincia:** `DELETE /api/v1/province/:id`

### Ejemplo de autocompletado (GET)

**URL:**

```
GET http://localhost:3050/api/v1/province/search?name=buen
```

**Respuesta:**

```json
[
  {
    "_id": "665f1e2b8e4b2a001e7e7e71",
    "name": "Buenos Aires"
  }
]
```

### Ejemplo de alta (POST)

**URL:**

```
POST http://localhost:3050/api/v1/province
```

**Body:**

```json
{
  "name": "Buenos Aires"
}
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e71",
  "name": "Buenos Aires",
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:00:00.000Z"
}
```

### Ejemplo de consulta por ID (GET)

**URL:**

```
GET http://localhost:3050/api/v1/province/665f1e2b8e4b2a001e7e7e71
```

**Respuesta:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e71",
  "name": "Buenos Aires",
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:00:00.000Z"
}
```

### DTO para alta/modificación

```typescript
export class CreateUpdateProvinceDto {
  name: string; // Nombre de la provincia (requerido)
}
```

### Entity completa Province

```typescript
export class Province {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
```

### Explicación de cada campo

- `name`: Nombre de la provincia. Obligatorio.
- El nombre debe ser único, si ya existe la API devolverá error 409.
- Los IDs deben ser válidos de MongoDB.

  "error": "Bad Request"
  }

````

Ejemplo de error por nombre duplicado:

```json
{
  "statusCode": 409,
  "message": "Province name already exists",
  "error": "Conflict"
}
````

### Notas

- El endpoint correcto para autocompletado es /province/search?name=...
- No existe /location/province en esta aplicación.
- Todos los ejemplos y rutas corresponden a la implementación real del backend.
- `property`: referencia a Property
- `parties`: array de referencias a Party (cada uno con su rol: owner, tenant, garante, etc.)
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)
- `status`: string (activo, finalizado, rescindido, etc.)
- `amount`: number

**Endpoints:**

- `POST /api/v1/contract` - Crear contrato
- `GET /api/v1/contract/:id` - Obtener contrato
- `PATCH /api/v1/contract/:id` - Actualizar contrato
- `DELETE /api/v1/contract/:id` - Eliminar contrato

**Ejemplo de objeto Contract:**

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e90",
  "property": "665f1e2b8e4b2a001e7e7e80",
  "parties": [
    { "_id": "665f1e2b8e4b2a001e7e7e7f", "role": "owner" },
    { "_id": "665f1e2b8e4b2a001e7e7e7a", "role": "tenant" }
  ],
  "startDate": "2025-07-01T00:00:00.000Z",
  "endDate": "2026-07-01T00:00:00.000Z",
  "status": "activo",
```

### 2.5. Provider (Proveedores)

**Colección:** `party` (con rol `provider`)

- Igual a Party, pero con `roles` que incluyen `provider`.

**Endpoints:**

- `POST /api/v1/provider` - Crear proveedor
- `GET /api/v1/provider/:id` - Obtener proveedor

### 2.6. User (Usuarios de la plataforma)

**Colección:** `user`

- `_id`: string
- `name`: string
- `lastName`: string
- `email`: string
- `roles`: array de string
- `party`: referencia a Party (opcional)

**Endpoints:**

- `POST /api/v1/user` - Crear usuario
- `GET /api/v1/user/:id` - Obtener usuario
- `PATCH /api/v1/user/:id` - Actualizar usuario
- `DELETE /api/v1/user/:id` - Eliminar usuario

### 2.7. Otros módulos

- **Crm:** Gestión de relaciones con clientes, casos, comentarios, eventos.
- **Banks, AccountPlan, Reconciliation, AccountEntries, UpdateIndex:** Módulos de gestión financiera y contable.
- **Tickets:** Gestión de tickets y soporte.

---

## AccountPlan

### Descripción

El módulo AccountPlan gestiona los planes de cuentas contables, permitiendo crear, consultar, actualizar y eliminar tipos de cuentas como "Alquiler devengado", "Expensas", etc.

### Endpoints

- `POST /api/v1/account-plan`  
  Crea un nuevo plan de cuentas.
- `GET /api/v1/account-plan`  
  Lista todos los planes de cuentas (soporta paginación).
- `GET /api/v1/account-plan/:id`  
  Obtiene un plan de cuentas por su ID.
- `PATCH /api/v1/account-plan/:id`  
  Actualiza un plan de cuentas existente.
- `DELETE /api/v1/account-plan/:id`  
  Elimina un plan de cuentas.

### DTOs

#### CreateAccountPlanDto

```typescript
export class CreateAccountPlanDto {
  @IsNotEmpty()
  @IsString()
  name: string; // Nombre del plan de cuentas (Ej. "Alquiler devengado")

  @IsNotEmpty()
  @IsString()
  description: string; // Descripción del plan de cuentas (Ej. "Cobro mensual de alquiler")

  @IsNotEmpty()
  @IsBoolean()
  appliesCommission: boolean; // Indica si aplica comisión (Ej. true para alquileres)

  @IsNotEmpty()
  @IsBoolean()
  isRevenue: boolean; // Indica si es una cuenta de ingresos (true) o de gastos (false)
}
```

#### UpdateAccountPlanDto

```typescript
export class UpdateAccountPlanDto extends PartialType(CreateAccountPlanDto) {}
```

### Entity

#### AccountPlan

```typescript
@Schema()
export class AccountPlan extends Document {
  @Prop({ required: true })
  name: string; // Nombre del tipo de cuenta (Ej. "Alquiler devengado")

  @Prop({ required: true })
  description: string; // Descripción detallada del concepto (Ej. "Cobro mensual de alquiler")

  @Prop({ required: true })
  appliesCommission: boolean; // Indica si aplica comisión (Ej. en alquileres sí, en expensas no)

  @Prop({ required: true })
  isRevenue: boolean; // Indica si es una cuenta de ingresos (true) o de gastos (false)

  @Prop({ default: Date.now })
  createdAt: Date; // Estampa de tiempo de creación

  @Prop({ type: String, ref: 'User' })
  createdBy: string; // Usuario que creó el plan de cuentas
}
```

### Ejemplos

#### Crear un plan de cuentas

**Request**

```json
POST /api/v1/account-plan
{
  "name": "Alquiler devengado",
  "description": "Cobro mensual de alquiler",
  "appliesCommission": true,
  "isRevenue": true
}
```

**Response**

```json
{
  "_id": "64f1c2e8b2e4a2a1b2c3d4e5",
  "name": "Alquiler devengado",
  "description": "Cobro mensual de alquiler",
  "appliesCommission": true,
  "isRevenue": true,
  "createdAt": "2023-09-01T12:34:56.789Z",
  "createdBy": "64f1c2e8b2e4a2a1b2c3d4e0"
}
```

#### Obtener todos los planes de cuentas

**Request**

```
GET /api/v1/account-plan
```

**Response**

```json
[
  {
    "_id": "64f1c2e8b2e4a2a1b2c3d4e5",
    "name": "Alquiler devengado",
    "description": "Cobro mensual de alquiler",
    "appliesCommission": true,
    "isRevenue": true,
    "createdAt": "2023-09-01T12:34:56.789Z",
    "createdBy": "64f1c2e8b2e4a2a1b2c3d4e0"
  }
]
```

### Relaciones

- El campo `createdBy` referencia a un usuario (`User`).

---

## AccountEntries

### Descripción

El módulo AccountEntries gestiona los asientos contables de la plataforma, permitiendo registrar, consultar y consolidar movimientos de crédito y débito asociados a contratos, proveedores, impuestos, etc.

### Endpoints

- `POST /api/v1/account-entries`  
  Crea un nuevo asiento contable.
- `GET /api/v1/account-entries`  
  Lista todos los asientos contables.
- `GET /api/v1/account-entries/party/:partyId/consolidated?untilDate=YYYY-MM-DD`  
  Obtiene el balance consolidado de un party hasta una fecha específica.

### DTOs

#### CreateAccountEntryDto

```typescript
export class CreateAccountEntryDto {
  @IsOptional()
  @IsMongoId()
  sourceId?: Types.ObjectId;

  @IsOptional()
  @IsEnum(['Contract', 'Supplier', 'Tax', 'Appraisal', 'Other'])
  sourceType?: string;

  @IsNotEmpty()
  @IsMongoId()
  actor: Types.ObjectId; // Actor que realiza o recibe el movimiento

  @IsNotEmpty()
  @IsMongoId()
  accountPlan: Types.ObjectId; // Plan contable

  @IsNotEmpty()
  @IsNumber()
  amount: number; // Monto de la transacción

  @IsNotEmpty()
  @IsNumber()
  balance: number; // Monto de la transacción

  @IsOptional()
  @IsNumber()
  available?: number; // Monto disponible para recaudar o pagar (opcional)

  @IsOptional()
  @IsNumber()
  amountCollected?: number; // Monto recaudado disponible para acreedores (opcional)

  @IsOptional()
  @IsNumber()
  amountPaid?: number; // Monto total pagado (opcional)

  @IsNotEmpty()
  @IsEnum(['credit', 'debit'])
  type: string; // Tipo de transacción: crédito o débito

  @IsNotEmpty()
  @IsDate()
  date: Date; // Fecha de la transacción

  @IsOptional()
  @IsDate()
  dueDate?: Date; // Fecha de vencimiento
}
```

#### UpdateAccountEntryDto

```typescript
export class UpdateAccountEntryDto extends PartialType(CreateAccountEntryDto) {}
```

### Entity

#### AccountEntry

```typescript
@Schema()
export class AccountEntry extends Document {
  @Prop({ type: Types.ObjectId, refPath: 'sourceType', required: false })
  sourceId: Types.ObjectId;

  @Prop({
    required: false,
    enum: ['Contract', 'Supplier', 'Tax', 'Appraisal', 'Other'],
  })
  sourceType: string;

  @Prop({ type: Types.ObjectId, ref: 'Party', required: true })
  actor: Types.ObjectId; // Acreedor o deudor

  @Prop({ type: Types.ObjectId, ref: 'AccountPlan', required: true })
  accountPlan: Types.ObjectId; // Tipo de cuenta

  @Prop({ required: true })
  amount: number; // Monto total del asiento

  @Prop({ default: 0 })
  amountPaid: number; // Monto total pagado

  @Prop({ default: 0 })
  balance: number; // Saldo restante, que se actualizará con cada pago

  @Prop({ default: 0 })
  amountCollected: number; // Monto recaudado disponible para acreedores

  @Prop({ default: 0 })
  available: number; // Monto disponible para recaudar o pagar

  @Prop({ required: true })
  type: 'debit' | 'credit'; // Tipo de asiento (débito o crédito)

  @Prop({ required: true })
  date: Date; // Fecha del asiento
}
```

### Ejemplos

#### Crear un asiento contable

**Request**

```json
POST /api/v1/account-entries
{
  "actor": "665f1e2b8e4b2a001e7e7e7f",
  "accountPlan": "64f1c2e8b2e4a2a1b2c3d4e5",
  "amount": 10000,
  "balance": 10000,
  "type": "credit",
  "date": "2025-07-01T00:00:00.000Z"
}
```

**Response**

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e1",
  "actor": "665f1e2b8e4b2a001e7e7e7f",
  "accountPlan": "64f1c2e8b2e4a2a1b2c3d4e5",
  "amount": 10000,
  "balance": 10000,
  "type": "credit",
  "date": "2025-07-01T00:00:00.000Z",
  "amountPaid": 0,
  "amountCollected": 0,
  "available": 0
}
```

#### Obtener balance consolidado de un party

**Request**

```
GET /api/v1/account-entries/party/665f1e2b8e4b2a001e7e7e7f/consolidated?untilDate=2025-12-31
```

**Response**

```json
{
  "partyId": "665f1e2b8e4b2a001e7e7e7f",
  "totalCredit": 50000,
  "totalDebit": 20000,
  "balance": 30000
}
```

### Relaciones

- `actor` referencia a un Party (persona, proveedor, etc.).
- `accountPlan` referencia a un AccountPlan.
- `sourceId` y `sourceType` pueden referenciar a Contract, Supplier, Tax, Appraisal u Other.

---

## 3. Relaciones entre Colecciones

- **User** → (opcional) **Party** (un usuario puede estar vinculado a una persona)
- **Party** → **Property** (un party puede ser propietario de varias propiedades)
- **Property** → **Party** (una propiedad puede tener varios propietarios)
- **Party** → **Contract** (un party puede estar en varios contratos)
- **Property** → **Contract** (una propiedad puede tener varios contratos)
- **Locality** → **Province** (cada localidad pertenece a una provincia)
- **Party/Property** → **Locality/Province** (cada persona y propiedad tiene localidad y provincia)
- **Contract** → **Party/Property** (un contrato vincula personas y propiedades)

---

## 4. Flujos recomendados

### Alta de propiedad

1. Buscar o crear propietario (Party)
2. Seleccionar localidad y provincia
3. Crear propiedad (Property) vinculando propietario y ubicación
4. (Opcional) Crear contrato asociado

### Alta de persona

1. Crear Party con todos los campos obligatorios
2. Asociar localidad y provincia
3. (Opcional) Asociar usuario (User)

### Alta de contrato

1. Seleccionar propiedad y parties involucrados
2. Definir fechas, monto y estado
3. Crear contrato

---

## 5. Buenas prácticas y testing

- Siempre enviar el JWT en el header Authorization.
- Validar roles antes de mostrar acciones sensibles.
- Usar los endpoints de búsqueda para autocomplete y selección múltiple.
- Validar datos antes de enviar (email, DNI, etc.).
- Usar herramientas
- Revisar los logs del backend para errores de validación o permisos.
- Ante problemas de CORS, verificar primero el backend y luego el proxy (Apache/Nginx).

---

Este manual es suficiente para implementar cualquier integración frontend con el backend. Si surge alguna duda sobre un campo, endpoint o relación, consulta con el equipo backend para obtener detalles adicionales o cambios recientes.

---

## Banks

### Descripción

El módulo Banks gestiona la información de bancos, permitiendo crear, consultar, actualizar y eliminar entidades bancarias utilizadas en la plataforma.

### Endpoints

- `POST /api/v1/banks`  
  Crea un nuevo banco.
- `GET /api/v1/banks`  
  Lista todos los bancos.
- `GET /api/v1/banks/:id`  
  Obtiene un banco por su ID.
- `PATCH /api/v1/banks/:id`  
  Actualiza un banco existente.
- `DELETE /api/v1/banks/:id`  
  Elimina un banco.

### DTOs

#### CreateBankDto

```typescript
export class CreateBankDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
```

#### UpdateBankDto

```typescript
export class UpdateBankDto extends PartialType(CreateBankDto) {}
```

### Entity

#### Bank

```typescript
@Schema()
export class Bank extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  contactName: string;

  @Prop()
  phone: string;

  @Prop()
  address: string;

  @Prop()
  email: string;

  @Prop()
  website: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}
```

### Ejemplos

#### Crear un banco

**Request**

```json
POST /api/v1/banks
{
  "name": "Banco Nación",
  "code": "BNA",
  "contactName": "Juan Pérez",
  "phone": "+54 11 1234-5678",
  "address": "Av. Corrientes 1234, CABA",
  "email": "contacto@bna.com.ar",
  "website": "https://www.bna.com.ar",
  "active": true
}
```

**Response**

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e2",
  "name": "Banco Nación",
  "code": "BNA",
  "contactName": "Juan Pérez",
  "phone": "+54 11 1234-5678",
  "address": "Av. Corrientes 1234, CABA",
  "email": "contacto@bna.com.ar",
  "website": "https://www.bna.com.ar",
  "active": true,
  "createdAt": "2025-06-30T12:00:00.000Z"
}
```

#### Obtener todos los bancos

**Request**

```
GET /api/v1/banks
```

**Response**

```json
[
  {
    "_id": "66a1b2c3d4e5f6a7b8c9d0e2",
    "name": "Banco Nación",
    "code": "BNA",
    "contactName": "Juan Pérez",
    "phone": "+54 11 1234-5678",
    "address": "Av. Corrientes 1234, CABA",
    "email": "contacto@bna.com.ar",
    "website": "https://www.bna.com.ar",
    "active": true,
    "createdAt": "2025-06-30T12:00:00.000Z"
  }
]
```

### Relaciones

- No tiene referencias directas a otras colecciones.

---

## Crm - Cases

### Descripción

El submódulo Cases del módulo Crm gestiona los casos de clientes, permitiendo registrar, consultar y actualizar casos asociados a usuarios, agentes y comentarios.

### Endpoints

- `POST /api/v1/cases`  
  Crea un nuevo caso.
- `GET /api/v1/cases`  
  Lista todos los casos.
- `GET /api/v1/cases/:id`  
  Obtiene un caso por su ID.
- `PATCH /api/v1/cases/:id`  
  Actualiza un caso existente.

### DTOs

#### CreateCaseDto

```typescript
export class CreateCaseDto {}
```

#### UpdateCaseDto

```typescript
export class UpdateCaseDto extends PartialType(CreateCaseDto) {}
```

### Entity

#### Case

```typescript
@Schema()
export class Case extends Document {
  @Prop({ required: true })
  caseNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  assignedAgent: Types.ObjectId; // Agente asignado

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId; // Usuario que creó el caso

  @Prop({
    type: String,
    enum: ['open', 'in_progress', 'closed', 'pending'],
    default: 'open',
  })
  status: string; // Estado del caso

  @Prop({ required: true })
  subject: string; // Asunto del caso

  @Prop({ required: true })
  description: string; // Descripción del caso

  @Prop({ type: String, enum: ['low', 'medium', 'high'], default: 'low' })
  priority: string; // Prioridad del caso

  @Prop({ type: Date, default: Date.now })
  createdAt: Date; // Fecha de creación

  @Prop({ type: Date })
  resolvedAt?: Date; // Fecha de resolución

  @Prop([{ type: Types.ObjectId, ref: 'Comment' }])
  comments: Types.ObjectId[]; // Comentarios relacionados
}
```

### Ejemplo de objeto Case

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e3",
  "caseNumber": "CASE-2025-001",
  "assignedAgent": "665f1e2b8e4b2a001e7e7e7e",
  "createdBy": "665f1e2b8e4b2a001e7e7e7f",
  "status": "open",
  "subject": "Consulta sobre contrato",
  "description": "El cliente consulta sobre la renovación de su contrato.",
  "priority": "medium",
  "createdAt": "2025-06-30T12:00:00.000Z",
  "resolvedAt": null,
  "comments": ["66a1b2c3d4e5f6a7b8c9d0e4"]
}
```

### Relaciones

- `assignedAgent` y `createdBy` referencian a usuarios (`User`).
- `comments` referencia a comentarios (`Comment`).

---

## Crm - Comments

### Descripción

El submódulo Comments del módulo Crm gestiona los comentarios asociados a casos, permitiendo registrar y consultar mensajes vinculados a un caso específico.

### Endpoints

- `POST /api/v1/comments`  
  Crea un nuevo comentario en un caso.
- `GET /api/v1/comments/case/:caseId`  
  Lista todos los comentarios de un caso específico.

### DTOs

#### CreateCommentDto

```typescript
export class CreateCommentDto {}
```

#### UpdateCommentDto

```typescript
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
```

### Entity

#### Comment

```typescript
@Schema()
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  case: Types.ObjectId; // El caso al que pertenece el comentario
}
```

### Ejemplo de objeto Comment

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e4",
  "createdBy": "665f1e2b8e4b2a001e7e7e7e",
  "message": "El cliente envió documentación adicional.",
  "createdAt": "2025-06-30T13:00:00.000Z",
  "case": "66a1b2c3d4e5f6a7b8c9d0e3"
}
```

### Relaciones

- `createdBy` referencia a un usuario (`User`).
- `case` referencia a un caso (`Case`).

---

## Crm - Events

### Descripción

El submódulo Events del módulo Crm gestiona los eventos asociados a casos, permitiendo registrar y consultar acciones o cambios de estado vinculados a un caso específico.

### Endpoints

- `POST /api/v1/events`  
  Crea un nuevo evento en un caso.
- `GET /api/v1/events/case/:caseId`  
  Lista todos los eventos de un caso específico.

### DTOs

#### CreateEventDto

```typescript
export class CreateEventDto {}
```

#### UpdateEventDto

```typescript
export class UpdateEventDto extends PartialType(CreateEventDto) {}
```

### Entity

#### CaseEvent

```typescript
@Schema()
export class CaseEvent extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Case', required: true })
  caseId: Types.ObjectId;

  @Prop({ required: true })
  eventType: string; // Tipo de evento (Cambio de estado, reasignación, etc.)

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}
```

### Ejemplo de objeto CaseEvent

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e5",
  "caseId": "66a1b2c3d4e5f6a7b8c9d0e3",
  "eventType": "Cambio de estado",
  "createdBy": "665f1e2b8e4b2a001e7e7e7e",
  "createdAt": "2025-06-30T14:00:00.000Z"
}
```

### Relaciones

- `caseId` referencia a un caso (`Case`).
- `createdBy` referencia a un usuario (`User`).

---

## Reconciliation

### Descripción

El módulo Reconciliation está destinado a la conciliación de movimientos contables, permitiendo crear, consultar, actualizar y eliminar procesos de conciliación. Actualmente, la definición de la entidad y los DTOs es vacía, por lo que la estructura y campos deben ser definidos por el equipo backend según la evolución del módulo.

### Endpoints

- `POST /api/v1/reconciliation`  
  Crea un nuevo proceso de conciliación.
- `GET /api/v1/reconciliation`  
  Lista todos los procesos de conciliación.
- `GET /api/v1/reconciliation/:id`  
  Obtiene un proceso de conciliación por su ID.
- `PATCH /api/v1/reconciliation/:id`  
  Actualiza un proceso de conciliación existente.
- `DELETE /api/v1/reconciliation/:id`  
  Elimina un proceso de conciliación.

### DTOs

#### CreateReconciliationDto

```typescript
export class CreateReconciliationDto {}
```

#### UpdateReconciliationDto

```typescript
export class UpdateReconciliationDto extends PartialType(
  CreateReconciliationDto,
) {}
```

### Entity

#### Reconciliation

```typescript
export class Reconciliation {}
```

### Ejemplo

Actualmente no hay campos definidos. Consultar con backend para estructura y ejemplos cuando el módulo esté implementado.

---

## Tickets

### Descripción

El módulo Tickets gestiona la emisión y registro de tickets de cobro y liquidación, permitiendo asociar pagos a asientos contables y registrar detalles de cada transacción.

### Endpoints

- `POST /api/v1/tickets/create`  
  Crea un nuevo ticket de cobro o liquidación.
- `GET /api/v1/tickets`  
  Lista todos los tickets.
- `GET /api/v1/tickets/:ticketId/details`  
  Obtiene el detalle de un ticket por su ID.
- `DELETE /api/v1/tickets/:id`  
  Elimina un ticket.

### DTOs

#### CreateTicketDto

```typescript
class PaymentDetailDto {
  @IsNotEmpty()
  accountEntryId: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number; // Monto del pago

  @IsNotEmpty()
  @IsString()
  method: string; // Método de pago

  @IsNotEmpty()
  @IsString()
  description: string; // Descripción del pago

  @IsNotEmpty()
  paymentDate: Date; // Fecha en que se realiza el pago
}

export class CreateTicketDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(['receipt', 'settlement'])
  type: 'receipt' | 'settlement'; // Tipo de ticket

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  issuedDate: Date; // Fecha de emisión

  @IsNotEmpty()
  @IsString()
  paymentMethod: string; // Método de pago

  @IsNotEmpty()
  @IsString()
  paidBy: string | Types.ObjectId; // Quien realiza el pago

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PaymentDetailDto)
  paymentDetails: PaymentDetailDto[]; // Detalles de los pagos

  @IsOptional()
  @IsMongoId()
  createdBy: Types.ObjectId; // Usuario que creó la entrada
}
```

#### UpdateTicketDto

```typescript
export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
```

#### TicketWithDetailsDto

```typescript
export class AccountEntryDetailDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  description: string;

  @Expose()
  amount: number;
}

export class TicketWithDetailsDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  type: string;

  @Expose()
  issuedDate: Date;

  @Expose()
  totalAmount: number;

  @Expose()
  createdBy: Types.ObjectId;

  @Expose()
  number: string;

  @Expose()
  paymentMethod: string;

  @Expose()
  @Type(() => AccountEntryDetailDto)
  accountEntries: AccountEntryDetailDto[];
}
```

### Entity

#### Ticket

```typescript
@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  type: 'receipt' | 'settlement'; // Tipo de ticket

  @Prop({ required: true })
  issuedDate: Date; // Fecha de emisión

  @Prop({ required: true })
  totalAmount: number; // Monto total del ticket

  @Prop({ required: true })
  createdBy: Types.ObjectId; // Usuario que generó el ticket

  @Prop({ required: true })
  number: string; // Número de ticket

  @Prop({ required: true })
  paymentMethod: string; // Método de pago

  @Prop({ type: Date, default: Date.now })
  createdAt: Date; // Fecha de creación

  @Prop([{ type: TicketDetailSchema }])
  accountEntries: TicketDetail[]; // Detalles de los tickets asociados
}
```

#### TicketDetail (subdocumento)

```typescript
@Schema()
export class TicketDetail {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  method: string;

  @Prop({ type: Types.ObjectId, ref: 'Ticket' })
  ticketId: Types.ObjectId;

  @Prop({ required: true })
  type: 'receipt' | 'settlement';
}
```

### Ejemplo de creación de ticket

**Request**

```json
POST /api/v1/tickets/create
{
  "type": "receipt",
  "issuedDate": "2025-07-01T00:00:00.000Z",
  "paymentMethod": "Transferencia",
  "paidBy": "665f1e2b8e4b2a001e7e7e7f",
  "paymentDetails": [
    {
      "accountEntryId": "66a1b2c3d4e5f6a7b8c9d0e1",
      "amount": 10000,
      "method": "Transferencia",
      "description": "Pago de alquiler julio",
      "paymentDate": "2025-07-01T00:00:00.000Z"
    }
  ],
  "createdBy": "665f1e2b8e4b2a001e7e7e7e"
}
```

**Response**

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e6",
  "type": "receipt",
  "issuedDate": "2025-07-01T00:00:00.000Z",
  "totalAmount": 10000,
  "createdBy": "665f1e2b8e4b2a001e7e7e7e",
  "number": "TCK-2025-001",
  "paymentMethod": "Transferencia",
  "accountEntries": [
    {
      "_id": "66a1b2c3d4e5f6a7b8c9d0e7",
      "description": "Pago de alquiler julio",
      "amount": 10000
    }
  ]
}
```

### Relaciones

- `createdBy` referencia a un usuario (`User`).
- `accountEntries` referencia a detalles de asientos contables (`TicketDetail`).
- `paymentDetails.accountEntryId` referencia a un asiento contable (`AccountEntry`).

---

## UpdateIndex

### Descripción

El módulo UpdateIndex gestiona los índices de actualización de contratos, permitiendo crear, consultar, actualizar y eliminar índices como ICL, IPC, Casa Propia, etc. Soporta índices fijos y variables, con integración opcional a fuentes externas.

### Endpoints

- `POST /api/v1/update-index`  
  Crea un nuevo índice de actualización.
- `GET /api/v1/update-index`  
  Lista todos los índices de actualización.
- `GET /api/v1/update-index/:id`  
  Obtiene un índice de actualización por su ID.
- `PATCH /api/v1/update-index/:id`  
  Actualiza un índice de actualización existente.
- `DELETE /api/v1/update-index/:id`  
  Elimina un índice de actualización.

### DTOs

#### CreateUpdateIndexDto

```typescript
export class CreateUpdateIndexDto {
  @IsNotEmpty()
  @IsString()
  name: string; // Nombre del índice de actualización (Ej. "ICL", "IPC", "Casa Propia")

  @IsNotEmpty()
  @IsString()
  description: string; // Descripción del índice

  @IsOptional()
  @IsEnum(['fixed', 'variable'])
  type: string; // Tipo de aumento (fijo o variable)

  @IsOptional()
  @IsNumber()
  fixedRate?: number; // Tasa fija de aumento (opcional, solo si el tipo es "fixed")

  @IsOptional()
  @IsString()
  externalSourceUrl?: string; // URL de la fuente externa (opcional, solo si es variable)

  @IsOptional()
  @IsNumber()
  lastValue?: number; // Último valor registrado (opcional, solo si es variable)

  @IsOptional()
  @IsString()
  lastUpdate?: Date; // Última fecha de actualización (opcional)
}
```

#### UpdateUpdateIndexDto

```typescript
export class UpdateUpdateIndexDto extends PartialType(CreateUpdateIndexDto) {}
```

### Entity

#### UpdateIndex

```typescript
@Schema()
export class UpdateIndex extends Document {
  @Prop({ required: true })
  name: string; // Nombre del índice (Ej. "ICL", "IPC", "Casa Propia")

  @Prop({ required: true })
  description: string; // Descripción del índice

  @Prop({ required: true, enum: ['fixed', 'variable'] })
  type: string; // Tipo de índice ("fixed" para fijo, "variable" para variable)

  @Prop({ required: false })
  fixedRate?: number; // Tasa fija de aumento (solo si el tipo es "fixed")

  @Prop({ required: false })
  externalSourceUrl?: string; // URL de la fuente externa para los índices variables

  @Prop({ required: false })
  lastValue?: number; // Último valor registrado para el índice variable

  @Prop({ required: false })
  lastUpdate?: Date; // Última fecha de actualización del índice variable

  @Prop({ default: Date.now })
  createdAt: Date; // Fecha de creación del índice

  @Prop({ default: Date.now })
  updatedAt: Date; // Fecha de última actualización del índice
}
```

### Ejemplo de índice de actualización

**Request**

```json
POST /api/v1/update-index
{
  "name": "ICL",
  "description": "Índice de Contrato Locativo",
  "type": "variable",
  "externalSourceUrl": "https://bna.com.ar/icl",
  "lastValue": 1.234,
  "lastUpdate": "2025-06-01T00:00:00.000Z"
}
```

**Response**

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e8",
  "name": "ICL",
  "description": "Índice de Contrato Locativo",
  "type": "variable",
  "externalSourceUrl": "https://bna.com.ar/icl",
  "lastValue": 1.234,
  "lastUpdate": "2025-06-01T00:00:00.000Z",
  "createdAt": "2025-06-30T15:00:00.000Z",
  "updatedAt": "2025-06-30T15:00:00.000Z"
}
```

### Relaciones

- No tiene referencias directas a otras colecciones.

---

# Documentación Colección Blog

Colección: blog

Campos principales:

- \_id: string (MongoId)
- title: string (Título del artículo, requerido)
- content: string (Contenido completo, requerido)
- author: string/objeto (ID o datos del autor, requerido)
- categories: array de string (Categorías, opcional)
- tags: array de string (Etiquetas, opcional)
- published: boolean (Publicado o no)
- createdAt: string (Fecha de creación, ISO)
- updatedAt: string (Fecha de última modificación, ISO)

---

Endpoints:

- POST /api/v1/blog (Crear artículo)
- GET /api/v1/blog/:id (Obtener artículo por ID)
- PATCH /api/v1/blog/:id (Modificar artículo)
- DELETE /api/v1/blog/:id (Eliminar artículo)
- GET /api/v1/blog?page=1&limit=10 (Listar artículos paginados)
- GET /api/v1/blog/public?page=1&limit=10 (Listar artículos públicos)
- GET /api/v1/blog/public/recent (Listar artículos recientes públicos)
- GET /api/v1/blog/stats/categories (Estadísticas por categoría)

---

Ejemplo de alta (POST):

URL:
POST http://localhost:3050/api/v1/blog

Body:

```json
{
  "title": "Novedades Agosto 2025",
  "content": "Este mes lanzamos nuevas funcionalidades...",
  "author": "665f1e2b8e4b2a001e7e7e7e",
  "categories": ["novedades", "actualizaciones"],
  "tags": ["release", "agosto"],
  "published": true
}
```

Respuesta:

```json
{
  "_id": "66b1c2e8b2e4a2a1b2c3d4e5",
  "title": "Novedades Agosto 2025",
  "content": "Este mes lanzamos nuevas funcionalidades...",
  "author": {
    "_id": "665f1e2b8e4b2a001e7e7e7e",
    "name": "Juan",
    "lastName": "Pérez"
  },
  "categories": ["novedades", "actualizaciones"],
  "tags": ["release", "agosto"],
  "published": true,
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:00:00.000Z"
}
```

---

Ejemplo de modificación (PATCH):

URL:
PATCH http://localhost:3050/api/v1/blog/66b1c2e8b2e4a2a1b2c3d4e5

Body:

```json
{
  "content": "Actualización: se corrigieron errores menores.",
  "tags": ["release", "agosto", "fix"]
}
```

Respuesta:

```json
{
  "_id": "66b1c2e8b2e4a2a1b2c3d4e5",
  "title": "Novedades Agosto 2025",
  "content": "Actualización: se corrigieron errores menores.",
  "author": {
    "_id": "665f1e2b8e4b2a001e7e7e7e",
    "name": "Juan",
    "lastName": "Pérez"
  },
  "categories": ["novedades", "actualizaciones"],
  "tags": ["release", "agosto", "fix"],
  "published": true,
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:10:00.000Z"
}
```

---

Ejemplo de borrado (DELETE):

URL:
DELETE http://localhost:3050/api/v1/blog/66b1c2e8b2e4a2a1b2c3d4e5

Respuesta:

```json
{
  "deleted": true
}
```

---

Ejemplo de consulta por ID (GET):

URL:
GET http://localhost:3050/api/v1/blog/66b1c2e8b2e4a2a1b2c3d4e5

Respuesta:

```json
{
  "_id": "66b1c2e8b2e4a2a1b2c3d4e5",
  "title": "Novedades Agosto 2025",
  "content": "Actualización: se corrigieron errores menores.",
  "author": {
    "_id": "665f1e2b8e4b2a001e7e7e7e",
    "name": "Juan",
    "lastName": "Pérez"
  },
  "categories": ["novedades", "actualizaciones"],
  "tags": ["release", "agosto", "fix"],
  "published": true,
  "createdAt": "2025-08-04T12:00:00.000Z",
  "updatedAt": "2025-08-04T12:10:00.000Z"
}
```

---

Ejemplo de listado y paginación:

URL:
GET http://localhost:3050/api/v1/blog?page=2&limit=5

Respuesta:

```json
{
  "data": [
    {
      "_id": "66b1c2e8b2e4a2a1b2c3d4e5",
      "title": "Novedades Agosto 2025",
      "author": {
        "_id": "665f1e2b8e4b2a001e7e7e7e",
        "name": "Juan"
      }
    }
    // ...más artículos...
  ],
  "meta": {
    "totalItems": 20,
    "itemCount": 5,
    "itemsPerPage": 5,
    "totalPages": 4,
    "currentPage": 2
  }
}
```

---

DTO para alta/modificación:

    title: string // Título (requerido)
    content: string // Contenido (requerido)
    author: string // ID de autor (requerido)
    categories?: string[] // Categorías (opcional)
    tags?: string[] // Etiquetas (opcional)
    published?: boolean // Estado de publicación (opcional)

Entity:

    _id: string
    title: string
    content: string
    author: {
        _id: string
        name: string
        lastName: string
    }
    categories?: string[]
    tags?: string[]
    published: boolean
    createdAt: string
    updatedAt: string

---

Errores comunes:

- Todos los campos obligatorios deben ser enviados, de lo contrario la API devolverá error 400.
- El título debe ser único, si ya existe la API devolverá error 409.
- Los IDs de autor deben existir en la base de datos.
- La paginación se realiza con los parámetros page y limit.
- Las respuestas incluyen metadatos de paginación cuando corresponda.

Ejemplo de error por campo faltante:

```json
{
"statusCode": 400,
"message": ["title should not be empty"],
"error": "Bad Request"
}

Ejemplo de error por título duplicado:
{
"statusCode": 409,
"message": "Blog title already exists",
"error": "Conflict"
}
```
