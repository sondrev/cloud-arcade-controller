import Networkmanager from "../Service/Networkmanager"
import NetworkService from "../Service/NetworkService";

export interface NetworkServiceState {
  errorMessage?: string
  service: NetworkService
}

export type ControllerPart = 'joystcik' | 'buttons'