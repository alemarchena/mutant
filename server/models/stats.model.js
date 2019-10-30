const mongoose = require('mongoose');

const {Schema} =  mongoose;

const estadisticas = new Schema({
    dna:        { type: String },
    esmutante:  { type:Boolean }
});

module.exports = mongoose.model('estadisticas',estadisticas);