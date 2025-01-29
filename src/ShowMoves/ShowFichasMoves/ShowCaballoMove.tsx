import { SomeCaballoMove } from "../../Constantes/Constants";
import { isJaque } from "../../Logic/Jaque/Jaque";
import { TableroMove } from "../../Logic/TableroMove";
import { ShowMoveIfActuallyJaque } from "../ShowMoveActuallyJaque";

export function ShowCaballoMove(BoardUpdate : number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";

    if(ShowMoveIfActuallyJaque(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, IsActuallyJaqueColor, Color, ColorEnemy)) 
            return;


    SomeCaballoMove.forEach( CaballoMove => {

        const FilaToMove = filaPrev + CaballoMove[0];
        const ColumnaToMove = columnaPrev + CaballoMove[1];

        if(FilaToMove <=7 && FilaToMove>=0 && ColumnaToMove <= 7 && ColumnaToMove >= 0){

            const BoardCopy = structuredClone(BoardUpdate);
            TableroMove(BoardCopy, [filaPrev, columnaPrev], [FilaToMove, ColumnaToMove]);

            // Creo que el JAQUE puede ir afuera (porque a la minima 
            // que un posible movimiento falle por JAQUE pues los demás tmb creo xd)
            // , pero con esto me aseguro que funcione siempre xd.

            // Acá dentro se debe poner la lógica de la posición que permite evitar el JAQUE. (Si o si va a denro
            // del forEach, para mezclar movimientos que evitan el JAQUE y otros que directamente eliminan el JAQUE al comer
            // esa ficha).
            if(isJaque(BoardCopy, ColorEnemy, ReyPositionColor, null, null, true, false)) return;
            
            const Index = [1, 4, 6].includes(BoardUpdate[FilaToMove][ColumnaToMove][0]) ? 3 : 2;

            if(BoardUpdate[FilaToMove][ColumnaToMove][1] === ColorEnemy) BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";
            else BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";
        } 
    })

}