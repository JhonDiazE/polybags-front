import { Component, AfterViewInit, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { ConfigService } from './service/app.config.service';
import { AppConfig } from './api/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMainComponent implements  OnInit {

    menuClick: boolean;
    public menuActiveMobile: boolean;
    public overlayMenuActive: boolean;
    public staticMenuInactive: boolean = false;
    public topMenuActive: boolean;
    subscription: Subscription;
    config: AppConfig;
    
    constructor(public app: AppComponent, public configService: ConfigService) { }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);

    }

    toggleMenu(event: Event) {
      this.menuClick = true;

      if (this.isDesktop()) {
          if (this.app.menuMode === 'overlay') {
              if(this.menuActiveMobile === true) {
                  this.overlayMenuActive = true;
              }

              this.overlayMenuActive = !this.overlayMenuActive;
              this.menuActiveMobile = false;
          }
          else if (this.app.menuMode === 'static') {
              this.staticMenuInactive = !this.staticMenuInactive;
          }
      }
      else {
          this.menuActiveMobile = !this.menuActiveMobile;
          this.topMenuActive = false;
      }

      event.preventDefault();
  }



  isStatic() {
    return this.app.menuMode === 'static';
  }

  isOverlay() {
      return this.app.menuMode === 'overlay';
  }

  isDesktop() {
      return window.innerWidth > 992;
  }

  isMobile(){
      return window.innerWidth < 1024;
  }
}
