export interface JoinGameBody {
    gameId: string
    name: string
}

export interface JoyMoveBody {
    angle: number
    dist: number
}

export interface ButtonBody {
    buttonId: number
    pressed: boolean
}

export interface CreateGameBody {

}
