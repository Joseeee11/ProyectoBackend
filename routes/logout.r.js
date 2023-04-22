var express = require('express');
var router = express.Router();
var logout = require("../controllers/logout.c");
const {seccion} = require("../middleware/login.mid")


/* GET home page. */
router.get('/',seccion, async function(req, res, next) {
    var {GalletaDeToken} = req.cookies
    console.log(typeof(GalletaDeToken));
    GalletaDeToken = await logout.cerrar()
    console.log(GalletaDeToken);
    console.log('cerro galleta');
    res.setHeader('Set-Cookie', GalletaDeToken).redirect('/')
});


module.exports = router;

