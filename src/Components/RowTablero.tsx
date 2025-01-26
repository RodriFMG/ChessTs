import { Square } from './Squeare'

interface RowBoardProps {
    RowBoard : number[][];
    keyI : number;
    fila : number;
    updateBoard : void ;
}

export function RowTablero({RowBoard, keyI, fila, updateBoard} : RowBoardProps){

     return (
        RowBoard.map(( value, columna ) => {
            return (
                  <Square Dimentions={[fila, columna]} keyI={++keyI} value={value} updateBoard={updateBoard}/>
                    
                )
        })
    )
}