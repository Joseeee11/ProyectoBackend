const connection = require('../conecction/conexion')


class ticketsModel{
    //listar general
    listar (){
        return new Promise ((resolve, reject) => {
            console.log ('AHORA ESTAMOS EN EL MODELO :)')
            connection.query ('SELECT * FROM `tickets`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            }) 
        })
    } 
    //listar por ID 
    listarID(id) {
        return new Promise((resolve, reject) => {
            console.log('estamos listando')
            connection.query('SELECT * FROM `tickets` WHERE id = ?' , [id] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //agregando
    agregar(parametro){
        console.log("estoy agregando")
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO `tickets` set ?", [parametro], function (error, results, fields) {
            if (error){
                console.log('error al agregar');
                return reject (error);
            }             
            resolve("Se agrego correctamente");
            })
        })
    }
    verCuantos(id){
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `eventos` WHERE id = ?' , [id] , function (error, results, fields) {
                if (error){
                    console.log('error al buscar');
                    return reject (error);
                } 
                resolve (results);
            })
        })
    }
    actualizar(cambio,id){
        return new Promise((resolve, reject) => {
            connection.query("UPDATE `eventos` SET `tickets_disponibles` = ? WHERE `eventos`.`id` = ?", [cambio,id] , function (error, results, fields) {
                if (error){
                    console.log('error al cambiar');
                    return reject (error);
                } 
                resolve ("Se actualizo el ticket correctamente");
            })
        })
        //UPDATE `eventos` SET `tickets_disponibles` = '4' WHERE `eventos`.`id` = 1; 
    }
 
}

module.exports= new ticketsModel