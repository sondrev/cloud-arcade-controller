import React, {useContext, useState } from "react";
import Nipple from "./Nipple";
import {useNetworkService} from "../context/NetworkServiceContext";
import NetworkService from "../Service/NetworkService";
import Joystick from "./ControllerParts/Joystick";
import {ControllerPart} from "../types/types";
import FourButtons from "./ControllerParts/FourButtons";

const defaultOptions = { mode: 'static', position: { top: '50%', left: '50%' } , size: 200}
const bigOpts = { mode: 'static', position: { top: '50%', left: '50%' } , size: 500}



interface IProps {
    name: string
    color: string
    exitController: () => void
}

interface IState {
    joyOpts: any;
    joySize: number;
}

export default function Controller({name, color, exitController}: IProps) {

    const networkService = useNetworkService().service;

    const onMove = (evt : JoystickEventTypes, data: JoystickOutputData) => {
        networkService.joyMove(data.angle.radian, data.distance)
        console.log("input-joy",data.angle.radian, data.distance)
    }

    const onMoveEnd = () => {
        networkService.joyMove(0,0)
    }

    const renderSwitch = (type: ControllerPart) => {
        switch(type) {
            case 'joystcik':
                return <Joystick />;
            case 'buttons':
                return <FourButtons />;
        }
    }

        return <div className="controller">
            <div className="controller-member">
                {renderSwitch("joystcik")}
            </div>
            <div className="controller-member info-panel">
                <p style={{backgroundColor: color}}>
                    {name}
                </p>
                <button onClick={exitController}>
                    Go back
                </button>
            </div>

            <div className="controller-member">
                {renderSwitch("buttons")}
            </div>
        </div>
}