import { ClearShowMoves } from "./ClearShowMoves";
import { ShowCaballoMove } from "./ShowFichasMoves/ShowCaballoMove";
import { ShowPeonMove } from "./ShowFichasMoves/ShowPeonMove";
import { ShowReyMove } from "./ShowFichasMoves/ShowReyMove";
import { ShowTorreMove } from "./ShowFichasMoves/ShowTorreMove";

export function ShowMoves(BoardUpdate: number[][][], PrevMove : [number, number], ReyPositionColor : [number, number],
    IsActuallyJaqueColor : boolean){

    ClearShowMoves(BoardUpdate);

    const [filaPrev, columnaPrev] = PrevMove;

    if(BoardUpdate[filaPrev][columnaPrev][0] === 1) ShowPeonMove(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, 
         IsActuallyJaqueColor);
    else if(BoardUpdate[filaPrev][columnaPrev][0] === 3) ShowCaballoMove(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor,
         IsActuallyJaqueColor);
    else if(BoardUpdate[filaPrev][columnaPrev][0] === 4) ShowTorreMove(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor,
         IsActuallyJaqueColor);
    else if(BoardUpdate[filaPrev][columnaPrev][0] === 6) ShowReyMove(BoardUpdate, filaPrev, columnaPrev)
    
    
}