const { Router } = require("express");
const { check } = require("express-validator");
const { getProyectos, crearProyecto, actualizarEvento, eliminarEvento } = require("../controllers/projects.controller");
const { isDate } = require("../helpers/isDate");
const { validate } = require("../middlewares/validate");
const { validarJWT } = require("../middlewares/validateJWT");

const router = Router()


//Obenter eventos
router.get('/', getProyectos)



//crear evento
router.post('/',[
    check('title','El titulo es necesario').notEmpty(),
    validate
], crearProyecto)

router.use(validarJWT) //! Para que todas las rutas de este archivo tengas la validacion del token sin escribirlas en cada una

//actualizar evento
router.put('/:id',[
    check('title','El titulo es necesario').notEmpty(),
    check('start', 'La fecha de inicio en obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion en obligatoria').custom(isDate),
    validate
],actualizarEvento)

//borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router