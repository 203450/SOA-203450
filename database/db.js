const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
  });


pool.on('error', (err, client) => {
    console.error('Error en la conexión con la db:', err);
});

module.exports = pool;