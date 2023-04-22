var express = require('express');
var router = express.Router();
var personalControllers = require("../controllers/personal.c.js")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

//importamos bcrypt
const bcryptjs = require('bcryptjs');

//listar
router.get('/', seccion, /*verificador.restringirSolicitante,*/ function(req, res, next) {
  personalControllers.listar()
  .then((resultado)=>{
    res.send(resultado)
  })
  .catch((err)=>{
    res.send(err)
  })
});
//mostrar por cedula
router.get('/:CI', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.CI
  personalControllers.listarCedula(parametro)
  .then((resultado) => {
    res.send(resultado);
  })
  .catch((err) => {
    res.send(err)
  })
});

// post
router.post('/agregar', seccion, /*verificador.soloAdmin,*/ function(req, res, next) {
  const { usuario_unico, nombre, CI, cargo, especialidad, contrasena} = req.body
  const parametro = { usuario_unico, nombre, CI, cargo, especialidad, contrasena}
  personalControllers.agregar(parametro)
  .then((resultado) => {
    console.log("se agrego correctamente :)")
    res.send(resultado);
  })
  .catch((err) => {
    console.log("error")
    res.send(err)
  })
});


//eliminar
router.delete('/eliminar/:CI', seccion, /*verificador.soloAdmin,*/ function(req, res, next) {
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