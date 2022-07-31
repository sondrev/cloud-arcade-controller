import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";

export default function Joystick() {

    const [joySize, setJoySize] = useState(200)


    const networkService = useNetworkService().service;

    const onMove = (evt : JoystickEventTypes, data: JoystickOutputData) => {
        networkService.joyMove(data.angle.radian, data.distance)
        console.log("input-joy",data.angle.radian, data.distance)
    }

    const onMoveEnd = () => {
        networkService.joyMove(0,0)
    }

        const joy = <Nipple
            options={{ mode: 'static', position: { top: '50%', left: '50%' } , size: joySize}}
            style={{
                width: 150,
                height: 150
                // if you pass position: 'relative', you don't need to import the stylesheet
            }}
            onMove={(evt : JoystickEventTypes, data: JoystickOutputData) => onMove(evt,data)}
            onEnd={(evt : JoystickEventTypes, data: JoystickOutputData) => onMoveEnd()}
        />
            //= { mode: 'static', position: { top: '50%', left: '50%' } , size: 200}

        return joy
}