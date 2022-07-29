import React from 'react';
import '../App.css';


import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import MainPage from './MainPage'

function FullScreenWrapper() {
    const handle = useFullScreenHandle();

    return (
      <div>
          <button onClick={handle.enter} id="enter-fullscreen-button">
               Enter Fullscreen!
          </button>

          <FullScreen handle={handle}>
              <div>
                  <MainPage />
              </div>
          </FullScreen>
      </div>
  );
}

export default FullScreenWrapper;
