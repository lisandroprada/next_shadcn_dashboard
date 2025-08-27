# Manual Único de Uso Frontend: Colección Party

Este documento es la referencia oficial y única para el uso de la colección `party` desde el frontend. Incluye autenticación, paginación, endpoints, ejemplos de consulta, entity para tipado y buenas prácticas.

---

## 1. Autenticación

Todos los endpoints requieren autenticación por JWT. Incluye el token en el header:

```
Authorization: Bearer <jwt-token>
```

Para obtener el token, realiza login:

**POST /api/v1/auth/login**

```json
{
  "email": "usuario@dominio.com",
  "password": "********",
  "rememberMe": false
}
```

Respuesta:

```json
{
  "access_token": "jwt-token",
  "user": { "id": "123", "name": "Juan Pérez", "roles": ["admin", "owner"] }
}
```

Para validar sesión:
**POST /api/v1/auth/check-auth-status**

---

## 2. Entity TypeScript (Party)

```typescript
export interface BankAccount {
  bank: string;
  cbu: string;
  bankId?: string;
  description?: string;
}

export interface ConsortiumDetail {
  expenseName: string;
  expenseAmount: number;
  consortiumId: string;
}

export interface Phone {
  number: string;
  type: 'home' | 'work' | 'whatsapp' | 'other';
}

export interface Agent {
  fullName: string;
  address?: string;
  email?: string;
  gender?: 'Male' | 'Female' | 'Non-binary';
  identityCard?: string;
  locality?: string;
  province?: string;
}

export interface Party {
  _id: string;
  agentType:
    | 'Client'
    | 'Supplier'
    | 'ServiceCompany'
    | 'Consortium'
    | 'Agency'
    | 'Real Estate';
  personType: 'Individual' | 'Legal Entity';
  name: string;
  lastName?: string;
  gender?: 'Female' | 'Male' | 'Non-binary';
  maritalStatus?: string;
  postalCode?: string;
  locality?: string;
  province?: string;
  email: string;
  bankAccounts?: BankAccount[];
  photo?: string;
  uid?: string;
  identityCard: string;
  taxId?: string;
  taxType?: string;
  taxIdType?: string;
  taxAddress?: string;
  address?: string;
  workAddress?: string;
  iva?: string;
  billing?: boolean;
  supplierMask?: string;
  consortiumDetails?: ConsortiumDetail[];
  phone?: Phone[];
  active?: boolean;
  createdAt?: Date;
  agent?: Agent;
  user?: string;
  fullName?: string;
}
```

---

## 3. Endpoints y Ejemplos

### Crear persona/propietario

**POST /api/v1/party**
Body:

```json
{
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "123456789",
  "roles": ["owner"]
}
```

Respuesta:

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e7f",
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "123456789",
  "roles": ["owner"]
}
```

### Obtener persona/propietario

**GET /api/v1/party/:id**
Respuesta:

```json
{
  "_id": "665f1e2b8e4b2a001e7e7e7f",
  "name": "Juan",
  "lastName": "Pérez",
  "identityCard": "12345678",
  "email": "juan@test.com",
  "phone": "123456789",
  "roles": ["owner"]
}
```

### Editar persona/propietario

**PUT /api/v1/party/:id**
Body igual al POST.

### Eliminar persona/propietario

**DELETE /api/v1/party/:id**
Respuesta:

```json
{
  "deleted": true
}
```

### Buscar propietarios (autocomplete y multi-select)

**GET /api/v1/party/search/owners?q={término}&limit={límite}**
Parámetros:

- `q`: término de búsqueda (nombre, apellido, DNI, email, etc.)
- `limit`: cantidad máxima de resultados (por defecto 10, máximo 50)
  Respuesta:

```json
[
  {
    "id": "1",
    "label": "Juan Pérez",
    "identityCard": "12345678",
    "email": "juan@test.com"
  }
]
```

### Paginación de resultados

Si el endpoint soporta paginación, se usa:
**GET /api/v1/party?page=1&limit=20**
Respuesta:

```json
{
  "items": [ ...Party[] ],
  "total": 100,
  "page": 1,
  "limit": 20
}
```

---

## 4. Ejemplos de integración (React + Axios)

```javascript
import api from './api';

export const searchOwners = async (query, limit = 10) => {
  const response = await api.get('/party/search/owners', {
    params: { q: query, limit },
  });
  return response.data;
};

export const getPartyById = async (id) => {
  const response = await api.get(`/party/${id}`);
  return response.data;
};

export const createParty = async (data) => {
  const response = await api.post('/party', data);
  return response.data;
};

export const updateParty = async (id, data) => {
  const response = await api.put(`/party/${id}`, data);
  return response.data;
};

export const deleteParty = async (id) => {
  const response = await api.delete(`/party/${id}`);
  return response.data;
};
```

---

## 5. Buenas Prácticas

- Valida unicidad de DNI/email en frontend y backend.
- Usa debounce y cache en búsquedas.
- Limita los resultados de búsqueda.
- Muestra estados de carga y error.
- Implementa paginación en listados grandes.
- Usa roles para distinguir propietarios de otros tipos de persona.
- Implementa accesibilidad (ARIA, screen reader).
- Muestra mensajes claros de error y éxito.
- Es responsive para móviles.

---

## 6. Testing

Incluye tests con Jest y React Testing Library para componentes clave como OwnerAutocomplete y formularios de alta/edición.

---

## 7. Consideraciones Finales

- Este documento es la única fuente de verdad para el uso de la colección party en frontend.
- Si tienes dudas o necesitas ejemplos adicionales, consulta aquí antes de preguntar.
