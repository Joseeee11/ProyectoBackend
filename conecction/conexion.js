require('dotenv').config();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.USER,
  password : process.env.PASSWORD,
  database : process.env.DATABASE
}); 
 
connection.connect(function (err) {
    if (err) {
        console.error('Error de Conexión: ' + err.stack);
        return;
    }

    console.log ('CONECTADO CON LA BASE DE DATOS  ' + connection.threadId);
});
 

module.exports = connection;