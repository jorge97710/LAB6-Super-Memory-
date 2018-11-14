const css = require('./app.scss');
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'Hello World!';
console.log('My Minimal React Webpack Babel Setup');

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('root')
);


