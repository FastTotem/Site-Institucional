var express = require("express");
var router = express.Router();

var capturaController = require("../controllers/capturaController");

router.get("/buscarDadosGraficos/:idTotem", function (req, res) {
    capturaController.getChartsData(req, res);
});

router.get("/buscarDadosKPIs/:idTotem", function (req, res) {
    capturaController.getKPIsData(req, res);
});

module.exports = router;