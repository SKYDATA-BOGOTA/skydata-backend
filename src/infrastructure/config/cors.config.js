// SwR-I04: CORS Habilitado
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
    // En desarrollo, permitir cualquier origen localhost
    if (process.env.NODE_ENV !== 'production') {
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
        return;
      }
    }
    
    // En producción, lista específica
    const allowedOrigins = [
      process.env.CORS_ORIGIN || 'http://localhost:8080',
      'http://localhost:8080',
      'http://127.0.0.1:8080'
    ];
    
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

if (process.env.NODE_ENV !== 'production') {
  console.info('✓ CORS: Permitiendo cualquier localhost en desarrollo');
}

module.exports = cors(corsOptions);