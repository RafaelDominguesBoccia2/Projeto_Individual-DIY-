let database = require('../database/config');

function listar(idUsuario) {
  let instrucao = `
    SELECT codigo, projeto, nivel, tempo_min, realizado_em
    FROM vw_projetos_feitos WHERE id_usuario = ?
    ORDER BY realizado_em DESC;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function marcar(idUsuario, codigo) {
  let instrucao = `
    INSERT INTO projeto_feito (fk_usuario, fk_experimento)
    VALUES (?, (SELECT id FROM experimento WHERE codigo = ?));
  `;

  return database.executar(instrucao, [idUsuario, codigo]);
}

function desmarcar(idUsuario, codigo) {
  let instrucao = `
    DELETE FROM projeto_feito
    WHERE fk_usuario = ?
    AND fk_experimento = (SELECT id FROM experimento WHERE codigo = ?);
  `;

  return database.executar(instrucao, [idUsuario, codigo]);
}

module.exports = {
  listar,
  marcar,
  desmarcar,
};
