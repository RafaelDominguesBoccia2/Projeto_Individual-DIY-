let estoqueModel = require('../models/estoqueModel');

function listar(req, res) {
  let idUsuario = Number(req.params.idUsuario);

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }

  estoqueModel
    .listar(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao listar o estoque! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function ajustar(req, res) {
  let idUsuario = Number(req.params.idUsuario);
  let codigo = req.params.codigo;
  let variacao = Number(req.body.variacao);

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }
  if (!Number.isInteger(variacao) || variacao === 0) {
    return res.status(400).send('A variação precisa ser um número inteiro diferente de zero.');
  }

  estoqueModel
    .ajustar(idUsuario, codigo, variacao)
    .then(function (resultado) {
      if (resultado.affectedRows === 0) {
        return res.status(404).send('Material não encontrado no estoque.');
      }
      res.send('Estoque atualizado.');
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao atualizar o estoque! Erro: ', erro.sqlMessage);

      if (erro.code === 'ER_CONSTRAINT_CHECK_VIOLATED') {
        return res.status(400).send('A quantidade não pode ficar negativa.');
      }
      res.status(500).json(erro.sqlMessage);
    });
}

function listarPossiveis(req, res) {
  let idUsuario = Number(req.params.idUsuario);

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }

  estoqueModel
    .listarPossiveis(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao buscar os experimentos possíveis! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  listar,
  ajustar,
  listarPossiveis,
};
