import React from 'react';
import './App.css';


import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Controller from './Components/Controller'

function App() {
  const handle = useFullScreenHandle();

  if (window?.screen?.orientation) window.screen.orientation.onchange = function(e) {
      console.log(`Orientation change. Orentiation ${window.screen.orientation.angle}`)
  }

  return (
      <div>
          <DeviceOrientation lockOrientation={'landscape'}>
              {/* Will only be in DOM in landscape */}
              <Orientation orientation='landscape' alwaysRender={false}>
                  <div>
                      <button onClick={handle.enter} id="enter-fullscreen-button">
                           Fullscreen!
                      </button>

                      <FullScreen handle={handle}>
                          <Controller />

                      </FullScreen>
                  </div>
              </Orientation>
              {/* Will stay in DOM, but is only visible in portrait */}
              <Orientation orientation='portrait'>
                  <div>
                      <p>Please rotate your phone</p>
                  </div>
              </Orientation>
          </DeviceOrientation>
      </div>
  );
}

export default App;
