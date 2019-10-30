const scontroller = {};
const estadistica = require('../models/stats.model');


scontroller.getestadistica = async (req, res) => {

    estadistica.count_mutant_dna = req.count_mutant_dna;
    estadistica.count_human_dna = req.count_human_dna;
    estadistica.ratio = req.ratio;

    res.status(200).send('Get desde base de datos');
};

module.exports = scontroller;