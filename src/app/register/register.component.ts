import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/User';
import { UserDto } from '../model/UserDto';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

  userDto: UserDto = new UserDto()
  user: User
  backendError: String
  isEmailSent: boolean = false
  private registerSubscription: Subscription

  constructor(
    private userService: UserService,
    private router: Router) { }
  
    registerForm = new FormGroup({
      email: new FormControl(
        'email@example.com', 
        Validators.required,
        //Validators.email
      ),
      password: new FormControl(
        'password', [
        Validators.required,
        Validators.minLength(8)
      ])
    });
  
  ngOnInit(): void {

  }

  onSubmit() {
    this.addFormValuesToUserDto()
    this.registerSubscription = this.userService.register(this.userDto).subscribe(data => {
      this.user = data as User
    }, error => {
      this.backendError = error
    }, () => {
      this.isEmailSent = true;
    })
  }

  addFormValuesToUserDto() {
    this.userDto.email = this.registerForm.value.email
    this.userDto.password = this.registerForm.value.password
  }

  ngOnDestroy() {
    if(this.registerSubscription) {
      this.registerSubscription.unsubscribe
    }
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }
}
