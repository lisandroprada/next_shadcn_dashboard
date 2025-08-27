# Appraisal API – Guía Técnica para Frontend (100% fiel al código)

Fecha: 2025-08-14
Ámbito: documento exhaustivo que describe el módulo de Tasaciones (Appraisal) tal como está implementado en `main`.

## 1) Base de la API

- Host local por defecto: `http://localhost:3050`
- Prefijo global: `/api/v1`
- Base completa: `http://localhost:3050/api/v1`
- CORS (habilitado en backend):
  - Orígenes permitidos: `http://localhost:3000`, `http://localhost:5174`, `http://localhost:3001`, `http://localhost:3002`, `https://backoffice.netra.com.ar`, `https://backend.netra.com.ar`, `https://www.ipropietas.com.ar`, `https://ipropietas.com.ar`
  - Métodos: `GET, POST, PUT, DELETE, PATCH, OPTIONS`
  - Credenciales: `true`

## 2) Autenticación

- El endpoint de tasación NO requiere autenticación JWT en esta versión (no hay guard aplicado).
- Aun así, se recomienda no exponerlo indiscriminadamente en UI pública.

## 3) Endpoint disponible (clases/métodos exactos)

- NestJS Controller: `AppraisalController` (`src/modules/appraisal/appraisal.controller.ts`)
- NestJS Service: `AppraisalService` (`src/modules/appraisal/appraisal.service.ts`)
- DTO opcional de body: `AppraiseOptionsDto` (`src/modules/appraisal/dto/appraise-options.dto.ts`)

- Crear y devolver una tasación para una propiedad existente
  - Método: `POST`
  - Ruta: `/appraisal/{propertyId}/appraise`
  - URL (local): `http://localhost:3050/api/v1/appraisal/{propertyId}/appraise`
  - Path param obligatorio:
    - `propertyId`: string (ObjectId de Mongo válido) de una propiedad existente.
  - Body: opcional (`AppraiseOptionsDto`, ver sección 7.3)
  - Headers obligatorios: `Content-Type: application/json`

No existen otros endpoints públicos del módulo `appraisal` en este commit (los GET/DELETE están comentados).

## 4) Requisitos estrictos de la propiedad antes de tasar

El backend valida estos campos y retorna 400 si falta alguno:

- A nivel raíz de `Property`:
  - `address`: string no vacío
  - `province`: ObjectId válido
  - `locality`: ObjectId válido
  - `lat`: number
  - `lng`: number
  - `type`: uno de `['departamento','casa','ph','oficina','local_comercial','galpon','lote','quinta','chacra','estudio','loft','duplex','triplex']`
- En `detailedDescription` (objeto anidado):
  - `sqFt`: number (debe ser > 0; si es 0 fallará la validación por truthiness)
  - `buildSqFt`: number (debe ser > 0)
  - `age`: number (debe ser > 0)

Campos opcionales que aumentan el `completenessScore` (ver sección 6):

- `detailedDescription.bedrooms > 0`
- `detailedDescription.bathrooms > 0`
- `detailedDescription.rooms > 0`
- `detailedDescription.brief` con longitud > 20
- `img` con al menos 1 elemento
- `associatedServices` con al menos 1 elemento

## 5) Proceso interno (flujo exacto de AppraisalService.appraiseProperty)

1. Busca la propiedad por `propertyId`. Si no existe: 404.
2. Valida los campos mínimos (sección 4). Si falta alguno: 400 con mensaje específico.
3. Calcula `completenessScore` (0–100) según pesos fijos (sección 6).
4. Enriquecimiento:
   - Calcula distancias Haversine a puntos: `centro`, `costa`, `rio`.
   - Analiza `detailedDescription.brief` con Google Gemini para obtener `descriptionScore` (0–100).
     - Si no hay texto => 0.
     - Si la IA falla o responde no numérico => 50 (neutro).
5. Calcula la tasación con `calculateAppraisal(dataForModel, options)` (modelo lineal). Se mapean explícitamente `detailedDescription.buildSqFt`, `detailedDescription.sqFt` y la distancia al centro (`distancias.centro` → `distanciaAlCentro`).
6. Crea y guarda un documento `Appraisal`, devolviendo ese documento como respuesta del POST.

