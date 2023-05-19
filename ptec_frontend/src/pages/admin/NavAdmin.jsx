
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavAdmin = () => {
    const navigate = useNavigate();
    const close = () => {
        localStorage.removeItem("admin");
    }

    useEffect(() => {
        const admin = localStorage.getItem("admin")
        if(admin == undefined){
            navigate('/')
        }
    }, []) 

    return (
        <nav>
          <ul className="center">
          <li className="centerLi"><a href="/admin">Home</a></li>
            <li className="centerLi"><a href="/encuestasCrud">Encuestas</a></li>
            <li className="centerLi"><a href="/resultados">Resultados</a></li>
            <li className="centerLi"><a href="/dashboard">Dashboard</a></li>
            <li className="left"><a className="black" onClick={() => close()} href="/">Cerrar Sesión</a></li>
          </ul>
        </nav>
      );
}

export default NavAdmin;