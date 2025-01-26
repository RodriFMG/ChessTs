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
    value : [number, string | null];
}

export function Square({Dimentions, updateBoard, keyI, value} : SquearePros){

    const HandleSquare = () => {
        updateBoard(Dimentions[0], Dimentions[1])
    }

    return (
        <div className={styleSqueare(Dimentions[0], Dimentions[1])} style={{cursor : `${value[0] !== 0 ? 'pointer' : 'default'}`}}
         key = {++keyI} onClick={HandleSquare}> 
            {
                value[0] !== 0 && 
                <img src={FICHAS_TABLERO[value[0]]} className = { ColorImageFichas( value[1]) }></img>
            }
                            
        </div>
    )
}