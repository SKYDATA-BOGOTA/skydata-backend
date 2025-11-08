// Clean Architecture: Domain Layer - Repository Interface
class IDataRepository {
  async getAllData() {
    throw new Error('Método getAllData() debe ser implementado');
  }
  async getDataById(id) {
    throw new Error('Método getDataById() debe ser implementado');
  }
}
module.exports = IDataRepository;