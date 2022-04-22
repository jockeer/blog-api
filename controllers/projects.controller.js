const { request, response } = require('express');
const Proyecto = require('../models/Proyecto.model');

const getProyectos = async ( req , res = response ) => {

    const proyectos = await Proyecto.find()

    res.json({
        ok:true,
        proyectos
    })

}
const crearProyecto = async( req = request, res = response ) => {

    const proyecto = new Proyecto(req.body)
    try {
        await proyecto.save()
        res.status(201).json({
            ok:true,
            proyecto
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }

}
const actualizarEvento = async( req = request, res = response ) => {
    const eventoID = req.params.id
    const uid = req.uid
    try {
        const evento = await Evento.findById(eventoID)
        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'El evento no existe'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }
       const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, nuevoEvento, { new:true })

        res.status(200).json({
            ok:true,
            evento :eventoActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    

}
const eliminarEvento = async ( req = request, res = response ) => {

    const eventoID = req.params.id
    const uid = req.uid
    try {
        const evento = await Evento.findById(eventoID)
        if (!evento) {
            return res.status(404).json({
                ok:false,
                msg:'El evento no existe'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio para eliminar este evento'
            })
        }

       const eventoEliminado = await Evento.findByIdAndDelete(eventoID)

        res.status(200).json({
            ok:true,
            evento :eventoEliminado
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
    getProyectos,
    crearProyecto,
    actualizarEvento,
    eliminarEvento
}