import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenKey: string = 'authentication-token'
  private userKey: string = 'authentication-user'
  private url: String = "http://localhost:8080";

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  authenticate(email: string, password: string) {
    return this.httpClient.post<User>(this.url +'/authenticate', {email, password})
    .pipe(
      tap(jwtResponse => {
        this.setSession(jwtResponse, email)
        this.authenticated()
      })
    )
  }

  private setSession(userData, email: string): void {
    sessionStorage.setItem("username", email)
    let tokenString = "Bearer " + userData.token
    sessionStorage.setItem("jwtToken", tokenString)
  }

  removeUsernameAndJwtToken(): void {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("jwtToken")
    this.deAuthenticate()
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem("username") && sessionStorage.getItem("jwtToken") ? true : false
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(this.tokenKey)
    window.sessionStorage.setItem(this.userKey, token)
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(this.tokenKey)
  }

  public authenticated(): void {
    this.isAuthenticated$.next(true);
  }

  public deAuthenticate(): void {
    this.isAuthenticated$.next(false);
  }
}
