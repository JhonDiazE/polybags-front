import { DetalleRutaProceso } from "./detalle-ruta-proceso";
import { Producto } from "./producto";

export interface ControlMetrosKilosProducto {

      id:number;
	  producto:Producto;
      detalleRutaProceso:DetalleRutaProceso;
	  //usuario:Usuario;
	  productoSalida:Producto ;
	  metrosProductoTerminado:number;
	  metrosRegulacionProceso:number;
	  metrosRegulacionSiguienteProceso:number;
	  porcentajeMermaOperacional:number;
	  metrosMermaOperacional:number;
	  metrosMermaOperacionalSigProc:number;
	  metrosEntradaTotal:number;
	  metrosSalidaTotal:number;
	  gramajeSalidaProceso:number;
	  anchoMmSalidaProceso:number;
	  kilosEntradaAlmacenProceso:number;
	  kilosEntradaProcesoAnterior:number;
	  kilosEntradaTotal:number;
	  kilosSalidaProceso:number;
	  porcentajeScrapTotal:number;
	  estado:string;
	  fechaRegistro:Date ;
	  pesoMinProbeta:number;
	  pesoMaxProbeta:number;
	  observacionProceso1:string;
	  observacionProceso2:string;
	  observacionProceso3:string;
	  ubicacionBobinas:string;
	  tipoBulto:string;
	  graficoTratamiento:string;
	  cabecera1:string;
	  cabecera2:string;
	  cabecera3:string;
	  cabecera4:string;
	  cabecera5:string;
	  cabecera6:string;
	  cabecera7:string;
	  cabecera8:string;
	  dato1:string;
	  dato2:string;
	  dato3:string;
	  dato4:string;
	  dato5:string;
	  dato6:string;
	  dato7:string;
	  dato8:string;
}
