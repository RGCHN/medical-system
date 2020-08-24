import React from 'react';
import ReactDOM from 'react-dom';
import BasicRouter from "./router";
import 'ant-design-pro/dist/ant-design-pro.css';

const rootElement = document.getElementById('root');
ReactDOM.render (
  <BasicRouter />,
  rootElement
);

