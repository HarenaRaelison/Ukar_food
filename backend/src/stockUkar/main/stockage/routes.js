const express = require('express');
const router = express.Router();
const { addStockMovement } = require('./controller');

// Route pour ajouter un mouvement de stock
router.post('/', addStockMovement);

module.exports = router;
