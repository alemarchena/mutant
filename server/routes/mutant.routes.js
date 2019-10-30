const express = require('express');
const router = express.Router();

const controller = require('../controllers/mutant.controller.js');
const scontroller = require('../controllers/stats.controller.js');

router.post('/mutant', controller.isMutant);
router.get('/stats',scontroller.getestadistica);

module.exports = router;

