var express = require("express");
var router = express.Router();

var capturaController = require("../controllers/capturaController");

router.get("/:idEmpresa/listar", function (req, res) {
    capturaController.listarOcorrenciasCriticas(req, res);
  });

  router.get("/:idEmpresa/listarCapturasComponentes", function (req, res) {
    capturaController.listarCapturasComponentes(req, res);
  });

  router.get("/:idEmpresa/listarUptime", function (req, res) {
    capturaController.listarUptime(req, res);
  });

module.exports = router;