import React, { Component } from 'react';
import { event } from 'react-ga';
import {
  Autocomplete,
  FocusContainer,
  TextField,
  SelectField,
  Button,
  CardActions,
  FontIcon,
} from 'react-md';
import knownNodes from '../knownNodes.json';
import {encriptar} from '../encriptar.js';


const MODE = ['public', 'restricted', 'private'];

class Form extends Component {
  state = {
    nameError: false,
    lastnameError:false,
    academictitleError: false,
    yearsexperienceError: false,
    priceError: false,
    providerError: false,
    rootError: false,
    encryptkeyError: false,
    showSideKeyInpit: false,
    filteredData: [],
    provider: [...knownNodes],
    providerValue: knownNodes[0],
  };

  componentDidMount = () => {
    window.addEventListener('paste', this.validate);
  };

  componentWillUnmount() {
    window.removeEventListener('paste', this.validate);
  }

  changeMode = mode => {
    this.setState({ showSideKeyInpit: mode === 'restricted' });
  };

  /**
   * This custom filter will take the current value and return all matches that start
   * with the value ignoring case and then bold the letters in the search results that
   * match.
   */
  filter = value => {
    const regex = new RegExp(value, 'i');
    const length = value.length;
    const filteredData = this.state.provider.reduce((matches, state) => {
      if (regex.test(state)) {
        matches.push({
          label: [
            <span key="bold" className="md-font-bold">
              {state.substring(0, length)}
            </span>,
            state.substring(length),
          ],
          value: state,
        });
      }

      return matches;
    }, []);

    this.setState({ filteredData });
  };

  handleAutocomplete = value => {
    this.setState({ providerValue: value, providerError: false });
    this.filter(value);
  };

  handleChange = value => {
    this.setState({ providerValue: value, providerError: false });
    this.filter(value);
  };

  submit = event => {
    event.preventDefault();
    const formError = this.validate();
    if (!formError) {
      this.props.onSubmit({
        provider: this.provider.value,
        root: this.root.value,
        mode: this.mode.value || 'public',
        key: this.sideKey ? this.sideKey.value : null,
      });
    }
  };

  publicIOTA = event => {
    event.preventDefault();
    const newCustomer = {};
    const nombre = this.name.value;
    const apellidos= this.lastname.value;
    const años= this.yearsexperience.value;
    const precio=this.price.value;
    const titulación= this.academictitle.value;

newCustomer['nombre'] = nombre;
   newCustomer['apellidos'] = apellidos;
    newCustomer['años_experiencia'] = años;
    newCustomer['precio'] = precio;
    newCustomer['titulación'] = titulación;
    const texto = JSON.stringify(newCustomer);
    const password = this.encryptkey.value;

    
    var valor=encriptar(texto,password);
    alert(valor);
  };

  validate = () => {
    this.setState({
      nameError: !this.name.value,
      lastnameError: !this.lastname.value,
      academictitleError: !this.academictitle.value,
      yearsexperienceError: !this.yearsexperience.value,
      priceError: !this.price.value,
      encryptkeyError: !this.encryptkey.value,
      providerError: !this.provider.value,
      rootError: !this.root.value,
    });

    return !this.provider.value || !this.root.value;
  };
  
  render() {
    const { filteredData, nameError, lastnameError, academictitleError, yearsexperienceError, priceError, encryptkeyError, providerError, rootError, showSideKeyInpit, providerValue } = this.state;
    const { showLoader } = this.props;

    const selectFieldProps = {
      dropdownIcon: <FontIcon>expand_more</FontIcon>,
      position: SelectField.Positions.BELOW,
      className: 'md-cell',
      errorText: 'This field is required.',
    };

    

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
            label="Name"
            required
            type="text"
            error={nameError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <TextField
            ref={lastname => (this.lastname = lastname)}
            id="lastname"
            label="Lastname"
            required
            type="text"
            error={lastnameError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <TextField
            ref={academictitle => (this.academictitle = academictitle)}
            id="academictitle"
            label="Academic title"
            required
            type="text"
            error={academictitleError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <TextField
            ref={yearsexperience => (this.yearsexperience = yearsexperience)}
            id="yearsexperience"
            label="Years of experience"
            required
            type="number"
            error={yearsexperienceError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <TextField
            ref={price => (this.price = price)}
            id="price"
            label="Precio"
            required
            type="number"
            error={priceError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <TextField
            ref={encryptkey => (this.encryptkey = encryptkey)}
            id="encryptkey"
            label="Encryption Key for public"
            required
            type="text"
            error={encryptkeyError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <TextField
            ref={root => (this.root = root)}
            id="root"
            label="Root"
            required
            type="text"
            error={rootError}
            errorText="This field is required."
            onChange={this.validate}
          />
          <Autocomplete
            ref={provider => (this.provider = provider)}
            id="provider"
            className="toolbar-search"
            type="search"
            data={filteredData}
            label="Provider"
            placeholder="Provider"
            filter={null}
            value={providerValue}
            onChange={this.handleChange}
            onAutocomplete={this.handleAutocomplete}
            dataLabel="label"
            dataValue="value"
            listClassName="toolbar-search__list"
          />
          <SelectField
            ref={mode => (this.mode = mode)}
            id="mode"
            label="Mode"
            menuItems={MODE}
            onChange={this.changeMode}
            {...selectFieldProps}
          />
          {showSideKeyInpit ? (
            <TextField
              ref={sideKey => (this.sideKey = sideKey)}
              id="sideKey"
              label="Encryption Key"
              type="text"
            />
          ) : null}
        </FocusContainer>
       
        <div>
          <CardActions className={`cta md-cell md-cell--12 ${showLoader ? 'hidden' : ''}`}>
          <Button secondary raised disabled={nameError || lastnameError || academictitleError || yearsexperienceError || priceError || encryptkeyError} onClick={this.publicIOTA}>
              Public
            </Button>
            <Button secondary raised disabled={providerError || rootError} onClick={this.submit}>
              Fetch(información cifrada)
            </Button>
            <Button secondary raised onClick={this.uncrypt}>
              Uncrypt
            </Button>
          </CardActions>
        </div>

      </div>
      
      
    );
  }
} 
    
export default Form;
