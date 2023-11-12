var express = require("express");
var multer = require("multer");
var path = require('node:path');
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get('/:id', function (req, res) {
    usuarioController.getUser(req, res);
});

const upload = multer({
	storage: multer.diskStorage({
		destination(req, file, callback) {
			callback(null, path.resolve(__dirname, "../../public/", "uploads"));
		},
		filename(req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		}
	}), // Armazenamento em disco(na máquina que o software ta rodando)
	limits: {
		// Ajuste o limite de tamanho aqui (em bytes)
		fileSize: 1024 * 1024 * 80, // Limite de 10 MB
	},
});

router.patch('/:id/changeProfileImage', upload.single('profileImage'), (req, res) => {
    usuarioController.changeProfileImage(req, res);
});

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/excluir", function (req, res) {
    usuarioController.excluir(req, res);
})

router.get("/:idEmpresa/listar", function (req, res) {
    usuarioController.listar(req, res);
})

router.get("/:idEmpresa/:status/listar", function (req, res) {
    usuarioController.listarPorStatus(req, res);
})

router.get("/:email/verificar", function (req, res) {
    usuarioController.verificarEmail(req, res);
})

router.post("/excluir", function (req, res) {
    usuarioController.excluir(req, res);
})

router.post("/inativar", function (req, res) {
    usuarioController.inativar(req, res);
})

router.post("/ativar", function (req, res) {
    usuarioController.ativar(req, res);
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