Dependencia operativa crítica: La app necesita `GOOGLE_GEMINI_API_KEY` (env var) configurada para inicializar el servicio NLP. Si falta, el backend no podrá inicializar correctamente el servicio y el proceso de arranque fallará.

## 6) Cálculo del completenessScore (exacto)

Pesos aplicados (suma total = 100):

- bedrooms: 20
- bathrooms: 20
- rooms: 10
- brief (>20 caracteres): 20
- images (`img.length > 0`): 20
- services (`associatedServices.length > 0`): 10

Fórmula:

- `completenessScore = round(100 * (puntos_obtenidos / 100))`
- Ejemplo: si sólo bedrooms, bathrooms e images están presentes => 20+20+20 = 60 => score = 60.

## 7) Modelo de tasación (coeficientes y fórmula; método `calculateAppraisal`)

Coeficientes (configurables por ENV, con defaults):

- `APPRAISAL_COEF_INTERCEPT` (default 30000)
- `APPRAISAL_COEF_BUILD_SQFT` (default 1500) — por m² construido
- `APPRAISAL_COEF_LOT_SQFT` (default 10) — por m² de lote/terreno
- `APPRAISAL_COEF_AGE` (default -1500) — por año de antigüedad
- `APPRAISAL_COEF_BEDROOM` (default 5000) — por dormitorio
- `APPRAISAL_COEF_BATHROOM` (default 8000) — por baño
- `APPRAISAL_DISTANCE_COEFF` (default -5000) — por km al centro (ver sección 10)
- `APPRAISAL_COEF_DESC` (default 200) — por punto del score de IA (0–100)
- `APPRAISAL_BONUS_IS_CASA` (default 0) — bonus si `type === 'casa'`

Variables de entrada (estructura `dataForModel`):

- `buildSqFt = property.detailedDescription.buildSqFt` (m² construidos)
- `lotSqFt = property.detailedDescription.sqFt` (m² de terreno/lote)
- `age = property.detailedDescription.age`
- `bedrooms = property.detailedDescription.bedrooms`
- `bathrooms = property.detailedDescription.bathrooms`
- `type = property.type`
- `distanciaAlCentro = distancia calculada a 'centro' (km, con tope por ENV)`
- `descriptionScore = score de IA (0–100; si falla IA se usa 50)`
- `completenessScore = ver sección 6`

Fórmula del monto estimado (antes de redondeo y acotaciones):

```
estimatedAmount = INTERCEPT
  + COEF_BUILD * (buildSqFt ?? 0)
  + COEF_LOT * (lotSqFt ?? 0)
  + COEF_AGE * (age ?? 0)
  + COEF_BED * (bedrooms ?? 0)
  + COEF_BATH * (bathrooms ?? 0)
  + COEF_DISTANCE * effectiveDistanceKm
  + COEF_DESC * (descriptionScore ?? 50)
  + BONUS_IS_CASA * (type === 'casa' ? 1 : 0)
```

- Distancia efectiva: `effectiveDistanceKm = min(distanciaAlCentro, APPRAISAL_MAX_DISTANCE_KM)`
- Límite inferior: `estimatedAmount = max(0, estimatedAmount)`
- Moneda: `USD` (redondeado a entero)

Modificadores por request (opcionales, ver sección 12):

- `conditionScore` (0..100): factor multiplicativo con piso `APPRAISAL_CONDITION_FACTOR_MIN` (default 0.6)
- `needsRemodel` (boolean): penalización `APPRAISAL_REMODEL_PENALTY_PCT` (default 0.1)
- `marketAdjustmentPct` (-50..50): multiplicador final
- `clampMaxPerBuildSqFt`, `clampMaxPerLotSqFt`: tope de USD por m² aplicado a los términos lineales

## 8) Contrato de respuesta (JSON exacto)

Status esperado en éxito: `201 Created` (comportamiento Nest por POST) con el documento `Appraisal` persistido.

Campos del objeto devuelto:

- `propertyId`: string (ObjectId de la propiedad)
- `appraisalDate`: string (ISO 8601). Se inicializa como `Date.now() - 3h` respecto al servidor.
- `completenessScore`: number (0–100)
- `estimatedValue`:
  - `amount`: number (entero)
  - `currency`: `'USD' | 'ARS'` (en este commit: siempre `'USD'`)
- `confidenceInterval`:
  - `minAmount`: number (entero)
  - `maxAmount`: number (entero)
  - `currency`: `'USD' | 'ARS'` (en este commit: siempre `'USD'`)
