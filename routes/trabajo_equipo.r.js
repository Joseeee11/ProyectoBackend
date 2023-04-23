var express = require('express');
var router = express.Router();
const {seccion} = require("../middleware/login.mid")
var verificador = require("../middleware/login.mid.js");

/* GET home page. */
router.get('/',seccion,verificador.restringirSolicitante, async function(req, res, next) {
    

});

module.exports = router;

