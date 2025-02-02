import { useState, Fragment, useRef, useEffect } from 'react'
import './Styles/App.css'
import { TableroChess } from './Components/Tablero'
import { BuildFichasRow, OtherRows } from './Logic/BuildTablero'
import { PeonMove } from './Logic/FichasMove/PeonMove'
import { AlfilMove } from './Logic/FichasMove/AlfilMove'
import { TorreMove } from './Logic/FichasMove/TorreMove'
import { DamaMove } from './Logic/FichasMove/DamaMove'
import { CaballoMove } from './Logic/FichasMove/CaballoMove'
import { ReyMove } from './Logic/FichasMove/ReyMove'
import { ReyPositionTypes } from './Constantes/ReyInterface'
import { JugadorTablero } from './Components/Jugador'
import { ShowMoves } from './ShowMoves/ShowMove'
import { ClearShowMoves } from './ShowMoves/ClearShowMoves'
import { PieceSelection } from './ShowMoves/PieceSelection'

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
    const Tablero = Array.from({length : 8}, () => Array(8).fill([0, 'T', 'N']))

     //Aún falta LocalStorage, esto es solamente la inicialización

     const TableroFichasInicializadas : number[][][]
     = Tablero.map((rowBoard, index) => [0, 1, 6, 7].includes(index) ? BuildFichasRow(rowBoard, index) : OtherRows(rowBoard))

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

  // El useRef sirve básicamente para rescatar el valor automático del cambio de valor de un estado (usado principalmente)
  // osea se sabe que si en un estado, se setea su valor, este no se podría usar libremente por la concurrencia 
  // por tanto, si se usa useRef solucionamos este problema y podremos usar el valor del estado cambiado.

  // sería la sintaxis del useRef  useRef(variable del estado), donde el data type donde se guarde será el mismo
  // que el data type del dato puesto.
  const IsJaqueMoment = useRef(ActuallyJaque);

  // Recordar que se crea otra Ejeución paralela en el useEffect cuando CAMBIA EL VALOR DEL ESTADO (OSEA CUANDO
  // SE SETEA UN ESTADO, SE ACTIVA ESTA FUNCIÓN)
  useEffect(() => {

    // Con useRef.current rescato el VALOR QUE VA A CONTENER esa variable con el valor despues del SETEO.

    // esto funciona porque useEffect se activa cuando ocurre un cambio en el valor del estado por SETEO
    // con useRef rescato INMEDIATAMENTE ESE VALOR, sin tener que esperar al paralelismo.
    
    // Una vez hecho esto, si ese valor del estado lo necesito para un futuro, pues con useEffect y useRef
    // en useRef, la variable almacenará el valor actualizado del estado para usarlo libremente en el programa post SETEO.

    // Para almacenar ese valor y usarlo, se usa SIEMPRE useRef.current, con eso ACEDO AL VALOR ACTUALIZADO DEL ESTADO.
    IsJaqueMoment.current = ActuallyJaque;

    // Recordar que la sintaxis del useEffect es useEffect(callback, [estado a cambiar]), donde si se cambia uno
    // se activa el useEffect, y si se pone una lista vacia se activa siempre en cada renderización
  }, [ActuallyJaque])

  // Estado para cambiar de turnos entre blancas y negras.
  const [WhoIsTurn, SetWhoIsTurn] = useState<string>('B');

  const [PiecePrevSelected, SetPiecePrevSelected] = useState<[number, number]> ([0,0])

  //Array.from({length : 8}, () => Array(8).fill(0))

  const MovimientoFicha = (BoardUpdate : number[][][], fila : number, columna : number) => {

    const NumClickUpdate = numClicked+1;
    setNumClicked(NumClickUpdate);
    const IsTurn = WhoIsTurn

    console.log(`Es turno de: ${IsTurn === 'B' ? 'Blancas' : 'Negras'}`)

    if (NumClickUpdate === 1) {

      if(BoardUpdate[fila][columna][0] !== 0) PieceSelection(fila, columna, PiecePrevSelected, SetPiecePrevSelected);
      

      if(BoardUpdate[fila][columna][0] === 0 || BoardUpdate[fila][columna][1] !== IsTurn) setNumClicked(0)
      else {
          const color : string = BoardUpdate[fila][columna][1];
          ShowMoves(BoardUpdate, [fila, columna], ReyPosition[color], ActuallyJaque[color]);
          setDimentionsFicha(() => [fila, columna]);
      }
      // Cuando el NumClick sea 1, debo poner estilos para mostrar los posibles movimientos.
  

    }

    if(BoardUpdate[DimentionsFicha[0]][DimentionsFicha[1]][1] === IsTurn){

      if(NumClickUpdate === 2){ 
  
        const PrevMove : [number, number] = DimentionsFicha;
        const ToMove : [number, number] = [fila, columna];
  
        setDimentionsFicha(ToMove)

        if(BoardUpdate[fila][columna][0] !== 0) PieceSelection(fila, columna, PiecePrevSelected, SetPiecePrevSelected);
  
        // Significa que se esta moviendo a una misma ficha o una ficha del mismo color.
        if(BoardUpdate[PrevMove[0]][PrevMove[1]][1] === BoardUpdate[ToMove[0]][ToMove[1]][1]) {
          setDimentionsFicha(ToMove);

          const color : string = BoardUpdate[fila][columna][1];
          ShowMoves(BoardUpdate, [fila, columna], ReyPosition[color], ActuallyJaque[color]);
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

        //

        setNumClicked(0);
        
        // Acá se debe rescatar correctamente si HAY JAQUE ACTUALMENTE, una vez hec
        if(!ItsCorrectMove && IsJaqueMoment.current[color]){

          console.log("Entro...")

          const KeyId = 8 * (ReyPosition[color][0] + 1) + ReyPosition[color][1] + 1;
          const SquareKing = document.getElementById(KeyId.toString());

          // Wtf se puede dropear un addEventListener desde su propio callback cuando ocurra el evento,
          // esto es escencial para no sobrecargar de eventos a un mismo elemento.
          const AnimationController = () => {
            SquareKing?.classList.remove("jaque");
            SquareKing?.removeEventListener("animationend", AnimationController);

          }

          // Agrego al rey actual la animación de movimiento inválido por JAQUE y cuando acabe la animación
          // la remuevo, tanto el estilo como el evento.
          SquareKing?.classList.add("jaque");
          SquareKing?.addEventListener("animationend", AnimationController)

        }

        // Los movimientos de las fichas retornan true o false.
        // true: se puede mover la ficha correctamente.
        // false: no se puede mover la ficha a esa cuadricula o si esta en jaque, esa ficha no evita el jaque enemigo.

        // Tener en cuenta que si se realiza un movimiento incorrecto, el ItsCorrectMove será siempre false, y 
        // nunca actualizará el turno.
        if(ItsCorrectMove) {
          SetWhoIsTurn(IsTurn === 'B' ? 'N' : 'B');

          // Para que desaparezca el estilo una vez realizado el movimiento correcto.
          const KeyActually = 8 * (PiecePrevSelected[0]+1) + PiecePrevSelected[1] + 1;
          const SquareActually = document.getElementById(KeyActually.toString())
          SquareActually?.classList.remove("IsActive")

          const KeyToMove = 8 * (fila + 1) + columna + 1;
          const SquareToMove = document.getElementById(KeyToMove.toString())
          SquareToMove?.classList.remove("IsActive")

        }
  
        // Esto controla la limpia de la pantalla cuando se da un movimiento CORRECTO como INCORRECTO, ya que
        // eso se buscará reflejar.
        ClearShowMoves(BoardUpdate);
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

  const imgURL1 = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT1CHU89JJjZAqF7jfzJTCQAjcoQ81bg03VDWnHN02T5W8AalRL0Qp_Dm3GDJ_hL-XQs8oir2Wn_d5L2EhvhQTMfE_3JbHioUOrQsI6Lg"
  const imgURL2 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv6usYKYNIjA4nerdBOnOk0L49oKa5R_cseDG5Lm4on0BOgKesvi0u_5nHz7RjJCiU5hs&usqp=CAU"

  return (
    <Fragment>
      <main className = "Tablero">

        <JugadorTablero ImageUser={imgURL1} NameUser='Juan' Points={650} Pais = "🇵🇪"/>

        <section className = "Game">
              <TableroChess board = {board} updateBoard={updateBoard}/>
        </section>

        <JugadorTablero ImageUser={imgURL2} NameUser='Rodrigo' Points={500} Pais = "🇵🇪"/>

      </main>

      <div className='Turn'>
        <div className={`TurnBlack ${WhoIsTurn === "N" ? "" : "NotIsTurnBlack"}`}></div>
        <div className={`TurnWhite ${WhoIsTurn === "B" ? "" : "NotIsTurnWhite"}`}></div>
      </div>
    </Fragment>


  )
}

export default App
