import { PiezaMove } from "./PiezaMove";

// Lo que retorna es un array de las posiciones que realizan JAQUE al REY enemigo.

// Se podría generalizar el isJaque para que retorne esta lista, pero esa función tiene más propositos que solamente
// Jaque, así que para no mezclar y complicar procesos, crearé una nueva función para ese propósito.
export function WhoPiecesAttack(BoardUpdate : number[][][], color : string, 
    ReyPositionEnemy: [number, number]) : [number, number][]{
    
    const PiecesAttackKing : [number, number][] = [];

    for(let fila=0; fila<8; ++fila){
        for(let columna=0; columna<8; ++columna){
            
            if(BoardUpdate[fila][columna][1] === color){

                const Dimentions : [number, number][]= [[fila, columna], ReyPositionEnemy];
                const Move = PiezaMove(BoardUpdate[fila][columna][0]);

                // Si no funciona, ver si el ReyMove causa problemas ... (no debería, un rey no puede dar JAQUE).
                if(Move(BoardUpdate, Dimentions, false)) PiecesAttackKing.push([fila, columna]);

            }
        }
    }

    if(PiecesAttackKing.length === 0) console.log("WTF, debería haber mínimo 1.")

    return PiecesAttackKing;

}