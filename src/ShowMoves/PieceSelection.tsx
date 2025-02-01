
// Con el estado guardo las dimensiones de la pieza anterior (jugable), y le retiro su estilo que indica que esa
// pieza fue seleccionada y le agrego el estilo a la ficha actualmente seleccionada. (Con esto evito renderizar
// toda la pantalla para un simple cambio, solo agrego y elimino ese estilo).
export function PieceSelection(fila : number, columna : number, PiecePrev : [number, number], SetPiecePrev){

    // Formma como yo asigne los id a los Square xd
    const SavePiecePrev = PiecePrev;
    const keyIActually = 8 * (fila+1) + columna + 1;
    const keyIPrev = 8 * (PiecePrev[0]+1) + PiecePrev[1] + 1;

    const SquareActually = document.getElementById(keyIActually.toString())
    const SquarePrev = document.getElementById(keyIPrev.toString());

    if( SquarePrev?.classList.contains("IsActive") ) SquarePrev?.classList.remove("IsActive")
    if( !SquareActually?.classList.contains("IsActive") ) SquareActually?.classList.add("IsActive")
    
    SetPiecePrev([fila, columna])

}