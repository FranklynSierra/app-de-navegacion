import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { transitions, positions, Provider as AlertProvider  } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'



const root = ReactDOM.createRoot(document.getElementById('root'));

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

root.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
    

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
