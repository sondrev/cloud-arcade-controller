import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";
import '../../four-buttons.css'

export default function SimpleButton({dir, buttonId}: {dir: string, buttonId: number}) {
    const [pressed, setPressed] = useState(false)
    const networkService = useNetworkService().service;

    const onUp = (buttonId: number, event: React.MouseEvent<HTMLDivElement>) => {
        setPressed(false)
        networkService.buttonPress(buttonId, false)
    }
    const onDown = (buttonId: number, event: React.MouseEvent<HTMLDivElement>) => {
        setPressed(true)
        networkService.buttonPress(buttonId, true)
    }

        return <div
            className={`direction-button ${dir} ${pressed? "pressed" : ""}`}
            onMouseDown={e => onDown(1, e)}
            onMouseUp={e => onUp(1, e)}
            onMouseLeave={e => onUp(1, e)}
        />
}