/**
 * Emits
 */

interface ServerToScreenEvents {
    joined: (data: NewPlayerData) => void
    leave: (data: LeavingPlayerData) => void
    "input-joy": (data: PlayerMovedJoyData) => void
    "input-button": (data: PlayerPressedButtonData) => void
    "set-controller-layout": (newLayout: ControllerLayout) => void
}

interface ServerToControllerEvents {
    "ping-controller": (callback: () => void ) => void
    "set-controller-layout": (newLayout: ControllerLayout) => void
}

interface ScreenToServerEvents {
    "ping-server": (callback: () => void ) => void
    "ping-controller": (name: string, callback: () => void ) => void
    create: (body: CreateGameBody, callback: (data: SocketResponse<CreateGameResponse>) => void ) => void;
    "set-controller-layout": (newLayout: ControllerLayout) => void
}

interface ControllerToServerEvents {
    join: (joinData: JoinGameBody, callback: (data: SocketResponse<JoinGameResponse>) => void ) => void;
    joy: (moveData: JoyMoveBody) => void;
    button: (buttonData: ButtonBody) => void;
}

interface InterServerEvents {
    connect_error: (err: string) => void
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

/**
 * Data from client to server
 */

export interface JoinGameBody {
    gameId: string
    name: string
}

export interface JoyMoveBody {
    componentId: number
    angle: number
    dist: number
}

export interface ButtonBody {
    componentId: number
    buttonId: number
    pressed: boolean
}

export interface CreateGameBody {
    layout: ControllerLayout
}

interface ControllerLayout {
    left: ControllerComponent
    right: ControllerComponent
}

/**
 * Data from server to client
 */

export interface SocketError {
    message: string
}

export interface CreateGameResponse {
    gameId: string
    secretKey: string
}

export interface JoinGameResponse {
    gameId: string,
    playerName: string,
    playerColor: string,
    secretKey: string,
    layout: ControllerLayout
}

export interface SocketResponse<T> {
    error?: SocketError
    response?: T
}

export interface NewPlayerData {
    name: string
    color: string
}

export interface LeavingPlayerData {
    name: string
}

export interface PlayerMovedJoyData {
    name: string
    componentId: number
    angle: number
    dist: number
}

export interface PlayerPressedButtonData {
    name: string
    componentId: number
    buttonId: number
    pressed: boolean
}




/**
 * Shared data
 */

type ControllerComponent =
    JoyControllerComponent |
    ArrowsControllerComponent |
    ButtonsControllerComponent |
    TextControllerComponent

interface ControllerComponentBase {
    componentId: number
}

interface JoyControllerComponent extends ControllerComponentBase{
    type: "joy"
}

interface ArrowsControllerComponent extends ControllerComponentBase{
    type: "arrows"
}

interface ButtonsControllerComponent extends ControllerComponentBase{
    type: "buttons"
    buttons: {buttonId: number, label?: string, holdable: boolean}[]
}

interface TextControllerComponent extends ControllerComponentBase{
    type: "text"
    text: string
}
