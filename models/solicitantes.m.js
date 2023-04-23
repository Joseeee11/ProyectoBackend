const connection = require('../conecction/conexion');
//importamos bcrypt
const bcryptjs = require('bcryptjs');

class solicitantesModel {
    ///listar en general
    listar() {
        return new Promise( (resolve, reject) => {
            connection.query('SELECT * FROM `solicitantes`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //listar por cedula
    listarCedula(parametro) {
        console.log('llegamos a modelo')
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `solicitantes` WHERE CI = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results);
                console.log(results)
                resolve (json);
            })
        })
    }

    MiInfo(infoToken){
        console.log(infoToken);
        return new Promise((resolve, reject) => {
                    connection.query('SELECT * FROM `solicitantes` WHERE usuario_unico = ?',[infoToken], function (error, results, fields) {
            if (error) {
                console.log('Hay un error :'+error);
                return reject ('Error al buscar usuario en la base de datos')
            }
            // let json = JSON.stringify(results);
            // console.log(json)
            // return ('hola');
            console.log(results);
            console.log('Encontrado');
            return resolve(results);

        })
        })

    

    }






    //agregar solicitantes
    agregar(parametro){
        console.log("llegamos a modulos klk")
        return new Promise(async (resolve, reject) => {
            //Encriptar contraseñas
            var contrasenaHash = await bcryptjs.hash(parametro.contrasena, 8);
            parametro.contrasena = contrasenaHash;

            //añadir a los usuarios para darle su rol
            connection.query(`INSERT INTO usuarios (usuario, contrasena, rol) VALUES ("${parametro.usuario_unico}", "${parametro.contrasena}", "solicitante")`, function (error, results, fields) {
                if (error) reject (error);
                resolve("Se agrego correctamente a la tabla usuario");
            })

            connection.query("INSERT INTO `solicitantes` set ?", [parametro], function (error, results, fields) {
                if (error) throw error;
                resolve("Se agrego correctamente");
            })

        })
    }

    //eliminar
    eliminar(parametro, dato){
        console.log('estoy eliminando')
        return new Promise((resolve, reject) => {
            console.log(`vamos a eliminar el solicitante ${dato}`)

            connection.query('DELETE FROM `usuarios` WHERE usuario = ?' , [dato] , function (error, results, fields) {
                if (error) throw error;
                console.log('estoy eliminando de la tabla usuario')
                resolve('se elimino de la tabla usuario')
            })

            connection.query('DELETE FROM `solicitantes` WHERE CI = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                resolve('eliminado')
            })
        })
    }
}

module.exports = new solicitantesModel();