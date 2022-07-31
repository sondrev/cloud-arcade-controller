import React, {FormEventHandler, useContext, useEffect, useState} from 'react';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { NetworkServiceState } from '../types/types'
import NetworkService from "../Service/NetworkService";
import {io} from "socket.io-client";

const wsUrl = process.env.REACT_APP_WS_URL || ""

//const defaultState: NetworkServiceState = {service: null, errorMessage:"test"}


const NetworkServiceContext = React.createContext< NetworkServiceState| null>(null);

export const useNetworkService = () => useContext(NetworkServiceContext) as unknown as NetworkServiceState;

console.log("Using WS url "+wsUrl)
const socket = io(wsUrl)

export const NetworkServiceProvider = (props: any) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [errorMessage, setErrorMessage] = useState<string>()

    console.log("Constructor called")

    const networkServiceInstance = new NetworkService(socket, setErrorMessage)


    useEffect(() => {
        console.log("useEffect called")
        socket.on('connect', () => {
            console.log(`Connected to WS server at ${wsUrl}`)
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on("connect_error", (err) => {
            setErrorMessage(err.message)
            console.error(`connect_error due to ${JSON.stringify(err)} ${err.message}`);
        });

        socket.on("connect_timeout", (err) => {
            console.error("connect_timeout", err)
        });

        socket.on("reconnect", (data) => {
            console.info("reconnect", data)
        });

        socket.on("reconnecting", (data) => {
            console.info("reconnecting", data)
        });

        socket.on("reconnect_attempt", (data) => {
            console.info("reconnect_attempt", data)
        });

        socket.on("reconnect_error", (data) => {
            console.error("reconnect_error", data)
        });

        socket.on("reconnect_failed", (data) => {
            console.error("reconnect_failed", data)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            socket.off('connect_timeout');
            socket.off('reconnect');
            socket.off('reconnecting');
            socket.off('reconnect_attempt');
            socket.off('reconnect_error');
            socket.off('reconnect_failed');
        };
    }, []);


    return <NetworkServiceContext.Provider value={{service:networkServiceInstance, errorMessage}} {...props} />;
}