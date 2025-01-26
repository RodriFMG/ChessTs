import '../Styles/JugadorStyle.css'

interface DataUser{
    ImageUser : string;
    NameUser : string;
    Points : number;
    Pais : string;
}

export function JugadorTablero({ImageUser, NameUser, Points, Pais} : DataUser){

    return ( 
        <div className="JugadorInfo">
            <img src = {ImageUser} className="imgUser"></img>

            <span> 
                <strong> {NameUser} </strong> 
                <span className='Points'> ({Points}) {Pais}</span>
            </span>

        </div>
     )

}