- `notes`: string (opcional; texto fijo con el score)

Además, la respuesta incluye `calculationDetails` con:

- `inputs`, `coefficients`, `terms`, `totals`, y `modifiers` (si se usaron opciones).

Ejemplo (valores ilustrativos):

```json
{
  "propertyId": "66bc0c2f9fd0a2a3fbc7d2e1",
  "appraisalDate": "2025-08-13T15:21:33.123Z",
  "completenessScore": 80,
  "estimatedValue": { "amount": 245000, "currency": "USD" },
  "confidenceInterval": {
    "minAmount": 220500,
    "maxAmount": 269500,
    "currency": "USD"
  },
  "notes": "Tasación generada con un score de completitud del 80%."
}
```

## 9) Errores (formatos exactos)

- `404 Not Found`

  - Causa: propiedad inexistente
  - Body:
    ```json
    {
      "statusCode": 404,
      "message": "La propiedad con ID {id} no fue encontrada.",
      "error": "Not Found"
    }
    ```

- `400 Bad Request` (validaciones de campos mínimos)

  - Mensajes posibles (uno por respuesta):
    - "Falta la dirección de la propiedad."
    - "Faltan datos de ubicación (provincia/localidad)."
    - "Faltan las coordenadas geográficas (latitud/longitud)."
    - "Falta el tipo de propiedad."
    - "Faltan datos de la descripción detallada (superficie o antigüedad)."
  - Body:
    ```json
    {
      "statusCode": 400,
      "message": "<uno de los mensajes anteriores>",
      "error": "Bad Request"
    }
    ```

- Arranque del servidor y clave de IA
  - Si falta `GOOGLE_GEMINI_API_KEY` al iniciar el backend, el servicio NLP no puede construirse y el arranque fallará. Asegurar esta env var en despliegues locales y productivos.
  - Si la clave existe pero la llamada a Gemini falla en runtime, el backend continúa y usa `descriptionScore = 50`.

## 10) Efectos laterales e idempotencia

- Cada POST crea un nuevo documento `Appraisal`. No hay deduplicación ni actualización sobre tasaciones previas.
- Repetir el POST generará múltiples tasaciones para la misma propiedad.

## 11) Rendimiento y dependencias externas

- Llamada a Google Gemini para `descriptionScore`: puede añadir varios segundos de latencia.
- Cálculo de distancias (Haversine) es local y rápido.
- No hay rate limiting específico en este módulo.

## 12) Ejemplos de integración frontend (usa AppraiseOptionsDto opcional)

Axios (TS/JS):

```ts
import axios from 'axios';

const API_BASE = 'http://localhost:3050/api/v1';

export async function appraiseProperty(
  propertyId: string,
  options?: {
    conditionScore?: number;
    needsRemodel?: boolean;
    marketAdjustmentPct?: number;
    clampMaxPerBuildSqFt?: number;
    clampMaxPerLotSqFt?: number;
  },
) {
  const url = `${API_BASE}/appraisal/${propertyId}/appraise`;
  const res = await axios.post(url, options ?? null, {
    withCredentials: true, // opcional (endpoint no requiere JWT)
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data; // objeto Appraisal
}
```

fetch:

```ts
const API_BASE = 'http://localhost:3050/api/v1';

export async function appraiseProperty(
  propertyId: string,
  options?: Record<string, any>,
) {
  const res = await fetch(`${API_BASE}/appraisal/${propertyId}/appraise`, {
    method: 'POST',
    credentials: 'include', // opcional
    headers: { 'Content-Type': 'application/json' },
    body: options ? JSON.stringify(options) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}
```

Manejo recomendado en UI:

- Deshabilitar el botón "Tasar" mientras la promesa está pendiente.
- Mostrar `completenessScore` como indicador de calidad.

# Appraisal API – Guía Técnica para Frontend (100% fiel al código)

Fecha: 2025-08-14
Ámbito: documento exhaustivo que describe el módulo de Tasaciones (Appraisal) tal como está implementado en `main`.

## 1) Base de la API

