import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";
import '../../four-buttons.css'

export default function FourButtons() {
    const networkService = useNetworkService().service;

    const onUp = (buttonId: number, event: React.MouseEvent<HTMLDivElement>) => {
        networkService.buttonPress(buttonId, false)
    }
    const onDown = (buttonId: number, event: React.MouseEvent<HTMLDivElement>) => {
        networkService.buttonPress(buttonId, true)
    }

        return <div className="directional-buttons">
            <div className="direction-button up" onMouseDown={e => onDown(1, e)} onMouseUp={e => onUp(1, e)}/>
            <div className="direction-button left" onMouseDown={e => onDown(2, e)} onMouseUp={e => onUp(2, e)}/>
            <div className="direction-button right" onMouseDown={e => onDown(3, e)} onMouseUp={e => onUp(3, e)}/>
            <div className="direction-button down" onMouseDown={e => onDown(4, e)} onMouseUp={e => onUp(4, e)}/>
        </div>
}