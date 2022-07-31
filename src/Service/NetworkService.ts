import axios from 'axios';
import React, { FormEventHandler, useContext, useState } from 'react';
import {io, Socket} from "socket.io-client";
import {ButtonBody, JoinGameBody, JoyMoveBody } from '../types/socket-requests';
import {CreateGameResponse, JoinGameResponse, SocketResponse } from '../types/socket-responses';


export default class NetworkService {
    socket : Socket
    setErrorMessage: (message: string) => void;

    connectedGame? : {
        gameId: string,
        playerName: string,
        playerColor: string,
        secretKey: string
    } = undefined

    constructor(socket : Socket, setErrorMessage: (message: string) => void) {
        this.socket = socket
        this.setErrorMessage = setErrorMessage
    }



    joinGame(gameId: string, name: string): Promise<JoinGameResponse> {
        return new Promise((resolve, reject) => {
            if (gameId === "lol") resolve({gameId:gameId, playerColor: "#FFFF00", playerName: name, secretKey: ""})
            if (!this.socket) {
                reject('No socket connection.');
            } else {
                const body: JoinGameBody = {
                    gameId,name
                }
                this.socket.emit("join", body, (response: SocketResponse<JoinGameResponse>) => {
                    if (!response.response) {
                        const error = response.error?.message || JSON.stringify(response)
                        console.error("Error from server", error)
                        this.setErrorMessage(error)
                        reject(error);
                    } else {
                        this.connectedGame = response.response
                        resolve(response.response);
                    }
                });
            }
        });
    }

    joyMove(angle: number, dist: number) {
        const body: JoyMoveBody = {
            dist,
            angle
        }
        this.socket.emit("joy", body)
    }

    buttonPress(buttonId: number, pressed: boolean) {
        const body: ButtonBody = {
            buttonId,
            pressed
        }
        this.socket.emit("button", body)
    }


}