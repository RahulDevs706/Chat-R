import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MessageContext from './context/MessageContext';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MessageContext>
        <App />
    </MessageContext>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
