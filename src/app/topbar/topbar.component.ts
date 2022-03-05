import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { AppMainComponent } from '../app.main.component';
import { SessionService } from '../service/session.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  username:string = this.sessionService.getUsername();
  constructor(public app:AppMainComponent, private sessionService:SessionService) { }

  ngOnInit(): void {
  }

}
