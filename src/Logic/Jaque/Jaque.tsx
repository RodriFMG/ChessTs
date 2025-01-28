import { ReyMove } from "../FichasMove/ReyMove";
import { PiezaMove } from "./PiezaMove";

// PossibleMove: 
        // true: SI se pudo mover a la posición puesta en ReyPositionColorOrOther
        // false : NO se pudo mover a la posición puesta en ReyPositionColorOrOther
function UpdatingJaqueOrPossibleMove(colorEnemy : string, CheckDefendKing : boolean, ActuallyJaque, SetActuallyJaque, 
    PossibleMove : boolean = true){
        
    const UpdateActuallyJaque = ActuallyJaque;
    if(!CheckDefendKing){

        // Si ActuallyJaque de ese color está en JAQUE, osea es TRUE, pues que no sea necesario actualizar
        // pero si no está en JAQUE, pues sigue sin estar en JAQUE, pues que tampoco sea necesario actualizar.
        const ActuallyJaqueOrNot = PossibleMove ? !ActuallyJaque[colorEnemy] : ActuallyJaque[colorEnemy];

        // !ActuallyJaque[colorEnemy] entra solamente si es FALSE, osea no hay JAQUE para actualizarlo a True
        // si es TRUE de antes, ya no es necesario actualizar.

        // ActuallyJaque[colorEnemy] si está actualimenrte en JAQUE, pues lo actualizamos a que ya no haya JAQUE
        // en caso contrario, si no está en JAQUE, pues que siga sin estar en JAQUE para no actualizar.

        if(ActuallyJaqueOrNot){
            const AgainJaque = PossibleMove ? true : false;
            UpdateActuallyJaque[colorEnemy] = AgainJaque;
            SetActuallyJaque(UpdateActuallyJaque)
        }
        return UpdateActuallyJaque;
    }
    else return PossibleMove;

}

// IMPORTANTE:
//isJaque hace 2 cosas, si CheckDefendKing es true, pues se usará para ver si es que se puede mover a cierta posición 
// ( USADO PRINCIPALMENTE PARA VER SI SE PUEDE EVITAR UN JAQUE EN isPossibleDefendKing).
// Si CheckDefendKing es false, se usará para actualizar el estado del JAQUE, si el movimiento EVITA UN JAQUE, pues
// actualiza el estado UpdateActuallyJaque a que YA NO HAY JAQUE, si es que el movimiento sigue habiendo JAQUE, pues
// seguira estando el estado del JAQUE.

// Le cambiare el nombre despues. Esta función es para ver si una ficha puede atacar a otra en otra posición.
export function isJaque(BoardUpdate : number[][][], color : string, ReyPositionColorOrOther : [number, number], ActuallyJaque
    , SetActuallyJaque : void | null, CheckDefendKing : boolean = false, UsedTheKing : boolean = true){


        // Si retorna True, indica que si hay Jaque
        // Si retorna False, no hay Jaque.

        // UsedTheKing : booleano que controla la posibilidad de poder usar al rey para ver si hay JAQUE o no.
        // como un REY no puede JAQUEAR al otro REY, pues esto lo que permitirá es controlar que el otro REY
        // no se pueda mover a la posición ocupada por el otro REY.

        const colorEnemy = color === 'B' ? 'N': 'B';

        for(let fila = 0; fila < 8; ++fila){
            for(let columna = 0; columna < 8; ++columna){

                if(BoardUpdate[fila][columna][1] === color){
                    const Dimentions : [number, number][]= [[fila, columna], ReyPositionColorOrOther];

                    const Move = PiezaMove(BoardUpdate[fila][columna][0]);

                    // IMPORTANTE.
                    // Tengo que poner una condición para que esto vaya a continue; cuando ponga DefendsKing.
                    if(Move === ReyMove){
                        if(UsedTheKing && Move(BoardUpdate, Dimentions, false))
                            return UpdatingJaqueOrPossibleMove(colorEnemy, CheckDefendKing, ActuallyJaque, SetActuallyJaque);
                    } 
                    else if(Move(BoardUpdate, Dimentions, false))
                        return UpdatingJaqueOrPossibleMove(colorEnemy, CheckDefendKing, ActuallyJaque, SetActuallyJaque);

                }
        }
    }

    // False  si es que si se puede mover a ese lugar, sin ser atacada por alguna ficha enemiga.
    // True si no se puede mover a ese lugar, porque es atacada por alguna ficha enemiga

    // Retorna que no HAY JAQUE

    return UpdatingJaqueOrPossibleMove(colorEnemy, CheckDefendKing, ActuallyJaque, SetActuallyJaque, false)

}