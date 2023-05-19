import NavAdmin from "./NavAdmin";
import '../../styles/Admin.css'
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import { ButtonWrapper } from "../../components/Buttons";
import moment from 'moment';
import sqlRequest from "../../components/sqlRequest";
import ModalEncuesta from "../../components/ModalEncuesta";

const EncuestaConstructor = () => {
    const navigate = useNavigate();
    const [nombreEncuesta, setNombreEncuesta] = useState("");
    const [deployDates, setDeployDates] = useState(false);
    const [fechaApertura, setFechaApertura] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");
    const [horaApertura, setHoraApertura] = useState("");
    const [horaCierre, setHoraCierre] = useState("");
    const [preguntas, setPreguntas] = useState([]);


    const [timer, setTimer] = useState(0)
    useEffect(() => {

        const id = setInterval(() => {
            setTimer((prev) => prev + 1)
          }, 500)
        return () => {
            clearInterval(id)
        }
              
    }, [timer])

    const handleSubmit = (event) => {
        event.preventDefault();
        let dateTimeApertura = null;
        let dateTimeCierre = null;
        if(deployDates){
            // YYYY-MM-DD-hh-mm
            dateTimeApertura =  moment(`${fechaApertura} ${horaApertura}`).format('YYYY-MM-DD HH:mm:ss');
            dateTimeCierre = moment(`${fechaCierre} ${horaCierre}`).format('YYYY-MM-DD HH:mm:ss');
        }

        const encuesta = {
            nombre: nombreEncuesta,
            fechaApertura: dateTimeApertura,
            fechaCierre: dateTimeCierre,
            fechaLimite: deployDates
        }
        
        sqlRequest.insertarEncuesta(encuesta)
            .then(result => {
                let idEncuesta = result.idEncuesta;
                if(idEncuesta !=undefined){
                    let flag=false;

                    for(let index=0; index<preguntas.length; index++){
                        flag=true;
                        sqlRequest.insertarPregunta(idEncuesta, preguntas[index])
                            .then(resultPregunta => {
                                if(index == preguntas.length-1){
                                    alert("Encuesta agregada");
                                    navigate("/encuestasCrud");
                                }
                            })
                    }
                    if(!flag){
                        alert("Encuesta agregada, preguntas: "+preguntas.length);
                        navigate("/encuestasCrud");
                    }
                }else{
                    alert("Error agregando encuesta")
                }

            })
            .catch(error => {
                console.error("Error")
            })
    }

    const handleArreglo = (item) => {
        let arreglo = preguntas;
        arreglo.push(item);
        setPreguntas(arreglo);
        console.log(JSON.stringify(arreglo))
    }

    

    const deployPreguntas = preguntas.map((element) => {
        let tipo = element.tipo;
        let flag= false;
        if(tipo == "fv"){
            tipo = "Falso y Verdadero"
        }else{
            tipo = "Opcion Multiple"   
            flag = true;
        }
        
        return(
            <>
                <div className='cardMenu-container horizontalSmall'>
                    <h5 className="text-center black">Pregunta: {element.enunciado}</h5>
                    <h5 className="text-center black">Tipo: {tipo}</h5>
                    {flag && (                        
                        <>
                            {element.opciones.map((element2) => {
                                return(
                                    <h6 className="text-left black">Opcion: {element2.enunciado}</h6>
                                )           
                            })}
                        </>
                    )}
                    
                </div>
            </>
        )
    })

    return(
        <div className="background-admin">
            <NavAdmin />
            <div className="card container">
                <Form className="form-modal" onSubmit={handleSubmit}>
                    <h1 className='titulo'>Creador Encuesta</h1>
                    <div className="form-modal item">
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="nameEncuesta">Nombre Encuesta</Form.Label>
                            <Form.Control
                                type="text"
                                value={nombreEncuesta}
                                onChange={(e) => setNombreEncuesta(e.target.value)}
                            />  
                        </Form.Group>
                    </div>
                    <div className="form-modal item">
                        <Form.Label row="true" >
                            <Form.Check 
                            type="checkbox"
                            label="¿Tiene Fecha limite?"
                            onChange={(e) => setDeployDates(e.target.checked)}></Form.Check>
                        </Form.Label>
                    </div>
                    {deployDates && (
                        <div className ="form-modal container">
                            <div className = "form-modal item deploy">
                                <Form.Group className="mb-3" >
                                    <FloatingLabel  label="Fecha Apertura">
                                        <Form.Control type="date"  
                                        value={fechaApertura}
                                        onChange={(e) => setFechaApertura(e.target.value)}
                                        required
                                    />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <FloatingLabel  label="Fecha Cierre">
                                        <Form.Control type="date"  
                                        value={fechaCierre}
                                        onChange={(e) => setFechaCierre(e.target.value)}
                                        required
                                    />
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                            <div className="form-modal item deploy">
                                <Form.Group className="mb-3">
                                    <FloatingLabel  label="Hora Apertura">
                                        <Form.Control type="time"  
                                        value={horaApertura}
                                        onChange={(e) => setHoraApertura(e.target.value)}
                                        required
                                    />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel  label="Hora Cierre">
                                        <Form.Control type="time"  
                                        value={horaCierre}
                                        onChange={(e) => setHoraCierre(e.target.value)}
                                        required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                            </div>
                        </div>
                    )}

                    <div className="form-modal item">
                        <Form.Group className="mb-3">
                            <ModalEncuesta 
                            array = {preguntas}
                            onVariableChange = {handleArreglo}
                            />
                        </Form.Group>
                    </div>
                    <div className="form-modal item">
                        {deployPreguntas}
                    </div>
                    <div className="form-modal item">
                        <ButtonWrapper>
                            <Button type="submit" variant="primary" size="lg">Crear Encuesta</Button>
                        </ButtonWrapper>
                    </div>
                    
                </Form>
            </div>
        </div>
    )
}

export default EncuestaConstructor;