import React, { FormEventHandler, useContext, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import '../login.css';


import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import Controller from './Controller'
import { SocketContext } from '../context/network';
import { ContextState } from '../types';

const randomNameConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: ' ',
    style: 'capital',
    length: 3,
};


export default function MainPage() {
    const nameInputRef: React.RefObject<HTMLInputElement> = React.createRef();
    const gameIdInputRef: React.RefObject<HTMLInputElement> = React.createRef();

    const [searchParams, setSearchParams] = useSearchParams();
    const [errorMsg, setErrorMsg] = useSearchParams();

    const urlName = searchParams.get("name") || undefined
    const urlGameId = searchParams.get("game-id") || undefined
    const [screen, setScreen] = useState<"login" | "game">("login")

    const context = useContext(SocketContext);

    const randomName = uniqueNamesGenerator(randomNameConfig);
    const suggestedName = urlName || randomName || undefined

    const onStart = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const gameId = gameIdInputRef.current?.value || ""
        const name = nameInputRef.current?.value || ""
        console.log(name)
        console.log(gameIdInputRef.current?.value)
        context.networkManager.joinGame(gameId, name).then((data) => {
            setScreen("game")
        }).catch(error => alert(error));
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
                            <input type="name" ref={nameInputRef} placeholder="name" defaultValue={suggestedName} required/>
                            <input type="gameId" ref={gameIdInputRef} placeholder="game id" defaultValue={urlGameId} required/>
                            <button type='submit'>Start</button>
                            <p>{errorMsg}</p>
                        </form>
                    </div>
                </div>
            </div>
        }

}

