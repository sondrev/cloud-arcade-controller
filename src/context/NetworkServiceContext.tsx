import React, {FormEventHandler, useContext, useEffect, useState} from 'react';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { NetworkServiceState } from '../types';
import NetworkService from "../Service/NetworkService";


//const defaultState: NetworkServiceState = {service: null, errorMessage:"test"}

const networkServiceInstance = new NetworkService()

const NetworkServiceContext = React.createContext<NetworkService>(networkServiceInstance);

export const useNetworkService = () => useContext(NetworkServiceContext);


export const NetworkServiceProvider = (props: any) => {

    useEffect(() => {
    }, []);

    return <NetworkServiceContext.Provider value={networkServiceInstance} {...props} />;
}