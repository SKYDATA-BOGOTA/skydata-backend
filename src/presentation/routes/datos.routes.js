// SwR-ST03: REST API - Routes
// Clean Architecture: Presentation Layer - Routes

const express = require('express');
const DatosController = require('../controllers/datos.controller');

const router = express.Router();
const datosController = new DatosController();

/**
 * Rutas de Datos Ambientales
 * 
 * Trazabilidad:
 * - SwR-F05: Endpoint REST de Datos
 * - SwR-ST03: REST API
 * - CU-03: Acceder a Datos mediante Servicio
 * - ISO/IEC 12207:2017: Sec 6.4.6.4
 */

// SwR-F05: GET /api/datos - Obtener todos los datos
// SwR-F06: Retorna GeoJSON RFC 7946
router.get('/datos', (req, res, next) => {
  datosController.getAllDatos(req, res, next);
});

// GET /api/datos/:id - Obtener datos de estación específica
router.get('/datos/:id', (req, res, next) => {
  datosController.getDatoById(req, res, next);
});

module.exports = router;