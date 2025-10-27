const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-super-secreto';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario = decoded; // Adiciona os dados do usuário (id, email) na requisição
    next();
  } catch (ex) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
