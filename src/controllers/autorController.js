const { db, uuidv4 } = require('../models/db');

const getAllAutores = (req, res) => {
  res.status(200).json(db.autores);
};

const getAutorById = (req, res) => {
  const autor = db.autores.find(a => a.id === req.params.id);
  if (!autor) {
    return res.status(404).json({ error: 'Autor não encontrado.' });
  }
  res.status(200).json(autor);
};

const createAutor = (req, res) => {
  const { nome, nacionalidade } = req.body;
  const novoAutor = { id: uuidv4(), nome, nacionalidade };
  db.autores.push(novoAutor);
  res.status(201).json(novoAutor);
};

const updateAutor = (req, res) => {
  const { id } = req.params;
  const { nome, nacionalidade } = req.body;
  const autorIndex = db.autores.findIndex(a => a.id === id);

  if (autorIndex === -1) {
    return res.status(404).json({ error: 'Autor não encontrado.' });
  }

  const autorAtualizado = { ...db.autores[autorIndex], nome, nacionalidade };
  db.autores[autorIndex] = autorAtualizado;
  res.status(200).json(autorAtualizado);
};

const deleteAutor = (req, res) => {
  const { id } = req.params;
  const autorIndex = db.autores.findIndex(a => a.id === id);

  if (autorIndex === -1) {
    return res.status(404).json({ error: 'Autor não encontrado.' });
  }

  // Validação: Não permitir excluir autor se ele estiver associado a um livro
  const autorEmUso = db.livros.some(livro => livro.autorId === id);
  if (autorEmUso) {
    return res.status(409).json({ error: 'Não é possível excluir o autor, pois ele está associado a um ou mais livros.' });
  }

  db.autores.splice(autorIndex, 1);
  res.status(204).send(); // 204 No Content
};

module.exports = {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutor,
  deleteAutor
};
