const express = require('express');
const router = express.Router();
const achatController = require('./controller');

router.post('/', achatController.addAchat);

module.exports = router;
