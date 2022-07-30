import React from 'react';


import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controller from './Components/Controller'
import { ContextState } from './types';
import Networkmanager from './Service/Networkmanager';
import { SocketContext } from './context/network';
import { BrowserRouter } from 'react-router-dom';
import FullScreenWrapper from './Components/FullScreenWrapper';

function App() {

    const socketvalue: ContextState = {
        networkManager: new Networkmanager()
    };

    return (
        <React.StrictMode>
            <SocketContext.Provider value={socketvalue}>
                <BrowserRouter>
                    <FullScreenWrapper />
                </BrowserRouter>
            </SocketContext.Provider>
        </React.StrictMode>
  );
}

export default App;
