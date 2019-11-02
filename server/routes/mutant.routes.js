const express = require('express');
const router = express.Router();

const controller = require('../controllers/mutant.controller.js');

router.post('/mutant', controller.verificar);
router.delete('/mutant', controller.eliminartodo);

module.exports = router;

