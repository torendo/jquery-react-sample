import React from 'react';
import PropTypes from 'prop-types';

export default class Widget extends React.Component {
  constructor() {
    super();
    this.valueChangedHandler = this.valueChangedHandler.bind(this);
    this.state = {};
  }
  render() {
    return (
      <label>
        <p>Text field:</p>
        <input value={this.state.value} onChange={this.valueChangedHandler} type="text"/>
      </label>
    );
  }
  valueChangedHandler(event) {
    this.setState({value: event.target.value}); //, () => this.valueChanged(this.props.id, this.state.value)
  }
  getValue() {
    return this.state.value;
  }
  setValue(value) {
    this.setState({value: value});
  }
}