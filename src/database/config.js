let mysql = require('mysql2');

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function executar(instrucao, parametros) {
  console.log('Executando a instrução SQL: \n' + instrucao);

  return pool
    .promise()
    .query(instrucao, parametros)
    .then(function (resposta) {
      return resposta[0];
    });
}

module.exports = {
  executar,
};
