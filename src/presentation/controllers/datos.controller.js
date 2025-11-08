// SwR-F05: Endpoint REST
const GetDatosUseCase = require('../../application/use-cases/get-datos.use-case');
const GeoJSONRepository = require('../../infrastructure/data/geojson-repository');

class DatosController {
  constructor() {
    const repository = new GeoJSONRepository();
    this.getDatosUseCase = new GetDatosUseCase(repository);
  }

  async getAllDatos(req, res, next) {
    try {
      const datos = await this.getDatosUseCase.execute();
      res.status(200).json(datos);
    } catch (error) {
      next(error);
    }
  }

  async getDatoById(req, res, next) {
    try {
      const { id } = req.params;
      const dato = await this.getDatosUseCase.executeById(id);
      res.status(200).json(dato);
    } catch (error) {
      if (error.message.includes('no encontrada')) {
        res.status(404).json({ error: 'Not Found', message: error.message });
      } else {
        next(error);
      }
    }
  }
}
module.exports = DatosController;