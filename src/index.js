import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import http from './utils/request'
import 'ant-design-pro/dist/ant-design-pro.css';

const rootElement = document.getElementById('root');
React.Component.prototype.http = http;
ReactDOM.render (
  <App />,
  rootElement
);

