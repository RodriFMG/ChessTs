import { ReyPositionTypes } from "../../Constantes/ReyInterface";
import { AlfilMove } from "./AlfilMove";
import { TorreMove } from "./TorreMove";

export function DamaMove(BoardUpdate : number[][][], Dimentions : [number, number][], ForMoveOrJaque : boolean = true,
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null){
    
    // Movimiento Alfil
    if(AlfilMove(BoardUpdate, Dimentions, ForMoveOrJaque, ReyPosition, ActuallyJaque, SetActuallyJaque))
        return true;

    // Movimiento Torre
    else if(TorreMove(BoardUpdate, Dimentions, ForMoveOrJaque, ReyPosition, ActuallyJaque, SetActuallyJaque))
        return true;

    // No se puede realizar el movimiento
    else return false;

}