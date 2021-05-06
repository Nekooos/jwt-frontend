import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { LoginComponent } from './login/login.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ConfirmAccountComponent } from './register/confirm-account/confirm-account.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'logged-in', component: LoggedInComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'register/confirm-account/:token', component: ConfirmAccountComponent, pathMatch: 'full'},
  { path: 'forgot-password', component: ForgotPasswordComponent, pathMatch: 'full'},
  { path: 'new-password/:token', component: NewPasswordComponent, pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
