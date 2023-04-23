var express = require('express');
var router = express.Router();
const {verificarToken} = require('../helpers/login.h')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const {GalletaDeToken} = req.cookies
  const rol = null
  if (GalletaDeToken) {
    GalletaDeToken
    rol =  await verificarToken(GalletaDeToken) 
  }
  res.status(200).render('index', { title: 'SALA DE AUDIOVISUALES' , cookie : GalletaDeToken, rol : rol});
});

module.exports = router;


