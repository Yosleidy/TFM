import React, { Component } from 'react';
import { ExpansionList, ExpansionPanel, Switch } from 'react-md';
import MessageContent from './MessageContent';

class ListOrg extends Component {
  state = {
    expanded: false,
    expandedPanels: [],
  };

  onExpandToggle = (toggleOpen, key) => {
    const { expandedPanels } = this.state;
    if (toggleOpen) {
      this.setState({ expandedPanels: [...expandedPanels, key] }, () => this.setSwitchState());
    } else {
      const index = expandedPanels.indexOf(key);
      if (index > -1) {
        expandedPanels.splice(index, 1);
        this.setState({ expandedPanels: [...expandedPanels] }, () => this.setSwitchState());
      }
    }
  };

  setSwitchState = () => {
    const { expandedPanels } = this.state;
    const { messages } = this.props;
    if (expandedPanels.length === messages.length) {
      this.setState({ expanded: true });
    } else if (expandedPanels.length === 0) {
      this.setState({ expanded: false });
    }
  };

  toggleExpandedState = expanded => {
    if (!expanded) {
      this.setState({ expanded, expandedPanels: [] });
    } else {
      this.setState({
        expanded,
        expandedPanels: Array.from(new Array(this.props.messages.length), (x, i) => i),
      });
    }
  };

  render() {
    const { messages } = this.props;
    const { expanded } = this.state;
    return (
      <div className="panel">
        <Switch
          id="expand-all"
          type="switch"
          label="Expand all"
          name="expand-all"
          checked={expanded}
          onChange={this.toggleExpandedState}
        />
        <ExpansionList className="md-cell md-cell--12">
          {messages.map((message, index) => (
            <ExpansionPanel
              key={index}
              label={message.nombre_licitación}
              footer={null}
              expanded={this.state.expandedPanels.includes(index)}
              onExpandToggle={toggleOpen => this.onExpandToggle(toggleOpen, index)}
            >
              
              <p><strong>Nombre:               </strong> {message.nombre}</p>
              <p><strong>Titulación requerida: </strong> {message.titulación}</p>
              <p><strong>Fecha publicada:      </strong> {message.fecha_de_publicación}</p>
              <p><strong>Fecha final:          </strong> {message.fecha_fin}</p>
              <p><strong>Descripción:          </strong> {message.descripción}</p>
            </ExpansionPanel>
          ))}
        </ExpansionList>
      </div>
    );
  }
}

export default ListOrg;
