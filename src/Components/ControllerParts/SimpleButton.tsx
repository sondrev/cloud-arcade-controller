import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";
import '../../four-buttons.css'

export default function SimpleButton({dir, componentId, buttonId}: {dir: string, componentId:number, buttonId: number}) {
    const [pressed, setPressed] = useState(false)
    const networkService = useNetworkService().service;

    const onUp = (buttonId: number, event: React.MouseEvent<HTMLDivElement>) => {
        setPressed(false)
        networkService.buttonPress(componentId, buttonId, false)
    }
    const onDown = (buttonId: number, event: React.MouseEvent<HTMLDivElement>) => {
        setPressed(true)
        networkService.buttonPress(componentId, buttonId, true)
    }

        return <div
            className={`direction-button ${dir} ${pressed? "pressed" : ""}`}
            onMouseDown={e => onDown(1, e)}
            onMouseUp={e => onUp(1, e)}
            onMouseLeave={e => onUp(1, e)}
        />
}