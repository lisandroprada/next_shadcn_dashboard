# API Endpoints para Dashboard/KPI

Esta documentación describe los endpoints REST del backend que proveen datos para el dashboard y KPIs del sistema. Incluye ejemplos de uso y respuesta para facilitar la integración con el frontend.

---

## Propietarios

### Contar propietarios

- **Endpoint:** `GET /party/count`
- **Auth:** No requiere autenticación
- **Descripción:** Devuelve el total de propietarios registrados.
- **Ejemplo de respuesta:**

```json
{ "count": 123 }
```

---

## Propiedades

### Contar propiedades

- **Endpoint:** `GET /property/count`
- **Auth:** No requiere autenticación
- **Descripción:** Devuelve el total de propiedades registradas.
- **Ejemplo de respuesta:**

```json
{ "count": 456 }
```

### Contar propiedades en venta

- **Endpoint:** `GET /property/count?sale=true`
- **Auth:** No requiere autenticación
- **Descripción:** Devuelve el total de propiedades publicadas para venta.
- **Ejemplo de respuesta:**

```json
{ "count": 78 }
```

### Contar propiedades en alquiler

- **Endpoint:** `GET /property/count?rent=true`
- **Auth:** No requiere autenticación
- **Descripción:** Devuelve el total de propiedades publicadas para alquiler.
- **Ejemplo de respuesta:**

```json
{ "count": 45 }
```

---

## Notas para el Frontend

- Todos los endpoints devuelven un objeto con la propiedad `count`.
- Los endpoints son públicos y pueden ser consumidos directamente.
- Para KPIs más avanzados (promedios, tendencias, etc.), se recomienda centralizar la lógica en el módulo `kpi` y documentar los endpoints adicionales.

---

## Ejemplo de integración (fetch en JS)

```js
const res = await fetch('/property/count?sale=true');
const data = await res.json();
console.log('Propiedades en venta:', data.count);
```

---

## Futuras extensiones

- Agregar endpoints para estadísticas agregadas, tendencias mensuales/semanales, últimos registros, etc.
- Proteger endpoints con autenticación si se requiere privacidad.

---

**Actualizado:** Agosto 2025
