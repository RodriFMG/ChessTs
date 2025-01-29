import { isJaque } from "../../Logic/Jaque/Jaque";
import { TableroMove } from "../../Logic/TableroMove";
import { ShowMoveIfActuallyJaque } from "../ShowMoveActuallyJaque";

export function ShowAlfilMove(BoardUpdate: number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";
    
    // Si cumple es porque ya se realizaron los movimientos para evitar el JAQUE, los demás movimientos
    // no son válidos.
    if(ShowMoveIfActuallyJaque(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, IsActuallyJaqueColor, Color, ColorEnemy)) 
        return;

    const AlfilDirection = ["ArI", "ArD", "AbI", "AbD"];

    const NumStepDirection = {
        "ArI" : Math.min(filaPrev, columnaPrev),
        "ArD" : Math.min(7-columnaPrev, filaPrev),

        "AbI" : Math.min(7 - filaPrev, columnaPrev),
        "AbD" : 7 - Math.max(filaPrev, columnaPrev)
    }

    for(const Direction of AlfilDirection){

        const NumStep : number = NumStepDirection[Direction];

        let rowStep : number = 1;
        let columnStep : number = 1;

        if(Direction === "ArD") rowStep = -1;
        else if(Direction === "AbI") columnStep = -1;
        else if(Direction === "ArI") {
            rowStep = -1;
            columnStep = -1;
        }

        for(let i=1; i<=NumStep; ++i){
            const FilaToMove = filaPrev + i * rowStep;
            const ColumnaToMove = columnaPrev + i * columnStep;


            const BoardCopy = structuredClone(BoardUpdate);
            TableroMove(BoardCopy, [filaPrev, columnaPrev], [FilaToMove, ColumnaToMove]);
            if(isJaque(BoardCopy, ColorEnemy, ReyPositionColor, null, null, true, false)) return;

            const Index = [1, 4, 6].includes(BoardUpdate[FilaToMove][ColumnaToMove][0]) ? 3 : 2;

            if(BoardUpdate[filaPrev][columnaPrev][1] === BoardUpdate[FilaToMove][ColumnaToMove][1]) break;

            if(BoardUpdate[FilaToMove][ColumnaToMove][0] === 0) BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";
            else {
                BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";
                break;
            }
        }

    }

}