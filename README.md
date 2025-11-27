# SKYDATA Backend

![CI/CD Pipeline](https://github.com/SKYDATA-BOGOTA/skydata-backend/actions/workflows/ci-cd-iso-25000.yml/badge.svg)

## 📋 Descripción

Backend del proyecto SKYDATA - Sistema de visualización de datos de estaciones de monitoreo ambiental de Bogotá.

## 🏗️ Arquitectura

Implementado siguiendo **Clean Architecture**:

```
src/
├── domain/          # Entidades y reglas de negocio
├── application/     # Casos de uso
├── infrastructure/  # Implementaciones externas
└── presentation/    # Controladores y rutas (Express)
```

## 🚀 Instalación

```bash
# Clonar repositorio
git clone https://github.com/SKYDATA-BOGOTA/skydata-backend.git
cd skydata-backend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 🧪 Pruebas

```bash
# Pruebas unitarias
npm test

# Pruebas con cobertura
npm run test:coverage

# Pruebas de integración
npm run test:integration

# Pruebas de aceptación
npm run test:acceptance

# Pruebas de seguridad
npm run test:security

# Pruebas de rendimiento
npm run test:performance

# Pruebas de carga (Artillery)
npm run test:load

# Pruebas de estrés (Artillery)
npm run test:stress
```

## 📊 Cobertura de Calidad ISO 25000

| Característica | Estado | Referencia ISO |
|----------------|--------|----------------|
| Adecuación Funcional | ✅ | ISO 25010:2011 8.1 |
| Eficiencia de Rendimiento | ✅ | ISO 25010:2011 8.2 |
| Compatibilidad | ✅ | ISO 25010:2011 8.3 |
| Fiabilidad | ✅ | ISO 25010:2011 8.5 |
| Seguridad | ✅ | ISO 25010:2011 8.6 |
| Mantenibilidad | ✅ | ISO 25010:2011 8.7 |
| Portabilidad | ✅ | ISO 25010:2011 8.8 |

## 🔗 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/stations` | Lista todas las estaciones (GeoJSON) |
| GET | `/stations/:id` | Obtiene una estación específica |
| GET | `/health` | Health check del servidor |

## 📄 Licencia

MIT © SKYDATA-BOGOTA

---

**Última actualización**: 2025-11-27
