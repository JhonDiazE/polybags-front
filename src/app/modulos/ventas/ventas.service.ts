import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { ConfiguracionCotizacion } from 'src/app/models/configuracion-cotizacion';
import { DetalleConfiguracionCotizacion } from 'src/app/models/detalle-configuracion-cotizacion';
import { Especialidad } from 'src/app/models/especialidad';
import { Linea } from 'src/app/models/linea';
import { ParametroEstadoGeneral } from 'src/app/models/parametro-estado-general';
import { Unidad } from 'src/app/models/unidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(public http: HttpClient) { }


  getEspecialidadForCotizacion(): Observable<Especialidad[]> {
    let estadoPt = 'S';
    const url = environment.apiUrlBase + 'especialidad/cotizacion?idEmpresa='+environment.idEmpresa+'&estadoPt='+estadoPt;
    return this.http.get<Especialidad[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );

  }

  getLineaByEspecialidad(especialidad:Especialidad): Observable<Linea[]> {
    const url = environment.apiUrlBase + 'linea/especialidad?idEmpresa='+environment.idEmpresa+'&idEspecialidad='+especialidad.id;
    return this.http.get<Linea[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );
  }

  getCategoriaByLinea(linea:Linea): Observable<Categoria[]> {
    const url = environment.apiUrlBase + 'categoria/linea?idLinea='+linea.id;
    return this.http.get<Categoria[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );
  }

  getUnidad(): Observable<Unidad[]> {
    const url = environment.apiUrlBase + 'unidad';
    return this.http.get<Unidad[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );
  }

  getParametroGeneralForCotizacion(): Observable<ParametroEstadoGeneral[]> {
    const url = environment.apiUrlBase + 'parametroEstadoGeneral/cotizacion?tablaParametro=TIPO_PRODUCTO_COTIZACION';
    return this.http.get<ParametroEstadoGeneral[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );
  }

  getConfiguracionCotizacion(parametroEstadoGeneral:ParametroEstadoGeneral, estadoImpresion:string): Observable<ConfiguracionCotizacion[]> {
    const url = environment.apiUrlBase + 'configuracionCotizacion/parametroEstadoGeneral?idParametroEstadoGeneral='+parametroEstadoGeneral.id  +'&estadoImpresion='+estadoImpresion;
    return this.http.get<ConfiguracionCotizacion[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );
  }

  getDetalleConfiguracionCotizacion(configuracionCotizacion:ConfiguracionCotizacion ): Observable<DetalleConfiguracionCotizacion[]> {
    const url = environment.apiUrlBase + 'detalleConfiguracionCotizacion/configuracionCotizacion?idConfiguracionCotizacion='+configuracionCotizacion.id ;
    return this.http.get<DetalleConfiguracionCotizacion[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );
  }
}
