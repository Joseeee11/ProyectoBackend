const connection = require('../conecction/conexion');

class trabajosModel {
    //listar general
    listar() {
        return new Promise( (resolve, reject) => {
            console.log ('AHORA ESTAMOS EN EL MODELO :)')
            connection.query('SELECT * FROM `trabajos`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            })
        })
    }

    //modelo listar por ID
    listarID(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `trabajos` WHERE id = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //modelo listar por PERSONAL
    listarPersonal(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `trabajos` WHERE personal_solici = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //listar por una fecha en especifico inicial del trabajo
    listarFechaI(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `trabajos` WHERE fecha_inicio = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //listar por una fecha en especifico final del trabajo
    listarFechaF(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `trabajos` WHERE fecha_fin = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //eliminar por ID
    eliminar(parametro) {
        console.log('estoy eliminando')
        return new Promise((resolve, reject) => {
            console.log(`vamos a eliminar ${parametro}`)
            connection.query('DELETE FROM `trabajos` WHERE id = ?' , [parametro] , function (error, results, fields) {
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
            connection.query("INSERT INTO `trabajos` set ?", [parametro], function (error, results, fields) {
            // connection.query("INSERT INTO `trabajos` (`id`, `personal_solici`, `reserva_solici`, `equipos_solici`, `fecha_inicio`, `fecha_fin`, `descripcion`) VALUES (NULL, '2', '8', '3', '2023-04-02', '2023-04-04', 'PRUEBAAAAAA');", function (error, results, fields) {
                
            if (error) reject (error);
                resolve("Se agrego correctamente");
            })
        })
    }

    //listar por rango de fechas
    listarFechaRango(fechaI, fechaF) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `trabajos` WHERE fecha_inicio >= ? AND fecha_inicio <= ?' , [fechaI, fechaF] , function (error, results, fields) {
                if (error) reject (error);
                resolve (results);
            })
        })
    }


    revisarAgregar(){
        console.log("llegamos a modelo a");
        return new Promise((resolve, reject) => {
            connection.query("SELECT reservas_equipos.id, reservas_equipos.solicitante FROM reservas_equipos, trabajos WHERE reservas_equipos.id != trabajos.reserva_solici; ", function(error, results,fields) {
                if (error) reject (error);
                const disponible = JSON.stringify(results)
                resolve(disponible)
            })
        })
    }
}

module.exports= new trabajosModel();