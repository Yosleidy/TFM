import React, { Component } from 'react';
import ReactGA from 'react-ga';
import queryString from 'query-string';

import { fetch } from '../utils/MAM';
import List from './List';
import Loader from './Loader';

import Form from './Form';



class Recuperar extends Component {
  state = {
    messages: [],
    showLoader: false,
    
  };

  componentDidMount = () => {
    if (window.location.search) {
      this.onSubmit(queryString.parse(window.location.search));
      
    }
  };

  appendToMessages = message => this.setState({ messages: [...this.state.messages, message] });

  fetchComplete = () => this.setState({ showLoader: false });

 

  onSubmit = async ({ provider, root, mode, key }) => {
    if (this.state.showLoader) return;
   
    this.setState({ showLoader: true, messages: [] });
    ReactGA.event({
      category: 'Fetch',
      action: 'MAM Fetch',
      label: `Provider ${provider}, mode: ${mode}`
    });
    fetch(provider, root, mode, key, this.appendToMessages, this.fetchComplete);
  };



  render() {
    const { messages, showLoader} = this.state;
    return (
      <div className="app">
        
        <div className="content">
          <Form onSubmit={this.onSubmit} showLoader={showLoader} />
          <div className={`loaderWrapper ${showLoader ? '' : 'hidden'}`}>
            <Loader showLoader={showLoader} />
          </div>
          {messages.length > 0 ? <List messages={messages} /> : null}
        </div>
      
        
      
      </div>
    );
  }
}

export default Recuperar;
