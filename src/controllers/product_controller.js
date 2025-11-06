// src/controllers/product_controller.js

const { poolPromise, sql } = require('../database/db_config');

// Função para listar todos os produtos (GET /produtos) - OK!
const listarProdutos = async (req, res) => {
    let pool;
    try {
        pool = await poolPromise;
        
        const resultado = await pool.request()
            .query('SELECT * FROM dbo.Produtos'); 

        res.json(resultado.recordset);

    } catch (erro) {
        console.error('Erro ao listar produtos:', erro);
        res.status(500).send({ mensagem: 'Erro interno ao tentar buscar produtos.' });
    }
};

// Função para criar um novo produto (POST /produtos) - OK!
const criarProduto = async (req, res) => {
    const { CodigoProduto, NomeProduto, Preco, Descricao, QuantidadeEstoque, Avaliacao, Categoria } = req.body;
    let pool; 
    try {
        pool = await poolPromise;

        await pool.request()
            .input('CodigoProduto', sql.VarChar(50), CodigoProduto)
            .input('NomeProduto', sql.VarChar(100), NomeProduto)
            .input('Preco', sql.Decimal(10, 2), Preco)
            .input('Descricao', sql.VarChar(255), Descricao)
            .input('QuantidadeEstoque', sql.Int, QuantidadeEstoque)
            .input('Avaliacao', sql.Decimal(2, 1), Avaliacao)
            .input('Categoria', sql.VarChar(50), Categoria)
            .query(`INSERT INTO dbo.Produtos (
                CodigoProduto, NomeProduto, Preco, Descricao, QuantidadeEstoque, Avaliacao, Categoria
            ) VALUES (
                @CodigoProduto, @NomeProduto, @Preco, @Descricao, @QuantidadeEstoque, @Avaliacao, @Categoria
            )`);
            
        res.status(201).send({ mensagem: 'Produto criado com sucesso!' });

    } catch (erro) {
        console.error('Erro ao criar produto:', erro);
        // Tratamento de erro para UNIQUE (2627)
        if (erro.number === 2627) { 
             return res.status(400).send({ mensagem: 'Código de Produto já existente.' });
        }
        res.status(500).send({ mensagem: 'Erro interno ao tentar criar produto.' });
    }
};

// Função para atualizar um produto (PUT /produtos/:id) - OK!
const atualizarProduto = async (req, res) => {
    const id = req.params.id; 
    const { NomeProduto, Preco, Descricao, QuantidadeEstoque, Avaliacao, Categoria } = req.body;

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .input('NomeProduto', sql.VarChar(100), NomeProduto)
            .input('Preco', sql.Decimal(10, 2), Preco)
            .input('Descricao', sql.VarChar(255), Descricao)
            .input('QuantidadeEstoque', sql.Int, QuantidadeEstoque)
            .input('Avaliacao', sql.Decimal(2, 1), Avaliacao)
            .input('Categoria', sql.VarChar(50), Categoria)
            .query(`UPDATE dbo.Produtos SET
                NomeProduto = @NomeProduto,
                Preco = @Preco,
                Descricao = @Descricao,
                QuantidadeEstoque = @QuantidadeEstoque,
                Avaliacao = @Avaliacao,
                Categoria = @Categoria
            WHERE Id = @id`);
            
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).send({ mensagem: 'Produto não encontrado para atualização.' });
        }
            
        res.status(200).send({ mensagem: 'Produto atualizado com sucesso!' });

    } catch (erro) {
        console.error('Erro ao atualizar produto:', erro);
        res.status(500).send({ mensagem: 'Erro interno ao tentar atualizar produto.' });
    }
};

// Função para excluir um produto (DELETE /produtos/:id) - OK!
const excluirProduto = async (req, res) => {
    const id = req.params.id; 

    try {
        const pool = await poolPromise;

        const resultado = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM dbo.Produtos WHERE Id = @id');
            
        if (resultado.rowsAffected[0] === 0) {
            return res.status(404).send({ mensagem: 'Produto não encontrado para exclusão.' });
        }
            
        res.status(200).send({ mensagem: 'Produto excluído com sucesso!' });

    } catch (erro) {
        console.error('Erro ao excluir produto:', erro);
        res.status(500).send({ mensagem: 'Erro interno ao tentar excluir produto.' });
    }
};

module.exports = {
    listarProdutos,
    criarProduto,
    atualizarProduto, 
    excluirProduto 
};