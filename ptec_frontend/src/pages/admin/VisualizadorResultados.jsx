import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import sqlRequest from "../../components/sqlRequest"
import EncuestaResultado from "./EncuestaResultado"
import NavAdmin from "./NavAdmin"
const VisualizadorResultados = () => {
    const [encuestas, setEncuestas] = useState([])
    const [option, setOptions] = useState(0)
    const [repeat, setRepeat] = useState(false);
    const [charts, setCharts] = useState((<></>))

    useEffect(() => {
        sqlRequest.obtenerEncuestas()
            .then(result => {
                if(result.encuestas != undefined){
                    setEncuestas(result.encuestas);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [])


    const displayEncuestas = encuestas.map((element) => {
        
        return(
            <option 
            key={element.idEncuesta}
            value={element.idEncuesta}>{element.nombre}</option>
        )
    });

    const displayResultados = () => {
        let grafos = charts;
        if(option != 0 && repeat){
            setRepeat(false);
            grafos = (<EncuestaResultado idEncuesta={option}/>);
            setCharts(grafos);            
        }
        return grafos;
    }

    const handleSelect = (value) => {
        setOptions(value);
        setRepeat(true);
    }

    return(
        <div className="background-admin">
            <NavAdmin />
            <div className="cardMenu">
                <div className="cardMenu-container">
                    <Form.Group className="mb-3">
                        <Form.Label>Selecciona una encuesta</Form.Label>
                        <Form.Select 
                        onChange = {(e) => handleSelect(e.target.value)}
                        aria-label="Default select example">
                            <option value="">Selecciona una encuesta</option>
                            {displayEncuestas}
                        </Form.Select>
                    </Form.Group>       
                    
                    <div className="container-chart">
                        {displayResultados()}
                    </div>
                    
                    
                </div>
            </div>
            
        </div>
    )

}

export default VisualizadorResultados