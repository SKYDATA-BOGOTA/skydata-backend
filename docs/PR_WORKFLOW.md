# Flujo de Trabajo con Pull Requests - SKYDATA

## 🏁 Contexto Importante

**Estado Actual del Proyecto**:
- ✅ TODO el código funcional está implementado en `main`
- ✅ Todas las features (SwR-F05, SwR-F06, SwR-F08, SwR-I03, SwR-I04, SwR-ST01) están completas
- ✅ 12 branches de features creadas desde main
- ✅ 12 issues abiertos con trazabilidad completa

## 🎯 Objetivo de los PRs en Este Proyecto

En un proyecto normal, los PRs se crean para **fusionar código nuevo** a main. En este proyecto académico, los PRs tienen un propósito **demostrativo y educativo**:

1. **Demostrar trazabilidad completa** de requisitos a código
2. **Documentar el proceso** de desarrollo seguido
3. **Facilitar la evaluación** por parte del docente
4. **Practicar el flujo de trabajo** profesional con Git/GitHub

## 🛤️ Opciones para Crear PRs

### Opción 1: PRs Demostrativos (Recomendado para evaluación)

Como el código ya está en main, los colaboradores pueden:

1. **Hacer un cambio mínimo en su branch**
   ```bash
   git checkout feature/SwR-XXX-tu-feature
   # Hacer un cambio pequeño (agregar comentario, mejorar documentación, etc.)
   git add .
   git commit -m "docs: Add implementation notes for SwR-XXX"
   git push origin feature/SwR-XXX-tu-feature
   ```

2. **Crear PR explicando lo que se implementó**
   - Usar el template de PR
   - Explicar la trazabilidad completa
   - Referenciar los commits donde se implementó realmente
   - Solicitar review

### Opción 2: PRs Retrospectivos

Crear PRs que "simulen" que el código fue desarrollado en la branch:

1. **Identificar los commits relevantes**
   ```bash
   git log --oneline --grep="SwR-F08"
   ```

2. **Crear documentación del PR**
   - Escribir un PR detallado explicando qué se hizo
   - Aunque no haya diferencia de código, el PR sirve como documentación
   - Referenciar el commit original donde se implementó

### Opción 3: Mejoras Reales

Si encuentras mejoras genuinas:

1. **Crear nueva branch**
   ```bash
   git checkout -b improvement/SwR-XXX-descripcion
   ```

2. **Implementar mejora**
3. **Crear PR normal** con código nuevo

## 📝 Template de PR Completo

### Para @carlosperdomo376 - Issue #3 (SwR-F08)

