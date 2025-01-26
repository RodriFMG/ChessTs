function BuildFirstRow(RowTablero : number[][], is_white : boolean){
    
    const color : string = is_white ? 'B' :  'N';

    // Los True son para el enroque.
    return RowTablero.map((_, index) => {
        if(index === 0 || index === 7) return [4, color, true]
        else if(index === 1 || index === 6) return [3, color]
        else if(index === 2 || index === 5) return [2, color]
        else if(index == 3) return [5, color]
        else return [6, color, true]
    })

} 

function BuildSecondRow(RowTablero : number[][], is_white : boolean){

    const color : string = is_white ? 'B' :  'N';

    // El 3er booleano es para que pueda dar un 3er salto.
    return RowTablero.map(square => [square[0]+1, color, true])
}

export function BuildFichasRow(RowTablero : number[][], Row : number){

    const is_white : boolean = (Row === 0 || Row === 1) ? false : true;

    return (Row === 0 || Row === 7) ? BuildFirstRow(RowTablero, is_white) : BuildSecondRow(RowTablero, is_white) 
}