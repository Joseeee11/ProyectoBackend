const { response } = require("express");
const equiposModel = require("../models/equipos.m")
//const moment = require('moment');

class equipoControllers {
  //LISTAR EN GENERAL
  listar(){
    return new Promise((resolve, reject) => { //declaramos una promesa ya que es un procedimiento que no sabemos cuanto tardará 
      console.log('listando ;3');  //avisamos por consola que esta listando
      equiposModel.listar() //llamamos a la funcion listar de Modelos
      .then((resultado) => { //si esta promesa se ejecuto con exito:
        if (resultado.length == 0) { //primero verificamos que si la variable resultado que (viene de los MODELOS) esta vacia, pues significa que no hay ningun equipo registrado
          return resolve('Por ahora no hay equipos registrados :)') //avisamos al usuario que no hay ningun equipo registrado
        }
        resolve (resultado) //enviamos el resultado, que contiene todos los equipos existentes dados por la DB
      })
      .catch((err) => { 
        reject (err) //si ocurre un error
      }) 
    })
  };
  
  //LISTAR POR ID
  listarID(parametro) { //recibimos la variable parametro con el ID a buscar
    return new Promise((resolve, reject) => { //declaramos promesa
      equiposModel.listarID(parametro)  //llamamos a la funcion listarID de Modelos junto con la variable parametro
      .then((json) => { //recibimos el resultado en json encontrado en la variable "json"
        let resultado = JSON.parse(json) //transformamos la variable "json" a un array de objetos y la guardamos en la variable resultado
        if (resultado.length == 0) { //si la variable resultado que (viene de los MODELOS) esta vacia, pues significa que no hay ningun equipo registrado con la ID pedida
           return resolve(`No hay equipos registrados con esta id: ${parametro}`) //le decimos al usuario
        };
        resolve(resultado) //enviamos resultado
      })
      .catch((err) => {
        reject(err) //si hay un error
      })
    })
  }

  //AGREGAR UN EQUIPO
  agregar(parametro){ //recibimos la variable parametro que contiene los datos a agregar de un equipo
    console.log(parametro); //los vemos por consola
    return new Promise((resolve, reject) => { //declaramos promesa
      //Comparamos los datos que se debe tener para agregar correctamente
      if (!parametro || !parametro.nombre || !parametro.serial || !parametro.descripcion || !parametro.fecha_adquisicion || !parametro.estatus) {
        return reject("Se debe ingresar correctamente los parametros"); //avisamos al usuario que (leer reject)
      }
      //Tambien comparamos que la propiedad "estatus" solo contenga algunos de estos, de lo contrario si no los contiene:
      if (parametro.estatus != "Disponible" && parametro.estatus != "Ocupado" && parametro.estatus != "Mantenimiento") {
        return resolve(`El estatus del equipo solo puede estar en: Disponible, Ocupado, Mantenimiento`); //se le avisara al usuario que el estatus (leer reject)
      }
      equiposModel.agregar(parametro) //Llamamos a la funcion agregar de Modelos junto con la variable parametro
      .then((resultado) =>  {
        resolve(resultado) //enviamos resultado
      })
      .catch((err) => {
        reject(err) //si hay un error
      })
    })
  }


  //ELIMINAR EQUIPOS
  eliminar(parametro) { //recibimos la variable parametro que contiene el ID del equipo
    return new Promise((resolve, reject) => { //declaramos promesa
      equiposModel.listarID(parametro)
      .then((json) => { //recibimos el equipo a eliminar en json encontrado en la variable "json"
        let resultado = JSON.parse(json) //transformamos
        if (resultado.length == 0) { //si la variable resultado que (viene de los MODELOS) esta vacia, pues significa que no hay ningun equipo registrado con esa ID
           console.log('No existe el equipo'); //avismaos por consola que el equipo no existe
           return resolve(`No hay equipos registrados con esa id: ${parametro}`) //avisamos al usuario
        };
        //declamos una constante "eliminado" como una promesa
        equiposModel.eliminar(parametro) //Llamamos a la funcion eliminar enviamos la variable parametro (esto para que la DB encuentre el equipo a eliminar)
        .then(() => {
          resolve(`se ha eliminado el equipo con el id: ${parametro}`); //avisamos que se elimino correctamente
        })
        .catch((err) => {
          reject(err); //si hay un error
        })
        resolve('se elimino'); //si todo es correcto, enviamos la constante eliminado
      })
      .catch((err) => {
        reject(err) //si hay un error
      })
    })
  }

  //modificar
  modificar(parametro, equipoModificar) {
    return new Promise((resolve, reject) => {
      //Comparamos los datos que se debe tener para modificar un equipo correctamente
      if (!equipoModificar || !equipoModificar.nombre || !equipoModificar.serial || !equipoModificar.descripcion || !equipoModificar.fecha_adquisicion || !equipoModificar.estatus) {
        //Avisamos al usuarios los datos correctos que si o si debe tener
        reject(`La informacion ingresada no es la correcta. Es necesaria la informacion: NOMBRE, SERIAL, DESCRIPCION, FECHA_ADQUISICION y ESTATUS`);
      }
      equiposModel.listarID(parametro) //Llamamos a la funcion listarID enviamos la variable parametro, esto para encontrar cual es el equipo exacto que se desea eliminar
        .then((json) => { //recibimos el equipo a modificar en json encontrado en la variable "json"
        let resultado = JSON.parse(json) //transformamos la variable "json" a un array de objetos y la guardamos en la variable resultado
        if (resultado.length == 0) { //si la variable resultado que (viene de los MODELOS) esta vacia, pues significa que no hay ningun equipo registrado con esa ID
          console.log('No existe el equipo');
          return resolve(`No hay equipos registrados con esta id: ${parametro}. Por lo tanto no se puede modificar`) //avisamos al usuario porque no puede modificar
        };
        //Comparamos que la propiedad "estatus" solo contenga algunos de estos, de lo contrario si no los contiene:
        if (equipoModificar.estatus != "Disponible" && equipoModificar.estatus != "Ocupado" && equipoModificar.estatus != "Mantenimiento") {
          return resolve(`El estatus del equipo solo puede estar en: Disponible, Ocupado, Mantenimiento`);
        }
        const modificado = new Promise((resolve, reject) => { //declamos una constante "modificado" como una promesa
          equiposModel.modificar(parametro, equipoModificar) //Llamamos a la funcion modificar enviamos la variable parametro (esto para que la DB encuentre el equipo a modificar) y la variable equipoModificado (con los datos que se desean modificar)
          .then(() => { 
            resolve(`se ha modificado correctamente el equipo con el id: ${parametro}`); //avisamos que se modifico correctamente
          })
          .catch((err) => {
            reject(err); //si hay un error
          })
        })
        resolve(modificado); //si todo es correcto, enviamos la constante modificado
      })
    })
  }

}

module.exports = new equipoControllers();