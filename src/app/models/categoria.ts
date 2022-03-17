import { Linea } from "./linea";

export interface Categoria {

    id:number;
	linea:Linea;
	descripcion:string;
	codigo:string;
	estado:string;
	densidad:number;
}
