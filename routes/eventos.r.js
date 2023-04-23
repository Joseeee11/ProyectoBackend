var express = require('express');
var router = express.Router();
var eventosControllers = require("../controllers/eventos.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    eventosControllers.listar()
    .then ((resultado) => {
        res.send(resultado)
      //res.status(200).render('m_espacio', {title: 'TRABAJOS de eventos para ESPACIOS', resultado: resultado})
    })
    .catch ((err) => {
      res.status(404).send(err)
    })
});

router.get('/id:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const id = req.params.id
  console.log(id);
  eventosControllers.listarID(id)
  .then((resultado) => {
    res.status(200).send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});

router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const { nombre, personal_encargado, espacio_solici, equipo_solici, tickets_disponibles} = req.body
  const parametro = { nombre, personal_encargado, espacio_solici, equipo_solici, tickets_disponibles}
  eventosControllers.agregar(parametro)
  .then((resultado) => {
    console.log("se agrego correctamente :)")
    res.send(resultado);
  })
  .catch((err) => {
    console.log("errorrrrrrr")
    res.send(err)
  })
});


module.exports = router