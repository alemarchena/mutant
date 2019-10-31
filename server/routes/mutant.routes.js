const express = require('express');
const router = express.Router();

const controller = require('../controllers/mutant.controller.js');

router.post('/mutant', controller.isMutant);
router.delete('/mutant', controller.borrartodo);

module.exports = router;

