import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Otro from './Otro';
import './App.scss';
import Enviar from '../paginas/Enviar';
import Recuperar from './Recuperar';
import Desencriptar from '../paginas/Desencriptar';
import EnvioOrga from '../paginas/EnvioOrga';
import Header from './Header';
import Confirmacion from '../paginas/ConfirmacionOfertas';

  function App(){

    
   return (
      <Router>
        <Header/>

       <div className="flex">
       <Otro/>
       <div className="content">
        < Route path="/" exact={true} component={Enviar}/>
        < Route path="/Recuperar" exact={true} component={Recuperar}/>
        < Route path="/Desencriptar" exact={true} component={Desencriptar}/>
        < Route path="/EnvioOrga" exact={true} component={EnvioOrga}/>
        < Route path="/Confirmacion" exact={true} component={Confirmacion}/>
         </div>
       </div>
      </Router>
    );
  }


export default App;
