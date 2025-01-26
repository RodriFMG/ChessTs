
/*
 1 : peones
 2 : alfiles
 3 : caballos
 4 : torres
 5 : reina
 6 : rey
*/

export const FICHAS_TABLERO = {
    0 : 'nothing',
    1 : 'https://e7.pngegg.com/pngimages/669/663/png-clipart-chess-piece-pawn-white-and-black-in-chess-king-chess-game-king-thumbnail.png',
    2 : 'https://e7.pngegg.com/pngimages/126/465/png-clipart-chess960-chess-piece-bishop-white-and-black-in-chess-chess-game-king.png',
    3 : 'https://c0.klipartz.com/pngpicture/662/96/gratis-png-pieza-de-ajedrez-caballo-caballero-reina-ajedrez.png',
    4 : 'https://e7.pngegg.com/pngimages/50/939/png-clipart-chess-piece-rook-pawn-white-and-black-in-chess-kale-angle-king-thumbnail.png',
    5 : 'https://e7.pngegg.com/pngimages/129/594/png-clipart-chess-piece-king-queen-pin-chess-king-pin-thumbnail.png',
    6 : 'https://static.vecteezy.com/system/resources/previews/024/322/907/non_2x/king-chess-icon-isolated-on-white-background-vector.jpg',
}

export const ReyMoveDistances : [number, number][] = [
    [0,1],
    [0,-1],

    [1,0],
    [-1,0],

    [1,1],
    [-1,-1],

    [1, -1],
    [-1, 1]
]

export const SomeTorreMove : [number, number][] = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
]

export const SomeAlfilMove : [number, number][] = [
    [1, 1],
    [-1, -1],
    [-1, 1],
    [1, -1]
]

// Según las blancas, en las negras cambiará.
export const SomePeonMove : [number, number][] = [
    [-1, 0],
    [-1, 1],
    [-1, -1]
]

export const SomeCaballoMove : [number, number][] = [
    [2, 1], 
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2], 
    [1, -2],
    [-1, 2], 
    [-1, -2]
]

export const SomeDamaMove : [number, number][] = [
    ...SomeAlfilMove,
    ...SomeTorreMove
]