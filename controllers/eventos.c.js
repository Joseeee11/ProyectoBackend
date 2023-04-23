const eventoModel = require ('../models/eventos.m')


class eventoControllers {
    //listar general
    listar(){
      return new Promise ((resolve, reject) => {
        console.log ('LISTO  YA ESTAMOS EN CONTROLADOR');
        eventoModel.listar()
        .then ((resultado) => {
          if (resultado.length == 0) {
            return resolve('Por ahora no hay evento registrados :)')
          }
          resolve (resultado)
        })
        .catch((err) => {
          reject (err)
        });
      } )
    }
    //POR ID
    listarID(parametro) {
        return new Promise((resolve, reject) => {
          eventoModel.listarID(parametro)
          .then((json) => {
            let resultado = JSON.parse(json)
            if (resultado.length == 0) {
               console.log('No existe reservas');
               return reject(`No hay eventos con esa id: ${parametro}`)
            };
            console.log(resultado)
            resolve(resultado)
          })
          .catch((err) => {
            reject(err)
          })
        })
      }
  
  
      //AGREGAR
      agregar(parametro){
          console.log(parametro);
          return new Promise((resolve, reject) => {
            // el if compara lo que se debe tener para agregar 
            if (!parametro || !parametro.nombre || !parametro.personal_encargado || !parametro.espacio_solici || !parametro.equipo_solici || !parametro.tickets_disponibles) {
              return reject("Se debe ingresar correctamente los parametros")
            }
            eventoModel.agregar(parametro)
            .then((resultado) =>  {
              resolve(resultado)
            })
            .catch((err) => {
              reject(err)
            })
          })
      }
}

module.exports = new eventoControllers