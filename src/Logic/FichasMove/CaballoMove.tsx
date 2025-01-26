import { ReyPositionTypes } from "../../Constantes/ReyInterface";
import { ItsJaqueMoment } from "../Jaque/ItsJaqueMoment";
import { TableroMove } from "../TableroMove";

function IsPosibleMoveHourse(PrevMove : [number, number], ToMove : [number, number]){

    // Acá lo que nos interesa es el paso (por eso sacamos el absoluto) que se esta haciendo vertical y horizontalmente
    // Con tal que el paso sea de 1 y 2 (fila - columna) o 2 y 1 (fila - columna), ya es un paso válido de caballo 
    // (Movimiento en L).

    // Los movimientos totales del caballo son 8.
    // la 1ra condición cubre 4 posibles movimientos y la 2da los otros 4 faltantes.

    return (Math.abs(PrevMove[0] - ToMove[0]) === 1 && Math.abs(PrevMove[1] - ToMove[1]) === 2) ||
    (Math.abs(PrevMove[0] - ToMove[0]) === 2 && Math.abs(PrevMove[1] - ToMove[1]) === 1)
}

export function CaballoMove(BoardUpdate : number[][][], Dimentions : [number, number][], ForMoveOrJaque : boolean = true,
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null
){

    const PrevMove : [number, number] = Dimentions[0];
    const ToMove : [number, number] = Dimentions[1];

    if(BoardUpdate[ToMove[0]][ToMove[1]][1] === BoardUpdate[PrevMove[0]][PrevMove[1]][1]) return false;

    if(IsPosibleMoveHourse(PrevMove, ToMove)){ 
        if(ForMoveOrJaque) {

            
            const BoardCopy = structuredClone(BoardUpdate);
            TableroMove(BoardCopy, PrevMove, ToMove);

            // Si es que al realizar el movimiento, sigue estando en JAQUE, lo restablece y retorna true.
            if(ItsJaqueMoment(BoardUpdate, BoardCopy, PrevMove, ToMove, ReyPosition, ActuallyJaque, SetActuallyJaque)) 
                return false;

        }
    }
    else return false;

    return true;

}