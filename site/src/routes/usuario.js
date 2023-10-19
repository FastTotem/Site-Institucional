var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get('/:id', function (req, res) {
    usuarioController.getUser(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/checarSenha", function (req, res) {
    usuarioController.checarSenha(req, res);
});

router.patch("/:id/updateNome", function (req, res) {
    usuarioController.updateNome(req, res);
});

router.patch("/:id/updateSenha", function (req, res) {
    usuarioController.updateSenha(req, res);
});

module.exports = router;