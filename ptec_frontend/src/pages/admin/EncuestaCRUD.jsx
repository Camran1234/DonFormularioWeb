import NavAdmin from "./NavAdmin";
import '../../styles/Admin.css'
import { useState } from "react";
import { useEffect } from "react";
import sqlRequest from "../../components/sqlRequest";
import { ButtonGreen, ButtonWrapper } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";

const EncuestaCrud = () => {
    const navigate = useNavigate();
    const [encuestas, setEncuestas] = useState([])

    useEffect(() => {
        sqlRequest.obtenerEncuestas()
            .then(result => {
                const encuestas = result.encuestas;
                if(encuestas == undefined){
                    console.error("Error: "+result.message)
                }else{
                    setEncuestas(encuestas);
                }
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const handleDisplay = (encuesta) => {
        navigate(`/encuesta/${encuesta.idEncuesta}`)
    }

    const handleCreate = () => {
        navigate("/constructor")
    }

    const displayEncuestas = encuestas.map((element) => {
        return(
            <>
            <div className='cardMenu-item' onClick={() => handleDisplay(element)}>
                <h2 className='text-center black'>{element.nombre}</h2>
                <h4 className='text-center black'>ID: {element.idEncuesta}</h4>
            </div>
            </>
        )
    })

    return(
        <div className="background-admin">
            <NavAdmin />
            <div className="cardMenu">
                <div className='cardMenu-container'>
                    <h1 className='text-center black'>Encuestas</h1>
                    <div className='cardMenu-container horizontal'>
                        {displayEncuestas}
                    </div>
                    <ButtonWrapper>
                        <ButtonGreen onClick={handleCreate}>Crear Encuesta</ButtonGreen>
                    </ButtonWrapper>
                </div>
            </div>

        </div>
    )
}

export default EncuestaCrud;