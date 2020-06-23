export class Usuario {
    _id: number
    usuario: string;
    password: string;
    activo: boolean;
    perfil: string; //(administrativo, propietario)

    constructor(){}
}
