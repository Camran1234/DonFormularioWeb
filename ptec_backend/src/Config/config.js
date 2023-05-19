const mysql = require('mysql2');

const configure = {
    host: "db",
    user: 'user',
    multipleStatements: true,
    password: 'admin',
    database: 'dbTec',
    port: 3306
}

const connection = mysql.createConnection(configure);

connection.connect((error) => {
    if(error) {
        console.log("Configuracion: "+JSON.stringify(configure));
        console.error('Error de conexion: '+error.stack);
        console.log("Error code: "+JSON.stringify(error));
        return;
    }

    console.log('Conexion establecida con el ID '+connection.threadId)
});

module.exports = connection, configure;