const connection = require('../conecction/conexion')

class equiposModel {
    //mostrar general
    listar(){
        return new Promise( (resolve, reject) => {
            //La DB seleccionara todos los equipos
            connection.query('SELECT * FROM `equipos`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            });
        })
    }

    //modelo listar por ID
    listarID(parametro) {
        return new Promise((resolve, reject) => {
            //Seleccionara todos los equipos donde la propiedad "id" sea igual al valor que le daremos en la variable parametro
            connection.query('SELECT * FROM `equipos` WHERE id = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //agregar equipos
    agregar(parametro){
        console.log("agregando equipo"); //avisamos por consola que esta agregando
        return new Promise((resolve, reject) => {
            //La DB va a registrar un equipo con los valores que le enviaremos por la variable "parametro"
            connection.query("INSERT INTO `equipos` set ?", [parametro], function (error, results, fields) {
                if (error) reject (error);
                resolve("Se agrego correctamente");
            })

        })
    }


    //eliminar por ID
    eliminar(parametro) {
        console.log('estoy eliminando'); //avisamos por consola que esta eliminando
        return new Promise((resolve, reject) => {
            console.log(`vamos a eliminar ${parametro}`) //avisamos que equipo se desea eliminar (por consola)
            //La DB va a eliminar un equipo donde la propiedad "id" sea igual al valor que le daremos en la variable parametro
            connection.query('DELETE FROM `equipos` WHERE id = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                resolve();
            })
        })
    }

    //modificar
    modificar(parametro, equipoModificar){
        console.log('estoy modificando'); //avisamos por consola que esta modificando
        return new Promise((resolve, reject) => {
            console.log(`vamos a modificar el equipo ${parametro}`) //avisamos que equipo se desea modificar (por consola)
            //La DB va a modificar un equipo con los valores que le daremos en la variable equipoModificado y donde la propiedad "id" sea igual al valor que le daremos en la variable parametro
            connection.query('UPDATE `equipos` set ? WHERE id = ?' , [equipoModificar, parametro] , function (error, results, fields) {
                if (error) throw error;
                resolve();
            })
        })
    }
}


module.exports = new equiposModel();