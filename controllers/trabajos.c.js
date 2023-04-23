const trabajosModel = require('../models/trabajos.m');

class trabajosControllers {
  //listar general
    listar(){
        return new Promise((resolve, reject) => {
            console.log ('LISTO  YA ESTAMOS EN CONTROLADOR');
            trabajosModel.listar()
            .then ((resultado) => {
                if (resultado.length == 0) {
                  return resolve('Por ahora no hay trabajos registrados :)')
                }
                resolve (resultado)
            })
            .catch((err) => {
                reject (err)
            })
        })
    }

    //LISTAR POR id
    listarID(parametro) {
      return new Promise((resolve, reject) => {
        trabajosModel.listarID(parametro)
        .then((json) => {
          let resultado = JSON.parse(json)
          if (resultado.length == 0) {
             return resolve(`No hay trabajos registrados con esta id: ${parametro}`)
          };
          resolve(resultado)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }
    
    //LISTAR POR Personal
    listarPersonal(parametro) {
      return new Promise((resolve, reject) => {
        trabajosModel.listarPersonal(parametro)
        .then((json) => {
          let resultado = JSON.parse(json)
          if (resultado.length == 0) {
             return resolve(`No hay trabajos registrados para el Personal: ${parametro}`)
          };
          resolve(resultado)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }

    //listar por fecha especìfica inicial del trabajo
    listarFechaI(parametro) {
      return new Promise((resolve, reject) => {
        trabajosModel.listarFechaI(parametro)
        .then((json) => {
          let resultado = JSON.parse(json)
          if (resultado.length == 0) {
            console.log('No existe trabajo');
            return resolve(`No hay trabajos registrados que inicien en esta fecha: ${parametro}`)
          };
          console.log(resultado)
          resolve(resultado)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }

    //listar por fecha especìfica final del trabajo
    listarFechaF(parametro) {
      return new Promise((resolve, reject) => {
        trabajosModel.listarFechaF(parametro)
        .then((json) => {
          let resultado = JSON.parse(json)
          if (resultado.length == 0) {
            console.log('No existe trabajo');
            return resolve(`No hay trabajos registrados que finalicen en esta fecha: ${parametro}`)
          };
          console.log(resultado)
          resolve(resultado)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }

    //listar por rango de fechas
    listarFechaRango(fechaI, fechaF) {
      return new Promise((resolve, reject) => {
        trabajosModel.listarFechaRango(fechaI, fechaF)
        .then((resultado) => {
          if (resultado.length == 0) {
            return resolve(`Por ahora no hay trabajos registrados para las fechas del ${fechaI} al ${fechaF}`)
          }
          resolve(resultado)
        })
        .catch((err) => {
          reject(err)
        })
      })
    }


    //eliminar
    eliminar(parametro) {
      return new Promise((resolve, reject) => {
        trabajosModel.listarID(parametro)
        .then((json) => {
          let resultado = JSON.parse(json)
          if (resultado.length == 0) {
             console.log('No existe el trabajo');
             return resolve(`No hay trabajos registrados con esa id: ${parametro}`)
          };
  
          const eliminado = new Promise((resolve, reject) => {
            trabajosModel.eliminar(parametro)
            .then(() => {
              console.log('ya se elimino estamos en controlador')
              resolve(`se ha eliminado el trabajo con el id: ${parametro}`);
            })
            .catch((err) => {
              reject(err);
            })
          })
          
          console.log('nos vamos a rutas');
          resolve(eliminado);
        })
        .catch((err) => {
          reject(err)
        })
      })
    }



    //AGREGAR UN NUEVO TRABAJO
    agregar(parametro){
        console.log(parametro);
        return new Promise((resolve, reject) => {
          // el if compara lo que se debe tener para agregar 
          if (!parametro || !parametro.personal_solici || !parametro.reserva_solici || !parametro.equipos_solici || !parametro.fecha_inicio || !parametro.fecha_fin || !parametro.descripcion) {
            return reject("Se debe ingresar correctamente los parametros")
          }
          trabajosModel.agregar(parametro)
          .then((resultado) =>  {
            resolve(resultado)
          })
          .catch((error) => {
            const {sqlMessage} = error
            console.log(sqlMessage);
            if (sqlMessage == 'Cannot add or update a child row: a foreign key constraint fails (`bd_audiovisuales`.`trabajos`, CONSTRAINT `personal_involucrado` FOREIGN KEY (`personal_solici`) REFERENCES `personal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)' ) {
              return reject("El personal que ingreso, no se encruentra en la base de datos")
            }
            console.log(error);
            reject(null)
          })
        }) 
    }
    revisarAgregar(){
      console.log("entramos a revisar");
      return new Promise((resolve, reject) => {
        console.log("fuimos a nueva promesa");
        trabajosModel.revisarAgregar()
        .then((disponible)=>{
          console.log("entramos a then");
          resolve(`Las trabajos de equipos faltantes por un trabajo son: ${disponible}`)          
        })
        .catch((err)=>{
          console.log("entramos a catch");
          reject(`Ocurrio un problema: ${err}`)
        })
      })

    }
    
    
}



module.exports= new trabajosControllers();