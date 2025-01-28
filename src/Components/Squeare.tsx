import {FICHAS_TABLERO} from '../Constantes/Constants'

const styleSqueare = (i1 : number, i2 : number) => {
    if(i1%2==0) return i2%2==0 ? 'white-square' : 'green-square'
    else return i2%2==0 ? 'green-square' : 'white-square'
}

const ColorImageFichas = ( ColorFicha : string | null) => {
  if(ColorFicha) return ColorFicha === 'B' ? 'FichasBlancas' : 'FichasNegras';
  return null;
}

interface SquearePros {
    Dimentions : [number, number];
    updateBoard : void;
    keyI : number;
    value : [number, string, boolean, string | null];
}

export function Square({Dimentions, updateBoard, keyI, value} : SquearePros){

    const HandleSquare = () => {
        updateBoard(Dimentions[0], Dimentions[1])
    }

    let ShowMoves : string = ""

    if(value[0] === 0){
        if(value[2] === "M") ShowMoves = "Move"    
    }
    else if(value[0] === 1 || value[0] === 4 || value[0] === 6){
        if(value[3] === "C") ShowMoves = "Capture"
        // Etiqueta si se realiza un movimiento invalido en medio JAQUE.
        else if(value[3] === "A") ShowMoves = "Attack" 
    }
    else{
        if(value[2] === "C") ShowMoves = "Capture"
    }

    return (
        <div className={`${styleSqueare(Dimentions[0], Dimentions[1])}`} style={{cursor : `${value[0] !== 0 ? 'pointer' : 'default'}`}}
         key = {++keyI} onClick={HandleSquare}> 
            {
                value[0] !== 0 && 
                <img src={FICHAS_TABLERO[value[0]]} className = { ColorImageFichas( value[1]) }></img>
            }
            {
                ShowMoves !== "" &&
                <div className={ShowMoves}></div>
            }
                            
        </div>
    )
}