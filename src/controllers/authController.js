const { db } = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// A chave secreta deve ser guardada em variáveis de ambiente em um projeto real
const JWT_SECRET = 'seu-segredo-super-secreto';

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
  }

  const usuario = db.usuarios.find(user => user.email === email);
  if (!usuario) {
    return res.status(401).json({ error: 'Credenciais inválidas.' }); // Mensagem genérica por segurança
  }

  const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
  if (!senhaCorreta) {
    return res.status(401).json({ error: 'Credenciais inválidas.' });
  }

  // Gera o token JWT
  const token = jwt.sign({ id: usuario.id, email: usuario.email }, JWT_SECRET, {
    expiresIn: '1h' // Token expira em 1 hora
  });

  res.status(200).json({ message: 'Login bem-sucedido!', token });
};

module.exports = { login };
