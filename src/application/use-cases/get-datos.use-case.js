// CU-03: Acceder a Datos
class GetDatosUseCase {
  constructor(dataRepository) {
    this.dataRepository = dataRepository;
  }

  async execute() {
    const datos = await this.dataRepository.getAllData();
    if (!datos || !datos.features || datos.features.length === 0) {
      throw new Error('No hay datos disponibles');
    }
    return datos;
  }

  async executeById(id) {
    return await this.dataRepository.getDataById(id);
  }
}
module.exports = GetDatosUseCase;