var express = require('express');
var router = express.Router();
var personalControllers = require("../controllers/personal.c.js")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")
const {verificarToken} = require('../helpers/login.h')

//importamos bcrypt
const bcryptjs = require('bcryptjs');

//listar
router.get('/', seccion, verificador.soloAdmin, function(req, res, next) {
  personalControllers.listar()
  .then((resultado)=>{
    res.status(200).render('personal', {title: 'PERSONAL TÉCNICO', resultado: resultado });
  })
  .catch((err)=>{
    res.status(404).render('error')
  })
});
//mostrar por ID
router.get('/id:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.id
  personalControllers.listarID(parametro)
  .then((resultado) => {
    res.status(200).render('personal', {title: 'PERSONAL ENCONTRADO', resultado: resultado });
  })
  .catch((err) => {
    res.status(404).render('error')
  })
});
//mostrar por cedula
router.get('/CI:CI', seccion,verificador.soloAdmin, function(req, res, next) {
  const parametro = req.params.CI
  personalControllers.listarCedula(parametro)
  .then((resultado) => {
    res.status(200).render('personal', {title: 'PERSONAL ENCONTRADO', resultado: resultado });
  })
  .catch((err) => {
    res.status(404).render('error')
  })
});

// post
router.get('/agregar', seccion, verificador.soloAdmin, function(req, res, next) {
  res.status(200).render('personalPost', { title: 'Añade un Personal' });
});
router.post('/agregar', seccion, verificador.soloAdmin, function(req, res, next) {
  const { usuario_unico, nombre, CI, cargo, especialidad, contrasena} = req.body
  const parametro = { usuario_unico, nombre, CI, cargo, especialidad, contrasena}
  personalControllers.agregar(parametro)
  .then((resultado) => {
    console.log("se agrego correctamente :)")
    res.status(200).redirect('/personal');
  })
  .catch((err) => {
    console.log("error")
    res.status(404).render('error')
  })
});

router.get('/MiCuenta', seccion, verificador.verificador, async function(req, res, next) {
  const {GalletaDeToken} = req.cookies
  console.log('info');
  var rol = false
    if (GalletaDeToken) {
      rol =  await verificarToken(GalletaDeToken) 
      rol=rol.role
    }
  console.log('tu rol es : '+rol);
  try{
    const resultado = await personalControllers.MiInfo(GalletaDeToken)
    console.log(resultado);
    res.status(200).render('miCuenta', {title: 'Soy un Personal', resultado: resultado, cookie: GalletaDeToken, rol : rol})
  }catch(error){
    console.log(error);
    res.status(404).send('Error en la Base de Datos')
  }
});




//eliminar
router.delete('/eliminar/:CI', seccion, verificador.soloAdmin, function(req, res, next) {
  const parametro = req.params.CI
  personalControllers.eliminar(parametro)
  .then((resultado) => {
    res.send(resultado);
  })
  .catch((err) => {
    res.send(err)
  })
})   //PROBAR CON /eliminar/30976127

module.exports = router;

