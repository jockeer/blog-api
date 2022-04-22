const bcrypt = require('bcryptjs')
const { request, response} = require('express')
const { generarJWT } = require('../helpers/jwt')
const Usuario = require('../models/Usuario.model')



const crearUsuario = async (req = request, res = response) => {

    const { email, password } = req.body
    
    try {
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).json({
                ok:false,
                msg:'El usuario ya existe'
            })
        }

        usuario = new Usuario(req.body)

        //todo encryptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password,salt)

        await usuario.save()

        //todo generar JWT
        const token = await generarJWT(usuario.id, usuario.name)

        res.status(201).json({
            ok:true,
            user: usuario,
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })
    }


}

const loginUsuario = async (req = request, res = response) => {

    const { email, password } = req.body

    try {
        const usuario = await Usuario.findOne({ email })
        if ( !usuario ) {
            return res.status(400).json({
                ok:false,
                msg:'Usuario o contraseña incorrectos'
            })
        }

        //todo confirmar los password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'Usuario o contraseña incorrectos'
            })
        }

        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok:true,
            uid:usuario.id,
            name:usuario.name, 
            token
        })
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por Favor hable con el administrador'
        })
    }
    
}

const revalidarToken = async (req = request, res = response) => {

    const uid = req.uid
    const name = req.name

    const token = await generarJWT(uid, name)

    res.json({
        ok:true,
        token,
        uid,
        name
    })
}

module.exports = { 
    crearUsuario,
    loginUsuario,
    revalidarToken
}