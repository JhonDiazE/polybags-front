import { Empresa } from "./empresa";

export interface Especialidad {
    
    id:number;
	empresa:Empresa;
	estadoCamposPt:string;
	descripcion:string;
	codigo:string;
	estado:string;
}
