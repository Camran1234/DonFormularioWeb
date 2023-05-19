import NavAdmin from "./NavAdmin";
import Table from 'react-bootstrap/Table'
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card'
import sqlRequest from "../../components/sqlRequest";

const DashBoard = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [encuestasTotales, setEncuestasTotales] = useState(0);
    const [encuestasDisponibles, setEncuestasDisponibles] = useState(0);
    const [reactLimit, setReactLimit] = useState(1);
    const [reactRenders, setReactRender] = useState(0);
    let counter = 0;

    useEffect(() => {
        setReactRender(reactRenders + 1)
        if(reactRenders < reactLimit){
            counter=0;
            sqlRequest.obtenerDatosEncuesta()
                .then(result => {
                    if(result.success){
                        setEncuestasTotales(result.encuestas.length);
                        setEncuestasDisponibles(result.encuestasDisponibles.length);
                    }
                })
                .catch(error => {
                    console.error(error);
                })
            sqlRequest.obtenerUsuarios()
                .then(result => {
                    if(result.success){
                        setUsuarios(result.usuarios);
                    }
                })
        }
    }, []);
    
    const displayUsuarios = usuarios.map((element) => {
        counter++

        return(
            <>
                <tr key={counter}>
                    <td>{counter}</td>
                    <td>{element.correo}</td>
                    <td>{element.sexo}</td>
                    <td>{element.estadoCivil}</td>
                    <td>{element.fechaNacimiento}</td>
                    <td>{element.nivelEscolaridad}</td>
                </tr>
            </>
        )
    });

    return(
        <div className="background-admin">
            <NavAdmin />
            <div className="card container black">
                
                <div className="form-modal">
                    <div className="card-container3">
                        <div className="card3">
                        <Card 
                        bg="light"
                        text="dark"
                        border="dark" style={{ width: '18rem' }}>
                            <Card.Header>Información Usuarios</Card.Header>
                            <Card.Body>
                            <Card.Title className="text-center black">Usuarios Disponibles</Card.Title>
                            <Card.Text className="text-center black">
                                {usuarios.length}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>
                        <div className="card3">
                        <Card 
                        bg="light"
                        text="dark"
                        border="dark" style={{ width: '18rem' }}>
                            <Card.Header>Información General</Card.Header>
                            <Card.Body>
                            <Card.Title className="text-center black">Encuestas Totales</Card.Title>
                            <Card.Text className="text-center black">
                                {encuestasTotales}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>
                        <div className="card3">
                        <Card 
                        bg="light"
                        text="dark"
                        border="dark" style={{ width: '18rem' }}>
                            <Card.Header>Encuestas con Fecha Limite</Card.Header>
                            <Card.Body>
                            <Card.Title className="text-center black">Encuestas Disponibles</Card.Title>
                            <Card.Text className="text-center black">
                                {encuestasDisponibles}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>
                    </div>
                    <br/><br/><br/>
                    <div className="form-modal item">
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Correo</th>
                                    <th>Sexo</th>
                                    <th>Estado Civil</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Nivel Escolaridad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayUsuarios}
                            </tbody>
                        </Table>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default DashBoard;