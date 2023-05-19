const ruta = require ("../pages/Ruta")

const sqlRequest = {};

/**
 * convertir la fecha en YYYY-MM-DD
 * @param {
 *  correo,
 * password,
 * sexo,
 * estadoCivil,
 * fechaNacimiento,
 * nivelEscolaridad,
 * tipo
 * } usuario 
 * @returns 
 */
sqlRequest.registrarUsuario = async(usuario) => {
    try {
        let data = {
            correo: usuario.correo,
            password: usuario.password,
            sexo: usuario.sexo,
            estadoCivil: usuario.estadoCivil,
            fechaNacimiento: usuario.fechaNacimiento,
            nivelEscolaridad: usuario.nivelEscolaridad,
            tipo: usuario.tipo

        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/registrar", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.loginUsuario = async(correo, password) => {
    try {
        let data = {
            correo: correo,
            password: password
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/login", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.obtenerUsuarios = async() => {
    try{
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/getUsuarios");
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if(response.success == false){
            console.error(JSON.stringify(response.message));
        }
        return response;
    }catch(error){
        console.log(error)
    }
}

sqlRequest.obtenerDatosEncuesta =  async() => {
    try{
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/datosEncuestas");
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        if(response.success == false){
            console.error(JSON.stringify(response.message));
        }
        return response;        
    }catch(error){  
        console.warn(error)
    }
}

sqlRequest.obtenerEncuestas = async() => {
    try {

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/adm/obtenerEncuestas");
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.insertarPregunta = async(idEncuesta, pregunta) => {
    try {
        let data = {
            idEncuesta:idEncuesta,
            enunciado:pregunta.enunciado,
            tipo:pregunta.tipo,
            opciones:pregunta.opciones,
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/adm/addPregunta", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.insertarEncuesta = async(encuesta) => {
    try {
        let data = {
            nombre: encuesta.nombre,
            fechaApertura: encuesta.fechaApertura,
            fechaCierre: encuesta.fechaCierre,
            fechaLimite: encuesta.fechaLimite
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/adm/addEncuesta", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.obtenerPreguntas = async(idEncuesta) => {
    try {
        let data = {
            idEncuesta: idEncuesta
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/getPreguntas", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.obtenerOpciones = async(idPregunta) => {
    try {
        let data = {
            idPregunta: idPregunta
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/getOpciones", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.obtenerEncuesta = async(idEncuesta) => {
    try {
        let data = {
            idEncuesta: idEncuesta
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/getEncuesta", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.insertarRespuesta = async(idEncuesta, idUsuario, respuestas) => {
    try {
        let data = {
            idEncuesta: idEncuesta,
            idUsuario: idUsuario,
            respuestas: respuestas
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),

        }
        console.log("Ingresando respuestas")
        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/insertarRespuestas", config);
        console.log("Esperando respuesta...")
        let response = await request.json();
        console.log("Respuesta recibida")
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.getAcceso = async(idEncuesta, idUsuario) => {
    try {
        let data = {
            idEncuesta: idEncuesta,
            idUsuario: idUsuario
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/getAcceso", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

sqlRequest.getRespuestas = async(idEncuesta) => {
    try{
        let data = {
            idEncuesta: idEncuesta
        }
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET',
                'Access-Control-Request-Method': '*',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            },
            mode: 'cors',
            body: JSON.stringify(data),
        }

        let request = await fetch(ruta.ip+":"+ruta.puerto+"/api/getResultados", config);
        let response = await request.json();
        if (response === undefined){
            alert("Error: servidor no disponible");
            return;
        }
        return response.respuestas;
    }catch(error){
        console.log(error);
    }
}

module.exports = sqlRequest;