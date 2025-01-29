import { AlfilPath } from "../Logic/Jaque/Mate/PathToJaque/AlfilPath";
import { TorrePath } from "../Logic/Jaque/Mate/PathToJaque/TorrePath";
import { PiezaMove } from "../Logic/Jaque/PiezaMove";
import { WhoPiecesAttack } from "../Logic/Jaque/WhoPiecesAttack";


// Darse cuenta que la lógica es super similar que en OnePieceAttack, IsPossibleDefendKing
// y CanDefendKing de IsPossibleDefendKing, lo cual tiene sentido
// porque acá buscamos los movimientos a mostrar que defiendan el JAQUE. Se podría generalizar esas funciones para que
// realicen lo mismo pero me da weba.

function ShowPossibleDefendJaque(BoardUpdate : number[][][], PiezaAttack : [number, number], PrevPos : [number, number], 
    ReyPositionColor : [number, number], Move, Index : number){
        
    // Crecar esto, puede que este mal...
    const Path = (PiezaAttack[0] === ReyPositionColor[0] || PiezaAttack[1] === ReyPositionColor[1]) ? TorrePath : AlfilPath; 

    const ArrayPath : [number, number][] = Path(BoardUpdate, PiezaAttack, ReyPositionColor);

    console.log(ArrayPath);
    if(ArrayPath.length === 0) return false;

    let IsPossibleDefendJaque : boolean = false;
    for(const PositionDefend of ArrayPath){
        console.log("Position: ", [PrevPos, PositionDefend])
        console.log("IsPossibleMove: ",Move(BoardUpdate, [PrevPos, PositionDefend], false))
        if(Move(BoardUpdate, [PrevPos, PositionDefend], false)){

            // Move al camino libre
            if(BoardUpdate[PositionDefend[0]][PositionDefend[1]][0] === 0)
                BoardUpdate[PositionDefend[0]][PositionDefend[1]][2] = "M";

            // Captura la ficha que causa el JAQUE.
            else BoardUpdate[PositionDefend[0]][PositionDefend[1]][Index] = "C";

            if(!IsPossibleDefendJaque) IsPossibleDefendJaque = true;
        }
    }

    return IsPossibleDefendJaque;

}

export function ShowMoveIfActuallyJaque(BoardUpdate : number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean, Color : string, ColorEnemy : string){
    
    if(!IsActuallyJaqueColor) return false;

    const PiecesAttack = WhoPiecesAttack(BoardUpdate, ColorEnemy, ReyPositionColor);

    // Luego lo pongo, es una lógcia aparte...
    if(PiecesAttack.length > 1 || PiecesAttack.length === 0) return false;

    const [FilaAttack, ColumnaAttack] = PiecesAttack[0];
    const PieceTypeAttack = BoardUpdate[FilaAttack][ColumnaAttack][0];
    const PiecePrevPos = BoardUpdate[filaPrev][columnaPrev][0];

    const Index = [1, 4, 6].includes(PieceTypeAttack) ? 3 : 2;  

    const Move = PiezaMove(PiecePrevPos);

    if(PieceTypeAttack === 1 || PieceTypeAttack === 3){
        if(Move(BoardUpdate, [[filaPrev, columnaPrev], [FilaAttack, ColumnaAttack]], false)){
            BoardUpdate[FilaAttack][ColumnaAttack][Index] = "C";
            return true;
        }
    }
    else{
        if(ShowPossibleDefendJaque(BoardUpdate, [FilaAttack, ColumnaAttack], [filaPrev, columnaPrev], ReyPositionColor,
            Move, Index)) return true;
    }

    return false;


}