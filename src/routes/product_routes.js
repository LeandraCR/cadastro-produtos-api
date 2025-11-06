// src/routes/product_routes.js

const express = require('express');
const router = express.Router();

// Importa todas as funções do controller (listar, criar, atualizar, excluir)
const productController = require('../controllers/product_controller'); 

// Rota GET: Listar todos os produtos (OK!)
router.get('/', productController.listarProdutos);

// Rota POST: Criar um novo produto (OK!)
router.post('/', productController.criarProduto); 

// Rota PUT: Atualizar um produto por ID (OK!)
router.put('/:id', productController.atualizarProduto); 

// 💡 NOVO: Rota DELETE: Excluir um produto por ID (Completa o CRUD!)
router.delete('/:id', productController.excluirProduto); 

module.exports = router;