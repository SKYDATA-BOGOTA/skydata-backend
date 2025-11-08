# SKYDATA Backend - Scaffolding

## Estado de la Rama Main

⚠️ **Esta rama contiene SOLO el scaffolding inicial del proyecto.**

**El código funcional está en las branches de features.**

## Estructura del Proyecto (Scaffolding)

```
backend/
├── src/
│   ├── domain/              # Clean Architecture - Domain Layer
│   ├── application/         # Clean Architecture - Application Layer
│   ├── infrastructure/      # Clean Architecture - Infrastructure Layer
│   └── presentation/        # Clean Architecture - Presentation Layer
├── data/                    # Datos mock (en branches)
├── tests/                   # Pruebas (en branches)
├── docs/                    # Documentación
├── .gitignore
├── .eslintrc.json           # ISO 5055:2021
├── package.json
└── README.md
```

## Branches con Implementaciones

| Branch | Issue | Responsable | Descripción |
|--------|-------|-------------|-------------|
| `feature/SwR-F08-datos-mock-geojson` | #3 | @carlosperdomo376 | Datos Mock GeoJSON |
| `feature/SwR-I03-I04-server-cors` | #4 | @jeissonmp15 | Servidor HTTP + CORS |
| `feature/SwR-ST01-validators-geojson` | #5 | @giancarloprieto | Validadores GeoJSON |
| `feature/SwR-F05-F06-endpoint-rest` | #1 | @eab1362 | Endpoint REST |
| `feature/SwR-V01-unit-tests` | #6 | @carlosperdomo376 | Tests Unitarios |
| `feature/SwR-M01-documentation` | #2 | @eab1362 | Documentación |

## Cómo Trabajar

### Ver tu branch asignada:

```bash
git clone https://github.com/SKYDATA-BOGOTA/skydata-backend.git
cd skydata-backend
git checkout feature/SwR-XXX-tu-feature
npm install
npm run dev
```

### Ver todos los issues:
https://github.com/SKYDATA-BOGOTA/skydata-backend/issues

### Ver el proyecto:
https://github.com/orgs/SKYDATA-BOGOTA/projects/1

## Cumplimiento Normativo

- ISO/IEC 12207:2017: Implementation Process
- ISO/IEC/IEEE 29148:2018: Requirements Engineering
- Clean Architecture (Robert C. Martin)

## Organización

- **Repositorio Frontend**: https://github.com/SKYDATA-BOGOTA/skydata-frontend
- **Issues**: Ver arriba
- **Proyecto**: https://github.com/orgs/SKYDATA-BOGOTA/projects/1