const ticketsModel = require ('../models/tickets.m')


class ticketsControllers {
    //listar general
    listar(){
      return new Promise ((resolve, reject) => {
        console.log ('LISTO  YA ESTAMOS EN CONTROLADOR');
        ticketsModel.listar()
        .then ((resultado) => {
          if (resultado.length == 0) {
            return resolve('Por ahora no hay tickets registrados :)')
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
          ticketsModel.listarID(parametro)
          .then((json) => {
            let resultado = JSON.parse(json)
            if (resultado.length == 0) {
               console.log('No existe reservas');
               return reject(`No hay tickets con esa id: ${parametro}`)
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
          return new Promise(async(resolve, reject) => {
            // el if compara lo que se debe tener para agregar 
            if (!parametro || !parametro.evento || !parametro.nombre_comprador || !parametro.CI_comprador || !parametro.tipo) {
              return reject("Se debe ingresar correctamente los parametros")
            }
            try{
                const disponibles = await ticketsModel.verCuantos(parametro.evento)
                if (disponibles.length == 0) {
                    return reject('El evento sellecionado no existe')
                    
                }
                

            }catch{

            }
            
            ticketsModel.agregar(parametro)
            .then((resultado) =>  {
              resolve(resultado)
            })
            .catch((err) => {
              reject(err)
            })
          })
      }
}

module.exports = new ticketsControllers