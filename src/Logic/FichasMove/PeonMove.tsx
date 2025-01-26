import { ItsJaqueMoment } from '../Jaque/ItsJaqueMoment';
import { TableroMove } from '../TableroMove'

const IsCorrectMovePeonRecto = (PrevMove : [number, number], ToMove : [number, number], color : string, Step : number = 1) => {

    if(PrevMove[1] !== ToMove[1]) return false;

    return color === 'N' ? PrevMove[0] + Step === ToMove[0] : PrevMove[0] - Step === ToMove[0]

}

const IsCorrectMovePeonDiagonal = (PrevMove : [number, number], ToMove : [number, number], color : string) => {

    // No hace falta una verificación si son blancas, ya que se ha colocado que si se da 2 veces una blanca
    // pues el movimiento sea de la otra.
    if((PrevMove[1] !== ToMove[1]-1 && PrevMove[1] !== ToMove[1]+1)) return false;

    return color === 'N' ? PrevMove[0] + 1 === ToMove[0] : PrevMove[0] - 1 === ToMove[0]
}

function IsCorrectMove(BoardUpdate : number[][][], PrevMove: [number, number], ToMove: [number, number],
    ForMoveOrJaque : boolean = true, ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null ){

    if(ForMoveOrJaque) {
        
        const BoardCopy = structuredClone(BoardUpdate);
        TableroMove(BoardCopy, PrevMove, ToMove);

        // Puede que no sea necesario acá, porque el peon solo puede atacar en DIAGONAL.
        if(ItsJaqueMoment(BoardUpdate, BoardCopy, PrevMove, ToMove, ReyPosition, ActuallyJaque, SetActuallyJaque)) 
            return false;

        if(BoardUpdate[ToMove[0]][ToMove[1]][2])
            BoardUpdate[ToMove[0]][ToMove[1]][2] = false;
    }

    return true
}

export function PeonMove(BoardUpdate : number[][][], Dimentions : [number, number][], 
    ForMoveOrJaque : boolean = true,
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null){
    
    const PrevMove : [number, number] = Dimentions[0];
    const ToMove : [number, number] = Dimentions[1];

    // cuidado con esto.
    const color : string = BoardUpdate[PrevMove[0]][PrevMove[1]][1];

    // Aún falta implementar cuando come una ficha negra o avanza 2 casillas en el 1er movimiento.
    if(IsCorrectMovePeonRecto(PrevMove, ToMove, color) && BoardUpdate[ToMove[0]][ToMove[1]][0] === 0){ 

        if(!IsCorrectMove(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition, ActuallyJaque, SetActuallyJaque))
            return false;

    }
    else if(BoardUpdate[PrevMove[0]][PrevMove[1]][2] && IsCorrectMovePeonRecto(PrevMove, ToMove, color, 2) && 
            BoardUpdate[ToMove[0]][ToMove[1]][0] === 0 && 
            BoardUpdate[ToMove[0]+1 * (color === "N" ? -1 : 1)][ToMove[1]][0] === 0){
        
        if(!IsCorrectMove(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition, ActuallyJaque, SetActuallyJaque))
            return false;        
        
    }
    else if(IsCorrectMovePeonDiagonal(PrevMove, ToMove, color) && BoardUpdate[ToMove[0]][ToMove[1]][0] !== 0){

        if(!IsCorrectMove(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition, ActuallyJaque, SetActuallyJaque))
            return false;

    }

    else return false;

    return true;
    

}
