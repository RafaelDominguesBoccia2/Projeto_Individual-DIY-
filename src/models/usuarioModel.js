let database = require('../database/config');

function cadastrar(nome, email, senha) {
  let instrucao = `
    INSERT INTO usuario (nome, email, senha_hash) VALUES (?, ?, SHA2(?, 256));
  `;

  return database.executar(instrucao, [nome, email, senha]);
}

function criarEstoque(idUsuario) {
  let instrucao = `
    INSERT INTO estoque_usuario (fk_usuario, fk_material, quantidade)
    SELECT ?, id, quantidade_inicial FROM material;
  `;

  return database.executar(instrucao, [idUsuario]);
}

function autenticar(email, senha) {
  let instrucao = `
    SELECT id_usuario, nome, email FROM vw_login
    WHERE email = ? AND senha_hash = SHA2(?, 256);
  `;

  return database.executar(instrucao, [email, senha]);
}

module.exports = {
  cadastrar,
  criarEstoque,
  autenticar,
};
