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
      console.log('Han pasado 3 segundos');
    }, 1000 * segundos); // 1000 ms = 1 segundo
  }

function startConnection (connection) {
    connection.connect((error) => {
        if(error) {
            console.log("Configuracion: "+JSON.stringify(configure));
            console.error('Error de conexion: '+error.stack);
            console.log("Error code: "+JSON.stringify(error));
        }
    
        console.log('Conexion establecida con el ID '+connection.threadId)
    });
}

let resultThread = null;
while(resultThread == null) {
    resultThread = startConnection(connection);
    if(resultThread == null) {
        sleep(3);
    }
}



module.exports = connection, configure;