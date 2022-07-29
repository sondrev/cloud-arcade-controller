import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FullScreenWrapper from './Components/FullScreenWrapper';
import reportWebVitals from './reportWebVitals';
import { ContextState } from './types';
import { SocketContext } from './context/network';
import Networkmanager from './Service/Networkmanager'
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const socketvalue: ContextState = {
    networkManager: new Networkmanager()
};
root.render(
  <React.StrictMode>
      <SocketContext.Provider value={socketvalue}>
          <BrowserRouter>
              <FullScreenWrapper />
          </BrowserRouter>
      </SocketContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
