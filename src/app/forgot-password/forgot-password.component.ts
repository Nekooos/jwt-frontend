import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { checkPasswords } from '../form-validation/check-passwords';
import { User } from '../model/User';

@Component({
  selector: 'app-forgot-password.component',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  
  userEmail: string
  isEmailSent: boolean
  error: string
  user: User

  constructor(
    private userService: UserService) { }
  
  
  forgotPasswordForm = new FormGroup({
    email: new FormControl(
      'email', [
      Validators.required])
  })

    
  ngOnInit(): void {

  }
  
  ngOnDestroy(): void {

  }

  onSubmit(): void {
    this.userEmail = this.forgotPasswordForm.get('email').value
    this.userService.forgotPassword(this.userEmail).subscribe(user => {
      this.user = user as User
      this.isEmailSent = true
    }, error => {
      this.error = error
    })
  }

  get email(): any {
    return this.forgotPasswordForm.get('email')
  }
}

