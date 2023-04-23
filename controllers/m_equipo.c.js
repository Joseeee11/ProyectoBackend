const mantenimientoModel = require ('../models/m_equipo.m')



class mantenimientoControllers {
    //listar general
    listar(){
      return new Promise ((resolve, reject) => {
        console.log ('LISTO  YA ESTAMOS EN CONTROLADOR');
        mantenimientoModel.listar()
        .then ((resultado) => {
          if (resultado.length == 0) {
            return resolve('Por ahora no hay mantenimiento registrados :)')
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
        mantenimientoModel.listarID(parametro)
        .then((json) => {
          let resultado = JSON.parse(json)
          if (resultado.length == 0) {
             console.log('No existe reservas');
             return reject(`No hay trabajos de mantenimiento con esa id: ${parametro}`)
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
          if (!parametro || !parametro.equipo_mantenimiento || !parametro.personal_encargado || !parametro.fecha || !parametro.motivo) {
            return reject("Se debe ingresar correctamente los parametros")
          }
          mantenimientoModel.agregar(parametro)
          .then((resultado) =>  {
            resolve(resultado)
          })
          .catch((err) => {
            reject(err)
          })
        })
    }
    

}
module.exports= new mantenimientoControllers()