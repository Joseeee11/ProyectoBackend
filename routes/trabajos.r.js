var express = require('express');
var router = express.Router();

//importar controladores 
var trabajosControllers = require("../controllers/trabajos.c.js");
var verificador = require("../middleware/login.mid.js");
const {seccion} = require("../middleware/login.mid")

//listar general
router.get('/', seccion,verificador.restringirSolicitante, function(req, res, next) {
    console.log('estamos en ruta')
    trabajosControllers.listar()
    .then((resultado) => {
      res.status(200).render('trabajos', { title: 'TRABAJOS RESERVADOS', resultado: resultado });
    })
    .catch((err) => {
      res.status(404).render(err)
    })
    }
)

//listar por id
router.get('/id:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let parametro = req.params.id
  trabajosControllers.listarID(parametro)
  .then((resultado) => {
    res.status(200).render('trabajos', { title: 'TRABAJO ENCONTRADO', resultado: resultado });
  })
  .catch((err) => {
    res.send(err)
  })
});

//listar por personal
router.get('/personal/:id_personal', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let parametro = req.params.id_personal  //usuario ingrese el id del personal
  trabajosControllers.listarPersonal(parametro)
  .then((resultado) => {
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});

//listar por fecha específica inicial del trabajo
router.get('/fechaInicial/:fecha', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let parametro = req.params.fecha
  console.log(`buscar trabajo con la fecha ${parametro}`) //
  trabajosControllers.listarFechaI(parametro)
  .then((resultado) => {
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
});  

//listar por fecha específica final del trabajo
router.get('/fechaFinal/:fecha', seccion,verificador.restringirSolicitante, function(req, res, next) {
  let parametro = req.params.fecha
  console.log(`buscar trabajo con la fecha ${parametro}`) //
  trabajosControllers.listarFechaF(parametro)
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
  console.log(`buscar trabajo que se necuentre entre ${fechaI} a ${fechaF}`) 
  trabajosControllers.listarFechaRango(fechaI, fechaF)
  .then((resultado) => {
    res.send(resultado)
  })
  .catch((err) => {
    res.send(err)
  })
})  //PROBAR con /fechasRango/2023-04-10/2023-04-19 

//eliminar trabajos
router.delete('/eliminar/:id', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const parametro = req.params.id
  console.log(parametro);
  trabajosControllers.eliminar(parametro)
  .then((eliminado) => {
    console.log('estamos en rutas')
    res.send(eliminado)
  })
  .catch((err) => {
    res.send(err)
  })
}) //PROBAR CON /eliminar/4

//agregar trabajos
router.get('/agregar', seccion, verificador.restringirSolicitante, function(req, res, next) {
  res.status(200).render('trabajosPost', { title: 'Añadir Trabajo para Equipo' });
});
router.post('/agregar', seccion,verificador.restringirSolicitante, function(req, res, next) {
  const { personal_solici, reserva_solici, equipos_solici, fecha_inicio, fecha_fin, descripcion} = req.body
  const parametro = { personal_solici, reserva_solici, equipos_solici, fecha_inicio, fecha_fin, descripcion}
  trabajosControllers.agregar(parametro)
  .then((resultado) => {
    console.log("se agrego correctamente :)")
    res.status(200).redirect('/trabajos')
  })
  .catch((err) => {
    if (err != null) {
      res.status(404).send(err)
    }
    trabajosControllers.revisarAgregar()
    .then((disponible)=>{
      res.status(200).redirect('/trabajos')
    })
    .catch((err)=>{
      console.log("error")
      res.send(err)
    })
  })
});


module.exports = router;
