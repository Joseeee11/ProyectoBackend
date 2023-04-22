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
        return new Promise( (resolve, reject) => {
            console.log(parametro);

            var contador = 0;
            function x (error, results, fields) {
                console.log('funcion')
                if (error) reject (error);
                resolve(results)
            }

            const equipo = new Promise ((resolve, reject) => connection.query('SELECT * FROM `equipos` WHERE id = ?', [parametro.equipo_solici], x(error, results, fields))) 

            equipo
            .then((results) => {
                if (results[0].estatus == "Ocupado") {
                    console.log('me encuentro en ocupado');
                    const verificarFecha = new Promise ((resolve, reject) => { 
                        connection.query(`SELECT * FROM reservas_equipos WHERE equipo_solici = ?`, [parametro.equipo_solici], x(error, results, fields))   
                    })
                    verificarFecha
                    .then ((results) => {
                        results.forEach(reservas => {
                            if (reservas.fecha == parametro.fecha) {
                                console.log("a")
                                contador++
                                return resolve("Ya el espacio esta ocupado ese día")
                            }
                            return
                        });
                        resolve('ya wey')
                    })
                    .catch((err) => {
                        reject(err)
                    })
                }
            })
            .catch((err) => {
                reject(err)
            })

            if (contador === 0) {

                const agregado = new Promise((resolve, reject) => {
                    connection.query('INSERT INTO `reservas_equipos` set ?', [parametro], function (error, results, fields) {
                        if (error) reject (error);
                        resolve("Se agrego correctamente");
                    })
                })
                connection.query(`UPDATE equipos set estatus = "Ocupado" WHERE id = ?`, [parametro.equipo_solici], function (error, results, fields) {
                    if (error) reject (error);
                    console.log('actualizado')
                    resolve(agregado);
                })
                
            }
            
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