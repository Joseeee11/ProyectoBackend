var express = require('express');
var router = express.Router();


//importar controladores OJO, NO MODIFICAR
var espaciosControllers = require("../controllers/espacios.c.js")
var verificador = require("../middleware/login.mid.js");
const { token } = require('morgan');
const {seccion} = require("../middleware/login.mid")



//LISTAR
router.get('/', seccion, verificador.verificador, function(req, res, next) {
  console.log('ESTAMOS EN RUTA');
  espaciosControllers.listar()
  .then ((resultado) => {
    res.status(200).render('espacio', {title: 'ESPACIOS', resultado: resultado });
  })
  .catch ((err) => {
    res.status(404).render('error');
  })
});

router.get('/id:id', seccion,verificador.verificador, function(req, res, next) {
  let parametro = req.params.id
  espaciosControllers.listarID(parametro)
  .then((resultado) => {
    res.status(200).render('espacio', {title: 'ESPACIO ENCONTRADO', resultado: resultado });
  })
  .catch((err) => {
    res.status(404).render('error');
  })
});

//MODIFICAR ESPACIOS 
router.put('/modificar/:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.id; 
  let { nombre , direccion , descripcion , estatus } = req.body; 
  const espacioModificar = { nombre , direccion , descripcion , estatus } 
  espaciosControllers.modificar(parametro, espacioModificar)
  .then((modificado) => {
    res.send(modificado)
  })
  .catch((err) => {
    res.send(err)
  })
})

//AGREGAR ESPACIOS
router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
  res.status(200).render('espacioPOST', { title: 'Añade un Espacio' });
});

router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const { nombre, direccion, descripcion, estatus} = req.body
  const parametro = { nombre, direccion, descripcion, estatus}
  espaciosControllers.agregar(parametro)
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