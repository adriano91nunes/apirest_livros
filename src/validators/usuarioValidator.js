const validateUsuario = (req, res, next) => {
    const { nomeCompleto, email, senha } = req.body;
    if (!nomeCompleto || !email || !senha) {
        return res.status(400).json({ error: 'Nome completo, e-mail e senha são obrigatórios.' });
    }
    // Uma validação de e-mail mais robusta poderia ser usada aqui
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Formato de e-mail inválido.' });
    }
    next();
};

module.exports = { validateUsuario };
