import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Categoria } from 'src/app/models/categoria';
import { Especialidad } from 'src/app/models/especialidad';
import { Linea } from 'src/app/models/linea';
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
}
