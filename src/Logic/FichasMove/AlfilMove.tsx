import CanMove from '../../Constantes/AlfilMovesConditionals';
import { ReyPositionTypes } from '../../Constantes/ReyInterface';
import { ItsJaqueMoment } from '../Jaque/ItsJaqueMoment';
import { TableroMove } from '../TableroMove'


function MovimientoDiagonales(BoardUpdate : number[][][], PrevMove : [number, number], ToMove: [number, number], 
    MoveWhere : string, ForMoveOrJaque : boolean, 
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null){
    
    const PasoDiagonal : number =  Math.abs(PrevMove[0] - ToMove[0]);
    
    if(Math.abs(PrevMove[1] - ToMove[1]) !== PasoDiagonal) return false;

    const [RowToMove, ColumnToMove] = ToMove;
    const CanMoveDiagonal = CanMove[MoveWhere];

    for(let i = 1; i < PasoDiagonal; ++i)
        if(CanMoveDiagonal(BoardUpdate, RowToMove, ColumnToMove, i)) return false;
    

    if (ForMoveOrJaque){
        const BoardCopy = structuredClone(BoardUpdate);
        TableroMove(BoardCopy, PrevMove, ToMove);

        if(ItsJaqueMoment(BoardUpdate, BoardCopy, PrevMove, ToMove, ReyPosition, ActuallyJaque, SetActuallyJaque)){ 
            return false;
        }
    }

    return true;
}

// 
export function AlfilMove(BoardUpdate : number[][][], Dimentions : [number, number][], ForMoveOrJaque : boolean = true,
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null
){

    const PrevMove : [number, number] = Dimentions[0];
    const ToMove : [number, number] = Dimentions[1];
    let IsPossibleMove : boolean = false;
    
    // Se debe hacer 1 x 1 cada dirección, para verificar que en ese camino no hay otra ficha que bloquee el camino ;-;
    if(PrevMove[0] < ToMove[0] && PrevMove[1] < ToMove[1]){
        IsPossibleMove = MovimientoDiagonales(BoardUpdate, PrevMove, ToMove, "AbD", ForMoveOrJaque, 
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }
    else if(PrevMove[0] > ToMove[0] && PrevMove[1] > ToMove[1]){
        IsPossibleMove = MovimientoDiagonales(BoardUpdate, PrevMove, ToMove, "ArI", ForMoveOrJaque,
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }
    else if(PrevMove[0] > ToMove[0] && PrevMove[1] < ToMove[1]){ 
        IsPossibleMove = MovimientoDiagonales(BoardUpdate, PrevMove, ToMove, "ArD", ForMoveOrJaque,
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }
    else if(PrevMove[0] < ToMove[0] && PrevMove[1] > ToMove[1]){ 
        IsPossibleMove = MovimientoDiagonales(BoardUpdate, PrevMove, ToMove, "AbI",ForMoveOrJaque,
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }

    return IsPossibleMove;
    
}