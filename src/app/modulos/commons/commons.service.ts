import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonsService {

  constructor(public http: HttpClient) { }

  getAllClientes(): Observable<Cliente[]> {
    debugger;
    const url = environment.apiUrlBase + 'cliente';
    return this.http.get<Cliente[]>(url).pipe(
      catchError(e=>{
        return throwError(()=> new Error(e));
      })
    );

  }

}
