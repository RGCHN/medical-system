import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { http, modelHttp } from './utils/request'
import 'ant-design-pro/dist/ant-design-pro.css';

const rootElement = document.getElementById('root');
React.Component.prototype.http = http;
React.Component.prototype.modelHttp = modelHttp;
ReactDOM.render (
  <App />,
  rootElement
);

