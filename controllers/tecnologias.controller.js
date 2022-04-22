
const { request, response } = require('express');
const Tecnologia = require('../models/Tecnologias.model')

const getTecnologias = async ( req , res = response ) => {

    const tecnologias = await Tecnologia.find()

    res.json({
        ok:true,
        tecnologias
    })

}
const crearTecnologia = async( req = request, res = response ) => {

    const tecnologia = new Tecnologia(req.body)
    try {
        await tecnologia.save()
        res.status(201).json({
            ok:true,
            tecnologia
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }

}


module.exports = {
    getTecnologias,
    crearTecnologia
}