import { SomePeonMove } from "../../Constantes/Constants";
import { isJaque } from "../../Logic/Jaque/Jaque";
import { TableroMove } from "../../Logic/TableroMove";
import { ShowMoveIfActuallyJaque } from "../ShowMoveActuallyJaque";

export function ShowPeonMove(BoardUpdate: number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";

    if(ShowMoveIfActuallyJaque(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, IsActuallyJaqueColor, Color, ColorEnemy)) 
        return;

    const factor = (Color === "B") ? 1 : -1;

    const PeonPossiblesMoves = [...SomePeonMove, [-2, 0]];
    
    PeonPossiblesMoves.forEach(PossiblePeonMove => {

        const FilaToMove = filaPrev + PossiblePeonMove[0] * factor;
        const ColumnaToMove = columnaPrev + PossiblePeonMove[1] * factor;

        if(FilaToMove <=7 && FilaToMove>=0 && ColumnaToMove <= 7 && ColumnaToMove >= 0){

            if(BoardUpdate[filaPrev][columnaPrev][1] !== BoardUpdate[FilaToMove][ColumnaToMove][1]){

                const BoardCopy = structuredClone(BoardUpdate);
                TableroMove(BoardCopy, [filaPrev, columnaPrev], [FilaToMove, ColumnaToMove]);

                // En caso al realizar el movimiento de esa ficha ocasione JAQUE del bando contrario, no hay nada que hacer.
                if(isJaque(BoardCopy, ColorEnemy, ReyPositionColor, null, null, true, false)) return;

                // Si llega acá, significa que el movimiento no ocasiona JAQUE ni está actualmente en JAQUE el rey
                // así que serían movimientos normales.
                const Index = [1, 4, 6].includes(BoardUpdate[FilaToMove][ColumnaToMove][0]) ? 3 : 2;
                if(columnaPrev === ColumnaToMove && BoardUpdate[FilaToMove][ColumnaToMove][0] === 0){

                    // Movimiento de 1 casilla.
                    if (Math.abs(FilaToMove - filaPrev) === 1)
                         BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";

                    // Movimiento de dos casillas.
                    else if (Math.abs(FilaToMove - filaPrev) === 2) {
                        if (BoardUpdate[filaPrev][columnaPrev][2] && BoardUpdate[FilaToMove + 1 * factor][ColumnaToMove][0] === 0)
                            BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";

                    }


                }

                // En caso pueda capturar por diagonal.
                else if(columnaPrev !== ColumnaToMove && BoardUpdate[FilaToMove][ColumnaToMove][1] === ColorEnemy)
                    BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";

            }
        }
        
    })

}