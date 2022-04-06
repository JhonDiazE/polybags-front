import { Proceso } from "./proceso";
import { RutaProceso } from "./ruta-proceso";

export interface DetalleRutaProceso {

    id:number;
    proceso:Proceso;
    procesoSiguiente:Proceso;
    rutaProceso:RutaProceso;
    secuencia:number;
    numeroProcesoSiguiente:number;
    numeroProceso:number;
    estado:string;
}
