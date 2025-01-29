import { IsPossibleDefendKing } from "./IsPossibleDefendKing";
import { IsPossibleMoveKing } from "./IsPossibleMoveKing";


export function isMate(BoardUpdate : number[][][], PiezasAttacks : [number, number][], 
    ReyPositionColor : [number, number]){

    //console.log("Se puede defender al Rey: ", IsPossibleDefendKing(BoardUpdate, PiezasAttacks, ReyPositionColor))

    // La lógica está fallando, AMBAS.

    // Si es que el Rey no tiene escapatoria estando en JAQUE, y además ninguna ficha lo puede defender, pues MATE.
    // OJO CON ESTO.
    return (!IsPossibleMoveKing(BoardUpdate, ReyPositionColor) && 
    // Nunca se leería al REY, porque el REY no puede dar JAQUE.
    !IsPossibleDefendKing(BoardUpdate, PiezasAttacks, ReyPositionColor));

}

// EXISTE JAQUE DOBLE PIPIPIP, jaque a la descubierta