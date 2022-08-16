import React, {useContext, useEffect, useState} from 'react';
import {NetworkServiceState} from '../types/types'
import NetworkService from "../Service/NetworkService";
import {io, Socket} from "socket.io-client";
import {ControllerLayout, ControllerToServerEvents, ServerToControllerEvents} from "../types/cloud-aracde-api";
import defaultController from "./DefaultController";

const wsUrl = process.env.REACT_APP_WS_URL || ""

//const defaultState: NetworkServiceState = {service: null, errorMessage:"test"}


const NetworkServiceContext = React.createContext< NetworkServiceState| null>(null);

export const useNetworkService = () => useContext(NetworkServiceContext) as unknown as NetworkServiceState;

console.log("Using WS url "+wsUrl)
const socket: Socket<ServerToControllerEvents, ControllerToServerEvents> = io(wsUrl)

export const NetworkServiceProvider = (props: any) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [errorMessage, setErrorMessage] = useState<string>()
    const [layout, setLayout] = useState<ControllerLayout>(defaultController)

    console.log("Constructor called")

    const networkServiceInstance = new NetworkService(socket, setErrorMessage, setLayout)


    useEffect(() => {
        console.log("useEffect called")
        socket.on('connect', () => {
            console.log(`Connected to WS server at ${wsUrl}`)
            setIsConnected(true);
        });

        socket.on('ping-controller', (callback: () => void) => {
            callback()
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on("connect_error", (err) => {
            setErrorMessage(err.message)
            console.error(`connect_error due to ${JSON.stringify(err)} ${err.message}`);
        });

        socket.on("set-controller-layout", (layout) => {
            setLayout(layout)
            console.info("New layout received")
        });

        // @ts-ignore
        socket.on("connect_timeout", (err) => {
            console.error("connect_timeout - UPDATE TYPES!!", err)
        });

        // @ts-ignore
        socket.on("reconnect", (data) => {
            console.info("reconnect - UPDATE TYPES!!", data)
        });

        // @ts-ignore
        socket.on("reconnecting", (data) => {
            console.info("reconnecting - UPDATE TYPES!!", data)
        });

        // @ts-ignore
        socket.on("reconnect_attempt", (data) => {
            console.info("reconnect_attempt - UPDATE TYPES!!", data)
        });

        // @ts-ignore
        socket.on("reconnect_error", (data) => {
            console.error("reconnect_error - UPDATE TYPES!!", data)
        });

        // @ts-ignore
        socket.on("reconnect_failed", (data) => {
            console.error("reconnect_failed - UPDATE TYPES!!", data)
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('connect_error');
            // @ts-ignore
            socket.off('connect_timeout');
            // @ts-ignore
            socket.off('reconnect');
            // @ts-ignore
            socket.off('reconnecting');
            // @ts-ignore
            socket.off('reconnect_attempt');
            // @ts-ignore
            socket.off('reconnect_error');
            // @ts-ignore
            socket.off('reconnect_failed');
        };
    }, []);


    return <NetworkServiceContext.Provider value={{service:networkServiceInstance, errorMessage, layout}} {...props} />;
}