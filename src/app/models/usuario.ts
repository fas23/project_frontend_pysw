export class Usuario {
    _id : number;
    usuario : string;
    password : string;
    activo : boolean;
    perfil : string;

    constructor(_id?: number, usuario?: string, password?: string, activo?: boolean, perfil?: string){
        this._id=_id;
        this.usuario=usuario;
        this.password=password;
        this.activo=activo;
        this.perfil=perfil;
    }
}
