// Tests: GetDatos Use Case
// ISO/IEC 29119:2013: Software Testing

const GetDatosUseCase = require('../../../src/application/use-cases/get-datos.use-case');

/**
 * Test Suite: GetDatos Use Case
 * 
 * Trazabilidad:
 * - CU-03: Acceder a Datos mediante Servicio
 * - SwR-F05: Endpoint REST de Datos
 * - Clean Architecture: Application Layer Testing
 */
describe('GetDatosUseCase', () => {
  let useCase;
  let mockRepository;

  beforeEach(() => {
    // Mock del repositorio
    mockRepository = {
      getAllData: jest.fn(),
      getDataById: jest.fn()
    };

    useCase = new GetDatosUseCase(mockRepository);
  });

  describe('execute()', () => {
    test('retorna datos cuando el repositorio responde correctamente', async () => {
      const mockData = {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: {}, properties: {} }]
      };

      mockRepository.getAllData.mockResolvedValue(mockData);

      const result = await useCase.execute();

      expect(result).toEqual(mockData);
      expect(mockRepository.getAllData).toHaveBeenCalledTimes(1);
    });

    test('lanza error cuando no hay datos disponibles', async () => {
      mockRepository.getAllData.mockResolvedValue({
        type: 'FeatureCollection',
        features: []
      });

      await expect(useCase.execute()).rejects.toThrow('No hay datos disponibles');
    });

    test('propaga errores del repositorio', async () => {
      mockRepository.getAllData.mockRejectedValue(new Error('Error de lectura'));

      await expect(useCase.execute()).rejects.toThrow('Error de lectura');
    });
  });

  describe('executeById()', () => {
    test('retorna feature específico por ID', async () => {
      const mockFeature = {
        type: 'Feature',
        properties: { id: 'EST-001' }
      };

      mockRepository.getDataById.mockResolvedValue(mockFeature);

      const result = await useCase.executeById('EST-001');

      expect(result).toEqual(mockFeature);
      expect(mockRepository.getDataById).toHaveBeenCalledWith('EST-001');
    });
  });
});