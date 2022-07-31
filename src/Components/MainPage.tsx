import React, {FormEventHandler, useContext, useEffect, useState} from 'react';
import { useSearchParams } from "react-router-dom";
import '../login.css';
import {useNetworkService} from "../context/NetworkServiceContext";


import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';
import DeviceOrientation, { Orientation } from 'react-screen-orientation'
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import Controller from './Controller'
import NetworkService from "../Service/NetworkService";
import {NetworkServiceState} from "../types/types";

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
    const [name, setName] = useState<string>("null");
    const [color, setColor] = useState<string>("null");

    const urlName = searchParams.get("name") || undefined
    const urlGameId = searchParams.get("game-id") || undefined
    const [screen, setScreen] = useState<"login" | "game">("login")

    const ser = useNetworkService()
    const {service, errorMessage} = ser

    const randomName = uniqueNamesGenerator(randomNameConfig);
    const suggestedName = urlName || randomName || undefined


    const goToLogin = () => {
        setScreen("login")
    }

    const onStart = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const gameId = gameIdInputRef.current?.value || ""
        const name = nameInputRef.current?.value || ""
        service.joinGame(gameId, name).then((data) => {
            setName(data.playerName)
            setColor(data.playerColor)
            setScreen("game")
        }).catch(error => {console.log(error)});
    }

        // //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

        if (screen === "game") {
            return <div>
                <Controller name={name} color={color} exitController={goToLogin}/>
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
                            <p>{errorMessage}</p>
                        </form>
                    </div>
                </div>
            </div>
        }

}

