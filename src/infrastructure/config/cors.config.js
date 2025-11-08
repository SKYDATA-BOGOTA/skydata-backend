// SwR-I04: CORS Habilitado
const cors = require('cors');

const corsOptions = {
  origin: function (origin, callback) {
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

if (process.env.NODE_ENV === 'development') {
  console.warn('⚠ CORS en modo desarrollo');
}

module.exports = cors(corsOptions);