import { ShowAlfilMove } from "./ShowAlfilMove";
import { ShowTorreMove } from "./ShowTorreMove";


export function ShowDamaMOve(BoardUpdate: number[][][], filaPrev : number, columnaPrev : number, 
    ReyPositionColor : [number, number], IsActuallyJaqueColor : boolean){

    ShowTorreMove(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, IsActuallyJaqueColor);
    ShowAlfilMove(BoardUpdate, filaPrev, columnaPrev, ReyPositionColor, IsActuallyJaqueColor);

}