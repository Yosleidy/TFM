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
    academictitleError: true,
    fechafinError: true,
    nombreLicError: true,
     active: false,
     
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
    const titulación = this.academictitle.value;
    const fechafin = this.fechafin.value;
    const descripcion = this.descripcion.value;
   
    const dateTime = moment().utc(+2).format('DD/MM/YYYY hh:mm:ss');

    newCustomer['nombre'] = nombre;
    newCustomer['nombre_licitación'] = nombreLic;
    newCustomer['titulación'] = titulación;
    newCustomer['fecha_fin'] = fechafin;
    newCustomer['descripción'] = descripcion;
     newCustomer['fecha_de_publicación']=dateTime;

    

   const IOTA = require('iota.lib.js');
   const Mam = require('@iota/mam');

    const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443' });

    const MODE = 'public'; // public, private or restricted
    const SECURITYLEVEL = 3; // 1, 2 or 3

   //  Ininicializar MAM State
    let mamState = Mam.init(iota, undefined, SECURITYLEVEL);

    // Establecer el modo del canal
  mamState = Mam.changeMode(mamState, MODE);
 

    async function publish(packet) {

      const trytes = iota.utils.toTrytes(JSON.stringify(packet));
      const message = Mam.create(mamState, trytes);


      mamState = message.state;


      // Adjuntar el payload.
      await Mam.attach(message.payload, message.address, 3, 9);
      aux = message.root;
      
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
      academictitleError: !this.academictitle.value,
      descripcionError: !this.descripcion.value,
      fechafinError: !this.fechafin.value,
      
      
    });

    return !this.name.value || !this.nombreLic.value || !this.academictitle.value || !this.fechafin.value || !this.descripcion.value;
  };


  render() {
    const { nameError, fechafinError, academictitleError,descripcionError, nombreLicError } = this.state;
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
          onSubmit={this.submit}
          aria-labelledby="iota-mam-explorer"
        >
          <TextField
            ref={name => (this.name = name)}
            id="name"
            label="Organismo o Empresa"
            required
            type="text"
            error={nameError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={nombreLic => (this.nombreLic = nombreLic)}
            id="nombreLic"
            label="Nombre de la Licitación"
            required
            type="text"
            error={nombreLicError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={academictitle => (this.academictitle = academictitle)}
            id="academictitle"
            label="Titulación requerida"
            required
            type="text"
            error={academictitleError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={descripcion => (this.descripcion = descripcion)}
            id="descripcion"
            label="Descripción"
            required
            type="text"
            error={descripcionError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={fechafin => (this.fechafin = fechafin)}
            id="fechafin"
            label="Fecha Fin"
            required
            type="date"
            error={fechafinError}
            errorText="This field is required."
            onChange={this.validate} />
          

          
        
        </FocusContainer>

        <div>
          <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
            <Button secondary raised disabled={this.state.nameError || this.state.nombreLicError || this.state.descripcionError || this.state.academictitleError || this.state.fechafinError } onClick={this.publicIOTA}>
              Enviar Información
            </Button>
          </CardActions>
        </div>
        <Modal active={this.state.active} toggle={toggle}>
          <h1 style={{ fontSize: 20 }} >Hash de la transacción:</h1>
          <p style={{ overflowWrap: 'break-word' }}> {aux}</p>
        </Modal>
      </div>



    );

  }
}
export default EnvioOrga;