import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwtDecode, { JwtPayload } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url: String = "http://localhost:8080";

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient) { }

  authenticate(email: string, password: string) {
    return this.httpClient.post<any>(this.url +'/authenticate', {email, password})
    .pipe(
      tap(jwtResponse => {
        const jwtToken = jwtResponse.token
        const decodedJwtToken = jwtDecode<JwtPayload>(jwtToken)
        const email = decodedJwtToken['email']
        const role = decodedJwtToken['role']
        this.setSession(jwtResponse, email, role)
        this.authenticated()
      })
    )
  }

  private setSession(userData, email: string, role: string): void {
    sessionStorage.setItem("username", email)
    sessionStorage.setItem("role", role)
    let tokenString = "Bearer " + userData.token
    sessionStorage.setItem("jwtToken", tokenString)
  }

  removeUsernameAndJwtToken(): void {
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("role")
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

  getRole() {
    return window.sessionStorage.getItem("role")
  }

  public authenticated(): void {
    this.isAuthenticated$.next(true);
  }

  public deAuthenticate(): void {
    this.isAuthenticated$.next(false);
  }
}
