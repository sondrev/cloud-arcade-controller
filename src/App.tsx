import React from 'react';


import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controller from './Components/Controller'
import { BrowserRouter } from 'react-router-dom';
import FullScreenWrapper from './Components/FullScreenWrapper';
import {NetworkServiceProvider} from "./context/NetworkServiceContext";

function App() {

    return (
        <React.StrictMode>
            <NetworkServiceProvider>
                <BrowserRouter>
                    <FullScreenWrapper />
                </BrowserRouter>
            </NetworkServiceProvider>
        </React.StrictMode>
  );
}

export default App;
