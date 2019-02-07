var express = require('express');
var router = express.Router();

var empresaApi = require('./api/tpPrueba');

router.use('/tpPrueba', empresaApi);

module.exports = router;
