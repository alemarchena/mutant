const mongoose = require('mongoose');

const {Schema} =  mongoose;

const estadisticas = new Schema({

    count_mutant_dna:   {type:Number},
    count_human_dna:    {type:Number},
    ratio:              {type:Number}
});

module.exports = mongoose.model('estadisticas',estadisticas);