import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { AppComponent } from '../app.component';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  items: MenuItem[] = [{}];

  constructor(public appMain: AppComponent,  private sessionService:SessionService, private router: Router) { }


  ngOnInit() {
 
      this.items = [
          {
             label:'Ventas',
             icon:'pi pi-fw pi-file',
             expanded: true,
             items:[
                {
                  label:'Cotizaciones',
                  icon:'pi pi-fw pi-external-link',
                  routerLink:'/pages/ventas'
                },
                {
                   label:'New',
                   icon:'pi pi-fw pi-plus',
                   items:[
                      {
                         label:'Bookmark',
                         icon:'pi pi-fw pi-bookmark'
                      },
                      {
                         label:'Video',
                         icon:'pi pi-fw pi-video'
                      },

                   ]
                },
                {
                   label:'Delete',
                   icon:'pi pi-fw pi-trash'
                },
                {
                   separator:true
                }
             ]
          },
          {
             label:'Users',
             icon:'pi pi-fw pi-user',
             expanded: true,
             items:[
                {
                   label:'New',
                   icon:'pi pi-fw pi-user-plus',

                },
                {
                   label:'Delete',
                   icon:'pi pi-fw pi-user-minus',

                },
                {
                   label:'Search',
                   icon:'pi pi-fw pi-users',
                   items:[
                      {
                         label:'Filter',
                         icon:'pi pi-fw pi-filter',
                         items:[
                            {
                               label:'Print',
                               icon:'pi pi-fw pi-print'
                            }
                         ]
                      },
                      {
                         icon:'pi pi-fw pi-bars',
                         label:'List'
                      }
                   ]
                }
             ]
          },
          {
             label:'Events',
             icon:'pi pi-fw pi-calendar',
             expanded: true,
             items:[
                {
                   label:'Edit',
                   icon:'pi pi-fw pi-pencil',
                   items:[
                      {
                         label:'Save',
                         icon:'pi pi-fw pi-calendar-plus'
                      },
                      {
                         label:'Delete',
                         icon:'pi pi-fw pi-calendar-minus'
                      },

                   ]
                },
                {
                   label:'Archieve',
                   icon:'pi pi-fw pi-calendar-times',
                   items:[
                      {
                         label:'Remove',
                         icon:'pi pi-fw pi-calendar-minus'
                      }
                   ]
                }
             ]
          },
          {
             separator:true
          },
          {
             label:'Quit',
             icon:'pi pi-fw pi-power-off',
             command: () => this.logout()
          }
      ];
  }   
  
   onKeydown(event: KeyboardEvent) {
      const nodeElement = (<HTMLDivElement> event.target);
      if (event.code === 'Enter' || event.code === 'Space') {
         nodeElement.click();
         event.preventDefault();
      }
   }


   logout(){
      this.sessionService.destroy();
      this.router.navigate(['/login'])
       
   }
}
