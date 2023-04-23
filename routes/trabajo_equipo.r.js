var express = require('express');
var router = express.Router();
var mantenimientoControllers = require("../controllers/trabajo_equipo.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")


/* GET home page. */
router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    mantenimientoControllers.listar()
    .then ((resultado) => {
      res.status(200).send(resultado)
    })
    .catch ((err) => {
      res.status(404).send(err)
    })
    // .then ((resultado) => {
    //   res.status(200).render('mantenimientos', {title: 'mantenimiento', resultado: resultado });
    // })
    // .catch ((err) => {
    //   res.status(404).render('error');
    // })
});

router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
    res.status(200).render('mantenimientosPOST', { title: 'Añade un mantenimientos' });
});

router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
    const { equipo_mantenimiento, personal_encargado, fecha, motivo} = req.body
    const parametro = { equipo_mantenimiento, personal_encargado, fecha, motivo}
    mantenimientoControllers.agregar(parametro)
    .then((resultado) => {
      console.log("se agrego correctamente :)")
      res.send(resultado);
    })
    .catch((err) => {
      console.log("errorrrrrrr")
      res.send(err)
    })
  });

module.exports = router;

