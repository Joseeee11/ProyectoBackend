var express = require('express');
var router = express.Router();

//importar controladores OJO, NO MODIFICAR
var reserva_espaciosControllers = require("../controllers/reserva_espacios.c.js")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")


//Listar
router.get('/', /*verificador.restringirSolicitante,*/ function(req, res, next) {
  reserva_espaciosControllers.listar()
  .then((resultado) => {
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});

//Listar por ID
router.get('/:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let parametro = req.params.id
  console.log(parametro)

  reserva_espaciosControllers.listarID(parametro)
  .then((resultado) => {
    console.log('estamos en rutas');
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});

//listar por fecha
router.get('/fecha/:fecha', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let parametro = req.params.fecha
  console.log(`buscar reserva con la fecha ${parametro}`) //
  reserva_espaciosControllers.listarFecha(parametro)
  .then((resultado) => {
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});

//listar por rango de fechas
router.get('/fechasRango/:fechaI/:fechaF', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let fechaI = req.params.fechaI
  let fechaF = req.params.fechaF

  console.log(`buscar reservas que se necuentre entre ${fechaI} a ${fechaF}`) 
  reserva_espaciosControllers.listarFechaRango(fechaI, fechaF)
  .then((resultado) => {
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
})    //PROBAR CON /fechasRango/2014-02-02/2015-12-12

//ELIMINAR 
router.delete('/eliminar/:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.id
  console.log(parametro); //id que vamos a borrar
  reserva_espaciosControllers.eliminar(parametro)
  .then((eliminado) => {
    console.log('estamos en rutas')
    res.send(eliminado)
  })
  .catch((err) => {
    res.send(err)
  })
})  //PROBAR CON /eliminar/2

//agregar espacios
router.post('/agregar', /*verificador.restringirSolicitante,*/ function(req, res, next) {
  const { hora_inicio , hora_fin, personal_solici, solicitante, fecha, motivo, espacio_solici} = req.body
  const parametro = { hora_inicio , hora_fin, personal_solici, solicitante, fecha, motivo, espacio_solici}
  reserva_espaciosControllers.agregar(parametro)
  .then((resultado) => {
    console.log("se agrego correctamente :)")
    res.send(resultado);
  })
  .catch((err) => {
    res.send(err)
  })
});




module.exports = router;
