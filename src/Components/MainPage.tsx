import React, { FormEventHandler, useContext, useState } from 'react';
import '../App.css';
import '../login.css';


import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import Controller from './Controller'
import { SocketContext } from '../context/network';
import { ContextState } from '../types';


export default function MainPage() {
    const nameInputRef: React.RefObject<HTMLInputElement> = React.createRef();
    const gameIdInputRef: React.RefObject<HTMLInputElement> = React.createRef();

    const [screen, setScreen] = useState<"login" | "game">("login")


    const context = useContext(SocketContext);

    const onStart = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const gameId = gameIdInputRef.current?.value || ""
        const name = nameInputRef.current?.value || ""
        console.log(name)
        console.log(gameIdInputRef.current?.value)
        context.networkManager.joinGame(gameId, name).then(() => {
            setScreen("game")
        }).catch(error => alert(error.message));
    }

        // //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"


        if (screen === "game") {
            return <div>
                <Controller />
            </div>
        } else {
            return <div>
                <div className="login">
                    <div className="form">
                        <h1>Login</h1>
                        <form className="login-form" onSubmit={onStart}>
                            <input type="name" ref={nameInputRef} placeholder="name" required/>
                            <input type="gameId"  ref={gameIdInputRef} placeholder="game id" required/>
                            <button type='submit'>Start</button>
                        </form>
                    </div>
                </div>
            </div>
        }

}

