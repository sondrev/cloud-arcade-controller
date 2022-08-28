import React, {useContext, useState } from "react";
import Nipple from "../Nipple";
import {useNetworkService} from "../../context/NetworkServiceContext";
import '../../four-buttons.css'
import SimpleButton from "./SimpleButton";

export default function Textfield({text}: { text:string}) {
    const networkService = useNetworkService().service;

        return <div>
            {text}
        </div>
}