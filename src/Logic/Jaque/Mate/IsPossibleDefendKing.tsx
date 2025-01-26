import { isJaque } from "../Jaque";
import { AlfilPath } from "./PathToJaque/AlfilPath";
import { TorrePath } from "./PathToJaque/TorrePath";

function CanDefendKing(BoardUpdate : number[][][], PiezaAttack : [number, number], 
    ReyPositionColor : [number, number], colorEnemy : string){
        
    // Crecar esto, puede que este mal...
    const Path = (PiezaAttack[0] === ReyPositionColor[0] || PiezaAttack[1] === ReyPositionColor[1]) ? TorrePath : AlfilPath; 

    const ArrayPath : [number, number][] = Path(BoardUpdate, PiezaAttack, ReyPositionColor);
    if(ArrayPath.length === 0) return false;


    for(const PositionDefend of ArrayPath){
        if(isJaque(BoardUpdate, colorEnemy, PositionDefend, null, null, true, false))
            return true;
    }

    return false;

}

function DamaPath(PiezaAttack : [number, number], ReyPositionColor : [number, number]){

    if(PiezaAttack[0] === ReyPositionColor[0] || PiezaAttack[1] === ReyPositionColor[1]) return TorrePath;
    else return AlfilPath;

}

function OnePieceAttack(BoardUpdate : number[][][], PiezaAttack : [number, number], 
    ReyPosition : [number, number]){

        const fila : number = PiezaAttack[0];
        const columna : number = PiezaAttack[1];
    
        const color : string = BoardUpdate[fila][columna][1];
        const colorEnemy : string = color === "B" ? "N" : "B";
    
        if(BoardUpdate[fila][columna][0] === 1 || BoardUpdate[fila][columna][0] === 3){
            if(isJaque(BoardUpdate, colorEnemy, [fila, columna], null, null, true, false)) return true;
        }
        else{
            if(CanDefendKing(BoardUpdate, PiezaAttack, ReyPosition, colorEnemy)) return true;
        }
    
        return false;
    

}

function isEqualContent(array1 : [number, number], array2 : [number, number]){
    return array1[0] === array2[0] && array1[1] === array2[1]
}

function isContain(element : [number, number], Array : [number, number][]){

    // Retorna True si alguna posición del array cumple la condición.
    // array.every(callback => condicioonal_expression) <- retorna True si TODOS las posiciones del array cumplen la condición.
    return Array.some(elementArray => isEqualContent(element, elementArray));

}

// Se parte con la idea que si se JAQUEA con 2 o más fichas diferentes, es imposible defender el JAQUE comiendo
// una ficha del JAQUE con solo un movimiento (no se tendrá en cuenta al REY).

// Por ello, si alguna de esas fichas ataca directamente al REY (caballo y peon), será imposible defender el JAQUE
// con un solo movimiento. Pero si todas las fichas son alfil, dama o torre, pues si encontramos una intersección
// en su camino del JAQUE, pues la única forma de defender el JAQUE es moviendo alguna ficha en esas posiciones.
function MorePiecesAttack(BoardUpdate : number[][][], PiezasAttack : [number, number][], 
    ReyPosition : [number, number]){

    for(const [fila, columna] of PiezasAttack){
        if(BoardUpdate[fila][columna][0] === 1 || BoardUpdate[fila][columna][0] === 3) return false;
    }
    
    // Construyo el camino que tiene cada ficha que ocasiona JAQUE, donde cada fila es el camino que tiene c/u.
    const ArrayOfPaths = PiezasAttack.map(PiezaAttack => {
        if(BoardUpdate[PiezaAttack[0]][PiezaAttack[1]][0] === 2) return AlfilPath(BoardUpdate, PiezaAttack, ReyPosition);
        else if(BoardUpdate[PiezaAttack[0]][PiezaAttack[1]][0] === 4) return TorrePath(BoardUpdate, PiezaAttack, ReyPosition);
        else return (DamaPath(PiezaAttack, ReyPosition))(BoardUpdate, PiezaAttack, ReyPosition);
    })

    const FirstPath = ArrayOfPaths[0];
    const ArrayOfIntersections : [number, number][] = [];

    // Con esta lógica, consigo un array con todas las intersecciones, el cual sería un elemento que se repite
    // EN TODOS LOS CAMINOS (CADA FILA). <-- Esto es muy díficil de testear xd.
    for(const Dimention of FirstPath){

        let ContainIntersection = true;

        for(let i = 1; i < ArrayOfPaths.length; ++i){
            if(!isContain(Dimention, ArrayOfPaths[i])){
                ContainIntersection = false;
                break;
            }
        }

        if(ContainIntersection) ArrayOfIntersections.push(Dimention);
    }

    if(ArrayOfIntersections.length === 0) return false;

    const [fila, columna] : [number, number] = ArrayOfIntersections[0];
    const colorEnemy = BoardUpdate[fila][columna][1] === "B" ? "N" : "B";

    for(const PositionDefend of ArrayOfIntersections){
        if(isJaque(BoardUpdate, colorEnemy, PositionDefend, null, null, true, false))
            return true;
    }

    return false;


}

// Lo que se espera nomas es que vea si es jaque o no, por tanto, al usar isJaque, no debería actualizar el estado.
export function IsPossibleDefendKing(BoardUpdate : number[][][], PiezaAttack : [number, number][], 
    ReyPosition : [number, number]){

    // Diría que esto ya está bien...
    if(PiezaAttack.length === 1){
        if(OnePieceAttack(BoardUpdate, PiezaAttack[0], ReyPosition)) return true;
    }
    else{
        if(MorePiecesAttack(BoardUpdate, PiezaAttack, ReyPosition)) return true;
    }

    return false;
    

}