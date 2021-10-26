import React from 'react';
import * as Faicons from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
const Otro = () => {
return(

    <div className="otro bg-light">
    
    <ul>
    <h1> Usuario </h1> 
        <li> 
        <NavLink to="/" exact className="rounded py-2 w-100 d-inline-block px-3" activeClassName="active"><Faicons.FaFileExport className="me-2"/> Enviar</NavLink>
        </li> 
       
       
       
        
    </ul>
    <ul>
    <h1> Organismo </h1> 
        <li> 
        <NavLink to="/EnvioOrga" exact className="rounded py-2 w-100 d-inline-block px-3" activeClassName="active"><Faicons.FaFileExport className="me-2"/> Publicar Licitación</NavLink>
        </li> 
       
        <li> 
        <NavLink to="/Recuperar" exact className="rounded py-2 w-100 d-inline-block px-3" activeClassName="active"><Faicons.FaFileImport className="me-2"/> Recuperar Información</NavLink>
        </li> 
       
        <li> 
        <NavLink to="/Desencriptar" exact className="rounded py-2 w-100 d-inline-block px-3" activeClassName="active"> <Faicons.FaKey className="me-2"/> Evaluación de las Ofertas</NavLink>
        </li> 
    </ul>
    </div>
)


}
export default Otro