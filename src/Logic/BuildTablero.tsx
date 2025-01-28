// El contenido de cada cuadricula será el siguiente:
// indices:

// 0: El tipo de ficha que es. (Explicado en Constantes -> Constants.tsx)
// 1: El color de la ficha. N: negras, B: blancas, T: nada (casilla vacia)
// 2: Depende de la ficha, los usos son los siguientes:
    // Para las Torres y Rey, será el booleano que dirá si se puede realizar el ENROQUE
    // Para los peones será un booleano indice que si se puede mover 2 posiciones (osea si aún no se realizo el 1er movimiento).
    // Para las demás fichas, será un indicador que permitirá saber si es que la ficha se puede mover a cierta casilla 
    // del tablero o no. Esta tendrá 3 posibles valores:
        // N: no move
        // C: capture
        // M: move
        // A: Attack king (Etiqueta que se le pondrá al rey si hay un movimiento que no evita el JAQUE)
// 3: Para las fichas que no tengan el indicar de posible movimiento, tendrán ese indicador en esta posición.


function BuildFirstRow(RowTablero : number[][], is_white : boolean){
    
    const color : string = is_white ? 'B' :  'N';

    // Los True son para el enroque.
    return RowTablero.map((_, index) => {
        if(index === 0 || index === 7) return [4, color, true, 'N']
        else if(index === 1 || index === 6) return [3, color, 'N']
        else if(index === 2 || index === 5) return [2, color, 'N']
        else if(index == 3) return [5, color, 'N']
        else return [6, color, true, 'N']

    })

} 

function BuildSecondRow(RowTablero : number[][], is_white : boolean){

    const color : string = is_white ? 'B' :  'N';

    // El 3er booleano es para que pueda dar un 3er salto.
    return RowTablero.map(square => [square[0]+1, color, true, 'N'])
}

export function BuildFichasRow(RowTablero : number[][], Row : number){

    const is_white : boolean = (Row === 0 || Row === 1) ? false : true;

    return (Row === 0 || Row === 7) ? BuildFirstRow(RowTablero, is_white) : BuildSecondRow(RowTablero, is_white) 
}

export function OtherRows(RowTablero : number[][]){
    // WTF, cuando le asignaba directamente el RowTablero, la etiqueta en las casillas vacias con N, no las consideraba
    // por eso la inicializo creando con esto directamente, esto se debe creo porque estaría asignando directamente
    // un array y generalmente asignaciones directas de arrays traen problemas por la memoria o punteros etc.
    
    return RowTablero.map( () => [0, 'T', 'N'])
}