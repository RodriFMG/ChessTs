import CanMove from "../../../../Constantes/TorreMovesConditionals";

// Ya sé que el código es muy similar al TorreMove, pero mezclar ambos códigos en uno, no sería nada legible y muy poco
// manejable si empieza a fallar, diferentes parámetros y diferente retorno.

function ArrayOfPathDimentionsTorre(BoardUpdate : number[][][], PiezaAttack: [number, number], ReyPosition : [number, number]
    , MoveWhere : string) : [number, number][] {

    const PasoRecto : number = (MoveWhere === "Izq" || MoveWhere === "Der") ? 
    Math.abs(PiezaAttack[1] - ReyPosition[1]) : 
    Math.abs(PiezaAttack[0] - ReyPosition[0]);

    const [RowToPiezaAttack, ColumnToPiezaAttack] = PiezaAttack;

    // Dato: Si no se inicializa el array, se mantendrá como undefined
    const ArrayOfPath : [number, number][] = [];

    const Direction = CanMove[MoveWhere];

    // Esto funciona porque como es Jaque, se sabe que el camino desde PiezaAttack hasta ReyPosition está libre.
    // Desde 0 para rescatar tambien la posición de la
    for(let i = 0; i < PasoRecto; ++i)
        ArrayOfPath.push(Direction(BoardUpdate, RowToPiezaAttack, ColumnToPiezaAttack, i, true))
    
    return ArrayOfPath;


}

export function TorrePath(BoardUpdate : number[][][], PiezaAttack: [number, number], ReyPosition : [number, number]){

    // Se pone de sentido contrario, porque se va desde PrevMove a ToMove. (en TorreMove se va de ToMove a PrevMove)
    if( PiezaAttack[0] === ReyPosition[0] && PiezaAttack[1] > ReyPosition[1] ){
        return ArrayOfPathDimentionsTorre(BoardUpdate, PiezaAttack, ReyPosition, "Der")
    }
    else if( PiezaAttack[0] === ReyPosition[0] && PiezaAttack[1] < ReyPosition[1] ){
        return ArrayOfPathDimentionsTorre(BoardUpdate, PiezaAttack, ReyPosition, "Izq")
    }
    else if( PiezaAttack[1] === ReyPosition[1] && PiezaAttack[0] > ReyPosition[0] ){
        return ArrayOfPathDimentionsTorre(BoardUpdate, PiezaAttack, ReyPosition, "Ab")
    }
    else if( PiezaAttack[1] === ReyPosition[1] && PiezaAttack[0] < ReyPosition[0] ){
        return ArrayOfPathDimentionsTorre(BoardUpdate, PiezaAttack, ReyPosition, "Ar")
    }
    else return [];

}
