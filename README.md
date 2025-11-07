# SKYDATA Backend - API REST

## 🎯 Descripción del Proyecto

Backend API REST para el Sistema de Visualización de Información Ambiental de Bogotá (SKYDATA). 
Provee datos ambientales en formato GeoJSON (RFC 7946) mediante endpoints REST.

**Proyecto Académico** - Universidad Distrital Francisco José de Caldas  
**Curso**: Ingeniería de Software II  
**Propósito**: Demostración de competencias en ingeniería de software siguiendo estándares internacionales

## 📜 Cumplimiento Normativo

Este proyecto ha sido desarrollado siguiendo rigurosamente los siguientes estándares internacionales:

| Estándar | Sección | Aplicación |
|-----------|---------|-------------|
| **ISO/IEC/IEEE 29148:2018** | Sec 8.5, 9.6 | Requirements Engineering - Trazabilidad completa |
| **ISO/IEC 12207:2017** | Sec 6.4.6.4 | Implementation Process |
| **ISO/IEC/IEEE 42010:2011** | Sec 5 | Architecture Description |
| **TOGAF 9.2** | ADM | Architecture Framework |
| **ISO/IEC 25010:2011** | Sec 4.2 | Quality Models (Maintainability) |
| **ISO/IEC 5055:2021** | Completo | Software Quality Measurement |
| **RFC 7946** | Completo | GeoJSON Format Specification |
| **Clean Architecture** | Completo | Robert C. Martin principles |

## 🏛️ Arquitectura Clean Architecture

### Estructura del Proyecto

```
skydata-backend/
├── src/
│   ├── domain/                    # 🔵 CAPA DE DOMINIO (más interna)
│   │   ├── entities/              # Entidades del negocio
│   │   ├── interfaces/            # Interfaces de repositorios (DIP)
│   │   │   └── data-repository.interface.js
│   │   └── value-objects/         # Objetos de valor inmutables
│   │       └── geojson.vo.js          # SwR-ST01
│   │
│   ├── application/               # 🟢 CAPA DE APLICACIÓN
│   │   ├── use-cases/             # Casos de uso (lógica de aplicación)
│   │   │   └── get-datos.use-case.js  # CU-03
│   │   └── dtos/                  # Data Transfer Objects
│   │
│   ├── infrastructure/            # 🟡 CAPA DE INFRAESTRUCTURA
│   │   ├── data/                  # Implementaciones de repositorios
│   │   │   └── geojson-repository.js  # SwR-F08
│   │   ├── config/                # Configuraciones
│   │   │   └── cors.config.js         # SwR-I04
│   │   └── validators/            # Validadores de datos
│   │       └── geojson.validator.js   # SwR-ST01
│   │
│   └── presentation/              # 🔴 CAPA DE PRESENTACIÓN (más externa)
│       ├── controllers/           # Controladores HTTP
│       │   └── datos.controller.js    # SwR-F05
│       ├── routes/                # Rutas REST API
│       │   └── datos.routes.js        # SwR-ST03
│       ├── middlewares/           # Middlewares Express
│       │   └── error.middleware.js    # SwR-R01
│       └── server.js              # Punto de entrada - SwR-I03
│
├── data/
│   └── mock-data.json            # Datos GeoJSON - SwR-F08
│
├── tests/
│   ├── unit/                     # Pruebas unitarias - SwR-V01
│   │   ├── validators/
│   │   ├── use-cases/
│   │   ├── data/
│   │   └── controllers/
│   └── integration/              # Pruebas de integración - SwR-V02
│
├── docs/
│   └── TRACEABILITY.md          # Matriz de trazabilidad
│
├── .env.example                 # Configuración de ejemplo
├── .eslintrc.json               # Configuración ESLint (ISO 5055)
├── .gitignore
├── jest.config.js               # Configuración de tests
├── package.json
└── README.md
```

### Flujo de Dependencias (Clean Architecture)

