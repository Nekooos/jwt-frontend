import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

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
    window.sessionStorage.removeItem("token")
    window.sessionStorage.removeItem("username")
    window.sessionStorage.setItem("username", token)
  }

  getToken(): string | null {
    return window.sessionStorage.getItem("token")
  }

  getEmail() {
    return window.sessionStorage.getItem("username")
  }

  public authenticated(): void {
    this.isAuthenticated$.next(true);
  }

  public deAuthenticate(): void {
    this.isAuthenticated$.next(false);
  }
}
