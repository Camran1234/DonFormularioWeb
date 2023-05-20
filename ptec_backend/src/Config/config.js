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

function connectWithRetry() {
  
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        console.log('Reintentando la conexión en 5 segundos...');
        setTimeout(connectWithRetry, 5000);
      } else {
        console.log('Conexión exitosa a la base de datos con el ID '+connection.threadId);
      }
    });
  }
  
  // Llamar a la función para iniciar la conexión
  connectWithRetry();



module.exports = connection, configure;