```
┌──────────────────────────────────────────────────────┐
│  HTTP Request GET /api/datos                      │
└──────────────────────────────────────────────────────┘
            │
            ↓
┌──────────────────────────────────────────────────────┐
│  PRESENTATION: routes/datos.routes.js            │
└──────────────────────────────────────────────────────┘
            │
            ↓
┌──────────────────────────────────────────────────────┐
│  PRESENTATION: controllers/datos.controller.js   │
└──────────────────────────────────────────────────────┘
            │
            ↓
┌──────────────────────────────────────────────────────┐
│  APPLICATION: use-cases/get-datos.use-case.js    │
└──────────────────────────────────────────────────────┘
            │
            ↓
┌──────────────────────────────────────────────────────┐
│  DOMAIN: interfaces/IDataRepository              │
└──────────────────────────────────────────────────────┘
            ↑
            │ (implements)
┌──────────────────────────────────────────────────────┐
│  INFRASTRUCTURE: data/geojson-repository.js      │
└──────────────────────────────────────────────────────┘
            │
            ↓ (reads)
┌──────────────────────────────────────────────────────┐
│  DATA: mock-data.json (GeoJSON RFC 7946)         │
└──────────────────────────────────────────────────────┘
```

**Principios SOLID Aplicados**:
- ✅ **S**ingle Responsibility: Cada clase/módulo tiene una responsabilidad única
- ✅ **O**pen/Closed: Extensible sin modificar código existente
- ✅ **L**iskov Substitution: Implementaciones sustituibles
- ✅ **I**nterface Segregation: Interfaces específicas
- ✅ **D**ependency Inversion: Dependencias hacia abstracciones

## 📊 Matriz de Trazabilidad: Requisitos → Código

### Requisitos Funcionales

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-F05** | Endpoint REST de Datos | `src/presentation/routes/datos.routes.js`<br/>`src/presentation/controllers/datos.controller.js` | 53d117b | #1 |
| **SwR-F06** | Formato GeoJSON RFC 7946 | `src/infrastructure/data/geojson-repository.js`<br/>`src/domain/value-objects/geojson.vo.js` | 53d117b<br/>59167de | #1 |
| **SwR-F08** | Datos de Demostración | `data/mock-data.json` | a4e6126 | #3 |

### Requisitos de Interfaz

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-I03** | Servidor HTTP Backend | `src/presentation/server.js` | d9d011b | #4 |
| **SwR-I04** | CORS Habilitado | `src/infrastructure/config/cors.config.js` | d9d011b | #4 |

### Requisitos de Estándares

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-ST01** | GeoJSON RFC 7946 | `src/domain/value-objects/geojson.vo.js`<br/>`src/infrastructure/validators/geojson.validator.js` | 59167de | #5 |
| **SwR-ST03** | REST API | `src/presentation/routes/datos.routes.js` | 53d117b | #1 |

### Requisitos de Diseño

| SwR | Descripción | Implementación | Commit |
|-----|-------------|----------------|--------|
| **SwR-DC02** | Arquitectura de Componentes | Estructura completa Clean Architecture | 1d54183 |

### Requisitos de Mantenibilidad

| SwR | Descripción | Implementación | Commit | Issue |
|-----|-------------|----------------|--------|-------|
| **SwR-M01** | Código Documentado | Comentarios con trazabilidad en todos los archivos .js | Todos | #2 |
| **SwR-M02** | Estructura Modular | 4 capas separadas (Domain, Application, Infrastructure, Presentation) | 1d54183 | - |

### Requisitos de Verificación

| SwR | Descripción | Archivo de Implementación | Commit | Issue |
|-----|-------------|---------------------------|--------|-------|
| **SwR-V01** | Pruebas Unitarias | `tests/unit/**/*.test.js`<br/>`jest.config.js` | 16a774f | #6 |

### Requisitos de Confiabilidad

| SwR | Descripción | Archivo de Implementación | Commit |
|-----|-------------|---------------------------|--------|
| **SwR-R01** | Manejo de Errores | `src/presentation/middlewares/error.middleware.js` | d9d011b |

## 🔗 Trazabilidad: Casos de Uso → Código

| Caso de Uso | Descripción | Implementación Principal |
|-------------|-------------|-------------------------|
| **CU-03** | Acceder a Datos mediante Servicio | `src/application/use-cases/get-datos.use-case.js`<br/>`src/presentation/controllers/datos.controller.js`<br/>`src/presentation/routes/datos.routes.js` |
| **CU-04** | Configurar Parámetros del Sistema | `.env.example`<br/>`src/infrastructure/config/cors.config.js`<br/>`src/presentation/server.js` (variables de entorno) |

## 🏗️ Trazabilidad: ADRs → Código

| ADR | Decisión Arquitectónica | Implementación |
|-----|------------------------|----------------|
| **AD-01** | Arquitectura de Dos Capas (Cliente-Servidor) | Backend separado con Express.js<br/>Comunicación REST API<br/>CORS configurado |
| **AD-02** | Uso de GeoJSON como Formato de Datos | `data/mock-data.json` (RFC 7946)<br/>Validadores GeoJSON<br/>Value Objects para GeoJSON |

