import { IsPossibleMoveKing } from "../Mate/IsPossibleMoveKing";
import { isPossibleMoveSomePiece } from "./isPossibleMoveSomePiece";

export function isAhogado(BoardUpdate : number[][][], ReyPositionColor: [number, number]){
    const Color : string = BoardUpdate[ReyPositionColor[0]][ReyPositionColor[1]][1];


    console.log(`Chequeando Rey Ahogado... (${Color})`)
    console.log("Some Piece Possible Move: ", isPossibleMoveSomePiece(BoardUpdate, Color));
    console.log("El rey se puede mover? ", IsPossibleMoveKing(BoardUpdate, ReyPositionColor));

    return(!IsPossibleMoveKing(BoardUpdate, ReyPositionColor) && !isPossibleMoveSomePiece(BoardUpdate, Color))
}