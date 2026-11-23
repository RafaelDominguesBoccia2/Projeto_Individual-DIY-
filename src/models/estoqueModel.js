let database = require('../database/config');

function listar(idUsuario) {
  let instrucao = `
    SELECT codigo, nome, tipo, detalhe, unidade, passo, quantidade
    FROM vw_estoque WHERE id_usuario = ?
    ORDER BY id_material;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function ajustar(idUsuario, codigo, variacao) {
  let instrucao = `
    UPDATE estoque_usuario
    SET quantidade = quantidade + ?, dt_atualizacao = NOW()
    WHERE fk_usuario = ?
    AND fk_material = (SELECT id FROM material WHERE codigo = ?);
  `;

  return database.executar(instrucao, [variacao, idUsuario, codigo]);
}

function listarPossiveis(idUsuario) {
  let instrucao = `
    SELECT codigo, experimento FROM vw_experimento_possivel
    WHERE id_usuario = ?;
  `;

  return database.executar(instrucao, [idUsuario]);
}

module.exports = {
  listar,
  ajustar,
  listarPossiveis,
};
