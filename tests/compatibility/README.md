# Pruebas de Compatibilidad Backend

## Instalación

Estos archivos deben copiarse a `skydata-backend/tests/compatibility/`

### Dependencias necesarias

```bash
npm install --save-dev supertest axios
```

### Scripts en package.json

```json
{
  "scripts": {
    "test:compatibility": "jest tests/compatibility"
  }
}
```

## Ejecución

```bash
npm run test:compatibility
```

## Base Normativa

- ISO/IEC 25010:2011 Sección 8.5.1 (Compatibilidad)
- ISO/IEC 25023:2016 Sección 5.5 (Compatibility Measurement)
- RFC 7946 (GeoJSON standard)

## Trazabilidad

- SwR-I01: Compatibilidad con versiones de Node.js
- SwR-I02: Compatibilidad con estándares web (GeoJSON RFC 7946)
- SwR-I03: Interoperabilidad Frontend-Backend

## Notas

- Ajustar la ruta de importación del servidor según la estructura del proyecto
- Los tests de Node.js se ejecutarán en la versión actual del entorno
- Para probar múltiples versiones, usar matriz en CI/CD (GitHub Actions)

