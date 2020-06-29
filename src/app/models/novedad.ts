import { Usuario } from './usuario';
export class Novedad {
    id: number;
    Usuario: Usuario;
    Texto: string;
    estado: string;// (pendiente - procesado)

    constructor(){}
}
