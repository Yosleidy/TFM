import React from 'react';

import logo from '../assets/images/favicon.ico';

const Header= () => {
    return(
    
        <div className="header">
          <img alt="logo" className="logo" src={logo} />
        <span>Portal de Licitaciones</span>
        
      </div>
    )
    
    
    }
    export default Header