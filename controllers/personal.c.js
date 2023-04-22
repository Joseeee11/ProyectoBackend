const personalModel = require("../models/personal.m")
//importamos bcrypt
const bcryptjs = require('bcryptjs');

class personalControllers {
  //listar general
  listar(){
    return new Promise((resolve, reject) => {
      personalModel.listar()
      .then((resultado) => {
        if (resultado.length == 0) {
          return resolve('Por ahora no hay personal registrado :)')
        }
        resolve(resultado)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  //listar por cedula
  listarCedula(parametro) {
    return new Promise((resolve, reject) => {
      personalModel.listarCedula(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
           console.log('No existe personal');
           return resolve(`No hay personal registrados con esa CI: ${parametro}`)
        };
        resolve(resultado);
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

    //agregar un personal
    agregar(parametro){
      console.log(parametro);
      console.log('estamos en controladores')
      return new Promise( (resolve, reject) => {
        // el if compara lo que se debe tener para agregar 
        if (!parametro || !parametro.usuario_unico || !parametro.nombre || !parametro.CI || !parametro.cargo || !parametro.especialidad || !parametro.contrasena) {
          return reject("Se debe ingresar correctamente los parametros")
        }
        //verificar que sea un USUARIO UNICO y CI
        var contador = 0;
        console.log('entramos a verificar')
        personalModel.listar()
        .then((resultado) => {
          console.log(resultado);
          resultado.forEach(personal => {
            console.log('entramos al foreach')
            if(JSON.stringify(personal.usuario_unico) === JSON.stringify(parametro.usuario_unico)) {
              console.log('vemos si existe usuario');
              contador++;
              return resolve (`El usuario ${parametro.usuario_unico} ya existe`)
            }
            if(JSON.stringify(personal.CI) === JSON.stringify(parametro.CI)) {
              contador++;
              return resolve (`El personal propietario de la CI ${parametro.CI} ya se encuentra registardo`)
            }
          });
          if(contador === 0) {
            personalModel.agregar(parametro)
            .then((resultado) =>  {
              resolve(resultado)
            })
            .catch((err) => {
              reject(err)
            })
          }
          resolve (`Se agregó correctamente el personal: ${parametro.nombre}`)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }


  //eliminar personal
  eliminar(parametro) {
    return new Promise((resolve, reject) => {
      personalModel.listarCedula(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
           console.log('No existe personal');
           return resolve(`No hay personal registrado con la CI: ${parametro}`)
        };
        var dato = resultado[0].usuario_unico;
        
        personalModel.eliminar(parametro, dato)
        .then(() => {
          console.log('ya se elimino')
          resolve(`se ha eliminado la persona con la CI: ${parametro}`);
        })
        .catch((err) => {
          reject(err);
        })
        
        resolve('se elimino');
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = new personalControllers();