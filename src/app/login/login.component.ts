import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from '../api/appconfig';
import { ConfigService } from '../service/app.config.service';
import { LoginService } from '../service/login.service';
import { SessionService } from '../service/session.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];
  username: string="";
  password: string="";
  
  config: AppConfig;
  
  subscription: Subscription;

  constructor(public configService: ConfigService,public loginService:LoginService,
                      private sessionService:SessionService, private router: Router,
                      private messageService: MessageService){ }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  public login(){
    this.loginService.authentication(this.username, this.password).subscribe(
      {
        next: (response)=>{
          const token = response.headers.get('Pragma');
          //const token = response.headers.get('Authorization');
    
          this.sessionService.setValue(token);
          this.sessionService.setUsername(this.username);
          if(this.sessionService.validate("key")){
            this.router.navigate(['/pages'])
          }else{
            this.messageService.add({severity:'error', summary: 'Error', 
                  detail: 'No se pudo iniciar sesion, revise sus credenciales porfavor'});
          }
        },
        error: (error)=>{
          this.messageService.add({severity:'error', summary: 'Error', 
                  detail: 'No se pudo iniciar sesion, revise sus credenciales porfavor'});
        },
        complete:()=>{

        }
      }

    );
  
  }
}
