# Manual de Uso del Frontend - Autenticación y Roles

Este manual proporciona ejemplos prácticos para implementar la autenticación de usuarios y la gestión de roles en el frontend, utilizando el sistema de autenticación del backend y los endpoints relacionados.

## 🎯 Endpoints Clave

### Recuperar contraseña (Forgot Password)

```
POST /api/v1/auth/forgot-password
```

**Body:**

```json
{
  "email": "usuario@dominio.com"
}
```

**Respuesta exitosa:**

```json
{
  "message": "Si el email existe, se ha enviado un enlace para restablecer la contraseña."
}
```

---

### Restablecer contraseña (Reset Password)

```
POST /api/v1/auth/reset-password
```

**Body:**

```json
{
  "token": "token-de-reset",
  "newPassword": "NuevaPassword123"
}
```

**Respuesta exitosa:**

```json
{
  "message": "Contraseña restablecida correctamente."
}
```

---

### Login

```
POST /api/v1/auth/login
```

**Body:**

```json
{
  "email": "usuario@dominio.com",
  "password": "********",
  "rememberMe": false
}
```

> **Nota:** El campo `rememberMe` es obligatorio y debe ser booleano. Controla si la sesión debe persistir tras cerrar el navegador.

**DTO literal:**

```typescript
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  rememberMe: boolean;
}
```

**Respuesta exitosa:**

```json
{
  "access_token": "jwt-token",
  "user": {
    "id": "123",
    "name": "Juan Pérez",
    "roles": ["admin", "editor"]
  }
}
```

### Obtener Perfil

```
GET /api/v1/auth/profile
```

**Autenticación requerida:** Bearer Token

### Validar Token / Chequear Estado de Sesión

```
POST /api/v1/auth/check-auth-status
```

**Autenticación requerida:** Bearer Token

**Descripción:**
Este endpoint permite validar si un token JWT es válido y obtener el usuario autenticado. Es el método recomendado para que el frontend verifique la sesión y recupere el usuario actual.

**Request:**

```
POST /api/v1/auth/check-auth-status
Authorization: Bearer <jwt-token>
```

**Respuesta exitosa:**

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

- Si el token es inválido o expiró, responde 401 Unauthorized.
- El backend valida el token y retorna el usuario actual.

**Uso recomendado:**

- Llamar a este endpoint al iniciar la app o refrescar la página para validar la sesión y obtener el usuario.
- Si la respuesta es 401, limpiar el estado y redirigir a login.

---

## 📝 Casos de Uso Principales

1. **Login de usuario** - Obtener y guardar el token JWT.
2. **Persistencia de sesión** - Mantener el usuario autenticado entre recargas.
3. **Verificación de roles** - Mostrar u ocultar funcionalidades según el rol.
4. **Logout** - Eliminar el token y limpiar el estado.

---

## La URL para el caso de acceso remoto es https://api.netra.com.ar/api/v1

## 🔧 Implementación con React y Axios

### 1. Configuración del Servicio de Auth

```javascript
// services/auth.js
import axios from 'axios';

const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:3050/api/v1';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (email, password, rememberMe) => {
  const response = await api.post('/auth/login', {
    email,
    password,
    rememberMe,
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
};

export default api;
```

### 2. Contexto de Autenticación

```javascript
// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { login, getProfile } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      getProfile()
        .then((data) => {
          setUser(data.user);
          setRoles(data.user.roles || []);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (email, password, rememberMe) => {
    const data = await login(email, password, rememberMe);
    localStorage.setItem('authToken', data.access_token);
    setUser(data.user);
    setRoles(data.user.roles || []);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setRoles([]);
  };

  return (
    <AuthContext.Provider
      value={{ user, roles, loading, login: handleLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Uso de Roles en Componentes

```javascript
// components/ProtectedRoute.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, roles, loading } = useContext(AuthContext);

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No autenticado</div>;
  if (allowedRoles && !roles.some((role) => allowedRoles.includes(role))) {
    return <div>Acceso denegado</div>;
  }
  return children;
};

export default ProtectedRoute;
```

**Ejemplo de uso:**

```javascript
<ProtectedRoute allowedRoles={['admin', 'editor']}>
  <AdminPanel />
</ProtectedRoute>
```

### 4. Mostrar/Ocultar Funcionalidades por Rol

```javascript
// components/Navbar.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, roles, logout } = useContext(AuthContext);

  return (
    <nav>
      {user && <span>Bienvenido, {user.name}</span>}
      {roles.includes('admin') && <a href="/admin">Admin</a>}
      <button onClick={logout}>Cerrar sesión</button>
    </nav>
  );
};

export default Navbar;
```

---

## 🚀 Buenas Prácticas

- **Guarda el token JWT** en `localStorage` o `sessionStorage`.
- **Incluye siempre el token** en el header `Authorization` para requests autenticadas.
- **Nunca muestres información sensible** si el usuario no tiene el rol adecuado.
- **Actualiza el estado global** de usuario y roles tras login/logout.
- **Destruye el token** al hacer logout.

---

## 🔍 Testing

```javascript
// __tests__/AuthContext.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, AuthContext } from '../context/AuthContext';

test('debe mostrar el nombre del usuario autenticado', async () => {
  // Mock de getProfile y login aquí...
});
```

---

## 🎯 Consideraciones Importantes

### Seguridad

- El backend valida los roles y permisos en cada endpoint.
- El frontend solo controla la visibilidad de la UI, no la seguridad real.
- El token puede expirar: maneja expiración y refresco si aplica.

### UX/UI

- Muestra estados de carga y error.
- Informa claramente si el usuario no tiene permisos.

### Accesibilidad

- Usa mensajes claros para accesos denegados.
- Mantén la navegación accesible para todos los usuarios.

¿Necesitas ejemplos para frameworks distintos o integración con otras librerías?
