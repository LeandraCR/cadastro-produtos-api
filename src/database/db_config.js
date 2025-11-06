// src/database/db_config.js
require('dotenv').config();
const sql = require('mssql');

const config = {
    server: process.env.DB_SERVER, 
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    user: process.env.DB_USER,        // <--- USA O USUÁRIO DO .env
    password: process.env.DB_PASSWORD, // <--- USA A SENHA DO .env
    options: {
        // REMOVEMOS: trustedConnection: true e driver: 'msnodesqlv8'
        encrypt: false,
        trustServerCertificate: true // Mantido para evitar o erro de certificado
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conexão com SQL Server estabelecida com sucesso!');
        return pool;
    })
    .catch(err => {
        console.error('Falha ao conectar ao SQL Server: ' + err.message);
    });

module.exports = {
    sql,
    poolPromise
};