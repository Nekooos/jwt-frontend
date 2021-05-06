import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../model/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {

  user: User
  error: string
  forgotPasswordToken: string
  routeParamSubscription: Subscription
  saveNewPasswordSubscription: Subscription
  isPasswordSaved: boolean = false

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  newPasswordForm = new FormGroup({
    password: new FormControl(
      'password', [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  ngOnInit(): void {
    this.routeParamSubscription = this.activatedRoute.params.subscribe(params => {
      this.forgotPasswordToken = params['token'];
    })
  }

  onSubmit() {
    const password = this.newPasswordForm.get('password').value as string
    this.saveNewPasswordSubscription = this.userService.saveNewPassword(password, this.forgotPasswordToken).subscribe(data => {
      this.user = data as User
      this.isPasswordSaved = true
    }, error => {
      this.error = error
    })
  }

  get password() {
    return this.newPasswordForm.get('password')
  }

  ngOnDestroy(): void {
    if(this.routeParamSubscription) {
      this.routeParamSubscription.unsubscribe
    }
  }

}
