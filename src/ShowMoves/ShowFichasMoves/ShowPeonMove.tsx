import { SomePeonMove } from "../../Constantes/Constants";
import { PeonMove } from "../../Logic/FichasMove/PeonMove";
import { isJaque } from "../../Logic/Jaque/Jaque";
import { WhoPiecesAttack } from "../../Logic/Jaque/WhoPiecesAttack";
import { TableroMove } from "../../Logic/TableroMove";

export function ShowPeonMove(BoardUpdate: number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";

    if(IsActuallyJaqueColor){
                    
        const PiecesAttack = WhoPiecesAttack(BoardUpdate, ColorEnemy, ReyPositionColor);

        // mirar ShowCaballoMove
        if(PiecesAttack.length > 1) return;

        const [filaAttack, columnaAttack] = PiecesAttack[0];
        const Index = [1, 4, 6].includes(BoardUpdate[filaAttack][columnaAttack][0]) ? 3 : 2;

        if(PeonMove(BoardUpdate, [[filaPrev, columnaPrev], [filaAttack, columnaAttack]], false))
            BoardUpdate[filaAttack][columnaAttack][Index] = "C";

        return;
    }

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
                if(isJaque(BoardUpdate, ColorEnemy, ReyPositionColor, null, null, true, false)) return;

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
                else if(columnaPrev !== ColumnaToMove && BoardUpdate[FilaToMove][ColumnaToMove][1] === ColorEnemy)
                    BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";

            }
        }
        
    })

}