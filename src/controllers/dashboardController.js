let dashboardModel = require('../models/dashboardModel');

function buscarResumo(req, res) {
  let idUsuario = Number(req.params.idUsuario);

  if (!Number.isInteger(idUsuario) || idUsuario < 1) {
    return res.status(400).send('O id do usuário é inválido!');
  }

  Promise.all([
    dashboardModel.buscarProjetos(idUsuario),
    dashboardModel.buscarMateriais(idUsuario),
    dashboardModel.buscarTempo(idUsuario),
    dashboardModel.buscarCategorias(idUsuario),
    dashboardModel.buscarUltimasDescobertas(idUsuario),
  ])
    .then(function (respostas) {
      if (respostas[0].length === 0) {
        return res.status(404).send('Usuário não encontrado.');
      }

      res.json({
        projetos: respostas[0][0],
        materiais: respostas[1][0],
        tempo: respostas[2][0],
        categorias: respostas[3],
        ultimasDescobertas: respostas[4],
      });
    })
    .catch(function (erro) {
      console.log('\nHouve um erro ao buscar a dashboard! Erro: ', erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  buscarResumo,
};
