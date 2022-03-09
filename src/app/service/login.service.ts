import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  authentication(username: string, password: string): Observable<any> {
    const url = environment.apiUrlBase + 'login';
    let request = {
      username : username,
      password : password
    };
    
  
    return this.http.post(url, request, { observe: 'response'});

  }
}
