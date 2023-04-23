const { json } = require("express");
const solicitantesModel = require("../models/solicitantes.m.js")
const {verificarToken} = require('../helpers/login.h.js')
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

  async MiInfo(Galleta){
    try{
      const infoToken = await verificarToken(Galleta)
      console.log(infoToken);
      var De_base = await solicitantesModel.MiInfo(infoToken.name)
      De_base=De_base[0]
      const {nombre_apellido, CI, fecha_nacimiento, direccion, nro_telefono, usuario_unico, id} = De_base
      const resultado = {nombre_apellido, CI, fecha_nacimiento, direccion, nro_telefono, usuario_unico, id}
      return resultado
    }catch(error){
      console.log(error);
      return null
    }
  }

  //listar por cedula
  listar_Cedula(parametro){
    return new Promise((resolve, reject) => {

      solicitantesModel.listarCedula(parametro)
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

  //ELIMINAR
  eliminar(parametro) {
    return new Promise((resolve, reject) => {
      console.log('estoy aqui')
      solicitantesModel.listarCedula(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
           console.log('No existe solicitante');
           return resolve(`No hay solicitante registrado con la CI: ${parametro}`)
        };
        var dato = resultado[0].usuario_unico;
        solicitantesModel.eliminar(parametro, dato) //Llamamos a la funcion eliminar enviamos la variable parametro (esto para que la DB encuentre el solicitante a eliminar)
        .then(() => {
          console.log('se elimino')
          resolve(`se ha eliminado el solicitante con el id: ${parametro}`); //avisamos que se elimino correctamente
        })
        .catch((err) => {
          reject(err); //si hay un error
        })
        resolve('se elimino');
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}



module.exports = new solicitantesControllers();