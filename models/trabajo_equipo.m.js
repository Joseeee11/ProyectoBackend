const connection = require('../conecction/conexion')


class mantenimientoModel{
    //listar general
    listar (){
        return new Promise ((resolve, reject) => {
            console.log ('AHORA ESTAMOS EN EL MODELO :)')
            connection.query ('SELECT * FROM `tq_mantenimiento`', function (error, results, fields) {
                if (error) throw error;
                resolve (results);
            }) 
        })
    } 

}

module.exports=  new mantenimientoModel()