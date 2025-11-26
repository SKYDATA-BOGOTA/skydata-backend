# Pruebas de Confiabilidad Backend

## Instalación

Estos archivos deben copiarse a `skydata-backend/tests/reliability/`

### Dependencias necesarias

```bash
npm install --save-dev supertest jest
```

### Scripts en package.json

```json
{
  "scripts": {
    "test:reliability": "jest tests/reliability"
  }
}
```

## Ejecución

```bash
npm run test:reliability
```

## Base Normativa

- ISO/IEC 25010:2011 Sección 8.5 (Confiabilidad)
- ISO/IEC 25023:2016 Sección 5.6 (Reliability Measurement)

## Trazabilidad

- SwR-ST01: Confiabilidad y estabilidad del sistema

## Tipos de Pruebas

1. **Disponibilidad**: Health check, métricas de uptime
2. **Tolerancia a Fallos**: Fault injection, manejo graceful de errores
3. **Capacidad de Recuperación**: RTO, recuperación automática

