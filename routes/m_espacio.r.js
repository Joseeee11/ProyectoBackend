var express = require('express');
var router = express.Router();
var mantenimientoControllers = require("../controllers/m_espacio.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")


/* GET home page. */
router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    mantenimientoControllers.listar()
    .then ((resultado) => {
      res.status(200).render('m_espacio', {title: 'TRABAJOS de MANTENIMIENTO para ESPACIOS', resultado: resultado})
    })
    .catch ((err) => {
      res.status(404).send(err)
    })
});
//listar por ID
router.get('/id:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const id = req.params.id
  mantenimientoControllers.listarID(id)
  .then((resultado) => {
    res.status(200).render('m_espacio', {title: 'MANTENIMIENTO ENCONTRADO', resultado: resultado})
  })
  .catch((err) => {
    res.send(err)
  })
});



//AGREGAR
router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
    res.status(200).render('mantenimientosPost', { title: 'Añade un Mantenimiento para Espacio' });
});

router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
    const { espacio_mantenimiento, personal_encargado, fecha, motivo} = req.body
    const parametro = { espacio_mantenimiento, personal_encargado, fecha, motivo}
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
