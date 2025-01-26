import { ReyMoveDistances } from "../../../Constantes/Constants";
import { IsPosibleMoveKing } from "../../FichasMove/ReyMove";
import { TableroMove } from "../../TableroMove";
import { isJaque } from "../Jaque";

// Al realizar una copia de array1 = array2, los modificaciones del array1 se verán reflejadas en el array2.

function IsPossibleIndex(ReyPosition : [number, number], MoveRey : [number, number]){
    // Cada posición debe estar en el rango [0, 7]
    return ReyPosition[0] + MoveRey[0] >= 0 &&  ReyPosition[0] + MoveRey[0] <= 7 && 
    ReyPosition[1] + MoveRey[1] >= 0 && ReyPosition[1] + MoveRey[1] <= 7
}

// Creo que ya estaría, pero habría que testear...
function IsPossibelReyMove(BoardCopy : number[][][], Dimentions : [number, number][]){

    const PrevMove : [number, number] = Dimentions[0];
    const ToMove : [number, number] = Dimentions[1];
    const color : string = BoardCopy[PrevMove[0]][PrevMove[1]][1];
    const colorEnemy = color === "B" ? "N" : "B"

    // Esta condición puede que no sea necesaria.
    if(IsPosibleMoveKing(PrevMove, ToMove)){
        // Si consigo que realice el isJaque con la matriz actualizada, pero que no altere los cambios a la matriz
        // del Update, pues ya estaría.

        TableroMove(BoardCopy, PrevMove, ToMove);

        const Jaque : boolean = isJaque(BoardCopy, colorEnemy, ToMove, null, null, true);
        
        return !Jaque;
    }

    return false;

}

// Falta mejorar esto, no funciona correctamente y ya estaría el MATE.
export function IsPossibleMoveKing(BoardUpdate : number[][][], ReyPositionColor : [number, number]){

    // copia profunda del array.

    for(const MoveRey of [...ReyMoveDistances]){
        if(IsPossibleIndex(ReyPositionColor, MoveRey)){

            const ToMove : [number, number] = [ReyPositionColor[0]+ MoveRey[0], ReyPositionColor[1]+MoveRey[1]];

            // Significa que esas posiciones estan ubicadas fichas del mismo bando.
            if(BoardUpdate[ToMove[0]][ToMove[1]][1] === BoardUpdate[ReyPositionColor[0]][ReyPositionColor[1]][1])
                continue;
            
            const Dimentions : [number, number][]= [ReyPositionColor, ToMove];
            const BoardCopy = structuredClone(BoardUpdate);

            if(IsPossibelReyMove(BoardCopy, Dimentions)) return true;
        }
    }

    return false;
}