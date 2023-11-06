var express = require("express");
var router = express.Router();

var dadosComponentesController = require("../controllers/dadosComponentesController");

router.get("/buscarDadosGraficos/:idTotem", function (req, res) {
    dadosComponentesController.getChartsData(req, res);
});

router.get("/buscarDadosKPIs/:idTotem", function (req, res) {
    dadosComponentesController.getKPIsData(req, res);
});

module.exports = router;