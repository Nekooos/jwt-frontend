import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private url: string = '/'

  LoginOrOutText: string

  constructor(public authenticationService: AuthenticationService,
              private route: Router) { }

  ngOnInit(): void {
    
  }

  logInOrOut(): void {
    if(this.authenticationService.isAuthenticated$) {
      this.authenticationService.removeUsernameAndJwtToken()
    } 
    this.route.navigateByUrl(this.url)
  }

}
