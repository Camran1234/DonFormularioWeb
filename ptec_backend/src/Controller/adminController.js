const connection = require('../Config/config');
const crypto = require('crypto');
const adminController = {};

function fixArray(array, isFV){
    let aux = [];
    for(let index=0; index<array.length; index++){
        let element = array[index];
        let opcion = element.name;
        let cantidad = element.uv;
        if(isFV){
            if(opcion.toString() == "1" || opcion.toString() == "0"){
                if(opcion.toString() == "1"){
                    opcion = "true";
                }else{
                    opcion = "false";
                }
            }
        }
        aux.push({
            name: opcion,
            cantidad: cantidad
        })
    }
    return aux; 
}

adminController.getResultados = async(req, res) => {
    const {idEncuesta} = req.body;

    const sqlPreguntas = `SELECT idPregunta, idEncuesta, enunciado, tipo FROM Pregunta WHERE idEncuesta=?`;
    const sqlResultFV = `SELECT fv as name, COUNT(fv) as uv
                        FROM Respuesta WHERE idPregunta=? 
                        GROUP BY fv`;
    const sqlResultMultiple = `SELECT r.idOpcion, o.opcion as name, COUNT(r.idOpcion) as uv 
                                FROM Respuesta r 
                                LEFT JOIN Opcion o 
                                    ON r.idOpcion=o.idOpcion 
                                WHERE r.idPregunta=?   
                                GROUP BY idOpcion`
    let respuestas = [];
    try{
        connection.query(sqlPreguntas, [idEncuesta], (error, preguntas) => {
            if(error){
                return res.status(500).send({
                    message: "Error: "+error
                })
            }    
            if(preguntas.length > 0){
                for(let indexPreguntas = 0; indexPreguntas<preguntas.length; indexPreguntas++){
                    const pregunta = preguntas[indexPreguntas];
                    if(pregunta.tipo == "fv"){
                        connection.query(sqlResultFV, [pregunta.idPregunta], (errorPregunta, resultPregunta) => {
                            if(errorPregunta){
                                throw errorPregunta;
                            }
                            

                            const respuesta = {
                                idPregunta: pregunta.idPregunta,
                                idEncuesta: pregunta.idEncuesta,
                                enunciado: pregunta.enunciado,
                                tipo: pregunta.tipo,
                                respuestas: fixArray(resultPregunta, true)
                            }
                            respuestas.push(respuesta);

                            if(indexPreguntas == preguntas.length-1){
                                return res.status(200).send({
                                    respuestas: respuestas
                                })
                            }
                        })
                    }else if(pregunta.tipo == "multiple"){
                        connection.query(sqlResultMultiple, [pregunta.idPregunta], (errorPregunta, resultPregunta) => { 
                            if(errorPregunta){
                                throw errorPregunta;
                            }

                            const respuesta = {
                                idPregunta: pregunta.idPregunta,
                                idEncuesta: pregunta.idEncuesta,
                                enunciado: pregunta.enunciado,
                                tipo: pregunta.tipo,
                                respuestas: fixArray(resultPregunta, false)
                            }

                            respuestas.push(respuesta);

                            if(indexPreguntas == preguntas.length-1){
                                return res.status(200).send({
                                    respuestas: respuestas
                                })
                            }
                        })
                    }else{
                        throw "Tipo de pregunta no reconocido";
                    }
                }
            }else{
                return res.status(200).send({
                    respuestas: []
                })
            }
            
        })
    }catch(err){
        return res.status(500).send({
            message: "Error: "+err
        })
    }
}


