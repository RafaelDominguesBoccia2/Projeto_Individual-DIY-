let usuarioModel = require('../models/usuarioModel');

function cadastrar(req, res) {
  let nome = req.body.nome;
  let email = req.body.email;
  let senha = req.body.senha;

  if (typeof nome !== 'string' || nome.trim().length < 3) {
    return res.status(400).send('Nome inválido.');
  }
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
    return res.status(400).send('E-mail inválido.');
  }
  if (typeof senha !== 'string' || senha.length < 8 || senha.length > 64) {
    return res.status(400).send('Senha inválida.');
  }

  let nomeLimpo = nome.trim();
  let emailLimpo = email.trim().toLowerCase();

  usuarioModel
    .cadastrar(nomeLimpo, emailLimpo, senha)
    .then(function (resultado) {
      let idUsuario = resultado.insertId;

      return usuarioModel.criarEstoque(idUsuario).then(function () {
        res.status(201).json({ id: idUsuario, nome: nomeLimpo, email: emailLimpo });
      });
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao cadastrar! Erro: ', erro.sqlMessage);

      if (erro.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Este e-mail já está cadastrado.');
      }
      res.status(500).json(erro.sqlMessage);
    });
}

function autenticar(req, res) {
  let email = req.body.email;
  let senha = req.body.senha;

  if (typeof email !== 'string' || email.trim() === '') {
    return res.status(400).send('Seu e-mail está undefined!');
  }
  if (typeof senha !== 'string' || senha === '') {
    return res.status(400).send('Sua senha está indefinida!');
  }

  usuarioModel
    .autenticar(email.trim().toLowerCase(), senha)
    .then(function (resultado) {
      if (resultado.length === 1) {
        res.json({
          id: resultado[0].id_usuario,
          nome: resultado[0].nome,
          email: resultado[0].email,
        });
      } else {
        res.status(403).send('E-mail e/ou senha inválido(s).');
      }
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao realizar o login! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  autenticar,
};
