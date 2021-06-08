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
        const jwtRefreshToken = jwtResponse.refreshJwtToken
        const decodedJwtToken = jwtDecode<JwtPayload>(jwtToken)
        const email = decodedJwtToken['sub']
        const role = decodedJwtToken['role']
        this.setSession(jwtToken, jwtRefreshToken, email, role)
        this.authenticated()
      })
    )
  }

  private setSession(jwtToken: string, refreshToken: string, email: string, role: string): void {
    console.log(refreshToken)
    sessionStorage.setItem("username", email)
    sessionStorage.setItem("role", role)
    const tokenString = "Bearer " + jwtToken
    sessionStorage.setItem("refreshToken", refreshToken)
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

  getToken(): string | null {
    return window.sessionStorage.getItem("jwtToken")
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
