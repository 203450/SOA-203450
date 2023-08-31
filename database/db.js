const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: '203450',
    password: 'RIMG020726',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Error en la conexión con la db:', err);
  });
  
  module.exports = pool;