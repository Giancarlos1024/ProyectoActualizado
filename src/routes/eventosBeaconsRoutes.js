const express = require('express');
const router = express.Router();
const  getEventosBeacons  = require('../controllers/eventosBeaconsController');
router.get('/eventos', getEventosBeacons.getAllEventos);
router.get('/eventos2', getEventosBeacons.getAllEventos2);


module.exports = router;
