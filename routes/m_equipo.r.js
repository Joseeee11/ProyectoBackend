var express = require('express');
var router = express.Router();
var mantenimientoControllers = require("../controllers/m_equipo.c")
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")


/* GET home page. */
router.get('/', seccion, verificador.restringirSolicitante, function(req, res, next) {
    mantenimientoControllers.listar()
    .then ((resultado) => {
      res.status(200).render('m_equipo', {title: 'TRABAJOS de MANTENIMIENTO para EQUIPOS', resultado: resultado})
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
    res.status(200).render('m_equipo', {tittle: 'MANTENIMIENTO ENCONTRADO', resultado: resultado})
  })
  .catch((err) => {
    res.send(err)
  })
});



//AGREGAR
router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
    res.status(200).render('mantenimientosPost', { title: 'Añade un Mantenimiento para Equipo' });
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

