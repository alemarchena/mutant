const scontroller = {};
const estadistica = require('../models/stats.model');


scontroller.getestadistica = async (req, res) => {

    const est = await estadistica.find();

    
    res.json(est);
};

module.exports = scontroller;