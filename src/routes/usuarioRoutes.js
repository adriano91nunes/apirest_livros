// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { validateUsuario } = require('../validators/usuarioValidator');

// Rota pública para registro
router.post('/registrar', validateUsuario, usuarioController.registrarUsuario);

module.exports = router;

// ... (rota de registro)
const authMiddleware = require('../middlewares/authMiddleware');

// A partir daqui, todas as rotas precisam de autenticação
//router.use(authMiddleware);

// Rota para o usuário ver sua própria lista de leitura
router.get('/leituras', usuarioController.getMinhasLeituras);

// Rota para adicionar ou atualizar o status de um livro na lista do usuário
router.post('/leituras', usuarioController.registrarLeitura);

// Rota para avaliar um livro da sua lista
router.post('/leituras/:livroId/avaliar', usuarioController.avaliarLivro);

module.exports = router;