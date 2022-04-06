import { Categoria } from "./categoria";
import { Proceso } from "./proceso";
import { Producto } from "./producto";

export interface DesarrolloEstructura {
    id:number;
	//Usuario usuario;
	//Usuario usuarioMod;
	categoria:Categoria;
	producto:Producto;
	proceso:Proceso ;
	densidad:number;
    espesorMicras:number;
    gramaje:number;
    porcentajeEstructura:number;
    estado:string;
    //fechaRegistro:Date ;
    //fechaModificacion:Date ;
    espesorMilPul:number;
    orden:number;
    estadoFijo:string;
    anchoMm:number;
    cantidadKilosNormal:number;
    cantidadKilosRefile:number;
    cantidadKilosConrefile:number;
    cantidadMetrosPt:number;
    cantidadMetrosRegulacionProceso:number;
    cantidadMetrosMermaOperacional:number;
    cantidadMetrosEntrada:number;
    cantidadKilosRegulacion:number;
    cantidadKilosMermaOperacional:number;
    cantidadKilosEntradaTotal:number;
    anchoAdicionalRefile:number;
}
