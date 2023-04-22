var express = require('express');
var router = express.Router();
var logout = require("../controllers/logout.c");
const { error } = require('console');
const { send } = require('process');
const { type } = require('os');


/* GET home page. */
router.get('/', async function(req, res, next) {
    var {GalletaDeToken} = req.cookies
    console.log(typeof(GalletaDeToken));
    GalletaDeToken = await logout.cerrar()
    console.log(GalletaDeToken);
    console.log('cerro galleta');
    res.setHeader('Set-Cookie', GalletaDeToken).redirect('/')
});


module.exports = router;

