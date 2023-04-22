var express = require('express');
var router = express.Router();

//importar controladores 
var solicitantesControllers = require("../controllers/solicitantes.c.js")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

//importamos bcrypt
const bcryptjs = require('bcryptjs');

//mostrar
router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
  solicitantesControllers.listar()
  .then((resultado) => {
    res.send(resultado);
  })
  .catch((err) => {
    res.send(err)
  })
});

//busqueda por Cedula
router.get('/:CI', seccion,verificador.restringirSolicitante, function(req, res, next) {
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
router.post('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
  const { usuario_unico, nombre_apellido, CI, fecha_nacimiento, direccion, contrasena, nro_telefono} = req.body
  const parametro = { usuario_unico, nombre_apellido, CI, fecha_nacimiento, direccion, contrasena, nro_telefono}
  solicitantesControllers.agregar(parametro)
  .then((resultado) => {
    res.send(resultado);
  })
  .catch((err) => {
    console.log("errorrrrrrr")
    res.send(err)
  })
});

//eliminar
router.delete('/eliminar/:CI', seccion, verificador.restringirSolicitante, function(req, res, next) {
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