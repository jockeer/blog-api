const { Router } = require("express")
const { check } = require("express-validator")
const { crearUsuario, loginUsuario, revalidarToken } = require("../controllers/auth.controller")
const { validate } = require("../middlewares/validate")
const { validarJWT } = require("../middlewares/validateJWT")

const router = Router()


router.post('/new', [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe tener 6 caracteres como minimo').isLength({min:6}),
    validate
], crearUsuario)

router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe tener 6 caracteres como minimo').isLength({min:6}),
    validate
] , loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router