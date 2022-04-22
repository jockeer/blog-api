const {Schema, model} = require("mongoose");

const TecnologiaSchema = Schema({

    name: {
        type: String,
        require: true
    },
    img:{
        type: String,
        require: true,
    },
    
})

TecnologiaSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject()

    object.id = _id
    return object
})

module.exports = model('Tecnologias', TecnologiaSchema)