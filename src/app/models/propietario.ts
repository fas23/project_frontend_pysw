export class Propietario {    
    _id: number;
    apellido: String;
    nombres: String;
    dni: number;
    email: String;
    telefono: number;
    
    constructor(_id?: number, apellido?: String, nombres?: String, dni?: number, email?: String, telefono?: number){
        this._id=_id;
        this.apellido=apellido;
        this.nombres=nombres;
        this.dni=dni;
        this.email=email;
        this.telefono=telefono;
    }
}
