const ArribaIzquierda = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) =>
        ReturnPosition ? [RowToMove+Step, ColumnToMove+Step] : BoardUpdate[RowToMove+Step][ColumnToMove+Step][0] !== 0;

const ArribaDerecha = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) =>
        ReturnPosition ? [RowToMove+Step, ColumnToMove-Step] : BoardUpdate[RowToMove+Step][ColumnToMove-Step][0] !== 0;

const AbajoIzquierda = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) =>
        ReturnPosition ? [RowToMove-Step, ColumnToMove+Step] : BoardUpdate[RowToMove-Step][ColumnToMove+Step][0] !== 0;

const AbajoDerecha = (BoardUpdate : number[][][], RowToMove : number, ColumnToMove : number, Step : number,
    ReturnPosition : boolean = false) =>
        ReturnPosition ? [RowToMove-Step, ColumnToMove-Step] : BoardUpdate[RowToMove-Step][ColumnToMove-Step][0] !== 0;

const CanMove = {
    ArI : ArribaIzquierda,
    ArD : ArribaDerecha,
    AbI : AbajoIzquierda,
    AbD : AbajoDerecha
}

// Cuando se exporta SOLAMENTE UNMA variable, función, object, component, etc. Se pone Default.
// Si se exportan varias cosas, ya no se pone el default. Esto permite que extraigamos el objeto sin poner las {}
// al importar, y lo almacenemos con un sobrenombre.

export default CanMove;