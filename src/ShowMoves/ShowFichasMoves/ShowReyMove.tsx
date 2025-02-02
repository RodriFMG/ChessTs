import { ReyMoveDistances } from "../../Constantes/Constants";
import { isJaque } from "../../Logic/Jaque/Jaque";
import { TableroMove } from "../../Logic/TableroMove";

export function ShowReyMove(BoardUpdate: number[][][], filaPrev : number, columnaPrev : number){

    const Color : string = BoardUpdate[filaPrev][columnaPrev][1];
    const ColorEnemy : string = (Color === "B") ? "N" : "B";

    ReyMoveDistances.forEach(ReyMove => {
        const FilaToMove = filaPrev + ReyMove[0];
        const ColumnaToMove = columnaPrev + ReyMove[1];

        // Para saber si está permitido, tengo que ver si hay JAQUE al asignar un M o C, en ese movimiento. Con una función
        // ya creada, puede ser con isJaque. falta enroque!!!
        if(FilaToMove <=7 && FilaToMove>=0 && ColumnaToMove <= 7 && ColumnaToMove >= 0){

            // Acá si o si debe estar dentro el isJaque, las demás puede que no porque
            // si se mueve minimamente y hay JAQUE es porque la ficha está clavada...
            const BoardCopy = structuredClone(BoardUpdate);
            TableroMove(BoardCopy, [filaPrev, columnaPrev], [FilaToMove, ColumnaToMove])

            // Puede que el ultimo booleano sea falso, chekar.
            if(isJaque(BoardCopy, ColorEnemy, [FilaToMove, ColumnaToMove], null, null, true, true)) return;

            const Index = [1, 4, 6].includes(BoardUpdate[FilaToMove][ColumnaToMove][0]) ? 3 : 2;
            if(BoardUpdate[FilaToMove][ColumnaToMove][1] === ColorEnemy)
                BoardUpdate[FilaToMove][ColumnaToMove][Index] = "C";

            // Maybe falta poner algo para evitar que se mueva a una casilla del mismo COLOR (por CSS igual no pasa nada). 
            else BoardUpdate[FilaToMove][ColumnaToMove][Index] = "M";
        } 
    })


}