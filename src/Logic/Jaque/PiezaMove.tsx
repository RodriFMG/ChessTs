import { AlfilMove } from "../FichasMove/AlfilMove";
import { CaballoMove } from "../FichasMove/CaballoMove";
import { PeonMove } from "../FichasMove/PeonMove";
import { DamaMove } from "../FichasMove/DamaMove";
import { TorreMove } from "../FichasMove/TorreMove";
import { ReyMove } from "../FichasMove/ReyMove";

import { SomeAlfilMove, SomeCaballoMove, SomeDamaMove, SomePeonMove, SomeTorreMove } from "../../Constantes/Constants";

export function PiezaMove(NumberPieza : number){
    if(NumberPieza === 1) return PeonMove;
    if(NumberPieza === 2) return AlfilMove;
    else if(NumberPieza === 3) return CaballoMove;
    else if(NumberPieza === 4) return TorreMove;
    else if(NumberPieza === 5) return DamaMove;
    else return ReyMove
}

export function PiezaPositions(NumberPieza : number) : [number, number][]{
    if(NumberPieza === 1) return SomePeonMove;
    if(NumberPieza === 2) return SomeAlfilMove;
    else if(NumberPieza === 3) return SomeCaballoMove;
    else if(NumberPieza === 4) return SomeTorreMove;
    else if(NumberPieza === 5) return SomeDamaMove

    // No debería llegar acá. (mov del rey.)
    else return []
}