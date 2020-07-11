import { Usuario } from './usuario';
export class Novedad {
    _id: number;
    usuario: Usuario;
    texto: string;
    estado: string;// (pendiente - procesado)
    fecha: Date;

    constructor(id?:number, usuario?: Usuario, texto?: string, estado?: string, fecha?:Date){
        this._id = id;
        this.usuario = usuario;
        this.texto = texto;
        this.estado = estado;
        this.fecha = fecha;
    }
}