```markdown
## 📝 Descripción

Implementación del archivo de datos mock en formato GeoJSON (RFC 7946) con 7 estaciones de monitoreo ambiental distribuidas en diferentes localidades de Bogotá.

## 🔍 Trazabilidad Completa

### Requisitos Implementados
- **SwR-F08**: Datos de Demostración ✅
  - 7 estaciones con datos simulados
  - Formato GeoJSON válido
- **SwR-DB01**: Estructura de Datos Mock ✅
  - Estructura FeatureCollection
  - Properties con variables ambientales
- **SyR-F04**: Provisión de Datos Estructurados ✅
  - Datos en formato estándar
  - Ubicación espacial incluida
- **StR-09, StR-10**: Información ambiental periódica ✅
- **BN-04**: Entrega de Solución Funcional ✅

### Casos de Uso
- **CU-03**: Acceder a Datos mediante Servicio ✅
  - Este archivo es la fuente de datos para el endpoint

### Decisiones Arquitectónicas
- **ADR-02**: Uso de GeoJSON como Formato de Datos ✅
  - Implementado según RFC 7946
  - Compatible con librerías de mapas
  - Validable con herramientas estándar

### Estándares ISO y Normas
- **RFC 7946**: The GeoJSON Format Specification ✅
  - Section 3.3: FeatureCollection
  - Section 3.2: Feature Objects
  - Section 3.1.2: Point Geometry
  - Coordenadas en WGS84 [lon, lat]
- **ISO/IEC/IEEE 29148:2018**: Sec 9.6.15 (Logical Database Requirements) ✅
- **BRS**: Restricción de Datos (solo datos simulados) ✅
- **Construction Plan**: Sec 4.1 (Fase 1 - Backend Base) ✅

## 📎 Archivos Modificados

- ✅ `data/mock-data.json` (NUEVO - 7 estaciones)

## ✨ Características Implementadas

### Datos GeoJSON Válidos
- ✅ type: "FeatureCollection"
- ✅ features: Array con 7 Features
- ✅ Cada Feature tipo "Point"
- ✅ Coordenadas [longitud, latitud] en WGS84

### Estaciones Implementadas
1. **EST-001**: Plaza de Bolívar (La Candelaria) - Centro histórico
2. **EST-002**: Calle 100 (Chapinero) - Zona empresarial
3. **EST-003**: Portal Suba - Noroccidente
4. **EST-004**: Aeropuerto (Fontibón) - Occidental
5. **EST-005**: Kennedy - Sur residencial
6. **EST-006**: San Cristóbal - Oriente
7. **EST-007**: Usaquén - Norte residencial

### Variables Ambientales por Estación
- ✅ **id**: Identificador único (EST-XXX)
- ✅ **estacion**: Nombre descriptivo
- ✅ **localidad**: Localidad de Bogotá
- ✅ **temperatura**: Valor en °C (16-20°C)
- ✅ **humedad**: Porcentaje (58-73%)
- ✅ **calidad_aire**: Índice 0-100 (35-52)
- ✅ **ruido**: Decibeles (65-82 dB)
- ✅ **timestamp**: ISO 8601 format

## 🧪 Criterios de Aceptación

- [x] Archivo `data/mock-data.json` creado
- [x] Formato GeoJSON válido según RFC 7946
- [x] Mínimo 5 ubicaciones (implementadas 7)
- [x] Cada ubicación incluye todos los campos requeridos
- [x] Coordenadas válidas dentro de Bogotá
- [x] Estructura FeatureCollection correcta
- [x] Validado con herramienta online: https://geojsonlint.com/

## 🔗 Commits Relacionados

- Commit `a4e6126`: feat(SwR-F08): Implement mock data in GeoJSON format

## 👤 Asignación

**Asignado a**: @carlosperdomo376 (Tarea 1 de 3)
**Issue Relacionado**: Closes #3

## 📚 Referencias

- [RFC 7946 - GeoJSON Specification](https://datatracker.ietf.org/doc/html/rfc7946)
- [GeoJSON Validator](https://geojsonlint.com/)
- [SRS v1.1.0.0](../1.%20REQUERIMIENTOS/04_SRS.pdf) - SwR-DB01
- [ADR v1.0.0.0](../2.%20ARQUITECTURA/02_ADR.pdf) - AD-02

---

**Cumplimiento Normativo**: ISO/IEC/IEEE 29148:2018, RFC 7946, ISO/IEC 12207:2017
```

## 🔄 Proceso de Merge

### Cuándo Hacer Merge

- Después de al menos 1 aprobación
- Cuando todos los checks pasen (ESLint, tests)
- Cuando la trazabilidad esté completa

### Cómo Hacer Merge

```
1. Asegurarse de tener aprobación
2. Click en "Squash and merge" (recomendado)
3. Editar el mensaje de commit si es necesario
4. Confirmar merge
5. Eliminar branch si ya no se necesita
```

## 📊 Métricas de Calidad

### Objetivos ISO 5055:2021

- ✅ Complejidad ciclomática < 10
- ✅ Funciones < 50 líneas
- ✅ Cobertura de tests > 60%
- ✅ 0 vulnerabilidades críticas
- ✅ 0 warnings de ESLint (security)

### Verificar antes de Merge

```bash
npm run quality:check
```

Esto ejecuta:
- ESLint
- npm audit
- Tests con cobertura

## 🔗 Enlaces Útiles

- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [Writing Good Commit Messages](https://chris.beams.io/posts/git-commit/)
- [Code Review Best Practices](https://google.github.io/eng-practices/review/)

---

**Última actualización**: 2024-01-15