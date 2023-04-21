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
    listar_Cedula(parametro) {
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
}

module.exports = new solicitantesModel();