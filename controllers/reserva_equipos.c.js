const reserva_equiposModel = require("../models/reserva_equipos.m")

class reserva_equiposControllers {
  //listar general
  listar(){
    return new Promise((resolve, reject) => {
      reserva_equiposModel.listar()
      .then((resultado) => {
        if (resultado.length == 0) {
          return resolve('Por ahora no hay reservas registradas :)')
        }
        resolve(resultado)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  //listar por id
  listarID(id){
    return new Promise((resolve, reject) => {
      reserva_equiposModel.listarID(id)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
          console.log('No existe');
          return resolve(`No hay reservas registrada de esta id: ${id}`);
        };
        resolve(resultado)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  //listar por fecha
  listarFecha(parametro){
    return new Promise((resolve, reject) => {
      reserva_equiposModel.listarFecha(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
           console.log('No existe reservas');
           return resolve(`No hay reservas registrados con esta fecha: ${parametro}`)
        };
        console.log(resultado)
        resolve(resultado)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  listarFechaRango(fechaI, fechaF) {
    return new Promise((resolve, reject) => {
      reserva_equiposModel.listarFechaRango(fechaI, fechaF)
      .then((resultado) => {
        if (resultado.length == 0) {
          return resolve(`Por ahora no hay reservas registrados para las fechas del ${fechaI} al ${fechaF}`)
        }
        resolve(resultado)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  //agregar una reserva de equipo
  agregar(parametro){
    console.log(parametro);
    return new Promise(async(resolve, reject) => {

      if (!parametro || !parametro.solicitante || !parametro.hora_inicio || !parametro.hora_fin || !parametro.personal_solici || !parametro.fecha || !parametro.motivo || !parametro.equipo_solici) {
        return reject("Se debe ingresar correctamente los parametros")
      }
      try{
        const ocupado = await reserva_equiposModel.noAgregarFecha(parametro.fecha,parametro.equipo_solici)
        if (ocupado.length != 0) {
          return reject ('Ya hay una reserva para esta fecha')
        }
        reserva_equiposModel.agregar(parametro)
        .then(async(resultado) =>  {
          const equipoCambiar = parametro.equipo_solici
          try{
            const cambio = await reserva_equiposModel.actualizarElEquipo(equipoCambiar)
            console.log(cambio);
            resolve(resultado)
          }catch(error){
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
          reject(error)
        }) 
      }catch{

      }
    })
}

  //ELIMINAR
  eliminar(id) {
    return new Promise((resolve, reject) => {
      reserva_equiposModel.listarID(id)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
          console.log('No existe');
          return resolve(`No hay reservas registrada de esta id: ${id}`);
        };

        const eliminado = new Promise((resolve, reject) => {
          reserva_equiposModel.eliminar(id)
          .then(() => {
            resolve(`se ha eliminado la reserva con el id: ${id}`);
          })
          .catch((err) => {
            reject(err);
          })
        })
        
        resolve(eliminado);
      })
      .catch((err) => {
        reject(err)
      })
    })
  }
}

module.exports = new reserva_equiposControllers();