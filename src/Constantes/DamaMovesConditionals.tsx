import CanMoveDiagonal from "./AlfilMovesConditionals";
import CanMoveRecto from "./TorreMovesConditionals";

// Recordar que los '...' sirve para que retorne todo el contenido del objeto o lista, en este caso para obtener todos los
// atributos del objeto. Si pongo directo ambos objetos, el atributo será el objeto como tal y no el contenido de ese objeto.

// Luego lo borro...
const CanMoveDama = {
    ...CanMoveDiagonal,
    ...CanMoveRecto
}

export default CanMoveDama;