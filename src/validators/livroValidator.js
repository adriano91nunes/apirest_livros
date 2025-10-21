const { db } = require('../models/db');

const validateLivro = (req, res, next) => {
    const { titulo, autorId, anoPublicacao, genero, numPaginas } = req.body;
    if (!titulo || !autorId || !anoPublicacao || !genero || !numPaginas) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios: título, autorId, anoPublicacao, genero, numPaginas.' });
    }
    
    // Valida se o autorId existe
    const autorExiste = db.autores.some(autor => autor.id === autorId);
    if (!autorExiste) {
        return res.status(404).json({ error: 'Autor não encontrado com o ID fornecido.' });
    }

    next();
};

module.exports = { validateLivro };
