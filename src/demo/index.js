/*eslint-disable*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './rem'
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept()
}