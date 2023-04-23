var express = require('express');
var router = express.Router();
const {verificarToken} = require('../helpers/login.h')

//importar controladores 
var solicitantesControllers = require("../controllers/solicitantes.c.js")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

//importamos bcrypt
const bcryptjs = require('bcryptjs');
const loginH = require('../helpers/login.h.js');

//mostrar
router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
  solicitantesControllers.listar()
  .then((resultado) => {
    res.status(200).render('solicitante', { title: 'SOLICITANTES', resultado: resultado });
  })
  .catch((err) => {
    res.send(err)
  })
});
//busqueda por ID
router.get('/id:ID', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.ID
  solicitantesControllers.listarID(parametro)
  .then((resultado) => {
    res.status(200).render('solicitante', { title: 'SOLICITANTES', resultado: resultado });
  })
  .catch((err) => {
    res.send('Ocurrió un error').status(404)
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
    const resultado = await solicitantesControllers.MiInfo(GalletaDeToken)
    console.log(resultado);
    res.status(200).render('miCuenta', {title: "Soy un Solicitante", resultado: resultado, cookie:GalletaDeToken, rol: rol})
  }catch(error){
    console.log(error);
    res.status(404).send('Error en la Base de Datos')
  }
});


//busqueda por Cedula
router.get('/CI:CI', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.CI
  solicitantesControllers.listar_Cedula(parametro)
  .then((resultado) => {
    res.send(resultado).status(200);
  })
  .catch((err) => {
    res.send('Ocurrió un error').status(404)
  })
});


//agregar
router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
  res.status(200).render('solicitantePost', { title: 'Registra Solicitante' });
});
router.post('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
  const { usuario_unico, nombre_apellido, CI, fecha_nacimiento, direccion, contrasena, nro_telefono} = req.body
  const parametro = { usuario_unico, nombre_apellido, CI, fecha_nacimiento, direccion, contrasena, nro_telefono}
  solicitantesControllers.agregar(parametro)
  .then((resultado) => {
    res.status(200).redirect('/solicitantes');
  })
  .catch((err) => {
    console.log("errorrrrrrr")
    res.send(err)
  })
});

//eliminar
router.delete('/eliminar/:CI', seccion, verificador.soloAdmin, function(req, res, next) {
  const parametro = req.params.CI
  solicitantesControllers.eliminar(parametro)
  .then((resultado) => {
    res.send(resultado);
  })
  .catch((err) => {
    res.send(err)
  })
})

module.exports = router;