const express = require('express');
const router = express.Router();
const livroController = require('../controllers/livroController');
const { validateLivro } = require('../validators/livroValidator');

router.get('/', livroController.getAllLivros);
router.get('/:id', livroController.getLivroById);
router.post('/', validateLivro, livroController.createLivro);
//... rotas put e delete

module.exports = router;
