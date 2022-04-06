import { Categoria } from "./categoria";
import { ConfiguracionCotizacion } from "./configuracion-cotizacion";
import { Proceso } from "./proceso";

export interface DetalleConfiguracionCotizacion {
    id:number;
	categoria:Categoria;
	configuracionCotizacion:ConfiguracionCotizacion;
	estado:string;
	proceso:Proceso;
	anchoAdicionalRefile:number;

}
