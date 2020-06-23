import { Propietario } from './propietario';
import { Local } from './local';

export class Contrato {
    _id: number;
    fecha: Date;
    propietario: Propietario;
    locales: Array<Local>;
    costoTotalAlq: number;
}
