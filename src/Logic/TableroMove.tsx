//FALTA IMPLEMENTAR LA LÓGICA DEL Jaque ;-; (que cuando puede comer al rey, pues el movimiento sea extricto al rey.)
export function TableroMove(BoardUpdate : number[][][], PrevMove : [number, number], ToMove : [number, number]){
    BoardUpdate[ToMove[0]][ToMove[1]] = BoardUpdate[PrevMove[0]][PrevMove[1]]
    BoardUpdate[PrevMove[0]][PrevMove[1]] = [0, 'T'];
}