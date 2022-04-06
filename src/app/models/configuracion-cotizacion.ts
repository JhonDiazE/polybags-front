import { ParametroEstadoGeneral } from "./parametro-estado-general";

export interface ConfiguracionCotizacion {
    id:number;
    parametroEstadoGeneral:ParametroEstadoGeneral;
	descripcion:string;
    estado:string;
    tipoCliente:string;
    estadoImpresion:string;
}
