import React, { Component } from 'react';
import ReactDOM from 'react-dom';


const portalroot=document.getElementById('portal');


class Portal extends Component {

constructor(){
super();
this.el=document.createElement('div');

}

componentDidMount = () => {
    portalroot.appendChild(this.el);
  };

  componentWillUnmount() {
    portalroot.removeChild(this.el);
  }
    render(){
const {children}= this.props;

        return ReactDOM.createPortal(children,this.el);
    }
   

}

export default Portal;