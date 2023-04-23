const mantenimientoModel = require ('../models/trabajo_equipo.m')



class mantenimientoCrontrolles {
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
    agregar(parametro){
        console.log(parametro);
        return new Promise((resolve, reject) => {
          // el if compara lo que se debe tener para agregar 
          if (!parametro || !parametro.nombre || !parametro.direccion || !parametro.descripcion || !parametro.estatus) {
            return reject("Se debe ingresar correctamente los parametros")
          }
          if (parametro.estatus != "Disponible" && parametro.estatus != "Ocupado" && parametro.estatus != "Mantenimiento") {
            return resolve(`El estatus del equipo solo puede estar en: Disponible, Ocupado, Mantenimiento`);
          }
          espaciosModel.agregar(parametro)
          .then((resultado) =>  {
            resolve(resultado)
          })
          .catch((err) => {
            reject(err)
          })
        })
    }
    

}
module.exports= new mantenimientoCrontrolles()