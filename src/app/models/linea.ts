import { Empresa } from "./empresa";
import { Especialidad } from "./especialidad";
import { Unidad } from "./unidad";

export interface Linea {
    id:number;
	descripcion:string;
	codigo:string;
	estado:string;
	estadoParametroPlastico:string;
	estadoStockLote:string;
	estadoStockItem:string;
	productoVenta:boolean;
	tipoProductoVenta:string;
	unidadDefault:Unidad;
	especialidad:Especialidad;
	empresa:Empresa;
}
