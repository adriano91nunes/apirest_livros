const validateAutor = (req, res, next) => {
  const { nome, nacionalidade } = req.body;
  if (!nome || !nacionalidade) {
    return res.status(400).json({ error: 'Nome e nacionalidade são obrigatórios.' });
  }
  next();
};

module.exports = { validateAutor };
