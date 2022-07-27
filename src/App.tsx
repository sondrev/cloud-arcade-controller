import React from 'react';
import './App.css';


import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controller from './Components/Controller'

function App() {
  const handle = useFullScreenHandle();

  if (window?.screen?.orientation) window.screen.orientation.onchange = function(e) {
      //console.log(`Orientation change. Orentiation ${window.screen.orientation.angle}`)
  }

    const onLockOrientation = (val:any) => {
        console.log("onlockor",val)
    }

    return (
      <div>
          <button onClick={handle.enter} id="enter-fullscreen-button">
               Enter Fullscreen!
          </button>

          <FullScreen handle={handle}>
              <Controller />
          </FullScreen>
      </div>
  );
}

export default App;
