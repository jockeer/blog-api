const { Router } = require("express");
const { getTecnologias, crearTecnologia } = require("../controllers/tecnologias.controller");

const router = Router()

router.get('/', getTecnologias)
router.post('/', crearTecnologia)

module.exports = router