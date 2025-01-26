import { isAhogado } from "../Jaque/Ahogado/ReyAhogado";
import { isJaque } from "../Jaque/Jaque";
import { isMate } from "../Jaque/Mate/Mate";
import { WhoPiecesAttack } from "../Jaque/WhoPiecesAttack";
import { TableroMove } from "../TableroMove";

// Algo raro está pasando en el movimiento del REY.
// SE LLAMA IGUAL QUE OTRA FUNCIÓN XDXDD. (lo cambiare cuando lo suba a un repo).
export function IsPosibleMoveKing(PrevMove : [number, number], ToMove : [number, number]){

    //DIAGONALES
    const PasoHorizontal = Math.abs(PrevMove[0]-ToMove[0]);
    const PasoVertical = Math.abs(PrevMove[1]-ToMove[1]);

    // La primera condición es para el paso diagonal.
    return (PasoHorizontal === 1 && PasoVertical === 1) || 

    // La 2da condición es para el paso recto (ya sea vertical u horizontal).
    (PasoHorizontal===0 && PasoVertical===1) || (PasoHorizontal===1 && PasoVertical===0)
    ? true : false; 

}

// Cuidado con esto.
function MoveIsCorrectKing(BoardUpdate : number[][][], PrevMove : [number, number], ToMove : [number, number],
    ForMoveOrJaque : boolean = true, ReyPosition, SetReyPosition, ActuallyJaque, SetActuallyJaque : void | null,
    isEnroque : boolean = false){

    if(!ForMoveOrJaque) return true;

    const Color: string = BoardUpdate[PrevMove[0]][PrevMove[1]][1];
    const ColorEnemigo = Color === "B" ? "N" : "B";
        
    const TorrePrev : [number, number] = [ ToMove[0], ToMove[1] > PrevMove[1] ? ToMove[1]+1 : ToMove[1]-2];
    const TorreTo : [number, number] = [ PrevMove[0], ToMove[1] > PrevMove[1] ? PrevMove[1]+1 : PrevMove[1]-1];

    // Esto lo hago porque no es bueno trabajar directamente con el valor del estado.
    const UpdateReyPosition = {...ReyPosition, [Color]: ToMove}
    const BoardCopy = structuredClone(BoardUpdate)

    TableroMove(BoardCopy, PrevMove, ToMove);
    if(isEnroque) TableroMove(BoardCopy, TorrePrev, TorreTo);

    const Jaque = isJaque(BoardCopy, ColorEnemigo, UpdateReyPosition[Color], ActuallyJaque, SetActuallyJaque, true);

    // Significa que no puedo realizar el movimiento porque sino ocasionaría JAQUE.
    if(Jaque) return false;

    // Si es que si se puede realizar el movimiento, pues le paso el contenido actualizado al BoardUpdate.
    BoardUpdate.length = 0;
    BoardUpdate.push(...BoardCopy);

    if(isEnroque){ 

        // El ENROQUE puede dar JAQUE no con el REY, pero si con la torre.
        const ItsFichaJaque = isJaque(BoardUpdate, Color, UpdateReyPosition[ColorEnemigo], ActuallyJaque, SetActuallyJaque); 

        // Falta lógica de ahogado.
        if(ItsFichaJaque[ColorEnemigo]){

            const PiecesAttackKing = WhoPiecesAttack(BoardUpdate, Color, ReyPosition[ColorEnemigo])
            console.log("JAQUEE!")

            console.log("Piezan que JAQUEAN:", PiecesAttackKing);

             // Empezo a fallar esta wbda, ver y entender el isJaque.
            if(isMate(BoardUpdate, PiecesAttackKing, ReyPosition[ColorEnemigo]))
                console.log("MATE!!")

                
        }          
    };

    // El rey no puede dar JAQUE, pero si puede ocurrir que de AHOGADO al rey enemigo.
    if(isAhogado(BoardUpdate, ReyPosition[ColorEnemigo]) || isAhogado(BoardUpdate, ReyPosition[Color]))
        console.log("REY AHOGADO." )
    
    // Si es que se realiza el ENROQUE con ÉXITO, pues cambiamos las etiquetas para que ya no puedan realizar ENROQUE.
    // Darse cuenta que con que alguna de las 2 no tenga la etiqueta, ya no se puede dar el enroque.
    if(BoardUpdate[ToMove[0]][ToMove[1]][2]) BoardUpdate[ToMove[0]][ToMove[1]][2] = false;

    SetReyPosition(UpdateReyPosition);

    return true;

}

