import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";
import '../../four-buttons.css'
import SimpleButton from "./SimpleButton";

export default function FourButtons() {
    const networkService = useNetworkService().service;

        return <div className="directional-buttons">
            <SimpleButton buttonId={1} dir={"up"} />
            <SimpleButton buttonId={2} dir={"left"} />
            <SimpleButton buttonId={3} dir={"right"} />
            <SimpleButton buttonId={4} dir={"down"} />
        </div>
}