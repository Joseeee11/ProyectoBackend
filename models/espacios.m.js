const connection = require('../conecction/conexion')


class espaciosModel{
    //listar general
    listar (){
        return new Promise ((resolve, reject) => {
            console.log ('AHORA ESTAMOS EN EL MODELO :)')
            connection.query ('SELECT * FROM `espacios`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            }) 
        })
    } 

    //modelo listar pro ID
    listarID(parametro) {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM `espacios` WHERE id = ?' , [parametro] , function (error, results, fields) {
                if (error) throw error;
                let json = JSON.stringify(results)
                resolve (json);
            })
        })
    }

    //modificar espacios
    modificar(parametro, espacioModificar){
        console.log('estoy modificando')
        return new Promise((resolve, reject) => {
            console.log(`vamos a modificar el espacio ${parametro}`)
            connection.query('UPDATE `espacios` set ? WHERE id = ?' , [espacioModificar, parametro] , function (error, results, fields) {
                if (error) throw error;
                resolve();
            })
        })
    }

    //agregar espacios
    agregar(parametro){
        console.log("llegamos a modulos klk")
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO `espacios` set ?", [parametro], function (error, results, fields) {
                if (error) reject (error);
                resolve("Se agrego correctamente");
            })

        })
    }
}




module.exports = new espaciosModel();
    
