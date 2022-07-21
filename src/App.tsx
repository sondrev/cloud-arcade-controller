import React from 'react';
import logo from './logo.svg';
import './App.css';

import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controller from './Components/Controller'

function App() {
  const handle = useFullScreenHandle();

  window.screen.orientation.onchange = function(e) {
      console.log(`Orientation change. Orentiation ${window.screen.orientation.angle}`)
  }

  return (
      <div>
        <button onClick={handle.enter} id="enter-fullscreen-button">
          Enter fullscreen
        </button>

        <FullScreen handle={handle}>
            <Controller />

        </FullScreen>
      </div>
  );
}

export default App;
