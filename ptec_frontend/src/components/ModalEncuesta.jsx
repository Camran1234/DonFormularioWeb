import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Form from 'react-bootstrap/Form'
import {ButtonWrapper, ButtonGreen} from './Buttons'
import Button from 'react-bootstrap/Button';

Modal.setAppElement('#root');

const customStyles = {
    content: {
      width: '40%',
      height: '50%',
      margin: 'auto',
      background: 'rgba(223,223,235,255)',
      align: 'center'
    },
  };

const ModalEncuesta = ({onVariableChange}) => {
    const [access, setAccess] = useState(false)
    const [enunciado, setEnunciado] = useState("")
    const [tipo, setTipo] = useState("")
    const [opciones, setOpciones] = useState([])
    const [opcion, setOpcion] = useState("")

    const [opcionFlag, setOpcionFlag] = useState(false)
    const [timer, setTimer] = useState(0)


    const handleSubmit = () => {
        //handle this
        let opcionesPregunta = null;
        if(opcionFlag){
            opcionesPregunta = opciones;
        }
        let pregunta = {
            enunciado: enunciado,
            tipo: tipo,
            opciones: opcionesPregunta
        }
        onVariableChange(pregunta)
        setAccess(false);
        setEnunciado("");
        setTipo("");
        setOpciones([]);
        setOpcion("");
        setOpcionFlag(false);


    }

    const handleOpcion = () => {
        const enunciado = opcion;
        if(enunciado == "" || enunciado == undefined){
            alert("Agrega una enunciado a la opcion")
        }else{
            let array = opciones;
            array.push({
                enunciado: enunciado,
                numero: array.length+1
            });
            setOpciones(array)
            setOpcion("")
        }
    }

    const handleTipo = (event) => {
        const option = event.target.value;
        if(option == "fv"){
            setOpcionFlag(false);
        }else if(option == "multiple"){
            setOpcionFlag(true);
        }
        setTipo(option);
        
    }

    const removeOption = (numero) => {
        let value = numero-1;
        let array = opciones;
        array.splice(value, 1);
        const newArray = array.filter(Boolean);
        setOpciones(newArray);
    }

    const deployOpciones = opciones.map((element) => {
        return(
            <div className='cardMenu-container horizontalSmall'>
                <p>{element.enunciado}</p>
                <ButtonWrapper>
                    <Button type="button" variant="danger"
                        onClick={() => removeOption(element.numero)}
                    >Eliminar</Button>
                </ButtonWrapper>
            </div>
        )
    });

    useEffect(() => {

        const id = setInterval(() => {
            setTimer((prev) => prev + 1)
          }, 500)
        return () => {
            clearInterval(id)
        }
              
    }, [timer])

    return(
        <>
            <ButtonWrapper>
                <Button type="button" variant="primary" 
                onClick={() => setAccess(true)}
                >Agregar Pregunta</Button>
            </ButtonWrapper>
            {access && (
                <>
                    <Modal
                        isOpen={access}
                        onRequestClose={() => setAccess(false)}
                        style={customStyles}
                    >
                        <Form className="form-modal" >
                        <h3 className='text-center black'>Pregunta</h3>                        
                            <div className="form-modal item">
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="nameEncuesta">Enunciado</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows = {4}
                                            value={enunciado}
                                            onChange={(e) => setEnunciado(e.target.value)}
                                            required
                                        />  
                                </Form.Group>
                            </div>
                            <div className='form-modal item'>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo Pregunta</Form.Label>
                                    <Form.Select 
                                        onChange={handleTipo}
                                        required
                                    >
                                        <option value="">Seleccionar</option>
                                        <option value="multiple">Opcion Multiple</option>
                                        <option value="fv">Falso Verdadero</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>
                            
                            {opcionFlag ? (
                                <div className="form-modal container">
                                    <h4 className='text-left black'>Opciones</h4>
                                    
                                        {deployOpciones}
                                    
                                    <Form.Group className='mb-3'>
                                        <Form.Label>Opcion</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            rows = {2}
                                            value={opcion}
                                            onChange={(e) => setOpcion(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>
                                    <ButtonWrapper>
                                        <Button type="button" variant="primary" 
                                            onClick={handleOpcion}
                                        >Agregar Opcion</Button>
                                    </ButtonWrapper>
                                </div>
                            ): null}

                            <div className='form-modal item'>
                                <Form.Group className="mb-3">
                                    <ButtonWrapper>
                                        <ButtonGreen type='button'
                                            onClick={handleSubmit}
                                        >Agregar Pregunta</ButtonGreen>
                                    </ButtonWrapper>
                                </Form.Group>
                            </div>


                        </Form>          

                    </Modal>
                </>
            )}

        </>
    )
}

export default ModalEncuesta;