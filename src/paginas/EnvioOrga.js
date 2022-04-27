import React, { Component} from 'react';
import Modal from '../components/Modal';

import {

  FocusContainer,
  TextField,
  Button,
  CardActions,


} from 'react-md';



const moment = require('moment');
var aux = '';



     
class EnvioOrga extends Component {

  
  state = {
    nameError: true,
    descripcionError: true,
    presentaciónError:true,
    fechafinError: true,
    nombreLicError: true,
     active: false,
     priceError:true,
     
     
     
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
    const presentaofertas= this.presentación.value;
    const fechafin = this.fechafin.value;
    const descripcion = this.descripcion.value;
    const presupuesto=this.price.value;
    const dateTime = moment().utc(+2).format('DD/MM/YYYY hh:mm:ss');

    newCustomer['nombre del organismo licitador'] = nombre;
    newCustomer['nombre de la licitación'] = nombreLic;
    newCustomer['presupuesto base de licitación']=presupuesto;
    newCustomer['descripción de la licitación'] = descripcion;
    newCustomer['fecha de publicación de la convocatoria']=dateTime;
    newCustomer['fecha fin para presentar ofertas'] = fechafin;
    newCustomer['fecha de presentación de la oferta ganadora']=presentaofertas;
   
  const IOTA = require('iota.lib.js');
  const Mam = require('@iota/mam');
  const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443' });
  const MODE = 'public'; // public, private or restricted
  const SECURITYLEVEL = 3; // 1, 2 or 3
  let mamState = Mam.init(iota, undefined, SECURITYLEVEL);
  mamState = Mam.changeMode(mamState, MODE);

async function publish(packet) {
     const trytes = iota.utils.toTrytes(JSON.stringify(packet));
     const message = Mam.create(mamState, trytes);
     mamState = message.state;
     await Mam.attach(message.payload, message.address, 3, 9);
     aux = message.address;
       handleShow();
      }
    const handleShow = () => {
      this.setState({ active: true });
            
    };
   async function enviardatos(text) {
      publish(text);
   }
   enviardatos(newCustomer);
    };

  validate = () => {
    this.setState({
      nameError: !this.name.value,
      nombreLicError: !this.nombreLic.value,
      presentaciónError:!this.presentación.value,
      descripcionError: !this.descripcion.value,
      fechafinError: !this.fechafin.value,
      priceError:!this.price.value,
      
      
      
    });

    return !this.name.value || !this.nombreLic.value || !this.price.value || !this.fechafin.value || !this.descripcion.value || !this.presentación.value;
  };


  render() {
    
    const { nameError, fechafinError, presentaciónError,descripcionError, nombreLicError, priceError} = this.state;
    const { showLoader } = this.props;
    const toggle = () => {
      this.setState({ active: false });
      
    }
   
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
            label="Organismo o Empresa que emite la licitación"
            required
            type="text"
            error={nameError}
            errorText="This field is required."
            onChange={this.validate} />


          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={nombreLic => (this.nombreLic = nombreLic)}
            id="nombreLic"
            label="Nombre de la licitación"
            required
            type="text"
            error={nombreLicError}
            errorText="This field is required."
            onChange={this.validate} />

            
          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={descripcion => (this.descripcion = descripcion)}
            id="descripcion"
            label="Descripción de la licitación"
            required
            type="text"
            error={descripcionError}
            errorText="This field is required."
            onChange={this.validate} />
<TextField style={{width: '17.5%', marginLeft: '5%' }}
            ref={price => (this.price = price)}
            id="price"
            label="Presupuesto base de licitación"
            required
            type="number"
            error={priceError}
            errorText="This field is required."
            onChange={this.validate} />

          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={fechafin => (this.fechafin = fechafin)}
            id="fechafin"
            label="Fecha Fin de la convocatoria"
            required
            type="date"
            error={fechafinError}
            errorText="This field is required."
            onChange={this.validate} />

             <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={presentación => (this.presentación = presentación)}
            id="presentación"
            label="Fecha de presentación de la oferta ganadora"
            required
            type="date"
            error={presentaciónError}
            errorText="This field is required."
            onChange={this.validate} />

         
          
         
     
        
        </FocusContainer>

        <div>
          <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
            <Button secondary raised disabled={this.state.nameError || this.state.nombreLicError || this.state.descripcionError  || this.state.fechafinError || this.state.presentaciónError || this.state.priceError } onClick={this.publicIOTA}>
              Enviar Información
            </Button>
          </CardActions>
        </div>
        <Modal active={this.state.active} toggle={toggle}>
          <h1 style={{ fontSize: 20 }} >Hash de la transacción:</h1>
          <p style={{ overflowWrap: 'break-word' }}> {aux} </p>
        </Modal>
      
      
                        
              
</div>

    );

  }
}
export default EnvioOrga;