## 💾 Instalación y Configuración

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/SKYDATA-BOGOTA/skydata-backend.git
cd skydata-backend

# Instalar dependencias
npm install

# Copiar configuración de ejemplo
cp .env.example .env

# Editar .env con tus valores (opcional)
# nano .env
```

### Configuración (.env)

```env
# Configuración del Servidor
PORT=3000
NODE_ENV=development

# Configuración CORS
CORS_ORIGIN=http://localhost:8080

# Configuración de Datos
DATA_FILE=./data/mock-data.json
```

### Ejecución

```bash
# Modo desarrollo (con hot-reload)
npm run dev

# Modo producción
npm start

# Ejecutar tests
npm test

# Ejecutar tests con cobertura
npm run test:coverage

# Verificar calidad del código
npm run lint

# Auditoría de seguridad
npm run security:audit

# Reporte completo de calidad (ISO 5055)
npm run quality:check
```

## 🚀 API Endpoints

### GET /health

Verifica el estado del servidor.

**Request**:
```bash
curl http://localhost:3000/health
```

**Response (200 OK)**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "service": "SKYDATA Backend API"
}
```

### GET /api/datos

**SwR-F05**: Retorna todos los datos ambientales en formato GeoJSON.

**Request**:
```bash
curl http://localhost:3000/api/datos
```

