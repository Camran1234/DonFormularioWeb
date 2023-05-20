const mysql = require('mysql2');
const { setTimeout } = require('timers');

const configure = {
    host: "db",
    user: 'user',
    multipleStatements: true,
    password: 'admin',
    database: 'dbTec',
    port: 3306
}

const connection = mysql.createConnection(configure);

function sleep(segundos) {
    setTimeout(() => {
      // Aquí puedes colocar el código que deseas ejecutar después del sleep
      console.log('Han pasado 1 segundo');
    }, 1000 * segundos); // 1000 ms = 1 segundo
  }

function startConnection (connection) {
    connection.connect((error) => {
        if(error) {
            console.log("Configuracion: "+JSON.stringify(configure));
            console.error('Error de conexion: '+error.stack);
            console.log("Error code: "+JSON.stringify(error));

            sleep(3);
            startConnection(connection);
        }
    
        console.log('Conexion establecida con el ID '+connection.threadId)
    });
}

startConnection(connection);


module.exports = connection, configure;