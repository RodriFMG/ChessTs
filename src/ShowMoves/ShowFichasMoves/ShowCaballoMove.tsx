import { SomeCaballoMove } from "../../Constantes/Constants";
import { CaballoMove } from "../../Logic/FichasMove/CaballoMove";
import { isJaque } from "../../Logic/Jaque/Jaque";
import { WhoPiecesAttack } from "../../Logic/Jaque/WhoPiecesAttack";
import { TableroMove } from "../../Logic/TableroMove";

export function ShowCaballoMove(BoardUpdate : number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";

    // Falta ShowMoves de las posiciones que PERMMITEN EVITAR UN JAQUE...

    // Primero evaluamos si está en JAQUE el bando...
    if(IsActuallyJaqueColor){
        const PiecesAttack = WhoPiecesAttack(BoardUpdate, ColorEnemy, ReyPositionColor);

        // Esto es un caso de JAQUE mutliple, se debe usar una lógica super similar al MorePiecesAttack en 
        // isPossibleDefendKing.tsx
        if(PiecesAttack.length > 1) return;

        const [filaAttack, columnaAttack] = PiecesAttack[0];
        const Index = [1, 4, 6].includes(BoardUpdate[filaAttack][columnaAttack][0]) ? 3 : 2;

        if(CaballoMove(BoardUpdate, [[filaPrev, columnaPrev], [filaAttack, columnaAttack]], false))
            BoardUpdate[filaAttack][columnaAttack][Index] = "C";

        return;
    }


    SomeCaballoMove.forEach( CaballoMove => {

        const FilaToMove = filaPrev + CaballoMove[0];
        const ColumnaToMove = columnaPrev + CaballoMove[1];

        if(FilaToMove <=7 && FilaToMove>=0 && ColumnaToMove <= 7 && ColumnaToMove >= 0){

            const BoardCopy = structuredClone(BoardUpdate);
            TableroMove(BoardCopy, [filaPrev, columnaPrev], [FilaToMove, ColumnaToMove]);

            // Creo que el JAQUE puede ir afuera (porque a la minima 
            // que un posible movimiento falle por JAQUE pues los demás tmb creo xd)
            // , pero con esto me aseguro que funcione siempre xd.
            if(isJaque(BoardUpdate, ColorEnemy, ReyPositionColor, null, null, true, false)) return;
            
            const Index = [1, 4, 6].includes(BoardUpdate[FilaToMove][ColumnaToMove][0]) ? 3 : 2;

            if(BoardUpdate[FilaToMove][ColumnaToMove][1] === ColorEnemy) BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";
            else BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";
        } 
    })

}