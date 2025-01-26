import { useState } from 'react'
import './App.css'
import { TableroChess } from './Components/Tablero'
import { BuildFichasRow } from './Logic/BuildTablero'
import { PeonMove } from './Logic/FichasMove/PeonMove'
import { TableroMove } from './Logic/TableroMove'
import { AlfilMove } from './Logic/FichasMove/AlfilMove'
import { TorreMove } from './Logic/FichasMove/TorreMove'
import { DamaMove } from './Logic/FichasMove/DamaMove'
import { CaballoMove } from './Logic/FichasMove/CaballoMove'
import { ReyMove } from './Logic/FichasMove/ReyMove'
import { isJaque } from './Logic/Jaque/Jaque'
import { ReyPositionTypes } from './Constantes/ReyInterface'

function App() {
  
  /*
   - Lo que hace el Array.fill() es rellenar de elementos cada fila, por tanto, si cada fila lo rellenamos de un array
    pues formamos una matriz.

   - Con from, puedo inicilizar el array iterativamente, tal que sería desde 0 hasta 7, cree un array de 
    tamaño 8 en cada iteración. (con esto, se tendra acceso a los métodos de Array en un SubArray)

   - Similar a c++, para declarar los type's de la función, se pone name_function<types...>(params...)
  */


   // Estado del Tablero
  const [board, setBoard] = useState<number[][][]>
  (() => {
    const Tablero = Array.from({length : 8}, () => Array(8).fill([0, 'T']))

     //Aún falta LocalStorage, esto es solamente la inicialización

     const TableroFichasInicializadas : number[][][]
     = Tablero.map((rowBoard, index) => [0,1,6,7].includes(index) ? BuildFichasRow(rowBoard, index) : rowBoard)

     console.log(TableroFichasInicializadas)

    return TableroFichasInicializadas
  })

  // Estado Para el Movimiento del Tablero
  const [numClicked, setNumClicked] = useState<number>(0)

  // Estado para identificar la ficha actual a usar.
  const [DimentionsFicha, setDimentionsFicha] = useState<[number, number]>([7, 4])

  // Estado para guardar la posición actual del rey en cada posición.
  const [ReyPosition, SetReyPosition] = useState<ReyPositionTypes>( {
    N : [0, 4],
    B : [7, 4],
  } )

  // Estado para guardar si es que sigue en Jaque o NO.
  const [ActuallyJaque, SetActuallyJaque] = useState({
    N : false,
    B : false
  })

  // Estado para cambiar de turnos entre blancas y negras.
  const [WhoIsTurn, SetWhoIsTurn] = useState<string>('B');

  //Array.from({length : 8}, () => Array(8).fill(0))

  const MovimientoFicha = (BoardUpdate : number[][][], fila : number, columna : number) => {

    const NumClickUpdate = numClicked+1;
    setNumClicked(NumClickUpdate);
    const IsTurn = WhoIsTurn

    console.log(`Es turno de: ${IsTurn === 'B' ? 'Blancas' : 'Negras'}`)

    if (NumClickUpdate === 1) {

      if(BoardUpdate[fila][columna][0] === 0 || BoardUpdate[fila][columna][1] !== IsTurn) setNumClicked(0)

      // Cuando el NumClick sea 1, debo poner estilos para mostrar los posibles movimientos.
      setDimentionsFicha(() => [fila, columna])

    }

    if(BoardUpdate[DimentionsFicha[0]][DimentionsFicha[1]][1] === IsTurn){

      if(NumClickUpdate === 2){ 
  
        const PrevMove : [number, number] = DimentionsFicha;
        const ToMove : [number, number] = [fila, columna];
  
        setDimentionsFicha(ToMove)
  
        // Significa que se esta moviendo a una misma ficha o una ficha del mismo color.
        if(BoardUpdate[PrevMove[0]][PrevMove[1]][1] === BoardUpdate[ToMove[0]][ToMove[1]][1]) {
          setDimentionsFicha(ToMove)
          setNumClicked(1);
          return;
        }
  
        // Falta método de validación del movimiento.
  
        const Dimentions : [number, number][] = [PrevMove, ToMove]
        const color : string = BoardUpdate[PrevMove[0]][PrevMove[1]][1]
        let ItsCorrectMove : boolean;
  
        // Si en el Jaque, la ficha puede comer otra pieza enemiga, pues se la come y sigue en esa posición
        // para el Jaque, tengo que evitar que no se mueva a las casillas en blanco o inclusive a las que
        // hay otras piezas, porque sino las come, mantiene su turno y su lugar.
        if(BoardUpdate[PrevMove[0]][PrevMove[1]][0] === 1)
            ItsCorrectMove = PeonMove(BoardUpdate, Dimentions, true, ReyPosition, ActuallyJaque, SetActuallyJaque)

        else if(BoardUpdate[PrevMove[0]][PrevMove[1]][0] === 2) 
            ItsCorrectMove = AlfilMove(BoardUpdate, Dimentions, true, ReyPosition, ActuallyJaque, SetActuallyJaque)

        else if(BoardUpdate[PrevMove[0]][PrevMove[1]][0] === 3)
            ItsCorrectMove = CaballoMove(BoardUpdate, Dimentions, true, ReyPosition, ActuallyJaque, SetActuallyJaque)
          
        else if(BoardUpdate[PrevMove[0]][PrevMove[1]][0] === 4) 
            ItsCorrectMove = TorreMove(BoardUpdate, Dimentions, true, ReyPosition, ActuallyJaque, SetActuallyJaque)

        else if(BoardUpdate[PrevMove[0]][PrevMove[1]][0] === 5) 
            ItsCorrectMove = DamaMove(BoardUpdate, Dimentions, true, ReyPosition, ActuallyJaque, SetActuallyJaque)
          
        else if(BoardUpdate[PrevMove[0]][PrevMove[1]][0] === 6) 
            ItsCorrectMove = ReyMove(BoardUpdate, Dimentions, true
          ,ReyPosition, SetReyPosition, ActuallyJaque, SetActuallyJaque);

  
        // Esto no es necesario, ya que en cada movimiento valido aplico el JAQUE.
        // const ColorEnemigo : string = color === 'B' ? 'N' : 'B';
        // isJaque(BoardUpdate, color, ReyPosition[ColorEnemigo], ActuallyJaque, SetActuallyJaque);
        
        setNumClicked(0);

        if(!ItsCorrectMove) console.log("Es un movimiento incorrecto.")

        // Los movimientos de las fichas retornan true o false.
        // true: se puede mover la ficha correctamente.
        // false: no se puede mover la ficha a esa cuadricula o si esta en jaque, esa ficha no evita el jaque enemigo.
        if(ItsCorrectMove) SetWhoIsTurn(IsTurn === 'B' ? 'N' : 'B');
  
      }
    }
    

  }

  const updateBoard = (fila : number, columna : number) => {

    // mas seguro que [...board], ya que es una copia profunda, ver si esto no ocasiona cambios.
    const BoardUpdate = structuredClone(board);

    // Lo que se hace, es modificar el BoardUpdate con el cambio para despues setearlo.
    MovimientoFicha(BoardUpdate, fila, columna);

    // Falta mejora... Acá entra en cada click, solo quiero que entre cuando ubo un movimiento real.
    setBoard(BoardUpdate)

  }

  return (
    <main>
      <header> Chess2 </header>

      <section className = "tablero">
        <TableroChess board = {board} updateBoard={updateBoard}/>
      </section>

      
    </main>
  )
}

export default App
