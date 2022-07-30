import axios from 'axios';
import React, { FormEventHandler, useContext, useState } from 'react';
import {io, Socket} from "socket.io-client";
import {ButtonBody, JoinGameBody, JoyMoveBody } from '../types/socket-requests';
import {CreateGameResponse, JoinGameResponse, SocketResponse } from '../types/socket-responses';

const wsUrl = process.env.REACT_APP_WS_URL || ""

export default class NetworkService {
    socket : Socket

    connectedGame? : {
        gameId: string,
        playerName: string,
        playerColor: string,
        secretKey: string
    } = undefined

    constructor() {
        this.socket = io(wsUrl)

        console.log("Using WS url "+wsUrl)
        this.socket.on("connect", () => {
            console.log(`Connected to WS server at ${wsUrl}`)
        })

        this.socket.on("connect_error", (err) => {
            console.error(`connect_error due to ${err.message}`);
        });
    }



    joinGame(gameId: string, name: string): Promise<void> {
        console.log("Joining game")
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject('No socket connection.');
            } else {
                const body: JoinGameBody = {
                    gameId,name
                }
                this.socket.emit("join", body, (response: SocketResponse<JoinGameResponse>) => {
                    if (!response.response) {
                        console.error(response);
                        reject(response);
                    } else {
                        this.connectedGame = response.response
                        resolve();
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