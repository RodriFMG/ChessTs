import { PiezaMove, PiezaPositions } from "../PiezaMove";

export function isPossibleMovePiece(BoardUpdate : number[][][], Dimention : [number, number], factor : number = 1){

    const PieceType = BoardUpdate[Dimention[0]][Dimention[1]][0];

    // Se consigue los posibles PASOS para mover ese type de la ficha.
    const SomePieceMove : [number, number][] = PiezaPositions(PieceType);

    // Lo podría hacer con un forEach, pusheando cuando llega a la linea 23, pero así es más entendible.
    const MovesPieces : [number, number][] = []

    SomePieceMove.forEach(Piece => {

        const RowToMove = Dimention[0] + Piece[0] * factor;
        const ColumnToMove = Dimention[1] + Piece[1] * factor;

        
        // Si el movimiento es posible en las dimensiones del tablero [0, 7]
        if( (RowToMove >= 0 && RowToMove <=7) &&
            (ColumnToMove >= 0 && ColumnToMove <=7) ){
                // Si es que se mueve a una ficha del mismo bando.
                if(BoardUpdate[Dimention[0]][Dimention[1]][1] !== BoardUpdate[RowToMove][ColumnToMove][1])
                    MovesPieces.push([RowToMove, ColumnToMove])
        }
        


    })
    
    //console.log("Pieza: ", PieceType, "Posibles Movimientos: ", MovesPiece, "factor: ", factor);

    if(MovesPieces.length === 0) return false;

    const Move = PiezaMove(PieceType);
    
    for(const MovePiece of MovesPieces){
        if(Move(BoardUpdate, [Dimention, MovePiece], false)) return true;
    }

    return false;

}