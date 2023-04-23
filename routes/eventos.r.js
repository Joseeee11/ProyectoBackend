var express = require('express');
var router = express.Router();
var mantenimientoControllers = require("../controllers/m_espacio.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    mantenimientoControllers.listar()
    .then ((resultado) => {
        res.send(resultado)
      //res.status(200).render('m_espacio', {title: 'TRABAJOS de MANTENIMIENTO para ESPACIOS', resultado: resultado})
    })
    .catch ((err) => {
      res.status(404).send(err)
    })
});