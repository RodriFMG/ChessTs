import { isPossibleMovePiece } from "./FichasAhogado";

export function isPossibleMoveSomePiece(BoardUpdate : number[][][], Color : string){
    
    // Está fallando esta lógica, TESTEAR Y CAMBIARLO.
    for(let fila = 0; fila < 8; ++fila){
        for(let columna = 0; columna < 8; ++columna){
            
            // Se busca ver si alguna ficha, que no sea el rey, puede realizar un movimiento.
            if(BoardUpdate[fila][columna][1] === Color && BoardUpdate[fila][columna][0] !== 6){


                const Dimention : [number, number] = [fila, columna];
                let factor = 1;

                if(BoardUpdate[fila][columna][0] === 1) factor = (Color === "B") ? 1 : -1;

                // Si alguna ficha se puede mover exitosamente, true.
                if(isPossibleMovePiece(BoardUpdate, Dimention, factor)) return true;
            }
        }
    }


    // Esto indica que ninguna ficha se puede mover exitosamente, false.
    return false;

}