import React, { Component} from 'react';

import {

  FocusContainer,
  TextField,
  Button,
  CardActions,


} from 'react-md';

import Modal from '../components/Modal';

import CryptoJS from 'crypto-js';

const moment = require('moment');

var aux = '';
class Enviar extends Component {



  state = {
    nameError: true,
    
    academictitleError: true,
    
    priceError: true,
    encryptkeyError: true,
    repetirencryptkeyError: true,
    rootError: true,
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
    
    
    const precio = this.price.value;
    const titulación = this.academictitle.value;
    const dateTime = moment().utc(+2).format('DD/MM/YYYY hh:mm:ss');

    newCustomer['nombre'] = nombre;
    
    
    newCustomer['precio'] = precio;
    newCustomer['documentación'] = titulación;
    newCustomer['fecha_de_publicación']=dateTime;
    const root1=this.root.value;
    const password = this.encryptkey.value;
    const text = JSON.stringify(newCustomer);

   

    const seed =
    'REYOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    
    
    


const Converter = require('@iota/converter');
const Iota = require('@iota/core');
const iota1 = Iota.composeAPI({provider:'https://nodes.devnet.iota.org:443'});


const depth = 3;
const minimumWeightMagnitude = 9;

 async function publish(packet) {
  const message = JSON.stringify(packet);
  const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [
  {
      value: 0,
      address: root1,
      message: messageInTrytes
  }
  ];
  
  iota1.prepareTransfers(seed, transfers)
      .then(trytes => {
          return iota1.sendTrytes(trytes, depth, minimumWeightMagnitude);
      })
      .then(bundle => {
          aux=bundle[0].hash;
          handleShow();
      })
      .catch(err => {
          console.error(err)
      });

     
    }    

    const handleShow = () => {

      this.setState({ active: true });
      
    };


   async function enviardatos(encrypted) {
      publish(encrypted);

    }

    const cifrar = (text, password) => {
      var encrypted = CryptoJS.AES.encrypt(text, password).toString();
      enviardatos(encrypted);

    };
    cifrar(text, password);


  };

  validate = () => {
    this.setState({
      nameError: !this.name.value,
      
      academictitleError: !this.academictitle.value,
      
      priceError: !this.price.value,
      rootError: !this.root.value,
      encryptkeyError: !this.encryptkey.value,
      repetirencryptkeyError: !(this.repetirencryptkey.value === this.encryptkey.value),
    });

    return !this.name.value || !this.root.value  || !this.academictitle.value || !this.price.value || !this.encryptkey.value || !this.repetirencryptkey.value;
  };


  render() {
    const { nameError, rootError, academictitleError, priceError, encryptkeyError, repetirencryptkeyError } = this.state;
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
          <TextField style={{width: '85%', marginLeft: '5%' }}
            ref={name => (this.name = name)}
            id="name"
            label="Nombre y apellidos del solicitante o entidad licitadora"
            required
            type="text"
            error={nameError}
            errorText="This field is required."
            onChange={this.validate} />
        
          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={academictitle => (this.academictitle = academictitle)}
            id="academictitle"
            label="Documentación"
            required
            type="text"
            error={academictitleError}
            errorText="This field is required."
            onChange={this.validate} />
         
          <TextField style={{width: '17.5%', marginLeft: '5%' }}
            ref={price => (this.price = price)}
            id="price"
            label="Importe"
            required
            type="number"
            error={priceError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={encryptkey => (this.encryptkey = encryptkey)}
            id="encryptkey"
            label="Contraseña para cifrar la información"
            required
            type="password"
            error={encryptkeyError}
            errorText="This field is required."
            onChange={this.validate} />


          <TextField style={{width: '40%', marginLeft: '5%' }}
            ref={repetirencryptkey => (this.repetirencryptkey = repetirencryptkey)}
            id="repetirencryptkey"
            label="Repetir Contraseña"
            required
            type="password"
            error={repetirencryptkeyError}
            errorText="This field is required. Passwords must be the same."
            onChange={this.validate}

          />
          <TextField style={{width: '85%', marginLeft: '5%' }}
            ref={root => (this.root = root)}
            id="root"
            label="Identificador de la convocatoria"
            required
            type="text"
            error={rootError}
            errorText="This field is required."
            onChange={this.validate}
             />
          

        </FocusContainer>

        <div>
          <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
            <Button secondary raised disabled={this.state.nameError || this.state.academictitleError || this.state.yearsexperienceError || this.state.priceError || this.state.encryptkeyError || this.state.repetirencryptkeyError || this.state.rootError} onClick={this.publicIOTA}>
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
export default Enviar;