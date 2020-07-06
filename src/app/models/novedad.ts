import { Usuario } from './usuario';
export class Novedad {
    id: number;
    usuario: Usuario;
    texto: string;
    estado: string;// (pendiente - procesado)
    fecha: Date;

    constructor(id?:number, usuario?: Usuario, texto?: string, estado?: string, fecha?:Date){
        this.id = id;
        this.usuario = usuario;
        this.texto = texto;
        this.estado = estado;
        this.fecha = fecha;
    }
}
