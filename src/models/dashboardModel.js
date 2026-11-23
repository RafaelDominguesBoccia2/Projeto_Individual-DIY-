let database = require('../database/config');

function buscarProjetos(idUsuario) {
  let instrucao = `
    SELECT projetos_realizados, total_experimentos
    FROM vw_dash_projetos WHERE id_usuario = ?;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function buscarMateriais(idUsuario) {
  let instrucao = `
    SELECT materiais_usados, total_materiais
    FROM vw_dash_materiais WHERE id_usuario = ?;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function buscarTempo(idUsuario) {
  let instrucao = `
    SELECT total_minutos, tempo_criando
    FROM vw_dash_tempo WHERE id_usuario = ?;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function buscarCategorias(idUsuario) {
  let instrucao = `
    SELECT categoria, projetos, parte_percentual
    FROM vw_dash_categorias WHERE id_usuario = ?
    ORDER BY projetos DESC;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function buscarUltimasDescobertas(idUsuario) {
  let instrucao = `
    SELECT codigo, projeto, nivel, tempo_min, realizado_em
    FROM vw_projetos_feitos WHERE id_usuario = ?
    ORDER BY realizado_em DESC LIMIT 4;
  `;

  return database.executar(instrucao, [idUsuario]);
}

module.exports = {
  buscarProjetos,
  buscarMateriais,
  buscarTempo,
  buscarCategorias,
  buscarUltimasDescobertas,
};
