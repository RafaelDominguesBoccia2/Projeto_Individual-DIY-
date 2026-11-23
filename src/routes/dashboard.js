let express = require('express');
let router = express.Router();

let dashboardController = require('../controllers/dashboardController');

router.get('/:idUsuario', function (req, res) {
  dashboardController.buscarResumo(req, res);
});

module.exports = router;
