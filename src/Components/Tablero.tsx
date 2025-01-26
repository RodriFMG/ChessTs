import {RowTablero} from './RowTablero'

interface BoardProps{
  board : number[][][];
  updateBoard : void;
}

// LOS PARAMETROS DE LOS COMPONENTES SE MANDAN DENTRO DE {}
export function TableroChess({board, updateBoard} : BoardProps) {
    let keySquare = 0;

    return (
        board.map( (RowBoard , fila) => {
          {keySquare+=8}
            return (
              <RowTablero fila = {fila} RowBoard={RowBoard} keyI = {keySquare} updateBoard={updateBoard}/>
            )
            
          })
    )
}