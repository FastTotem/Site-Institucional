var express = require("express");
var router = express.Router();

var parametrosController = require("../controllers/parametrosController");

router.get("/:idEmpresa", function (req, res) {
    parametrosController.getEmpresaParams(req, res);
});

router.patch("/:idParam/changeParams", function (req, res) {
    parametrosController.updateParamLevel(req, res);
});

module.exports = router;