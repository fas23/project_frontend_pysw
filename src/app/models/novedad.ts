import { Usuario } from './usuario';
export class Novedad {
    id: number;
    Usuario: Usuario;
    Texto: string;
    estado: string;// (pendiente - procesado)

    constructor(id?:number, Usuario?: Usuario, Texto?: string, estado?: string){
        this.id = id;
        this.Usuario = Usuario;
        this.Texto = Texto;
        this.estado = estado;
    }
}
