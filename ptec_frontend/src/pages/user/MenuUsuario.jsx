import NavUsuario from './NavUsuario'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ButtonWrapper } from '../../components/Buttons';
import { ButtonGreen } from '../../components/Buttons';
const MenuUsuario = () => {
    const navigate = useNavigate();
    const [idEncuesta, setIdEncuesta] = useState("");

    const handleSubmit = () => {
        navigate(`/encuesta/${idEncuesta}`)
    }

    return(
        <div className="background-admin">
            <NavUsuario />
            <div className="containerCenter">
                <h1 className="center">Bienvenido {localStorage.getItem("admin")}</h1>
                <Form className="form-modal" onSubmit={handleSubmit}>
                    <div className='form-modal item'>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <FloatingLabel  label="ID Encuesta">
                                <Form.Control type="text" placeholder="Password" 
                                value = {idEncuesta}
                                onChange = {(e) => setIdEncuesta(e.target.value)}
                                required
                                />
                            </FloatingLabel>
                            <ButtonWrapper>
                                <ButtonGreen>Ingresar</ButtonGreen>
                            </ButtonWrapper>
                        </Form.Group>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default MenuUsuario;