import { Injectable ,Inject } from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(@Inject(LOCAL_STORAGE) private storageService:StorageService) { }

  public setValue(value:string ):void{
    this.storageService.set("key",value) ;
  }
  public getkey():string{
    return this.storageService.get("key") ;
  }

  public validate(value:string):boolean{
    return this.storageService.has("key");
  }

  public destroy():void{
    this.storageService.clear();
  }
  public setUsername(value:string ):void{
    this.storageService.set("username",value) ;
  }
  public getUsername():string{
    return this.storageService.get("username") ;
  }

 

}