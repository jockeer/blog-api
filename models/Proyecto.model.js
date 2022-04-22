const { model, Schema }  = require("mongoose");

const ProyectoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    github: {
        type: String,
    },
    image: {
        type: String,
    },
    demo: {
        type: String,
    },
    tecnos: {
        type: Array,
    },
    
})

ProyectoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject()

    object.id = _id
    return object
})


module.exports = model('Proyecto', ProyectoSchema)

