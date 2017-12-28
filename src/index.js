import React from 'react';
import ReactDOM from 'react-dom';
import Widget from './widget';

$(function () {
  //init some widget
  $.widget("TestWidget.mywidget", {
    options: {
      value: null
    },
    _create: function () {
      console.log('test widget created!')
    },
    getValue() {
      return this.options.value;
    }
  });
  //add react widget
  const container = $('#widget');
  const reference = ReactDOM.render(<Widget />, container[0]);
  //add possibility to invoke methods from component this way:
  // $('#widget').mywidget('getValue')
  // $('#widget').mywidget('setValue', 'some value')
  container.data('TestWidget-mywidget', reference);
});