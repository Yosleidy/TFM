import React, { Component} from 'react';


import {

  FocusContainer,
  TextField,
  Button,
  CardActions,


} from 'react-md';



const moment = require('moment');
var aux = '';



     
class Resultado extends Component {

  
  state = {
    nameError: true,
    descripcionError: true,
   
    nombreLicError: true,
     
     priceError:true,
     importeError:true,
     
     
  };

  componentDidMount = () => {
    window.addEventListener('paste', this.validate);
  };

  componentWillUnmount() {
    window.removeEventListener('paste', this.validate);
  };

  publicIOTA = event => {
    event.preventDefault();
    const newCustomer = {};
    const nombre = this.name.value;
    const nombreLic = this.nombreLic.value;
   const importe =this.importe.value;
    const descripcion = this.descripcion.value;
   const presupuesto=this.price.value;
    const dateTime = moment().utc(+2).format('DD/MM/YYYY hh:mm:ss');

    newCustomer['nombre del organismo licitador'] = nombre;
    newCustomer['oferta ganadora'] = nombreLic;
    newCustomer['número de licitadores presentados']=presupuesto;
    newCustomer['documentación'] = descripcion;
    newCustomer['importe']=importe;
     newCustomer['fecha de publicación']=dateTime;
    
    

   const IOTA = require('iota.lib.js');
   const Mam = require('@iota/mam');

    const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443' });

    const MODE = 'public'; // public, private or restricted
    const SECURITYLEVEL = 3; // 1, 2 or 3
   
    let mamState = Mam.init(iota, undefined, SECURITYLEVEL);

    // Establecer el modo del canal
  mamState = Mam.changeMode(mamState, MODE);
  
    async function publish(packet) {

      const trytes = iota.utils.toTrytes(JSON.stringify(packet));
      const message = Mam.create(mamState, trytes);


      mamState = message.state;

            // Adjuntar el payload.
      await Mam.attach(message.payload, message.address, 3, 9);
      
      aux = message.address;
     
    
     
     
    }
    
   
   
    


  

    async function enviardatos(text) {
      publish(text);

    }

   enviardatos(newCustomer);


  };

  validate = () => {
    this.setState({
      nameError: !this.name.value,
      nombreLicError: !this.nombreLic.value,
     importeError:!this.importe.value,
      descripcionError: !this.descripcion.value,
     
      priceError:!this.price.value,
      
      
      
    });

    return !this.name.value || !this.nombreLic.value || !this.price.value  || !this.descripcion.value || !this.importe.value ;
  };


  render() {
    
    const { nameError, descripcionError, nombreLicError, priceError, importeError} = this.state;
    const { showLoader } = this.props;
   
   
    return (
      <div className="formWrapper">
        <FocusContainer
          focusOnMount
          containFocus
          component="form"
          className="md-grid"
          onSubmit={this.publicIOTA}
          aria-labelledby="iota-mam-explorer"
        >
          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={name => (this.name = name)}
            id="name"
            label="Entidad adjudicadora"
            required
            type="text"
            error={nameError}
            errorText="This field is required."
            onChange={this.validate} />


          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={nombreLic => (this.nombreLic = nombreLic)}
            id="nombreLic"
            label="Entidad que gana la licitación"
            required
            type="text"
            error={nombreLicError}
            errorText="This field is required."
            onChange={this.validate} />

            
          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={descripcion => (this.descripcion = descripcion)}
            id="descripcion"
            label="Documentación: (Anuncio de Adjudicación)"
            required
            type="text"
            error={descripcionError}
            errorText="This field is required."
            onChange={this.validate} />

<TextField style={{width: '17.5%', marginLeft: '5%' }}
            ref={price => (this.price = price)}
            id="price"
            label="Nº de licitadores presentados "
            required
            type="number"
            error={priceError}
            errorText="This field is required."
            onChange={this.validate} />

         

             <TextField style={{width: '17.5%', marginLeft: '5%' }}
            ref={importe => (this.importe = importe)}
            id="importe"
            label="Importe de Adjudicación"
            required
            type="number"
            error={importeError}
            errorText="This field is required."
            onChange={this.validate} />

         
          
         
     
        
        </FocusContainer>

        <div>
          <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
            <Button secondary raised disabled={this.state.nameError || this.state.importeError || this.state.nombreLicError || this.state.descripcionError  || this.state.fechafinError || this.state.presentaciónError || this.state.priceError } onClick={this.publicIOTA}>
              Publicar oferta ganadora
            </Button>
          </CardActions>
        </div>
       
      
      
                        
              
</div>

    );

  }
}
export default Resultado;