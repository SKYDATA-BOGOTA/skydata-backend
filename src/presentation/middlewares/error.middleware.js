// SwR-R01: Manejo de Errores
const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err.message);
  
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.name || 'Error',
    message: err.message || 'Error interno',
    timestamp: new Date().toISOString()
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

module.exports = errorHandler;