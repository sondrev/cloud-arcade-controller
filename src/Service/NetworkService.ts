import {io, Socket} from "socket.io-client";
import {
    ButtonBody,
    JoinGameBody,
    JoyMoveBody,
    JoinGameResponse,
    SocketResponse,
    ControllerLayout,
    ServerToControllerEvents, ControllerToServerEvents
} from '../types/cloud-aracde-api';
import defaultController from "../context/DefaultController";

export default class NetworkService {
    socket : Socket<ServerToControllerEvents, ControllerToServerEvents>
    setErrorMessage: (message: string) => void;
    setLayout: (layout: ControllerLayout) => void

    connectedGame? : {
        gameId: string,
        playerName: string,
        playerColor: string,
        secretKey: string
    } = undefined

    constructor(socket : Socket, setErrorMessage: (message: string) => void, setLayout: (layout: ControllerLayout) => void) {
        this.socket = socket
        this.setErrorMessage = setErrorMessage
        this.setLayout = setLayout
    }



    joinGame(gameId: string, name: string): Promise<JoinGameResponse> {
        return new Promise((resolve, reject) => {
            if (gameId === "lol") resolve({gameId:gameId, playerColor: "#FFFF00", playerName: name, secretKey: "", layout: defaultController})
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
                        this.setLayout(response.response.layout)
                        resolve(response.response);
                    }
                });
            }
        });
    }

    joyMove(componentId: number, angle: number, dist: number) {
        const body: JoyMoveBody = {
            componentId,
            dist,
            angle
        }
        this.socket.emit("joy", body)
    }

    buttonPress(componentId: number, buttonId: number, pressed: boolean) {
        const body: ButtonBody = {
            componentId,
            buttonId,
            pressed
        }
        this.socket.emit("button", body)
    }


}