adminController.registerUser = async(req, res) => {
    const {correo, password, sexo, estadoCivil, fechaNacimiento, nivelEscolaridad, tipo} = req.body;
    const sqlQuery = `INSERT INTO Usuario 
                        (correo, password, sexo, estadoCivil, fechaNacimiento, nivelEscolaridad, tipo)
                        VALUES (?, ?, ?, ?, ?, ?, ?)`
    if (password == null){
        return res.status(400).send({
            message: "La contraseña no puede estar vacia"
        });
    }
    try{
        const passwordString = password.toString();
        let hash = crypto.createHash('md5').update(passwordString).digest('hex');
        const sqlData = [correo, hash, sexo, estadoCivil, fechaNacimiento, nivelEscolaridad, tipo]
        connection.query(sqlQuery, sqlData, (err, result) => {
            if(err){
                return res.status(400).send({
                    message: "No se pudo ingresar el usuario",
                    error: err
                })
            }

            return res.status(200).send({
                message: "Usuario ingresado correctamente"
            })
        })
    }catch(error){
        return res.status(500).send({
            message: "Error: "+error
        })
    }    
}

adminController.crearEncuesta = (req, res) => {
    const {nombre, fechaApertura, fechaCierre, fechaLimite} = req.body;
    const sqlQuery = `INSERT INTO Encuesta (nombre, fecha_abertura, fecha_cierre, fechaLimite )
                        VALUES (?, ?, ?, ?)`

    try{
        connection.query(sqlQuery, [nombre, fechaApertura, fechaCierre, fechaLimite], (err, result) => {
            if(err){
                return res.status(500).send({
                    message: err
                })
            }

            return res.status(200).send({
                message: "Encuesta creada",
                idEncuesta: result.insertId
            })
        })
    }catch(er){
        return res.status(500).send({
            message: "No se pudo crear la encuesta"+ er
        })
    }
}

adminController.obtenerEncuestas = (req, res) => {
    const sqlQuery = `SELECT * FROM Encuesta`;

    try{
        connection.query(sqlQuery, [], (err, result) => {
            if(err){
                return res.status(500).send({
                    message: err,
                    encuestas: undefined
                })
            }

            return res.status(200).send({
                encuestas: result
            })
        })
    }catch(err){
        return res.status(500).send({
            message: err,
            encuestas: undefined
        })
    }
}

adminController.agregarPregunta = (req, res) => {
    const {idEncuesta, enunciado, tipo, opciones} = req.body;
    const sqlQuery = `INSERT INTO Pregunta (idEncuesta, enunciado, tipo) VALUES (?, ?, ?)`
    const opcionQuery = `INSERT INTO Opcion (idPregunta, opcion) VALUES(?, ?)`
    try{
        connection.query(sqlQuery, [idEncuesta, enunciado, tipo], (err, result) => {
            if(err){
                return res.status(500).send({
                    message: err,
                    idPregunta: undefined
                })
            }
            const idPregunta = result.insertId;
            if(opciones != undefined){
                for(let index=0; index<opciones.length; index++){
                    let enunciado = opciones[index].enunciado;
                    connection.query(opcionQuery, [idPregunta, enunciado],(errOpciones, resultOpciones) => {
                        if(errOpciones){
                            return res.status(500).send({
                                message: errOpciones,
                                idPregunta: undefined
                            })          
                        }
                        if(index == (opciones.length-1)){
                            return res.status(200).send({
                                message:"Pregunta agregada",
                                idPregunta: result.insertId
                            })
                        }
                    })
                }
            }else{
                return res.status(200).send({
                    message:"Pregunta agregada",
                    idPregunta: result.insertId
                })
            }
        })
    }catch(err){
        return res.status(500).send({
            message: err,
            idPregunta: undefined
        })
    }
}

adminController.agregarOpcion = (req, res) => {
    const {idPregunta, opcion} = req.body;
    const sqlQuery = `INSERT INTO Opcion (idPregunta, opcion) VALUES (?, ?)`

    try{
        connection.query(sqlQuery, [idPregunta, opcion], (error, result) => {
            if(error){
                return res.status(500).send({
                    message: error
                })
            }

            return res.status(200).send({
                message: "Opcion agregada"
            })
        })
    }catch(e){
        return res.status(500).send({
            message: e
        })
    }
}

