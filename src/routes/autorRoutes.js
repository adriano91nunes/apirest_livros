const express = require('express');
const router = express.Router();
const autorController = require('../controllers/autorController');
const { validateAutor } = require('../validators/autorValidator');

router.get('/', autorController.getAllAutores);
router.get('/:id', autorController.getAutorById);
router.post('/', validateAutor, autorController.createAutor);
router.put('/:id', validateAutor, autorController.updateAutor);
router.delete('/:id', autorController.deleteAutor);

module.exports = router;
