const connection = require('../Config/config');
const crypto = require('crypto');
const userController = {};

userController.getAcceso = (req, res) => {
    const {idEncuesta, idUsuario} = req.body;
    const sqlQuery = `SELECT * FROM Acceso WHERE idEncuesta=? AND idUsuario=?`
    try{
        connection.query(sqlQuery, [idEncuesta, idUsuario], (error, result) => {
            if(error){
                return res.status(500).send({
                    estado: false
                })
            }
            if(result.length >0){
                return res.status(200).send({
                    estado: true
                })
            }else{
                return res.status(400).send({
                    estado: false
                })
            }
        })
    }catch(err){
        return res.status(500).send({
            estado: false
        })
    }
}

userController.insertarRespuestas = (req, res) => {
    console.log("Endpoint insertarRespuestas");
    const {idEncuesta, idUsuario, respuestas} = req.body;
    console.log("encuesta: "+idEncuesta);
    console.log("usuario: "+idUsuario);
    console.log("respuestas: "+JSON.stringify(respuestas))
    const sqlQueryMultiple = `INSERT INTO Respuesta (idPregunta, idUsuario, idOpcion) VALUES (?, ?, ?)`
    const sqlQueryFV = `INSERT INTO Respuesta(idPregunta, idUsuario, fv) VALUES (?, ?, ?)`
    const sqlQueryAcceso = `INSERT INTO Acceso (idEncuesta, idUsuario) VALUES(?, ?)`;

    try{
        connection.query(sqlQueryAcceso, [idEncuesta, idUsuario], (error, result) => {
            if(error){
                console.log(JSON.stringify(error))
                return res.status(500).send({
                    message: error,
                    estado: ""
                })
            }

            if(respuestas.length > 0){
                for(let index=0; index<respuestas.length; index++){
                    let respuesta = respuestas[index];
                    console.log("\n\n\n\n "+JSON.stringify(respuesta))
                    if(respuesta.tipo == "fv"){
                        let result = 0
                        if(respuesta.respuestas == "true"){
                            result = 1;
                        }
                        connection.query(sqlQueryFV, [respuesta.idPregunta,idUsuario, result], (error, result) => {
                            if(error){
                                console.log(JSON.stringify(error))
                                return res.status(500).send({
                                    message: error,
                                    estado: ""
                                })
                            }
                            if(index==respuestas.length-1){
                                console.log("Fin 1")
                                return res.status(200).send({
                                    message: "Encuesta respondida",
                                })
                            }
                        })
                    }else{
                        let opciones = respuesta.respuestas;
                        console.log("Opciones: "+JSON.stringify(opciones));
                        for(let indexA=0; indexA<opciones.length; indexA++){
                            let option = opciones[indexA];
                            connection.query(sqlQueryMultiple, [respuesta.idPregunta, idUsuario, option], (error, result) => {
                                if(error){
                                    console.log(JSON.stringify(error))
                                    return res.status(500).send({
                                        message: error,
                                        estado: ""
                                    })
                                }
                                console.log("Procesando opcion: "+option+" en la pregunta: "+respuesta.idPregunta);
                                if(index==respuestas.length-1 && indexA == opciones.length-1){
                                    console.log("Fin 2")
                                    return res.status(200).send({
                                        message: "Encuesta respondida",
                                    })
                                }
                            })
                        }
                    }
                }
            }else{
                return res.status(200).send({
                    message: "Encuesta respondida",
                })
            }
        })
        
    }catch(error){
        console.log("ERROR: "+JSON.stringify(error))
        return res.status(500).send({
            message: error,
            estado: ""
        })
    }

}

userController.login = (req, res) => {
    const {correo, password} = req.body;
    if (password == null){
        return res.status(400).send({
            message: "La contraseña no puede estar vacia",
            estado: ""
        });
    }
    const query = `SELECT tipo FROM Usuario WHERE correo = ? AND password=?`

    try{
        const passwordString = password.toString();
        let hash = crypto.createHash('md5').update(passwordString).digest('hex');

        connection.query(query, [correo, hash], (err, result) => {
            if(err){
                return res.status(400).send({
                    message: err,
                    estado: undefined
                })
            }
            
            if(result.length >0){
                return res.status(200).send({
                    estado: result[0].tipo
                })
            }else{
                return res.status(400).send({
                    message: "El usuario no existe, revise el correo o la contraseña"
                })
            }
        })
    }catch(error){
        return res.status(500).send({
            message: error,
            estado: undefined
        })
    }
}







module.exports = userController;