- Host local por defecto: `http://localhost:3050`
- Prefijo global: `/api/v1`
- Base completa: `http://localhost:3050/api/v1`
- CORS (backend): orígenes permitidos incluyen `http://localhost:3000`, `http://localhost:5174`, `http://localhost:3001`, `http://localhost:3002`, `https://backoffice.netra.com.ar`, `https://backend.netra.com.ar`, `https://www.ipropietas.com.ar`, `https://ipropietas.com.ar`. Métodos: `GET, POST, PUT, DELETE, PATCH, OPTIONS`. Credenciales: `true`.

## 2) Autenticación

- El endpoint de tasación NO requiere JWT en esta versión (sin guard aplicado). Evitar exponerlo en UI pública sin controles.

## 3) Endpoint disponible

- Crear y devolver una tasación para una propiedad existente
  - Método: `POST`
  - Ruta: `/appraisal/{propertyId}/appraise`
  - URL (local): `http://localhost:3050/api/v1/appraisal/{propertyId}/appraise`
  - Path param obligatorio:
    - `propertyId`: string (ObjectId de Mongo válido) de una propiedad existente.
  - Body: opcional (ver sección 7.3)
  - Headers: `Content-Type: application/json`

No hay otros endpoints públicos del módulo `appraisal`.

## 4) Requisitos estrictos de la propiedad antes de tasar

El backend valida y responde 400 si falta alguno:

- A nivel raíz de `Property`:
  - `address`: string
  - `province`: ObjectId
  - `locality`: ObjectId
  - `lat`: number
  - `lng`: number
  - `type`: uno de `['departamento','casa','ph','oficina','local_comercial','galpon','lote','quinta','chacra','estudio','loft','duplex','triplex']`
- En `detailedDescription`:
  - `sqFt`: number > 0 (m² de lote/terreno)
  - `buildSqFt`: number > 0 (m² construidos)
  - `age`: number > 0 (años)

Campos opcionales ponderan el `completenessScore` (sección 6):

- `bedrooms > 0`, `bathrooms > 0`, `rooms > 0`, `brief` (>20 chars), `img.length > 0`, `associatedServices.length > 0`.

## 5) Enriquecimiento de datos

- Distancias: servicio local calcula Haversine a POIs `centro`, `costa`, `rio` (coordenadas por ENV; ver sección 10). El modelo usa `centro` (renombrado a `distanciaAlCentro`).
- NLP (IA): `descriptionScore` (0–100) a partir de `detailedDescription.brief` usando Google Gemini.
  - Si no hay texto: 0.
  - Si la IA falla o devuelve no numérico: 50 (neutro). El arranque requiere `GOOGLE_GEMINI_API_KEY`.

## 6) Cálculo del completenessScore

Pesos (total 100): bedrooms 20, bathrooms 20, rooms 10, brief 20, images 20, services 10. Score = round(100 \* puntos/100).

## 7) Modelo de tasación

### 7.1 Variables de entrada

- buildSqFt = `property.detailedDescription.buildSqFt` (m² construidos)
- lotSqFt = `property.detailedDescription.sqFt` (m² de lote)
- age, bedrooms, bathrooms (desde `detailedDescription`)
- type = `property.type` (si es `'casa'` aplica bonus)
- distanciaAlCentro = distancia en km a `centro` (limitada por ENV)
- descriptionScore = 0–100 (IA; fallback 50)
- completenessScore = 0–100

### 7.2 Coeficientes (ENV con defaults)

- APPRAISAL_COEF_INTERCEPT (default 30000)
- APPRAISAL_COEF_BUILD_SQFT (default 1500)
- APPRAISAL_COEF_LOT_SQFT (default 10)
- APPRAISAL_COEF_AGE (default -1500)
- APPRAISAL_COEF_BEDROOM (default 5000)
- APPRAISAL_COEF_BATHROOM (default 8000)
- APPRAISAL_COEF_DESC (default 200)
- APPRAISAL_BONUS_IS_CASA (default 0)
- APPRAISAL_DISTANCE_COEFF (default -5000)
- APPRAISAL_MAX_DISTANCE_KM (default 50)

### 7.3 Modificadores por request (opcionales)

Body opcional del POST:

{
"conditionScore": number (0..100),
"needsRemodel": boolean,
"marketAdjustmentPct": number (-50..50),
"clampMaxPerBuildSqFt": number (>=0),
"clampMaxPerLotSqFt": number (>=0)
}

Defaults por ENV:

- APPRAISAL_CONDITION_FACTOR_MIN (default 0.6)
- APPRAISAL_REMODEL_PENALTY_PCT (default 0.1)