function MoveEnroque(BoardUpdate : number[][][], PrevMove : [number, number], ToMove : [number, number],
    ForMoveOrJaque : boolean = true, ReyPosition, SetReyPosition, ActuallyJaque, SetActuallyJaque : void | null, 
    WhereEnroque : string){

    const NumCasillas = WhereEnroque === "Der" ? 2 : 3;
    const Paso = WhereEnroque === "Der" ? 1 : -1;

    for(let i=1; i<=NumCasillas; ++i){
        if(BoardUpdate[PrevMove[0]][PrevMove[1]+i*Paso][0] !== 0) return false;
    }

    if(!MoveIsCorrectKing(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition,
        SetReyPosition , ActuallyJaque,
        SetActuallyJaque, true)) return false;

    return true;
    
}

function Enroque(BoardUpdate : number[][][], PrevMove : [number, number], ToMove : [number, number],
    ForMoveOrJaque : boolean = true, ReyPosition, SetReyPosition, ActuallyJaque, SetActuallyJaque : void | null){

    if(PrevMove[0] !== ToMove[0]) return false;

    // El movimiento siempre será válido se sume o se reste para la ubicación de la torre, por la Distancia
    // y como está configurado el tablero (Solo puede dar click en las cuadriculas).
    const DistanceEnroque = Math.abs(PrevMove[1] - ToMove[1]);

    if(DistanceEnroque !== 2) return false;

    // cuidado con esto, a lo mejor hace falta una mejor validación. (Para evitar errores de fuera del tablero los
    // indicex utilizados).
    if(ToMove[1]+1 > 7 || ToMove[1]-2 < 0) return false;

    if(ToMove[1] > PrevMove[1] && BoardUpdate[ToMove[0]][ToMove[1]+1][0] === 4){
        if(BoardUpdate[PrevMove[0]][PrevMove[1]][2] && BoardUpdate[ToMove[0]][ToMove[1]+1][2]){

            if(!ForMoveOrJaque) return true;

            if(!MoveEnroque(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition, SetReyPosition, 
                ActuallyJaque, SetActuallyJaque, "Der")) return false; 
                
            return true;
        }
    }
    else if(ToMove[1] < PrevMove[1] && BoardUpdate[ToMove[0]][ToMove[1]-2][0] === 4){

        if(BoardUpdate[PrevMove[0]][PrevMove[1]][2] && BoardUpdate[ToMove[0]][ToMove[1]-2][2]){

            // Fijarse bien es esto.
            if(!ForMoveOrJaque) return true;


            if(!MoveEnroque(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition, SetReyPosition, 
                ActuallyJaque, SetActuallyJaque, "Izq")) return false; 
    
            return true;
        }

    }


    return false;

}

export function ReyMove(BoardUpdate : number[][][], Dimentions : [number, number][], 
    ForMoveOrJaque : boolean = true, ReyPosition, SetReyPosition,
    ActuallyJaque, SetActuallyJaque : void | null
){
    
    const PrevMove : [number, number] = Dimentions[0];
    const ToMove : [number, number] = Dimentions[1];

    // Esta verificación es necesaria por los métodos que utilizan estas funciones.
    // para el movimiento no es necesario, ya que por el turnado, nunca fallaría esta condición.
    if(BoardUpdate[ToMove[0]][ToMove[1]][1] === BoardUpdate[PrevMove[0]][PrevMove[1]][1]) {
        console.log("entro aquí!!")
        return false;
    }

    const color: string = BoardUpdate[PrevMove[0]][PrevMove[1]][1];
    const ColorEnemigo = color === "B" ? "N" : "B";


    if(IsPosibleMoveKing(PrevMove, ToMove)) {
        if(MoveIsCorrectKing(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, ReyPosition, 
            SetReyPosition, ActuallyJaque, SetActuallyJaque)) return true;

    }
    else if(Enroque(BoardUpdate, PrevMove, ToMove, ForMoveOrJaque, 
        ReyPosition, SetReyPosition, ActuallyJaque, SetActuallyJaque)){
            return true;
    }

    return false;

}

// BUGGGGGGGGGGGGGGGGG
//AVECES EL REY ENTRA A ESTADO DE JAQUE SIN ENTRAR AL JAQUE, 