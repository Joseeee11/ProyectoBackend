var express = require('express');
var router = express.Router();
var ticketsControllers = require("../controllers/tickets.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    ticketsControllers.listar()
    .then ((resultado) => {
      res.status(200).render('ticket', { title: 'TICKETS para EVENTOS', resultado: resultado });
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
    res.status(200).render('ticket', { title: 'TICKET ENCONTRADO', resultado: resultado });
  })
  .catch((err) => {
    res.status(404).send(err)
  })
});

//agregar
router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
  res.status(200).render('ticketPost', { title: 'Venta de Ticket' });
});
router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const { evento, nombre_comprador, CI_comprador, tipo} = req.body
  const parametro = { evento, nombre_comprador, CI_comprador, tipo}
  ticketsControllers.agregar(parametro)
  .then((resultado) => {
    console.log("se agrego correctamente :)")
    res.status(200).redirect('/tickets');
  })
  .catch((err) => {
    console.log("error al agregar")
    res.status(404).send(err)
  })
});
 

module.exports = router