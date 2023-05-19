import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import sqlRequest from "../../components/sqlRequest";
import { useState } from "react";
import NavAdmin from "./NavAdmin";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import moment from "moment";
import { ButtonGreen, ButtonRed, ButtonWrapper, ButtonYellow } from "../../components/Buttons";

const Encuesta = () => {
    const navigate = useNavigate();
    const {idEncuesta} = useParams();
    const [usuario, setUsuario] = useState("");
    const [encuesta, setEncuesta] = useState({})
    const [preguntas, setPreguntas] = useState([])
    const [respuestas, setRespuestas] = useState([]);

    const [display, setDisplay] = useState(false);
    const [message, setMessage] = useState("");
    const [access, setAccess] = useState(true);

    const [dateTimeOpen, setDateTimeOpen] = useState("");
    const [dateTimeClose, setDateTimeClose] = useState("");
    const [timer, setTimer] = useState(0)
    const [buttonEntrega, setEntrega] = useState(false)
    const [executed, setExecuted] = useState(false)

    useEffect(() => {

        const fechaApertura = encuesta.fecha_abertura;
        const fechaCierre = encuesta.fecha_cierre;
        const dateAperture = new Date(fechaApertura);
        const dateCierre = new Date(fechaCierre);

        if(localStorage.getItem("admin") != null && localStorage.getItem("admin") != undefined){
            setDisplay(true);
        }else{
            //OBtener usuario
            if(localStorage.getItem("usuario") == null || localStorage.getItem("usuario") == undefined){
                console.error("Error")
                navigate("/");
            }else{
                setUsuario(localStorage.getItem("usuario"));
                //Checar hora
                if(encuesta != undefined){

                    sqlRequest.getAcceso(idEncuesta, localStorage.getItem("usuario"))
                        .then(result => {
                            if(result.estado == true){
                                alert("Encuesta ya respondida")
                                navigate("/usuario");
                            }
                        })
                        .catch(error => {
                            console.error(JSON.stringify(error))
                        })
                    if(encuesta.fechaLimite){
                        let actualDateTime = new Date();
                        const formattedDate = actualDateTime.toISOString().slice(0, 10); // YYYY-MM-DD
                        const formattedTime = actualDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // HH:MM
                        
                        const date = new Date(`${formattedDate} ${formattedTime}`);

                        if(date>dateAperture && date<dateCierre){
                            setAccess(true);
                        }else{
                            setAccess(false);
                            setMessage("Acceso Restringido")
                        }                      
                    }
                }
            }
        }
        
        if(!executed){
            setExecuted(true)
            setPreguntas([])
            //Handle user
            sqlRequest.obtenerEncuesta(idEncuesta)
                .then(result => {
                    if(result){
                    setEncuesta(result.encuesta) 
                    }
                })
                .catch(error => {
                    console.error(error)
                })

            sqlRequest.obtenerPreguntas(idEncuesta)
                .then(result => {
                    let array = [];
                    let arrayAux = [];
                    let arregloPreguntas = result.preguntas;
                    for(let index=0; index<arregloPreguntas.length; index++){
                        let pregunta = arregloPreguntas[index];
                        let enunciado = pregunta.enunciado;
                        let tipo = pregunta.tipo;
                        let opciones = [];
                        sqlRequest.obtenerOpciones(pregunta.idPregunta)
                            .then(resultOpcion => {
                                opciones = resultOpcion.opciones;
                                let aux = {
                                    idPregunta: pregunta.idPregunta,
                                    enunciado: enunciado,
                                    tipo: tipo,
                                    opciones: opciones
                                }

                                let auxArray = {
                                    idPregunta: pregunta.idPregunta,
                                    tipo: tipo,
                                    respuestas: []
                                }
                                array.push(aux)
                                arrayAux.push(auxArray);
                                if(index == arregloPreguntas.length-1){
                                    setPreguntas(array);
                                    setRespuestas(arrayAux);
                                }
                            });                        
                    }
                })
                .catch(error => {
                    console.error(error)
                })
        }

        const id = setInterval(() => {
            setTimer((prev) => prev + 1)
          }, 1000)
        return () => {
            clearInterval(id)
        }
              
    }, [timer])

    const displayBar = () => {
        if(display){
            return(
                <NavAdmin />
            )
        }
    }

    const displayLimite = () => {
        const fechaLimite = encuesta.fechaLimite;
        if(fechaLimite){
            const fechaApertura = encuesta.fecha_abertura;
            const fechaCierre = encuesta.fecha_cierre;
            const dateAperture = new Date(fechaApertura);
            const dateCierre = new Date(fechaCierre);

            // Obtener la fecha en formato DD-MM-YYYY
            let dateOpen = `${dateAperture.getDate()}-${dateAperture.getMonth() + 1}-${dateAperture.getFullYear()}`;
            let dateClose = `${dateCierre.getDate()}-${dateCierre.getMonth() + 1}-${dateCierre.getFullYear()}`;

            // Obtener la hora en formato HH:MM
            let hoursOpen = String(dateAperture.getHours()).padStart(2, "0");
            let minutesOpen = String(dateAperture.getMinutes()).padStart(2, "0");
            let timeOpen = `${hoursOpen}:${minutesOpen}`;
            // Obtener la hora en formato HH:MM
            let hoursClose = String(dateCierre.getHours()).padStart(2, "0");
            let minutesClose = String(dateCierre.getMinutes()).padStart(2, "0");
            let timeClose = `${hoursClose}:${minutesClose}`;

            return(
                <>
                    <h3 className='subtitulo'>Con fecha limite</h3>
                    <div className="form-modal item deploy">
                        <h4 className='text-left black'>Abre {dateOpen} a las {timeOpen}</h4>
                        <h4 className='text-left black'>|Cierra {dateClose} a las {timeClose}</h4>
                    </div>
                </>
            )
        }else{
            return(
                <h3 className='subtitulo'>Sin fecha limite</h3>
            )
        }
    }

    const handleRespuesta = (idPregunta, answer, metodo, type) => {
        let auxArray = [];
        for(let index=0; index<respuestas.length; index++){
            let aux = respuestas[index];            
            if(idPregunta == aux.idPregunta){
                let array = aux.respuestas;
                if(type){
                    if(metodo){
                        array.push(answer);
                    }else{
                        array.pop(answer);
                    }
                }else{
                    array = answer;
                }
                aux = {
                    idPregunta: respuestas[index].idPregunta,
                    tipo: respuestas[index].tipo,
                    respuestas: array
                }
            }
            auxArray.push(aux);
        }
        setRespuestas(auxArray);
    }

    const handleCheckbox = (idPregunta, event, selectedOptions) => {
        let option = event.target.value;
        if(event.target.checked){
            handleRespuesta(idPregunta, option, true, true);   
        }else{
            handleRespuesta(idPregunta, option, false, true);   
        }
    }

    const handleRadiobox = (idPregunta, event) => {
        let respuesta = event.target.value;
        handleRespuesta(idPregunta, respuesta, undefined, false);
    }

    const handleCopy = (text) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    const displayPreguntas = preguntas.map((element) => {
        /*if(!access){
            return (
                <h1 className="text-center black">{message}</h1>
            );
        }*/
        const enunciado = element.enunciado;
        const tipo = element.tipo;
        const opciones = element.opciones;
        if(tipo == "fv"){
            return(
                <div className="form-modal item">
                    <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Disabled input"
                        aria-label="Disabled input example"
                        value={enunciado}
                        disabled
                        readOnly
                    />

                    <div key={element.idPregunta}>
                        <Form.Check
                        label="true"
                        value="true"
                        type="radio"
                        name = {element.idPregunta}
                        id={`inline-${element.idPregunta}-1`}
                        onChange={(e) => handleRadiobox(element.idPregunta, e)}
                        />
                        <Form.Check
                        label="false"
                        value="false"
                        type="radio"
                        name = {element.idPregunta}
                        id={`inline-${element.idPregunta}-2`} // Modificado el id para que sea único
                        onChange={(e) => handleRadiobox(element.idPregunta, e)}
                        />
                    </div>
                    </Form.Group>
                </div>
            )
        }else{
            let contador = 0;
            return(
                <div className="form-modal item">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Disabled input"
                            aria-label="Disabled input example"
                            value={enunciado}
                            disabled
                            readOnly
                        />
                    </Form.Group>
                    {opciones.map((opcion) => {
                        contador++;
                        return(
                            <>
                                <div key={element.idPregunta}>
                                    <Form.Check 
                                        type="checkbox"
                                        label = {opcion.opcion}
                                        value={opcion.idOpcion}
                                        name = {element.idPregunta}
                                        id={`inline-${element.idPregunta}-${contador}`}
                                        onChange={(e) => handleCheckbox(element.idPregunta, e)}
                                    />
                                </div>
                            </>
                        )
                    })}
                </div>
            )
        }

    })

    const handleSubmit = (event) => {
        event.preventDefault();
        setEntrega(true);
        sqlRequest.insertarRespuesta(idEncuesta, usuario, respuestas)
            .then(result => {
                alert(result.message);
                navigate("/usuario")
            })
            .catch(err => {
                console.log(err)
            });
    }

    return(
        <div className="background-encuesta">
            {displayBar()}
            <div className="card container">
            <h1 className='text-center black'>{encuesta.nombre}</h1>
            <div className="form-modal container">
                {displayLimite()}
            </div>
            {access ? (
                <>
                    
                    <Form className="form-modal" onSubmit={handleSubmit}>

                        {displayPreguntas}

                        <div className="form-modal item">
                            <ButtonWrapper>
                                {display ? (
                                    <>
                                        
                                        <ButtonRed
                                        disabled
                                        >Codigo Encuesta: {encuesta.idEncuesta}</ButtonRed>
                                        <ButtonYellow type="button" onClick={() => handleCopy(encuesta.idEncuesta)}>Copiar Codigo</ButtonYellow>
                                    </>
                                ): (
                                    <>
                                        <ButtonGreen 
                                        disabled={buttonEntrega}
                                        type="submit">Entregar</ButtonGreen>
                                    </>
                                )}
                            </ButtonWrapper>
                        </div>
                    </Form>
                </>
            ): (
                <>
                    <h1 className="text-center black">{message}</h1>
                </>
            )}
            </div>
        </div>
            
    )
}

export default Encuesta;