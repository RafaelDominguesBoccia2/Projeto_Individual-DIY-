let feitoModel = require('../models/feitoModel');

function listar(req, res) {
  let idUsuario = Number(req.params.idUsuario);

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }

  feitoModel
    .listar(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao listar os projetos feitos! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function marcar(req, res) {
  let idUsuario = Number(req.params.idUsuario);
  let codigo = req.params.codigo;

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }

  feitoModel
    .marcar(idUsuario, codigo)
    .then(function () {
      res.status(201).send('Projeto marcado como feito.');
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao marcar o projeto! Erro: ', erro.sqlMessage);

      if (erro.code === 'ER_DUP_ENTRY') {
        return res.status(409).send('Este projeto já está marcado como feito.');
      }
      if (erro.code === 'ER_BAD_NULL_ERROR') {
        return res.status(404).send('Experimento não encontrado.');
      }
      if (erro.code === 'ER_NO_REFERENCED_ROW_2') {
        return res.status(404).send('Usuário não encontrado.');
      }
      res.status(500).json(erro.sqlMessage);
    });
}

function desmarcar(req, res) {
  let idUsuario = Number(req.params.idUsuario);
  let codigo = req.params.codigo;

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }

  feitoModel
    .desmarcar(idUsuario, codigo)
    .then(function (resultado) {
      if (resultado.affectedRows === 0) {
        return res.status(404).send('Este projeto não estava marcado como feito.');
      }
      res.send('Projeto desmarcado.');
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao desmarcar o projeto! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
  marcar,
  desmarcar,
};
