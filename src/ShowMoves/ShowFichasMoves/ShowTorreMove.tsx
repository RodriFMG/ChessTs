import { isJaque } from "../../Logic/Jaque/Jaque";
import { TableroMove } from "../../Logic/TableroMove";
import { ShowMoveIfActuallyJaque } from "../ShowMoveActuallyJaque";

export function ShowTorreMove(BoardUpdate: number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";

    if(ShowMoveIfActuallyJaque(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, IsActuallyJaqueColor, Color, ColorEnemy)) 
        return;

    const TorreDirections = ["Izq", "Der", "Ar", "Ab"];
    const NumStepDirection = {
        "Izq" : 7 - columnaPrev,
        "Der" : columnaPrev,
        "Ar" : filaPrev,
        "Ab" : 7 - filaPrev
    }

    for(const Direction of TorreDirections){

        // recordar que son 8 filas y 8 columnas, pero como los indices empiezan en 0, pues row y column estan en el
        // rango de [0, 7]
        const NumStep : number = NumStepDirection[Direction];

        let rowStep : number = 0;
        let columnStep : number = 0;

        if(Direction === "Ar" ) rowStep = -1;
        else if(Direction === "Ab") rowStep = 1;
        
        if(Direction === "Izq") columnStep = 1;
        else if(Direction === "Der") columnStep = -1;

        for(let i=1; i<=NumStep; ++i){

            const FilaToMove = filaPrev + i * rowStep;
            const ColumnaToMove = columnaPrev + i * columnStep;

            const BoardCopy = structuredClone(BoardUpdate);
            TableroMove(BoardCopy, [filaPrev, columnaPrev], [FilaToMove, ColumnaToMove]);

            // Retorna directo y no continue o break, porque significa que esta clavado la Torre al Rey, por tanto
            // al mínimo movimiento será JAQUE.
            if(isJaque(BoardCopy, ColorEnemy, ReyPositionColor, null, null, true, false)) return;

            const Index = [1, 4, 6].includes(BoardUpdate[FilaToMove][ColumnaToMove][0]) ? 3 : 2;

            if(BoardUpdate[filaPrev][columnaPrev][1] === BoardUpdate[FilaToMove][ColumnaToMove][1]) break;

            // Se realiza esto en el tablero original.
            if(BoardUpdate[FilaToMove][ColumnaToMove][0] === 0) BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";
            else {
                BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";

                // Este break permite que una vez encuentre una ficha para comer, no siga calculando la recta
                // sobrante, si no se pone funcionaría igual que chess.com
                break;
            }

        }
    }

}