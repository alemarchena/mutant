const scontroller = {};
const estadistica = require('../models/stats.model');


scontroller.getestadistica = async (req, res) => {

    const esmut = await estadistica.find({ esmutante: true });//consulta los mutantes
    const eshum = await estadistica.find({ esmutante: false });//consulta los humanos

    let respuesta = {
        count_mutant_dna:0,
        count_human_dna:0,
        ratio:0
    };
    
    //calculo estadísticas
    respuesta.count_mutant_dna = esmut.length;
    respuesta.count_human_dna = eshum.length;
    respuesta.ratio = esmut.length / eshum.length;

    res.json(respuesta);
};

module.exports = scontroller;