**Response (200 OK)** - **SwR-F06**: Formato GeoJSON RFC 7946
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-74.0817, 4.6097]
      },
      "properties": {
        "id": "EST-001",
        "estacion": "Estación Centro - Plaza de Bolívar",
        "localidad": "La Candelaria",
        "temperatura": 18.5,
        "humedad": 65,
        "calidad_aire": 45,
        "ruido": 70,
        "timestamp": "2024-01-15T10:30:00Z"
      }
    }
    // ... más estaciones
  ]
}
```

**Response (500 Error)**:
```json
{
  "error": "Error",
  "message": "Descripción del error",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### GET /api/datos/:id

Retorna datos de una estación específica.

**Request**:
```bash
curl http://localhost:3000/api/datos/EST-001
```

**Response (200 OK)**:
```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [-74.0817, 4.6097]
  },
  "properties": {
    "id": "EST-001",
    "estacion": "Estación Centro - Plaza de Bolívar",
    "temperatura": 18.5,
    "humedad": 65,
    "calidad_aire": 45,
    "ruido": 70
  }
}
```

**Response (404 Not Found)**:
```json
{
  "error": "Not Found",
  "message": "Estación con ID EST-999 no encontrada"
}
```

## 🧪 Pruebas

### Estrategia de Pruebas (ISO/IEC 29119:2013)

El proyecto implementa pruebas en múltiples niveles:

1. **Pruebas Unitarias** (Unit Tests) - **SwR-V01**
2. **Pruebas de Integración** (Integration Tests) - **SwR-V02**
3. **Cobertura de Código** > 60% (objetivo ISO 5055)

### Ejecutar Pruebas

```bash
# Todas las pruebas
npm test

# Con reporte de cobertura
npm run test:coverage

# En modo watch (desarrollo)
npm run test:watch
```

### Ejemplo de Salida

```
Test Suites: 4 passed, 4 total
Tests:       23 passed, 23 total
Snapshots:   0 total
Time:        2.5s

Coverage:
  Statements   : 85% ( 34/40 )
  Branches     : 78% ( 14/18 )
  Functions    : 90% ( 18/20 )
  Lines        : 87% ( 33/38 )
```

## 🛡️ Calidad del Código (ISO/IEC 5055:2021)

### Métricas de Calidad Implementadas

#### Mantenibilidad
- ✅ Complejidad ciclomática < 10 (configurado en ESLint)
- ✅ Funciones < 50 líneas (warning en ESLint)
- ✅ Profundidad de anidamiento < 4 niveles
- ✅ Código duplicado < 5%
- ✅ Nombres descriptivos de variables y funciones
- ✅ Comentarios explicando lógica compleja

#### Seguridad
- ✅ Validación de inputs (GeoJSON validator)
- ✅ Manejo de errores en operaciones asíncronas (try-catch)
- ✅ No exposición de información sensible
- ✅ Configuración CORS segura (no usa "*")
- ✅ Plugin ESLint security activo

#### Confiabilidad
- ✅ Manejo de excepciones apropiado
- ✅ Validación de respuestas y datos
- ✅ Valores por defecto para casos edge
- ✅ Tests automatizados

### Verificar Calidad

```bash
# Linting completo
npm run lint

# Fix automático de issues
npm run lint:fix

# Auditoría de seguridad de dependencias
npm audit

# Reporte completo de calidad
npm run quality:check
```

## 📄 Documentación Adicional

- **[TRACEABILITY.md](docs/TRACEABILITY.md)**: Matriz completa de trazabilidad
- **Construction Plan**: `docs/01_Construction_Plan.pdf`
- **Architecture Description**: `docs/01_AD_Architecture_Description.pdf`
- **SRS**: `docs/04_SRS.pdf`
- **ADR**: `docs/02_ADR.pdf`

## 👥 Equipo y Tareas

### Distribución de Tareas (3 por persona)

| Miembro | Tareas Asignadas | Issues |
|---------|------------------|--------|
| **@carlosperdomo376** | SwR-F08 (Mock Data), SwR-V01 (Tests), + Frontend | #3, #6 |
| **@eab1362** | SwR-F05/F06 (REST API), SwR-M01 (Docs), + Frontend | #1, #2 |
| **@jeissonmp15** | SwR-I03/I04 (Server/CORS), + Frontend | #4 |
| **@giancarloprieto** | SwR-ST01 (Validators), + Frontend | #5 |

### Issues Abiertos

- [#1: Implement REST endpoint](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues/1) - @eab1362
- [#2: API Documentation](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues/2) - @eab1362
- [#3: Mock Data GeoJSON](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues/3) - @carlosperdomo376
- [#4: HTTP Server and CORS](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues/4) - @jeissonmp15
- [#5: GeoJSON Validators](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues/5) - @giancarloprieto
- [#6: Unit Tests](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues/6) - @carlosperdomo376

## 🔧 Desarrollo

### Flujo de Trabajo Git

```bash
# 1. Crear branch desde main
git checkout main
git pull origin main
git checkout -b feature/SwR-XXX-descripcion

# 2. Realizar cambios
# ... editar archivos ...

# 3. Commit con trazabilidad
git add .
git commit -m "feat(SwR-XXX): descripción breve

Trazabilidad:
- Requisito: SwR-XXX
- ISO: ISO/IEC XXXXX Sec X.X
- ADR: AD-XX
- CU: CU-XX

Descripción detallada."

# 4. Push y crear PR
git push origin feature/SwR-XXX-descripcion
```

## 🌐 Enlaces

- **Organización GitHub**: [SKYDATA-BOGOTA](https://github.com/SKYDATA-BOGOTA)
- **Repositorio Frontend**: [skydata-frontend](https://github.com/SKYDATA-BOGOTA/skydata-frontend)
- **Issues Backend**: [Ver Issues](https://github.com/SKYDATA-BOGOTA/skydata-backend/issues)
- **Pull Requests**: [Ver PRs](https://github.com/SKYDATA-BOGOTA/skydata-backend/pulls)

## 📚 Referencias

1. ISO/IEC/IEEE 29148:2018. *Systems and software engineering — Requirements engineering*.
2. ISO/IEC 12207:2017. *Systems and software engineering — Software life cycle processes*.
3. ISO/IEC/IEEE 42010:2011. *Systems and software engineering — Architecture description*.
4. RFC 7946. *The GeoJSON Format*. IETF, 2016.
5. ISO/IEC 5055:2021. *Information technology — Software measurement*.
6. Martin, R. C. (2017). *Clean Architecture: A Craftsman's Guide to Software Structure and Design*.
7. Gamma, E., et al. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*.

## 📝 Licencia

Proyecto Académico - Universidad Distrital Francisco José de Caldas

## ✍️ Autores

- **Edgar Andrade** (@eab1362) - Estudiante de Maestría en Ingeniería de Software
- **Giancarlo Prieto** (@giancarloprieto) - Estudiante de Maestría en Ingeniería de Software
- **Carlos Perdomo** (@carlosperdomo376) - Estudiante de Maestría en Ingeniería de Software
- **Jeisson Moreno** (@jeissonmp15) - Estudiante de Maestría en Ingeniería de Software

---

**Última actualización**: 2024-01-15  
**Versión**: 1.0.0  
**Estado**: 🟢 Productivo