import { ReyPositionTypes } from "../../Constantes/ReyInterface";
import { isAhogado } from "./Ahogado/ReyAhogado";
import { isJaque } from "./Jaque";
import { isMate } from "./Mate/Mate";
import { WhoPiecesAttack } from "./WhoPiecesAttack";

// La necesidad de hacer el BoardCopy es para recien actualizar la matriz cuando se sepa que el movimiento es VÁLIDO
// no es bueno hacerlo directamente con la matriz porque sino cuando se restablezca el cambio, realizando el SWAP
// pues si se puede comer una ficha enemiga SIENDO UN MOVIMIENTO INVÁLIDO, pues igual se la come y encima restablece su turno.

export function ItsJaqueMoment(BoardUpdate : number[][][], BoardCopy: number[][][],
     PrevMove : [number, number], ToMove : [number, number]
    ,ReyPosition : ReyPositionTypes, ActuallyJaque, SetActuallyJaque : void | null) : boolean {

        const Color : string = BoardCopy[ToMove[0]][ToMove[1]][1];
        const ColorEnemy : string =  Color === 'B' ? 'N' : 'B';
        
       
        // Jaque para identificar que si muevo esa ficha, ocasiona Jaque (o sigue en Jaque )
        // el bando contrario. (movimiento inválido).
        
        // Esto no Setea el ActuallyJaque de ese color, ya que en los 2 posibles escenarios que hay
        // Movimiento inválido porque el rey está en JAQUE y no se evita el JAQUE con ese movimiento, aca no se busca
        // actualizar el estado del Jaque, porque ya se sabe que está en JAQUE.

        // El otro escenario sería que al mover una ficha ocasiona JAQUE (ficha clavada), tampoco se buscaría actualizar
        // el estado de ActuallyJaque para ese color, solo decir que no se puede mover y ya (ya que si
        // no se guardaría JAQUE para ese color pero sin realizar el movimiento)
        const Jaque = isJaque(BoardCopy, ColorEnemy, ReyPosition[Color], null, null, true, false);
        let CopyActuallyJaque = {...ActuallyJaque}

        // En caso sea movimiento INVÁLIDO POR JAQUE, pues no actualizo el BoardUpdate.
        if(Jaque) {
            console.log("No se puede mover por JAQUE", CopyActuallyJaque);     
            return true;
        }
        else{
            // Si la ficha estaba en JAQUE y el movmiento EVITA Ese JAQUE, pues actualizamos a FALSE.
            if(ActuallyJaque[Color]) CopyActuallyJaque[Color] = false;
        }

        // Con esta manera, me aseguro que los cambios se reflejen, hacerlo de otra manera, no es seguro (no prevalecen los
        // cambios).
        BoardUpdate.length = 0;
        BoardUpdate.push(...BoardCopy);

        // Si algo falla, maybe sea porque tenga que poner acá BoardCopy en vez de BoardUpdate, porque no se reflejan
        // los cambios a tiempo, aunque sería raro que pase.

        // Esto se encarga de SETEAR la actaulización si el movimiento evita el JAQUE y/o ese mismo movimiento
        // causa JAQUE al rival.
        const ItsFichaJaque = isJaque(BoardUpdate, Color, ReyPosition[ColorEnemy], CopyActuallyJaque, SetActuallyJaque)

        // Si el Bando enemigo está en Jaque, pues averiguamos si es MATE.
        if(ItsFichaJaque[ColorEnemy]){

            const PiecesAttackKing = WhoPiecesAttack(BoardUpdate, Color, ReyPosition[ColorEnemy])
            console.log("JAQUEE!")

            //console.log("Piezan que JAQUEAN:", PiecesAttackKing);

             // Empezo a fallar esta wbda, ver y entender el isJaque.
            if(isMate(BoardUpdate, PiecesAttackKing, ReyPosition[ColorEnemy]))
                console.log("MATE!!") // Falta colocar estados que controlen esto... ( y para el AHOGADO tmb ).

                
        }
        else{

            if(isAhogado(BoardUpdate, ReyPosition[ColorEnemy]) || isAhogado(BoardUpdate, ReyPosition[Color]))
                console.log("REY AHOGADO.")
            
        }
        
        //console.log(CopyActuallyJaque)
        return false;


}

// ActuallyJaque, SE SACA EL BANDO SEGÚN EL COLOR DE LA FICHA A MOVER O PUESTO EN isJaque.

// si en el bando es True, indica que actualmente HAY JAQUE con esa tabla.
// si en el bando es False, indica que actualmente NO HAY JAQUE con esa tabla.

// VERR

// Esta función es potente, ya que si al mover una ficha hace que sea JAQUEADO por otra ficha del bando contrario pues
// no permite moverlo. (en base a una copia de la matriz pero con el cambio ya hecho, viendo si es que hay JAQUE con esa
// matriz). <-- Pasa en ActuallyJaque de false a true en ese bando (si es que hay jaque). Sino se queda con el false.

// PERO TAMBIEN, SI ESTÁ EN JAQUE EL REY, PUES SI ALGUNA OTRA FICHA SE MUEVE PERO NO EVITA EL JAQUE, PUES
// NO SE PUEDE MOVER HASTA MOVER OTRA QUE EVITE EL JAQUE O AL REY. (ESTO GRACIAS TAMBIEN AL ESTADO DE ACTUALLYJAQUE,
// QUE GUARDA QUE YA ESTÁ EN JAQUE, Y le ISJAQUE, al moviento lo puede seguir poniendo en JAQUE, o actualizar
// el estado para que DIGA QUE NO HAY JAQUE). pasa en ActuallyJaque de true a false en ese bando (Si es que se evita el jaque),
// sino se queda con el true.

// Y SI ES VÁLIDO EL MOVIMIENTO, PUES EVALUA, SI ES QUE CON ESE MOVIENTO OCASIONA JAQUE AL RIVAL. (LO PUSE
// SOLO PARA UN JAQUE DE UNA SOLA FICHA, PERO TENGO QUE CAMBIARLO PARA JAQUE CON MULTIPLES FICHAS AL MISMO TIEMPO
// PERO LA LÓGICA ES SIMILAR, SOLO CAMBIAR isJAQUE PARA QUE RETORNA UNA LISTA DE TODAS LAS FICHAS QUE HACEN JAQUE
// AL RIVAL, Y EVALUAR CON LA MISMA LÓGICA PERO CON TODAS LAS POSICIONES INVALIDADAS POR LAS MULTIPLES FICHAS)

// SI HAY JAQUE, PUES EVALUA ADEMÁS SI HAY MATE O NO, SI NO LO HAY SIGNIFICA QUE HAY MOVIMIENTO VÁLIDO QUE PUEDE HACER
// EL RIVAL

// SOLO HAY QUE CAMBIAR LO DEL JAQUE - MATE (CUANDO EL MOVIMIENTO ES VÁLIDO), LO DEMÁS ESTÁ BIEN (ESO ESPERO).