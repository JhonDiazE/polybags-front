import { Proceso } from "./proceso";

export interface RutaProceso {

    id:number;
    proceso:Proceso;
    procesoSiguiente:Proceso;
	rutaProceso:RutaProceso;
	secuencia:number;
    numeroProcesoSiguiente:number;
    numeroProceso:number;
    estado:string;
}
