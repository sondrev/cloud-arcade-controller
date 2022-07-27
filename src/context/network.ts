import React, { FormEventHandler } from 'react';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { ContextState } from '../types';
//import { SOCKET_URL } from "config";
const urlPrefix = "http://localhost:3001"



export const SocketContext = React.createContext({} as ContextState);