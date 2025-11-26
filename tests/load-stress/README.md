# Pruebas de Carga y Estrés - Backend SKYDATA

**Base Normativa:**
- ISO/IEC 25010:2011 Sección 8.2.3 (Capacity)
- ISO/IEC 25023:2016 Sección 5.2 (Performance Efficiency Measurement)
- ISO/IEC 25020:2019 (Measurement Model)
- ISO/IEC 25040:2011 Actividad 4 (Ejecutar Evaluación)

**Trazabilidad:** SwR-R01 → ISO/IEC 25010:2011 8.2.3

**Referencias:**
- Portal ISO 25000: https://iso25000.com/index.php/en/iso-25000-standards
- Documentos ISO convertidos: `../ISOS/`
- Índice de referencias: `../ISOS/INDICE_REFERENCIAS.md`

---

## Descripción

Este directorio contiene pruebas de carga y estrés implementadas con Artillery para verificar la capacidad del backend según ISO/IEC 25010:2011 Sección 8.2.3 (Capacity).

## Archivos

- `load-test.yml` - Configuración de pruebas de carga
- `stress-test.yml` - Configuración de pruebas de estrés
- `README.md` - Este archivo

## Requisitos

- Node.js 18.x o 20.x
- Artillery >= 2.0.0 (instalado automáticamente con `npm install`)
- Backend corriendo en `http://localhost:3001`

## Instalación

```bash
npm install
```

## Ejecución

### Pruebas de Carga

```bash
npm run test:load
```

Ejecuta 3 escenarios de carga según ISO 25023:2016 5.2:

1. **Carga Normal (10 usuarios)** - 2 minutos
   - Objetivo: Verificar comportamiento bajo carga normal
   - Endpoints: GET /stations, GET /health

2. **Carga Media (50 usuarios)** - 3 minutos
   - Objetivo: Verificar que tiempos de respuesta se mantienen < 500ms
   - Endpoints: GET /stations, GET /stations/:id

3. **Carga Alta (100 usuarios)** - 5 minutos
   - Objetivo: Verificar límites de capacidad
   - Endpoints: Todos los endpoints

### Pruebas de Estrés

```bash
npm run test:stress
```

Ejecuta 2 escenarios de estrés según ISO 25023:2016 5.2:

1. **Estrés Gradual**
   - Incrementa carga de 10 a 200 usuarios en 10 minutos
   - Objetivo: Identificar punto de fallo
   - Verifica degradación gradual

2. **Estrés Pico**
   - Carga instantánea de 150 usuarios durante 2 minutos
   - Objetivo: Verificar recuperación después de sobrecarga

## Métricas según ISO 25023:2016 5.2

### Pruebas de Carga

- **QM_TiempoRespuestaCarga**: Tiempo de respuesta bajo carga
  - Objetivo: < 500ms en percentil 95
  
- **QM_Throughput**: Peticiones por segundo
  - Objetivo: > 10 req/s
  
- **QM_TasaErroresCarga**: Porcentaje de errores bajo carga
  - Objetivo: < 1%

### Pruebas de Estrés

- **QM_CapacidadMaxima**: Número máximo de usuarios simultáneos antes de fallo
  
- **QM_Degradacion**: Porcentaje de degradación de rendimiento bajo estrés
  
- **QM_TiempoRecuperacion**: Tiempo de recuperación después de sobrecarga

## Umbrales de Aceptación

Según ISO/IEC 25023:2016 Sección 5.2:

| Métrica | Umbral | Base Normativa |
|---------|--------|----------------|
| Tiempo de respuesta (p95) | < 500ms | ISO 25023:2016 5.2 |
| Tiempo de respuesta (p99) | < 1000ms | ISO 25023:2016 5.2 |
| Tasa de errores | < 1% | ISO 25023:2016 5.2 |
| Throughput | > 10 req/s | ISO 25023:2016 5.2 |

## Interpretación de Resultados

Artillery genera reportes JSON en `test-results/`:
- `load-report.json` - Resultados de pruebas de carga
- `stress-report.json` - Resultados de pruebas de estrés

Los reportes incluyen:
- Tiempos de respuesta (min, max, median, p95, p99)
- Throughput (requests/sec)
- Tasa de errores
- Códigos de estado HTTP

## Integración con CI/CD

Las pruebas están integradas en el pipeline CI/CD del backend (Job 16):

```yaml
- name: Run load tests
  run: npm run test:load

- name: Run stress tests
  run: npm run test:stress
```

Los reportes se publican como artifacts con retención de 30 días.

## Trazabilidad

**Código → Requisitos → ISOs:**
- `load-test.yml` → SwR-R01 → ISO/IEC 25010:2011 8.2.3
- `stress-test.yml` → SwR-R01 → ISO/IEC 25010:2011 8.2.3
- Métricas QME/QM → ISO/IEC 25023:2016 5.2
- Pipeline CI/CD → ISO/IEC 12207:2017 6.2.3, ISO/IEC 25040:2011 Act. 4

## Documentación

Para más detalles, consultar:
- `5. PRUEBAS/16_Pruebas_Carga_Estres_ISO_25000.tex` - Documentación LaTeX completa
- `5. PRUEBAS/06_Plan_Implementacion_Pruebas_ISO_25000.tex` - Plan de pruebas (Fase 13)
- `5. PRUEBAS/07_Resultados_Pruebas_ISO_25000.tex` - Resultados de pruebas
- `5. PRUEBAS/08_Validacion_Cumplimiento_ISO_25000.tex` - Validación de cumplimiento

## Referencias ISO

- ISO/IEC 25010:2011 Sección 8.2.3 (Capacity) - `ISOS/iso-iec-25010.txt`
- ISO/IEC 25023:2016 Sección 5.2 - `ISOS/iso_25023_preview.txt`
- ISO/IEC 25020:2019 - `ISOS/ISO 25020.txt`
- ISO/IEC 25040:2011 Actividad 4 - `ISOS/ISO 25040.txt`
- Portal: https://iso25000.com/index.php/en/iso-25000-standards

---

**Versión**: 1.0.0.0  
**Fecha**: 2025-01-XX  
**Mantenido por**: Proyecto SKYDATA según ISO 25000