### 7.4 Fórmula

Términos base:

- intercept = COEF_INTERCEPT
- buildTerm = min(COEF_BUILD, clampMaxPerBuildSqFt||∞) \* (buildSqFt||0)
- lotTerm = min(COEF_LOT, clampMaxPerLotSqFt||∞) \* (lotSqFt||0)
- ageTerm = COEF_AGE \* (age||0)
- bedTerm = COEF_BEDROOM \* (bedrooms||0)
- bathTerm = COEF_BATHROOM \* (bathrooms||0)
- distanceTerm = COEF_DISTANCE \* min(distanciaAlCentro, APPRAISAL_MAX_DISTANCE_KM)
- descTerm = COEF_DESC \* (descriptionScore||50)
- casaTerm = BONUS_IS_CASA \* (type==='casa'?1:0)

Suma base: estimatedRaw = intercept + buildTerm + lotTerm + ageTerm + bedTerm + bathTerm + distanceTerm + descTerm + casaTerm

Modificadores:

- condFactor = conditionScore ? max(0, min(1, condMin + (1-condMin)\*(conditionScore/100))) : 1, con `condMin = APPRAISAL_CONDITION_FACTOR_MIN`
- remodelFactor = needsRemodel ? 1 - clamp(0..0.95, APPRAISAL_REMODEL_PENALTY_PCT) : 1
- marketFactor = 1 + clamp(-0.5..0.5, marketAdjustmentPct)/100

Final: estimated = max(0, estimatedRaw _ condFactor _ remodelFactor \* marketFactor)

Intervalo: errorPercentage = (100 - completenessScore)/1000

- minAmount = estimated \* (1 - errorPercentage)
- maxAmount = estimated \* (1 + errorPercentage)

Moneda: USD. Redondeo: entero.

## 8) Respuesta (201 Created)

Objeto `Appraisal` persistido:

- propertyId: string
- appraisalDate: ISO string (Date now -3h)
- completenessScore: number
- estimatedValue: { amount: number; currency: 'USD' }
- confidenceInterval: { minAmount: number; maxAmount: number; currency: 'USD' }
- notes?: string
- calculationDetails?: object con:
  - inputs: variables de entrada + effectiveDistanceKm
  - coefficients: todos los coeficientes usados
  - terms: cada término de la suma
  - totals: estimatedAmountRaw, estimatedAmountClamped, minAmount, maxAmount
  - modifiers: conditionScore, condMin, condFactor, needsRemodel, remodelPenaltyPct, remodelFactor, marketAdjustmentPct, marketFactor, clampMaxPerBuildSqFt, clampMaxPerLotSqFt, effectiveBuildCoef, effectiveLotCoef

## 9) Errores (formatos exactos)

- 404 Not Found
  ```json
  {
    "statusCode": 404,
    "message": "La propiedad con ID {id} no fue encontrada.",
    "error": "Not Found"
  }
  ```
- 400 Bad Request (validación de campos mínimos)
  ```json
  { "statusCode": 400, "message": "<motivo>", "error": "Bad Request" }
  ```

## 10) Variables de entorno (operación y afinado)

NLP/IA:

- GOOGLE_GEMINI_API_KEY (clave server-side, sin restricción por referrer)
- GOOGLE_GEMINI_MODEL (default: gemini-1.5-flash)

POIs (distancias):

- MAP_POI_CENTRO_LAT/LNG, MAP_POI_COSTA_LAT/LNG, MAP_POI_RIO_LAT/LNG

Distancia (modelo):

- APPRAISAL_MAX_DISTANCE_KM (default 50)
- APPRAISAL_DISTANCE_COEFF (default -5000)

Coeficientes (modelo):

- APPRAISAL_COEF_INTERCEPT, APPRAISAL_COEF_BUILD_SQFT, APPRAISAL_COEF_LOT_SQFT,
  APPRAISAL_COEF_AGE, APPRAISAL_COEF_BEDROOM, APPRAISAL_COEF_BATHROOM,
  APPRAISAL_COEF_DESC, APPRAISAL_BONUS_IS_CASA

Modificadores por request (defaults):

- APPRAISAL_CONDITION_FACTOR_MIN (default 0.6)
- APPRAISAL_REMODEL_PENALTY_PCT (default 0.1)

