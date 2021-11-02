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
    lastnameError: true,
    academictitleError: true,
    yearsexperienceError: true,
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
    const apellidos = this.lastname.value;
    const años = this.yearsexperience.value;
    const precio = this.price.value;
    const titulación = this.academictitle.value;
    const dateTime = moment().utc(+2).format('DD/MM/YYYY hh:mm:ss');

    newCustomer['nombre'] = nombre;
    newCustomer['apellidos'] = apellidos;
    newCustomer['años_experiencia'] = años;
    newCustomer['precio'] = precio;
    newCustomer['titulación'] = titulación;
    newCustomer['fecha_de_publicación']=dateTime;
    const root1=this.root.value;
    const password = this.encryptkey.value;
    const text = JSON.stringify(newCustomer);

   
const MODE = 'public'; // public, private or restricted
    const SECURITYLEVEL = 3; // 1, 2 or 3

    const IOTA = require('iota.lib.js');
   
    const Mam = require('@iota/mam');
    const seed =
    'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
    
const iota = new IOTA({ provider: 'https://nodes.devnet.iota.org:443' });


    let mamState = Mam.init(iota, seed, SECURITYLEVEL);
    mamState = Mam.changeMode(mamState, MODE);
    mamState= Mam.subscribe(mamState, root1, MODE);
      //mamState=Mam.listen(mamState, 'nuevo mensaje');
    async function publish(packet) {

   const trytes = iota.utils.toTrytes(JSON.stringify(packet));
    const message = Mam.create(mamState, trytes);


    mamState = message.state;

   
  
    await Mam.attach(message.payload,root1, 3, 9);
    aux = message.root;
      
      handleShow();

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
      lastnameError: !this.lastname.value,
      academictitleError: !this.academictitle.value,
      yearsexperienceError: !this.yearsexperience.value,
      priceError: !this.price.value,
      rootError: !this.root.value,
      encryptkeyError: !this.encryptkey.value,
      repetirencryptkeyError: !(this.repetirencryptkey.value === this.encryptkey.value),
    });

    return !this.name.value || !this.root.value || !this.lastname.value || !this.academictitle.value || !this.yearsexperience.value || !this.price.value || !this.encryptkey.value || !this.repetirencryptkey.value;
  };


  render() {
    const { nameError, lastnameError, rootError, academictitleError, yearsexperienceError, priceError, encryptkeyError, repetirencryptkeyError } = this.state;
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
            label="Nombre"
            required
            type="text"
            error={nameError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={lastname => (this.lastname = lastname)}
            id="lastname"
            label="Apellidos"
            required
            type="text"
            error={lastnameError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={academictitle => (this.academictitle = academictitle)}
            id="academictitle"
            label="Titulación"
            required
            type="text"
            error={academictitleError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={yearsexperience => (this.yearsexperience = yearsexperience)}
            id="yearsexperience"
            label="Años de experiencia"
            required
            type="number"
            error={yearsexperienceError}
            errorText="This field is required."
            onChange={this.validate} />
          <TextField
            ref={price => (this.price = price)}
            id="price"
            label="Precio"
            required
            type="number"
            error={priceError}
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
            label="Root de la convocatoria"
            required
            type="text"
            error={rootError}
            errorText="This field is required."
            onChange={this.validate}
             />
          

        </FocusContainer>

        <div>
          <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
            <Button secondary raised disabled={this.state.nameError || this.state.lastnameError || this.state.academictitleError || this.state.yearsexperienceError || this.state.priceError || this.state.encryptkeyError || this.state.repetirencryptkeyError || this.state.rootError} onClick={this.publicIOTA}>
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