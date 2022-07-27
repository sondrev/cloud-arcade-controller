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
    secretKey: string
}

export interface SocketResponse<T> {
    error?: SocketError
    response?: T
}

export interface NewPlayerData {
    name: string
    color: string
}

export interface PlayerMovedJoyData {
    name: string
    angle: number
    dist: number
}

export interface PlayerPressedButtonData {
    name: string
    buttonId: number
    pressed: boolean
}


