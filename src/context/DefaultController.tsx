import {ControllerLayout} from "../types/cloud-aracde-api";

const defaultController: ControllerLayout = {
    left: {type: "joy", id: 1},
    right: {type: "buttons", id: 2, buttons: [{buttonId: 2, holdable: true}]},
}
export default defaultController