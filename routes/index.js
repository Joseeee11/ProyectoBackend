var express = require('express');
var router = express.Router();
const {verificarToken} = require('../helpers/login.h')

/* GET home page. */
router.get('/', async function(req, res, next) {
  const {GalletaDeToken} = req.cookies
  const rol = false
  if (GalletaDeToken) {
    GalletaDeToken
    rol =  await verificarToken(GalletaDeToken) 
  }
  console.log('tu rol es : '+rol);
  res.status(200).render('index', { title: 'SALA DE AUDIOVISUALES' , cookie : GalletaDeToken, rol : rol});
});

module.exports = router;


