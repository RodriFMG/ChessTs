const Izquierda = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) => 
        ReturnPosition ? [RowToMove, ColumnToMove+Step] : BoardUpdate[RowToMove][ColumnToMove+Step][0] !== 0;

const Derecha = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) => 
        ReturnPosition ? [RowToMove, ColumnToMove-Step] : BoardUpdate[RowToMove][ColumnToMove-Step][0] !== 0;

const Arriba = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) => 
        ReturnPosition ? [RowToMove+Step, ColumnToMove] : BoardUpdate[RowToMove+Step][ColumnToMove][0] !== 0;

const Abajo = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number, 
    ReturnPosition : boolean = false) => 
        ReturnPosition ? [RowToMove-Step, ColumnToMove]: BoardUpdate[RowToMove-Step][ColumnToMove][0] !== 0;

const CanMove = {
    Izq : Izquierda,
    Der : Derecha,
    Ar : Arriba,
    Ab : Abajo
}

export default CanMove;