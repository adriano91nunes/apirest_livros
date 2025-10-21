// Usaremos o UUID para gerar IDs únicos
const { v4: uuidv4 } = require('uuid');

// Dados em memória
const db = {
  autores: [
    { id: '1', nome: 'J.R.R. Tolkien', nacionalidade: 'Sul-africano' },
    { id: '2', nome: 'George Orwell', nacionalidade: 'Britânico' }
  ],
  livros: [
    { id: '101', titulo: 'O Senhor dos Anéis', autorId: '1', anoPublicacao: 1954, genero: 'Fantasia', numPaginas: 1200 },
    { id: '102', titulo: '1984', autorId: '2', anoPublicacao: 1949, genero: 'Ficção Distópica', numPaginas: 328 }
  ],
  usuarios: [], // Começa vazio
  leituras: [] // Registros de leitura
};

module.exports = { db, uuidv4 };