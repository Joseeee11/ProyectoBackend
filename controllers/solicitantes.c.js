const { json } = require("express");
const solicitantesModel = require("../models/solicitantes.m.js")
//importamos bcrypt
const bcryptjs = require('bcryptjs');

class solicitantesControllers {
  //listar general
  listar(){
    return new Promise((resolve, reject) => {
      solicitantesModel.listar()
      .then((resultado) =>{
        if (resultado.length == 0) {
          return resolve('Por ahora no hay solicitantes registrados :)')
        }
        resolve (resultado);
      })
      .catch((err) =>{
        reject (err);
      })
    })
  }

  //listar por cedula
  listar_Cedula(parametro){
    return new Promise((resolve, reject) => {

      solicitantesModel.listar_Cedula(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
           console.log('No existe solicitante');
           return resolve(`No hay solicitantes registrados con esa CI: ${parametro}`)
        };
        resolve(resultado);
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  //agregar un solicitante
  agregar(parametro){
    console.log(parametro);
    return new Promise((resolve, reject) => {
      // el if compara lo que se debe tener para agregar 
      if (!parametro || !parametro.usuario_unico || !parametro.nombre_apellido || !parametro.CI || !parametro.fecha_nacimiento || !parametro.direccion || !parametro.contrasena || !parametro.nro_telefono) {
      return reject("Se debe ingresar correctamente los parametros")
      }

      var contador = 0;
      solicitantesModel.listar()
      .then((resultado) => {
        resultado.forEach(solicitante => {
          if(JSON.stringify(solicitante.usuario_unico) === JSON.stringify(parametro.usuario_unico)) {
            console.log('Ese usuario ya existe');
            contador++;
            return resolve (`El usuario ${parametro.usuario_unico} ya existe`)
          }
          if(JSON.stringify(solicitante.CI) === JSON.stringify(parametro.CI)) {
            console.log('Ese solcitante ya existe');
            contador++;
            return resolve (`El solicitante propietario de la CI ${parametro.CI} ya se encuentra registardo`)
          }
        });
        if(contador === 0) {
          solicitantesModel.agregar(parametro)
          .then((resultado) =>  {
            resolve(resultado)
          })
          .catch((err) => {
            reject(err)
          })
        }
        resolve (`Se agregó correctamente el solicitante: ${parametro.nombre_apellido}`)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}



module.exports = new solicitantesControllers();