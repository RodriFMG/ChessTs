
// Limpio la pantalla de los posibles movimientos de la ficha anteriormente seleccionada.
export function ClearShowMoves(BoardUpdate: number[][][]){
    for(let fila=0; fila<8; ++fila){
        for(let columna=0; columna<8; ++columna){
            const FichaType = BoardUpdate[fila][columna][0];
            const Index = [1, 4, 6].includes(FichaType) ? 3 : 2;
            BoardUpdate[fila][columna][Index] = "N"; 
        }
    }
}