// server.js (O CÓDIGO CORRETO)

const express = require('express');
const app = express();
const dotenv = require('dotenv');

// 1. Configuração
dotenv.config();

// Middleware para analisar o corpo JSON (necessário para POST, PUT)
app.use(express.json());

// 2. Importação da Rota
const productRoutes = require('./src/routes/product_routes');

// 3. Uso da Rota (A parte crucial que estava faltando ou incorreta)
// O Express precisa saber que '/produtos' deve usar o productRoutes
app.use('/produtos', productRoutes); 

const PORT = process.env.PORT || 3000; 

// Teste simples para verificar se o servidor está no ar
app.get('/', (req, res) => {
    res.send('API de Cadastro de Produtos está rodando!');
});

// Inicialização do servidor
app.listen(PORT, () => {
    // A mensagem de sucesso do SQL Server já apareceu, então só resta a do Node.js
    console.log(`Servidor Node.js rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
});