adminController.getPreguntas = (req, res) => {
    const {idEncuesta} = req.body;
    const sqlQuery = `SELECT * FROM Pregunta WHERE idEncuesta = ?`

    try{
        connection.query(sqlQuery, [idEncuesta], (error, result) => {
            if(error){
                return res.status(500).send({
                    message: error
                })
            }

            return res.status(200).send({
                preguntas: result
            })
        })
    }catch(e){
        return res.status(500).send({
            message: e
        })
    }    
}

adminController.getOpciones = (req, res) => {
    const {idPregunta} = req.body;
    const sqlQuery = `SELECT * FROM Opcion WHERE idPregunta=?`
    try{
        connection.query(sqlQuery, [idPregunta], (error, result) => {
            if(error){
                return res.status(500).send({
                    message: error
                })
            }

            return res.status(200).send({
                opciones: result
            })
        })
    }catch(e){
        return res.status(500).send({
            message: e
        })
    }    
}

adminController.obtenerEncuesta = (req, res) => {
    const {idEncuesta} = req.body;
    const sqlQuery = `SELECT * FROM Encuesta WHERE idEncuesta=?`

    try{
        connection.query(sqlQuery, [idEncuesta], (error, result) => {
            if(error){
                return res.status(500).send({
                    message: error,
                    encuesta: []
                })
            }

            if(result.length > 0){
                return res.status(200).send({
                    encuesta: result[0]
                })
            }
            
        })
    }catch(error){
        return res.status(500).send({
            message: error,
            encuesta: []
        })
    }
}

adminController.getUsuarios = (req, res) => {
    const tipo = 'usuario';
    const sqlQuery = `SELECT correo, sexo, estadoCivil, DATE_FORMAT(fechaNacimiento, '%d-%m-%Y') as fechaNacimiento, nivelEscolaridad 
                        FROM Usuario WHERE tipo=?`
    try{
        connection.query(sqlQuery, [tipo], (error, result) => {
            if(error){
                return res.status(500).send({
                    message: JSON.stringify(error),
                    usuarios: [],
                    success: false
                })
            }    
            return res.status(200).send({
                usuarios: result,
                message: "Usuarios obtenidos",
                success: true

            })
        })
    }catch(err){
        return res.status(500).send({
            message: JSON.stringify(err),
            success: false,
            usuarios: []
        })
    }
}

adminController.getDatosEncuestas = (req, res) => {
    const sqlQuery = `SELECT * FROM Encuesta`;
    const sqlQueryEncuesta = `SELECT * FROM Encuesta 
                            WHERE (fechaLimite=true AND 
                                fecha_abertura<=NOW() AND 
                                fecha_cierre>=NOW()) OR 
                                (fechaLimite=false)`;
    try{
        connection.query(sqlQuery, [], (err, resultQuery) => {
            if(err){
                return res.status(500).send({
                    message: JSON.stringify(err),
                    encuestas: [],
                    encuestasDisponibles: [],
                    success: false
                })
            }
            const encuestas = resultQuery;
            connection.query(sqlQueryEncuesta, [], (errEncuesta, resultEncuesta) => {
                if(errEncuesta){
                    return res.status(500).send({
                        message: JSON.stringify(errEncuesta),
                        encuestas: [],
                        encuestasDisponibles: [],
                        success: false
                    })
                }
                const encuestasDisponibles = resultEncuesta;
                return res.status(200).send({
                    message: "Encuestas obtenidas",
                    encuestas: encuestas,
                    encuestasDisponibles: encuestasDisponibles,
                    success: true
                })
            })
        })
    }catch(err){
        return res.status(500).send({
            message: JSON.stringify(err),
            encuestas: [],
            encuestasDisponibles: [],
            success: false
        })
    }                                                     
}

module.exports = adminController;

