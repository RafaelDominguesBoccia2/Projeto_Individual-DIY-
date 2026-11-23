let express = require('express');
let router = express.Router();

let estoqueController = require('../controllers/estoqueController');

router.get('/:idUsuario', function (req, res) {
  estoqueController.listar(req, res);
});

router.get('/:idUsuario/possiveis', function (req, res) {
  estoqueController.listarPossiveis(req, res);
});

router.put('/:idUsuario/:codigo', function (req, res) {
  estoqueController.ajustar(req, res);
});

module.exports = router;
