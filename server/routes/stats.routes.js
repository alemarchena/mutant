const express = require('express');
const srouter = express.Router();

const scontroller = require('../controllers/stats.controller.js');

srouter.get('/stats', scontroller.getestadistica);

module.exports = srouter;
