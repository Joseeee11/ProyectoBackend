const espaciosModel = require ('../models/espacios.m')
 
 
 class espaciosCrontrolles {
  //listar general
  listar(){
    return new Promise ((resolve, reject) => {
      console.log ('LISTO  YA ESTAMOS EN CONTROLADOR');
      espaciosModel.listar()
      .then ((resultado) => {
        if (resultado.length == 0) {
          return resolve('Por ahora no hay espacios registrados :)')
        }
        resolve (resultado)
      })
      .catch((err) => {
        reject (err)
      });
    } )
  }

  //listar por ID
  listarID(parametro) {
    return new Promise((resolve, reject) => {
      espaciosModel.listarID(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
           return resolve(`No hay espacios registrados con esta id: ${parametro}`)
        };
        resolve(resultado)
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

  //modificar un espacio
  modificar(parametro, espacioModificar) {
    return new Promise((resolve, reject) => {
      if (!espacioModificar || !espacioModificar.nombre || !espacioModificar.direccion || !espacioModificar.descripcion || !espacioModificar.estatus) {
        return reject(`La informacion ingresada no es la correcta. Es necesaria la informacion: NOMBRE, DIRECCION, DESCRIPCION, y ESTATUS`);
      }
      espaciosModel.listarID(parametro)
      .then((json) => {
        let resultado = JSON.parse(json)
        if (resultado.length == 0) {
          console.log('No existe el espacios');
          return resolve(`No hay espacios registrados con esta id: ${parametro}. Por lo tanto no se puede modificar`)
        };
        if (espacioModificar.estatus != "Disponible" && espacioModificar.estatus != "Ocupado" && espacioModificar.estatus != "Mantenimiento") {
          return resolve(`El estatus del espacios solo puede estar en: Disponible, Ocupado, Mantenimiento`);
        }
        const modificado = new Promise((resolve, reject) => {
          espaciosModel.modificar(parametro, espacioModificar)
          .then(() => {
            resolve(`se ha modificado correctamente el espacios con el id: ${parametro}`);
          })
          .catch((err) => {
            reject(err);
          })
        })
        resolve(modificado);
      })
    })
  }

  //agregar un espacio
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



var espaciosC = new espaciosCrontrolles()
module.exports = espaciosC