import { Empresa } from "./empresa";

export interface ParametroEstadoGeneral {

    id:number;
	empresa:Empresa;
	codigo:string;
    descripcion:string;
    tablaParametro:string;
    periodo:string;
    tipoProducto:string;
    estado:string;
    icono:string;
    numeroCapas:number;
    link:string;
    plantilla:string;
    cabecera:string;
    color:string;
    diasEntregaProyectada:number;
		
}
