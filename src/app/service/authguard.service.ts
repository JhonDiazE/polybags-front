import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private sessionService:SessionService,private router:Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(!this.sessionService.validate("key")){
      this.router.navigate(['/login'])
    }
    
    return this.sessionService.validate("key");

  }
}