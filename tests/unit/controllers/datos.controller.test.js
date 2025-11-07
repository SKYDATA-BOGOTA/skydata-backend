// Tests: Datos Controller
// ISO/IEC 12207:2017: Sec 6.4.6.4.3 - Unit Testing

const DatosController = require('../../../src/presentation/controllers/datos.controller');

/**
 * Test Suite: Datos Controller
 * 
 * Trazabilidad:
 * - SwR-F05: Endpoint REST de Datos
 * - SwR-V01: Pruebas Unitarias
 * - Clean Architecture: Presentation Layer Testing
 */
describe('DatosController', () => {
  let controller;
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    controller = new DatosController();
    
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('getAllDatos()', () => {
    test('retorna HTTP 200 con datos GeoJSON', async () => {
      await controller.getAllDatos(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
      
      const responseData = mockRes.json.mock.calls[0][0];
      expect(responseData.type).toBe('FeatureCollection');
      expect(Array.isArray(responseData.features)).toBe(true);
    });

    test('llama a next() en caso de error', async () => {
      // Simular error en repositorio
      controller.getDatosUseCase.execute = jest.fn().mockRejectedValue(
        new Error('Error simulado')
      );

      await controller.getAllDatos(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('getDatoById()', () => {
    test('retorna HTTP 200 con feature específico', async () => {
      mockReq.params = { id: 'EST-001' };

      await controller.getDatoById(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalled();
    });

    test('retorna HTTP 404 si no encuentra la estación', async () => {
      mockReq.params = { id: 'EST-999' };

      await controller.getDatoById(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
    });
  });
});