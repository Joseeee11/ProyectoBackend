const connection = require('../conecction/conexion');

class reserva_espaciosModel {
    //listar en general
    listar(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_espacios`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //listar por ID
    listarID(parametro) {
        console.log('estoy en modelos')
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_espacios` WHERE id = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //listar por una fecha en especifico 
    listarFecha(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_espacios` WHERE fecha = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //listar por rango de fechas
    listarFechaRango(fechaI, fechaF) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_espacios` WHERE fecha >= ? AND fecha <= ?' , [fechaI, fechaF] , function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //eliminar
    eliminar(parametro) {
        console.log('estoy eliminando')
        return new Promise((resolve, reject) => {
            console.log(`vamos a eliminar ${parametro}`)
            connection.query('DELETE FROM `reservas_espacios` WHERE id = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                resolve();
            })
        })
    }

    //agregando
    agregar(parametro){
        console.log("estoy agregando")
        return new Promise((resolve, reject) => {
            console.log(parametro);
            connection.query("INSERT INTO `reservas_espacios` set ?", [parametro], function (error, results, fields) {
            if (error) reject (error);
                resolve("Se agrego correctamente");
            })
        })
    }
}

module.exports = new reserva_espaciosModel();