## 11) Ejemplos de integración (TS)

Axios:

```ts
import axios from 'axios';

const API_BASE = 'http://localhost:3050/api/v1';

export async function appraiseProperty(
  propertyId: string,
  options?: {
    conditionScore?: number;
    needsRemodel?: boolean;
    marketAdjustmentPct?: number;
    clampMaxPerBuildSqFt?: number;
    clampMaxPerLotSqFt?: number;
  },
) {
  const url = `${API_BASE}/appraisal/${propertyId}/appraise`;
  const res = await axios.post(url, options ?? null, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  });
  return res.data;
}
```

fetch:

```ts
const API_BASE = 'http://localhost:3050/api/v1';

export async function appraiseProperty(
  propertyId: string,
  options?: Record<string, any>,
) {
  const res = await fetch(`${API_BASE}/appraisal/${propertyId}/appraise`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: options ? JSON.stringify(options) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Error ${res.status}`);
  }
  return res.json();
}
```

## 12) Recomendaciones de UI/UX y QA

- Deshabilitar "Tasar" mientras está pendiente.
- Mostrar completenessScore y rango de confianza.
- Mostrar calculationDetails (colapsable) para auditoría.
- Manejo de 400/404 con mensaje textual del backend.

Checklist rápida:

- Propiedad completa => 201 + Appraisal con valores numéricos.
- Propiedad inexistente => 404.
- Faltantes mínimos => 400 con mensaje exacto.

---

Este documento refleja fielmente el comportamiento actual del módulo en `main`, incluidos mapeos de campos, uso de distancias, configuración por ENV, modificadores por request y `calculationDetails` en la respuesta.

## 13) Esquema de Property (referencia exacta para tasación)

Archivo: `src/modules/property/entities/property.entity.ts`

- address: string (requerido)
- province: ObjectId (requerido, ref 'Province')
- locality: ObjectId (requerido, ref 'Locality')
- lat: number (requerido para tasar)
- lng: number (requerido para tasar)
- gmaps?: { formattedAddress: string; placeId: string }
- owners: ObjectId[] (ref 'Party', requerido en schema)
- tenant?: ObjectId (ref 'Party')
- consortium?: string
- suppliers?: string[]
- specs?: string[]
- type: enum `TypeProperty` (requerido):
  - `departamento | casa | ph | oficina | local_comercial | galpon | lote | quinta | chacra | estudio | loft | duplex | triplex`
- purpose?: string
- status?: string
- availableForSale?: boolean
- publishForRent?: boolean
- publishForSale?: boolean
- valueForSale?: { amount: number; currency: string; pricePublic: boolean; paymentMethod: string; description: string; date: Date }
- valueForRent?: { amount: number; currency: string; pricePublic: boolean; paymentMethod: string; description: string; date: Date }
- available: boolean (default true)
- availableAt?: Date
- associatedServices?: string[]
- inventory?: Array<{ item: string; quantity: number; room: string; condition: string }>
- detailedDescription?: {
  - availableServices: string[]
  - sqFt: number (lote/terreno) — requerido para tasar (> 0)
  - buildSqFt: number (construido) — requerido para tasar (> 0)
  - age: number (años) — requerido para tasar (> 0)
  - petFriendly: boolean
  - rooms: number
  - bedrooms: number
  - bathrooms: number
  - floors: number
  - orientation: string
  - title: string
  - brief: string (usado por NLP para `descriptionScore`)
    }
- expensesType?: string
- img?: PropertyImage[] donde PropertyImage = { name, thumb, thumbWeb, imgSlider, title, description, createdAt }
- floorPlans?: Array<{ url: string; name?: string; uploadedAt?: Date }>
- documents?: Array<{ url: string; name?: string; type: 'pdf'|'doc'|'xls'; isShared?: boolean; uploadedAt?: Date }>
- imgCover?: { name: string; thumbWeb: string; createdAt: Date }
- createdAt: Date (default now -3h)
- active: boolean (default true)
- user?: ObjectId (ref 'User')

Campos mínimos para tasación (validados): address, province, locality, lat, lng, type, detailedDescription.sqFt, detailedDescription.buildSqFt, detailedDescription.age.

Campos que elevan completenessScore: detailedDescription.bedrooms, detailedDescription.bathrooms, detailedDescription.rooms, detailedDescription.brief (>20), img[], associatedServices[].
