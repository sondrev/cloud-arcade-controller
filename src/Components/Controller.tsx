import React from "react";
import ReactNipple from "react-nipple";
import 'react-nipple/lib/styles.css';

const defaultOptions = { mode: 'static', position: { top: '50%', left: '50%' } , size: 200}
const bigOpts = { mode: 'static', position: { top: '50%', left: '50%' } , size: 500}



interface IProps {
}

interface IState {
    joyOpts: any;
    joySize: number;
}

export default class Controller extends React.Component<IProps, IState> {

    joySize = 200
    constructor(props: IProps) {
        super(props);

        this.state = {
            joyOpts: defaultOptions,
            joySize: 200
        }

        const joy = <ReactNipple
            options={{ mode: 'static', position: { top: '50%', left: '50%' } , size: this.state.joySize}}
            style={{
                outline: '1px dashed red',
                width: 150,
                height: 150
                // if you pass position: 'relative', you don't need to import the stylesheet
            }}
            onMove={(evt : JoystickEventTypes, data: JoystickOutputData) => this.onMove(evt,data)}
            onEnd={(evt : JoystickEventTypes, data: JoystickOutputData) => console.log(evt, data)}
        />

    }

    onMove = (evt : JoystickEventTypes, data: JoystickOutputData) => {
        console.log(evt, data)
        //this.joySize = 400
        this.forceUpdate()

    }

    render() {
        const joySize2 = this.joySize+0
        console.log("joySize2", joySize2)
        const joy = <ReactNipple
            options={{ mode: 'static', position: { top: '50%', left: '50%' } , size: joySize2}}
            style={{
                width: 150,
                height: 150
                // if you pass position: 'relative', you don't need to import the stylesheet
            }}
            onMove={(evt : JoystickEventTypes, data: JoystickOutputData) => this.onMove(evt,data)}
            onEnd={(evt : JoystickEventTypes, data: JoystickOutputData) => console.log(evt, data)}
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
}