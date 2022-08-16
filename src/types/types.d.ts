import Networkmanager from "../Service/Networkmanager"
import NetworkService from "../Service/NetworkService";
import {ControllerLayout} from "./cloud-aracde-api";

export interface NetworkServiceState {
  errorMessage?: string
  layout: ControllerLayout
  service: NetworkService
}

export type ControllerPart = 'joystcik' | 'buttons'