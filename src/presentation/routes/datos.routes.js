// SwR-ST03: REST API
const express = require('express');
const DatosController = require('../controllers/datos.controller');

const router = express.Router();
const datosController = new DatosController();

router.get('/datos', (req, res, next) => {
  datosController.getAllDatos(req, res, next);
});

router.get('/datos/:id', (req, res, next) => {
  datosController.getDatoById(req, res, next);
});

module.exports = router;