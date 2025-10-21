const express = require('express');
const app = express();

// Middlewares
app.use(express.json()); // Para parsear JSON no corpo das requisições

// Importação das rotas
const autorRoutes = require('./routes/autorRoutes');
const livroRoutes = require('./routes/livroRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');

// Definição das rotas base
app.get('/', (req, res) => {
    res.send('API de Gerenciamento de Livros no ar!');
});

app.use('/autores', autorRoutes);
app.use('/livros', livroRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/auth', authRoutes);

// Middleware para tratamento de erros (exemplo simples)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

module.exports = app;
