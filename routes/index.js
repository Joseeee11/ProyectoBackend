var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {GalletaDeToken} = req.cookies
  res.status(200).render('index', { title: 'SALA DE AUDIOVISUALES' , cookie : GalletaDeToken});
});

module.exports = router;


