const { db, uuidv4 } = require('../models/db');
const bcrypt = require('bcryptjs');

const registrarUsuario = async (req, res) => {
  const { nomeCompleto, email, senha } = req.body;

  // Verifica se o e-mail já está em uso
  if (db.usuarios.some(user => user.email === email)) {
    return res.status(409).json({ error: 'Este e-mail já está em uso.' });
  }

  const salt = await bcrypt.genSalt(10);
  const senhaHash = await bcrypt.hash(senha, salt);

  const novoUsuario = { id: uuidv4(), nomeCompleto, email, senha: senhaHash };
  db.usuarios.push(novoUsuario);

  // Não retornar a senha no response
  const { senha: _, ...usuarioSemSenha } = novoUsuario;

  res.status(201).json(usuarioSemSenha);
};

module.exports = { registrarUsuario };

// ... (função registrarUsuario já existente)

// RN: Registro de Leitura
const registrarLeitura = (req, res) => {
    const usuarioId = req.usuario.id; // ID vem do token JWT (middleware)
    const { livroId, status } = req.body;

    // Validações
    if (!livroId || !status) {
        return res.status(400).json({ error: 'livroId e status são obrigatórios.' });
    }
    const statusValidos = ['a ler', 'lendo', 'concluído'];
    if (!statusValidos.includes(status)) {
        return res.status(400).json({ error: 'Status inválido. Use "a ler", "lendo" ou "concluído".' });
    }
    const livro = db.livros.find(l => l.id === livroId);
    if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado.' });
    }

    // Verifica se já existe um registro para este livro e usuário
    const leituraExistenteIndex = db.leituras.findIndex(l => l.usuarioId === usuarioId && l.livroId === livroId);
    
    if (leituraExistenteIndex > -1) {
        // Atualiza o registro existente
        db.leituras[leituraExistenteIndex].status = status;
        return res.status(200).json(db.leituras[leituraExistenteIndex]);
    } else {
        // Cria um novo registro
        const novaLeitura = {
            id: uuidv4(),
            usuarioId,
            livroId,
            status,
            avaliacao: null // Avaliação começa nula
        };
        db.leituras.push(novaLeitura);
        return res.status(201).json(novaLeitura);
    }
};

// RN: Avaliação de um Livro
const avaliarLivro = (req, res) => {
    const usuarioId = req.usuario.id;
    const { livroId } = req.params;
    const { nota } = req.body;

    if (!nota || nota < 1 || nota > 5) {
        return res.status(400).json({ error: 'A nota da avaliação deve ser um número entre 1 e 5.' });
    }

    // O usuário só pode avaliar um livro que está em sua lista de leitura
    const leituraIndex = db.leituras.findIndex(l => l.usuarioId === usuarioId && l.livroId === livroId);
    
    if (leituraIndex === -1) {
        return res.status(404).json({ error: 'Registro de leitura não encontrado para este usuário e livro. Adicione o livro à sua lista antes de avaliar.' });
    }
    
    db.leituras[leituraIndex].avaliacao = nota;
    res.status(200).json(db.leituras[leituraIndex]);
};

// Obter leituras do usuário logado
const getMinhasLeituras = (req, res) => {
    const usuarioId = req.usuario.id;
    const minhasLeituras = db.leituras
        .filter(l => l.usuarioId === usuarioId)
        .map(leitura => {
            const livroInfo = db.livros.find(l => l.id === leitura.livroId);
            const autorInfo = db.autores.find(a => a.id === livroInfo.autorId);
            return {
                ...leitura,
                livro: {
                    ...livroInfo,
                    autor: autorInfo
                }
            };
        });
    
    res.status(200).json(minhasLeituras);
};


module.exports = { registrarUsuario, registrarLeitura, avaliarLivro, getMinhasLeituras };
