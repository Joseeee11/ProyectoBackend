const connection = require('../conecction/conexion');

class reserva_equiposModel {
    //listar en general
    listar(){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_equipos`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //listar por ID 
    listarID(id) {
        return new Promise((resolve, reject) => {
            console.log('estamos listando')
            connection.query('SELECT * FROM `reservas_equipos` WHERE id = ?' , [id] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //listar por una fecha en especifico
    listarFecha(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_equipos` WHERE fecha = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //listar por rango de fechas
    listarFechaRango(fechaI, fechaF) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_equipos` WHERE fecha >= ? AND fecha <= ?' , [fechaI, fechaF] , function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //agregando
    agregar(parametro){
        console.log("estoy agregando")
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO `reservas_equipos` set ?", [parametro], function (error, results, fields) {
            if (error) return reject (error);

                
            resolve("Se agrego correctamente");
            })
        })
    }
    actualizarElEquipo(parametro){
        return new Promise((resolve, reject) => {
            connection.query("UPDATE `equipos` set `estatus` = 'Ocupado' WHERE id = ?",[parametro],function(error,results,fields){
                if (error) return reject (error);

                resolve(true)
            })
        })
    }
    noAgregarFecha(fecha,id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `reservas_equipos` WHERE `fecha` = ? AND `equipo_solici` = ? ' , [fecha,id] , function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //eliminar
    eliminar(id) {
        return new Promise((resolve, reject) => {
            console.log(`vamos a eliminar la reserva ${id}`)
            connection.query('DELETE FROM `reservas_equipos` WHERE id = ?' , [id] , function (error, results, fields) {
                if (error) throw error;
                resolve();
            })
        })
    }
}

module.exports = new reserva_equiposModel();