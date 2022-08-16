import React, {useContext, useState } from "react";
import Nipple from "./Nipple";
import {useNetworkService} from "../context/NetworkServiceContext";
import NetworkService from "../Service/NetworkService";
import Joystick from "./ControllerParts/Joystick";
import {ControllerPart} from "../types/types";
import FourButtons from "./ControllerParts/FourButtons";
import {ButtonsControllerComponent, ControllerComponent, ControllerLayout} from "../types/cloud-aracde-api";

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

    const layout = useNetworkService().layout

    const renderSwitch = (component: ControllerComponent) => {
        switch(component.type) {
            case 'joy':
                return <Joystick componentId={component.id}/>;
            case 'buttons':
                return <FourButtons componentId={component.id}/>;
        }
    }

        return <div className="controller">
            <div className="controller-member">
                {renderSwitch(layout.left)}
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
                {renderSwitch(layout.right)}
            </div>
        </div>
}