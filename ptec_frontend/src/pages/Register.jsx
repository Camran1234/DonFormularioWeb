import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, {useEffect, useState} from 'react';
import { ButtonWrapper, ButtonRed, ButtonGreen } from '../components/Buttons';
import sqlRequest from '../components/sqlRequest'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [sexo, setSexo] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');
    const [nivelEscolaridad, setNivelEscolaridad] = useState('');
    const [flag, setFlag] = useState(false)

    const handleSexo = (event) => {
        setSexo(event.target.value);
    }

    const handleEscolaridad = (event) => {
        setNivelEscolaridad(event.target.value)
    }

    const handleEstadoCivil = (event) => {
        setEstadoCivil(event.target.value);
    }

    const handlePassword = (event) => {
        let newPassword = event.target.value;
        if(password != newPassword){
            setFlag(true);
        }else{
            setFlag(false);
        }
    }

    const handleForm = (event) => {
        event.preventDefault();
        //Handlke this
        if(flag){
            alert("Las constraseñas no son iguales")
        }else{
            //fechaNacimiento => YYYY-MM-DD
            const usuario = {
                correo: correo,
                password: password,
                sexo: sexo,
                estadoCivil: estadoCivil,
                fechaNacimiento: fechaNacimiento,
                nivelEscolaridad: nivelEscolaridad,
                tipo: "usuario"
            }

            sqlRequest.registrarUsuario(usuario)
                .then(result => {
                    alert(result.message)
                    if(result.error == undefined){
                        navigate("/")
                    }
                })
                .catch(error => {
                    console.error(error.toString())
                })
        }

        
    }

    return(
        <div className="background">
            <div className = "card container">
                <h1 className='titulo'>Registro Usuario</h1>
                <Form className='form-modal' onSubmit={handleForm}>                        
                    <div className='form-modal item'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <FloatingLabel  label="Correo Electronico">
                                <Form.Control type="email" placeholder="alguien@gmail.com" 
                                value = {correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                            </FloatingLabel>
                        </Form.Group>
                    </div>
                    <div className='form-modal item deploy'>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel  label="Contraseña">
                                <Form.Control type="password" placeholder="Password" 
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel  label="Repita Contraseña">
                                <Form.Control type="password" placeholder="Password" 
                                onChange = {handlePassword}
                                required
                                />
                            </FloatingLabel>
                            {flag && (
                                <Form.Text id="passwordHelpBlock" muted>
                                    Las contraseñas no son similares
                                </Form.Text>
                            )}
                        </Form.Group>
                    </div>
                    <div className='form-modal item'>
                        <Form.Group className="mb-3" >
                            <FloatingLabel  label="Fecha Nacimiento">
                                <Form.Control type="date"  
                                value = {fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                                required
                            />
                            </FloatingLabel>
                        </Form.Group>
                    </div>
                    <div className='form-modal item deploy'>    
                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="inputSexo">Sexo</Form.Label>                            
                            <Form.Select
                                onChange={handleSexo}
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="masculino">Masculino/a</option>
                                <option value="femenino">Femenino/a</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label htmlFor="inputEstado">Estado Civil</Form.Label>                            
                            <Form.Select
                                onChange = {handleEstadoCivil}
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="soltero">Soltero/a</option>
                                <option value="casado">Casado/a</option>
                            </Form.Select>
                        </Form.Group>
                        
                    </div>
                    <div className='form-modal item deploy'>
                        <Form.Group className="mb-10" >
                            <Form.Label htmlFor="inputEstado">Nivel Escolaridad</Form.Label>                            
                            <Form.Select
                                onChange = {handleEscolaridad}
                                required
                            >
                                <option value="">Seleccione</option>
                                <option value="inicial">Educacion Inicial</option>
                                <option value="primaria">Educacion Primaria</option>
                                <option value="media">Educacion Media</option>
                                <option value="superior">Educacion Superior</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    
                    <div className='form-modal item'>
                        <ButtonWrapper>
                            <ButtonGreen type='submit'>Registrar</ButtonGreen>
                        </ButtonWrapper>
                    </div>    
                </Form>
            </div>
        </div>
    )
}

export default Register;

