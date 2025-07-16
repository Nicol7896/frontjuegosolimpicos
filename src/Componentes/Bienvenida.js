import React from "react";
import { useNavigate } from "react-router-dom";
import imagen1 from '../Img/imagen1.png';
import imagen2 from '../Img/imagen2.png';
import medallas from '../Img/medallas.png';
import '../Css/bienvenida.css'


function Bienvenida (){
    const navigate = useNavigate();
    return(
        <>
        <div className="imagenes">
            <img src={imagen1} alt="hola" className="imagen1" />
            <img src={imagen2} alt="hola" className="imagen2"/>
        </div>
        <div className="contenido">
            <img src={medallas} alt="hola" className="medallas"/>
        
            <button onClick={()=> navigate ('/countries')}>Countries</button>
            <button onClick={()=> navigate ('/disciplines')}>Disciplines</button>
        </div>
        </>

    )
}
export default Bienvenida;