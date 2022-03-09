import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SessionService } from '../service/session.service';
//import { SesionLocalService } from '../seguridad/sesion-local.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private sessionService:SessionService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
     let token = this.sessionService.getkey();

     if (token != null) {
       const authReq = req.clone({
         headers: req.headers.set('Authorization', token)
       });

       return next.handle(authReq);
    }
    //console.log("Intecec",req.headers);
    return next.handle(req);
  }
}
