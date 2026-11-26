let express = require('express');
let router = express.Router();

let feitoController = require('../controllers/feitoController');

router.get('/:idUsuario', function (req, res) {
  feitoController.listar(req, res);
});

router.post('/:idUsuario/:codigo', function (req, res) {
  feitoController.marcar(req, res);
});

router.delete('/:idUsuario/:codigo', function (req, res) {
  feitoController.desmarcar(req, res);
});

module.exports = router;
