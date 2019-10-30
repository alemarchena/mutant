const mongoose = require('mongoose');

const {Schema} =  mongoose;

const estadisticas = new Schema({

    count_mutant_dna:   {type:int},
    count_human_dna:     {type:int},
    ratio:              {type:double}
});

module.exports = mongoose.model('estadisticas',estadisticas);