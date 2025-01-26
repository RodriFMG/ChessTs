import CanMove from "../../../../Constantes/AlfilMovesConditionals";

function ArrayOfPathDimentionsAlfil(BoardUpdate : number[][][], PiezaAttack: [number, number], ReyPosition : [number, number]
    , MoveWhere : string) : [number, number][] {

    const PasoDiagonal : number =  Math.abs(PiezaAttack[0] - ReyPosition[0]);
    
    if(Math.abs(PiezaAttack[1] - ReyPosition[1]) !== PasoDiagonal) return [];

    const [RowToPiezaAttack, ColumnToPiezaAttack] = PiezaAttack;

    // Dato: Si no se inicializa el array, se mantendrá como undefined
    const ArrayOfPath : [number, number][] = [];
    const Direction = CanMove[MoveWhere];

    // Esto funciona porque como es Jaque, se sabe que el camino desde PiezaAttack hasta ReyPosition está libre.
    // Desde 0 para rescatar tambien la posición de la
    for(let i = 0; i < PasoDiagonal; ++i)
        ArrayOfPath.push(Direction(BoardUpdate, RowToPiezaAttack, ColumnToPiezaAttack, i, true))
    
    return ArrayOfPath;


}

export function AlfilPath(BoardUpdate : number[][][], PiezaAttack: [number, number], ReyPosition : [number, number]){

    if(PiezaAttack[0] < ReyPosition[0] && PiezaAttack[1] < ReyPosition[1]){
        return ArrayOfPathDimentionsAlfil(BoardUpdate, PiezaAttack, ReyPosition, "ArI");
    }
    else if(PiezaAttack[0] > ReyPosition[0] && PiezaAttack[1] > ReyPosition[1]){
        return ArrayOfPathDimentionsAlfil(BoardUpdate, PiezaAttack, ReyPosition, "AbD");
    }
    else if(PiezaAttack[0] > ReyPosition[0] && PiezaAttack[1] < ReyPosition[1]){ 
        return ArrayOfPathDimentionsAlfil(BoardUpdate, PiezaAttack, ReyPosition, "AbI");
    }
    else if(PiezaAttack[0] < ReyPosition[0] && PiezaAttack[1] > ReyPosition[1]){ 
        return ArrayOfPathDimentionsAlfil(BoardUpdate, PiezaAttack, ReyPosition, "ArD");
    }
    else return [];

}