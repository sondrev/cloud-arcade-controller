import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";
import '../../four-buttons.css'
import SimpleButton from "./SimpleButton";

export default function FourButtons({componentId}: { componentId:number}) {
    const networkService = useNetworkService().service;

        return <div className="directional-buttons">
            <SimpleButton componentId={componentId} buttonId={1} dir={"up"} />
            <SimpleButton componentId={componentId} buttonId={2} dir={"left"} />
            <SimpleButton componentId={componentId} buttonId={3} dir={"right"} />
            <SimpleButton componentId={componentId} buttonId={4} dir={"down"} />
        </div>
}