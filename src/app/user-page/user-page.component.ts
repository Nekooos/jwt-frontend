import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../model/User';
import { AuthenticationService } from '../service/authentication.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  email: string
  user: User
  error: string
  isEmailUserEmail: boolean
  userInformation: String

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.email = params['email']
    }, error => {
      this.error = error
    })

    this.getUser()

    let userEmail = this.authenticationService.getEmail()
    this.getAuthenticatedUserInformation(userEmail);

  
  }


  getUser() {
    this.userService.getUserByEmail(this.email).subscribe(user => {
      this.user = user as User
    }, error => {
      error = error
    })
  }

  getAuthenticatedUserInformation(userEmail:string) {
    if(userEmail === this.email) {
      this.userService.getAuthenticatedUserInfo(userEmail).subscribe(data => {
        this.userInformation = data.information
      }, error => {
        this.error = error
      })
    }
  }
}
