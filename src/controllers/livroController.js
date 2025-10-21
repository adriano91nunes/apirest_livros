const { db, uuidv4 } = require('../models/db');

const getAllLivros = (req, res) => {
  // Mapeia os livros para incluir os dados do autor (relacionamento)
  const livrosComAutor = db.livros.map(livro => {
    const autor = db.autores.find(a => a.id === livro.autorId);
    return { ...livro, autor: autor || { nome: 'Desconhecido', nacionalidade: 'Desconhecida' } };
  });
  res.status(200).json(livrosComAutor);
};

const getLivroById = (req, res) => {
  const livro = db.livros.find(l => l.id === req.params.id);
  if (!livro) {
    return res.status(404).json({ error: 'Livro não encontrado.' });
  }
  const autor = db.autores.find(a => a.id === livro.autorId);
  res.status(200).json({ ...livro, autor });
};

const createLivro = (req, res) => {
  const { titulo, autorId, anoPublicacao, genero, numPaginas } = req.body;
  const novoLivro = { id: uuidv4(), titulo, autorId, anoPublicacao, genero, numPaginas };
  db.livros.push(novoLivro);
  res.status(201).json(novoLivro);
};

// Funções updateLivro e deleteLivro seguem um padrão similar...
// ... (implementação completa no bloco de código final)

module.exports = {
  getAllLivros,
  getLivroById,
  createLivro,
  //...
};

// A implementação completa das funções de update e delete para livros 
// estará no código final para manter a fluidez da explicação.