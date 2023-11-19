var express = require("express");
var router = express.Router();

var relatorioController = require("../controllers/relatorioController");

router.get("/:idEmpresa/:dataInicial/:dataFinal/:tipo/:totem/gerar", function (req, res) {
    relatorioController.gerar(req, res);
})

module.exports = router;