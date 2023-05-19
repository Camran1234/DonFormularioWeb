
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavUsuario = () => {
    const navigate = useNavigate();
    const close = () => {
        localStorage.removeItem("usuario");
    }

    useEffect(() => {
        const usuario = localStorage.getItem("usuario")
        if(usuario == undefined){
            navigate('/')
        }
    }, []) 

    return (
        <nav>
          <ul className="center">
            <li className="centerLi"><a href="/usuario">Home</a></li>
            <li className="left"><a className="black" onClick={() => close()} href="/">Cerrar Sesión</a></li>
          </ul>
        </nav>
      );
}

export default NavUsuario;