import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserDto } from '../model/UserDto';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  token: String;
  authenticateSubscription: Subscription;
  userDto: UserDto = new UserDto()
  backendError: string
  

  loginForm = new FormGroup({
    email: new FormControl(
      'email', [
      Validators.required,
      Validators.email ]),
    password: new FormControl(
      'password', [
      Validators.required,
      Validators.minLength(8) ])
  });

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if(this.authenticateSubscription) {
      this.authenticateSubscription.unsubscribe;
    }
  }


  onSubmit() {
    this.addFormValuesToUserDto
    this.authenticateSubscription = this.authenticationService.authenticate(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
      this.router.navigateByUrl('logged-in')
    }, error => {
      console.log(error)
      this.backendError = error
    })
  }

  addFormValuesToUserDto() {
    this.userDto.email = this.loginForm.value.email
    this.userDto.password = this.loginForm.value.password
  }

  get email(): any {
    return this.loginForm.get('email')
  }

  
  get password(): any {
    return this.loginForm.get('password')
  }
}
