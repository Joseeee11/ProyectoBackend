const connection = require('../conecction/conexion')


class eventosModel{
    //listar general
    listar (){
        return new Promise ((resolve, reject) => {
            console.log ('AHORA ESTAMOS EN EL MODELO :)')
            connection.query ('SELECT * FROM `eventos`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            }) 
        })
    } 
    //listar por ID 
    listarID(id) {
        return new Promise((resolve, reject) => {
            console.log('estamos listando')
            connection.query('SELECT * FROM `eventos` WHERE id = ?' , [id] , function (error, results, fields) {
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
            connection.query("INSERT INTO `eventos` set ?", [parametro], function (error, results, fields) {
            if (error) return reject (error);   
            resolve("Se agrego correctamente");
            })
        })
    }

}

module.exports= new eventosModel