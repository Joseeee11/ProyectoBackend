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
            if (error) return reject (error);   
            resolve("Se agrego correctamente");
            })
        })
    }
    verCuantos(id){
        return new Promise((resolve, reject) => {
            console.log('estamos')
            connection.query('SELECT * FROM `eventos` WHERE id = ?' , [id] , function (error, results, fields) {
                if (error) throw error;
                resolve (results[0]);
            })
        })
    }
    actualizar(id){

    }

}

module.exports= new ticketsModel