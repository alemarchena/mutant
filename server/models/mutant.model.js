const mongoose = require('mongoose');

//uso esquema de mongoogse
const {Schema} = mongoose;

//defino la coleccion con tu dato
const mutantes = new Schema({
    dna: {type: String}
});

//le digo a mongodb como se va a llamar la coleccion y su tipo
module.exports = mongoose.model('mutantes', mutantes);