var express = require('express');
var router = express.Router();
var ticketsControllers = require("../controllers/tickets.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    ticketsControllers.listar()
    .then ((resultado) => {
        res.send(resultado)
      //res.status(200).render('m_espacio', {title: 'TRABAJOS de tickets para ESPACIOS', resultado: resultado})
    })
    .catch ((err) => {
      res.status(404).send(err)
    })
});

router.get('/id:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const id = req.params.id
  console.log(id);
  ticketsControllers.listarID(id)
  .then((resultado) => {
    res.status(200).send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});

router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const { evento, nombre_comprador, CI_comprador, tipo} = req.body
  const parametro = { evento, nombre_comprador, CI_comprador, tipo}
  ticketsControllers.agregar(parametro)
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