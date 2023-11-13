var express = require("express");
var router = express.Router();

var totemController = require("../controllers/totemController");

router.post("/cadastrar", function (req, res) {
    totemController.cadastrar(req, res);
})

router.post("/excluir", function (req, res) {
    totemController.excluir(req, res);
})

router.get("/:idEmpresa/listar", function (req, res) {
    totemController.listar(req, res);
})

router.get("/:idEmpresa/:status/listar", function (req, res) {
    totemController.listarPorStatus(req, res);
})

router.get("/:idTotem/info", function (req, res) {
    totemController.getTotemInfo(req, res);
})

router.get("/:idTotem/infoDiscos", function (req, res) {
    totemController.getDisks(req, res);
})

router.get("/:idEmpresa/:nome/listarPorNome", function (req, res) {
    totemController.listarPorNome(req, res);
})

module.exports = router;