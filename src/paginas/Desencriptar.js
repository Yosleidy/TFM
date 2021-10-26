import React, { Component } from 'react';

import {
 
    FocusContainer,
    TextField,
    Button,
    CardActions,
    
 
} from 'react-md';

import CryptoJS from 'crypto-js';

import Modal from '../components/Modal';
var aux = '';
var text='';
class Desencriptar extends Component {
    state = {
      active: false,
        encryptkeyError: true,
        encryptedInformationError: true,
      };
    
      componentDidMount = () => {
        window.addEventListener('paste', this.validate);
      };
    
      componentWillUnmount() {
        window.removeEventListener('paste', this.validate);
      }
      uncrypt = event => {
         text=this.encryptedInformation.value;
        const password= this.encryptkey.value;
      const decifrar=(text,password)=> {
      var bytes=CryptoJS.AES.decrypt(text,password);
    aux=bytes.toString(CryptoJS.enc.Utf8);
      
            }
         
      
      

        this.setState({ active: true });
        
      
      decifrar(text,password);
    }

        validate = () => {
          this.setState({
           
           
            encryptkeyError: !this.encryptkey.value,
            
            encryptedInformationError: !this.encryptedInformation.value,
            
          });
      
          return  !this.encryptedInformation.value || !this.encryptkey.value ;
        };
      render() {
        const { encryptedInformationError, encryptkeyError } = this.state;
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
                ref={encryptedInformation => (this.encryptedInformation = encryptedInformation)}
                id="encryptedInformation"
                label="Información encriptada"
                required
                type="text"
                error={this.encryptedInformation}
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
            onChange={this.validate}
          />

    </FocusContainer>
    <div>
            <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
  <Button secondary raised disabled={encryptkeyError || encryptedInformationError} onClick={this.uncrypt}>
                Desencriptar
              </Button>
            </CardActions>
          </div>
          <Modal active={this.state.active} toggle={toggle}>
          <h1 style={{ fontSize: 20 }} >Información encriptada:</h1>
          <p style={{ overflowWrap: 'break-word' }}> {text}</p>
          <h2 style={{ fontSize: 20 }} >Información desencriptada:</h2>
          <p1 style={{ overflowWrap: 'break-word' }}> {aux}</p1>
        </Modal>
          </div>
        
            );
      
        }
        }
        export default Desencriptar;