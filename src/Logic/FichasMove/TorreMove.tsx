import CanMove from "../../Constantes/TorreMovesConditionals";
import { ItsJaqueMoment } from "../Jaque/ItsJaqueMoment";
import { TableroMove } from "../TableroMove";

function MovimientoRecto(BoardUpdate: number[][][], PrevMove : [number, number], ToMove: [number, number], 
    MoveWhere : string, ForMoveOrJaque : boolean,
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null){

    const PasoRecto : number = (MoveWhere === "Izq" || MoveWhere === "Der") ? 
    Math.abs(PrevMove[1] - ToMove[1]) : 
    Math.abs(PrevMove[0] - ToMove[0]);

    const [RowToMove, ColumnToMove] = ToMove;
    const CanMoveRecto = CanMove[MoveWhere];
    
    for(let i = 1; i < PasoRecto; ++i) 
        if(CanMoveRecto(BoardUpdate, RowToMove, ColumnToMove, i)) return false; 
    

    if(ForMoveOrJaque) {

        const BoardCopy = structuredClone(BoardUpdate);
        TableroMove(BoardCopy, PrevMove, ToMove);
        if(ItsJaqueMoment(BoardUpdate, BoardCopy, PrevMove, ToMove, ReyPosition, ActuallyJaque, SetActuallyJaque)) 
            return false;
        
        if(BoardUpdate[ToMove[0]][ToMove[1]][2]) BoardUpdate[ToMove[0]][ToMove[1]][2] = false;

    }

    return true;

}

export function TorreMove(BoardUpdate: number[][][], Dimentions : [number, number][], ForMoveOrJaque : boolean = true,
    ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null
){

    const PrevMove : [number, number] = Dimentions[0];
    const ToMove : [number, number] = Dimentions[1];

    let IsPossibleMove : boolean = false;

    // Se debe hacer 1 x 1 cada dirección, para verificar que en ese camino no hay otra ficha que bloquee el camino ;-;
    if( PrevMove[0] === ToMove[0] && PrevMove[1] > ToMove[1] ){
        IsPossibleMove = MovimientoRecto(BoardUpdate, PrevMove, ToMove, "Izq", ForMoveOrJaque, 
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }
    else if( PrevMove[0] === ToMove[0] && PrevMove[1] < ToMove[1] ){
        IsPossibleMove = MovimientoRecto(BoardUpdate, PrevMove, ToMove, "Der", ForMoveOrJaque,
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }
    else if( PrevMove[1] === ToMove[1] && PrevMove[0] > ToMove[0] ){
        IsPossibleMove = MovimientoRecto(BoardUpdate, PrevMove, ToMove, "Ar", ForMoveOrJaque,
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }
    else if( PrevMove[1] === ToMove[1] && PrevMove[0] < ToMove[0] ){
        IsPossibleMove = MovimientoRecto(BoardUpdate, PrevMove, ToMove, "Ab", ForMoveOrJaque, 
            ReyPosition, ActuallyJaque, SetActuallyJaque);
    }

    return IsPossibleMove;

}