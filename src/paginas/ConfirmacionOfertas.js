import React, { Component} from 'react';
import {

    FocusContainer,
    TextField,
    Button,
    CardActions,
  
  
  } from 'react-md';
  import Modal from '../components/Modal';
  

var aux = '';

class ConfirmacionOfertas extends Component {

    state = {
        nameError: true,
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
        
        const hash = this.root.value;
        const password = this.encryptkey.value;
        
        const newCustomer ={"hash": hash + ", Clave: " + password}; 
       
        
        
        const root1=this.name.value;

        const text = JSON.stringify(newCustomer);
    
    
    
        const seed =
        'FTYOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
        const Converter = require('@iota/converter');
const Iota = require('@iota/core');
const iota1 = Iota.composeAPI({provider:'https://nodes.devnet.iota.org:443'});


const depth = 3;
const minimumWeightMagnitude = 9;

const messageInTrytes = Converter.asciiToTrytes(text);

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

      const handleShow = () => {

        this.setState({ active: true });
        
      };

    };
     


    validate = () => {
        this.setState({
          nameError: !this.name.value,
          rootError: !this.root.value,
          encryptkeyError: !this.encryptkey.value,
          repetirencryptkeyError: !(this.repetirencryptkey.value === this.encryptkey.value),
        });
    
        return !this.name.value || !this.root.value || !this.encryptkey.value || !this.repetirencryptkey.value;
      };
    render() {
        const { nameError, rootError, encryptkeyError, repetirencryptkeyError } = this.state;
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
              label="root de la convocatoria"
              required
              type="text"
              error={nameError}
              errorText="This field is required."
              onChange={this.validate} />
    <TextField
    ref={encryptkey => (this.encryptkey = encryptkey)}
    id="encryptkey"
    label="Contraseña"
    required
    type="password"
    error={encryptkeyError}
    errorText="This field is required."
    onChange={this.validate} />


  <TextField
    ref={repetirencryptkey => (this.repetirencryptkey = repetirencryptkey)}
    id="repetirencryptkey"
    label="Repetir Contraseña"
    required
    type="password"
    error={repetirencryptkeyError}
    errorText="This field is required. Passwords must be the same."
    onChange={this.validate}

  />
  <TextField
            ref={root => (this.root = root)}
            id="root"
            label="Hash de la oferta"
            required
            type="text"
            error={rootError}
            errorText="This field is required."
            onChange={this.validate}
             />
  </FocusContainer>

<div>
  <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
    <Button secondary raised disabled={this.state.nameError || this.state.encryptkeyError || this.state.repetirencryptkeyError || this.state.rootError} onClick={this.publicIOTA}>
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
export default ConfirmacionOfertas;