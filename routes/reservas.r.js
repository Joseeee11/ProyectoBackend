var express = require('express');
var router = express.Router();
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid.js")

//Listar
router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    res.status(200).render('reserva', { title: 'RESERVAS', dato1: 'Si quieres ver Reservas de Equipos: /reserva_equipos', dato2: 'Si quieres ver Reservas de Espacios: /reserva_espacios', resultadoRq: resultado });
  });