import React, {useContext, useState } from "react";
import { SocketContext } from "../context/network";
import Nipple from "./Nipple";

const defaultOptions = { mode: 'static', position: { top: '50%', left: '50%' } , size: 200}
const bigOpts = { mode: 'static', position: { top: '50%', left: '50%' } , size: 500}



interface IProps {
}

interface IState {
    joyOpts: any;
    joySize: number;
}

export default function Controller() {

    const [joySize, setJoySize] = useState(200)

    const context = useContext(SocketContext);

    const onMove = (evt : JoystickEventTypes, data: JoystickOutputData) => {
        context.networkManager.joyMove(data.angle.radian, data.distance)
        console.log("input-joy",data.angle.radian, data.distance)
    }

    const onMoveEnd = () => {
        context.networkManager.joyMove(0,0)
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

        return <div className="controller">
            <div className="controller-member">
                {joy}
            </div>

            <div className="controller-member button-container ">
                <div className="controller-button button1"></div>
            </div>
            <div className="controller-member button-container">
                <div className="controller-button button2"></div>
            </div>
        </div>
}