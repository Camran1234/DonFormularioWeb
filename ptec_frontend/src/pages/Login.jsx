import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import React, {useEffect, useState} from 'react';
import { ButtonWrapper, ButtonRed, ButtonGreen } from '../components/Buttons';
import sqlRequest from '../components/sqlRequest';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    

    

    const handleForm = (event) => {
        //Handlke this
        event.preventDefault();
        sqlRequest.loginUsuario(correo, password)
            .then(result => {
                const tipo = result.estado;
                if(tipo == undefined){
                    alert(result.message)
                }else{
                    console.log(tipo)
                    if(tipo == "admin"){
                        //MenuAdmin
                        localStorage.setItem("admin", correo);
                        navigate("/admin")
                    }else{
                        //menuUsuario
                        localStorage.setItem("usuario", correo);
                        navigate("/usuario")
                    }
                }
            })
            .catch(error => {
                console.error(error.toString())
            })
    }

    return(
        <div className="background">
            <div className = "small-card">
                <h1 className='titulo-black'>Iniciar Sesión</h1>
                <Form className='form-modal' onSubmit={handleForm}>                        
                    <div className='form-modal item-center'>
                        <Form.Group className="mb-5" controlId="formBasicEmail">
                            <FloatingLabel  label="Usuario">
                                <Form.Control type="text" placeholder="alguien@gmail.com" 
                                value = {correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                            </FloatingLabel>
                        </Form.Group>
                    </div>
                   
                    <div className='form-modal item-center'>
                        <Form.Group className="mt-2" controlId="formBasicPassword">
                            <FloatingLabel  label="Contraseña">
                                <Form.Control type="password" placeholder="Password" 
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </div>
                    
                    
                    <div className='form-modal item'>
                        <ButtonWrapper>
                            <ButtonGreen type='submit'>Entrar</ButtonGreen>
                        </ButtonWrapper>
                    </div>    
                    <div className='form-modal item-center'>
                        <a className="black" 
                        href='/register'>¿No tienes Cuenta aun? ¡Registrate!</a>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login;

