const express = require('express');
const router = express.Router();

const controller = require('../controllers/mutant.controller.js');

router.post('/mutant', controller.isMutant);
router.get('/stats',controller.getvacio);

module.exports = router;

