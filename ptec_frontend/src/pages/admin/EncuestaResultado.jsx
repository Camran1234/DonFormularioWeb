import { useEffect } from "react"
import { useState } from "react";
import sqlRequest from "../../components/sqlRequest";
import RenderBarChart from "./ResultChart";

const EncuestaResultado = ({idEncuesta}) => {
    const [respuestas, setRespuestas] = useState([])
    const [timer, setTimer] = useState(0)
    //{RenderBarChart({data})}
    useEffect(() => {
        sqlRequest.getRespuestas(idEncuesta)
            .then(result => {
                const respuestas = result;
                if(respuestas != undefined){
                    setRespuestas(respuestas);
                }
            })
            .catch(error => {
                console.error(error);
            })
        
        const id = setInterval(() => {
            setTimer((prev) => prev + 1)
            }, 1000)
        return () => {
            clearInterval(id)
        }
                
    }, [timer])

    const displayRespuestas = respuestas.map((element) => {
        const id = element.idPregunta;
        const enunciado = element.enunciado;
        const data = element.respuestas;
        return(
            <>            
                <div className="form-modal item">
                    {RenderBarChart({id, enunciado, data})}
                </div>
            </>
        )
    });

    return(
        <div className="form-modal">
            {displayRespuestas}
        </div>
    )
}


export default EncuestaResultado;