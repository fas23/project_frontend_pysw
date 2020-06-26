export class Local {
    _id: number;
    superficie: number;
    imagen: string;
    alquilado: boolean;
    costomes: number;
    descripcion : string;

    constructor(_id?: number, superficie?: number, imagen?: string, alquilado?: boolean, costomes?: number, descripcion? : string){
        this._id=_id;
        this.superficie=superficie;
        this.imagen=imagen;
        this.alquilado=alquilado;
        this.costomes=costomes;
        this.descripcion=descripcion;
    }
}
