import { User } from '../model/User';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../model/UserDto';
import { PasswordDto } from '../model/PasswordDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: String = "http://localhost:8080/user";

  constructor(private httpClient: HttpClient) {
   }

  register(userDto: UserDto): Observable<User> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(userDto)

    return this.httpClient.post<User>(this.url + '/save', body, { 'headers': headers })
      .pipe(
        tap(user => console.log("register: " + JSON.stringify(user)))
      )
  }

  confirmAccount(token: string): Observable<User> {
    return this.httpClient.post<User>(this.url + '/enable-account', token)
  }

  forgotPassword(token: string): Observable<User> {
    return this.httpClient.post<User>(this.url + '/reset-password', token)
  }

  saveNewPassword(password: string, token:string): Observable<User> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(this.createPasswordDto(password, token))
    return this.httpClient.post<User>(this.url + '/save-new-password', body)
  }

  createPasswordDto(password: string, token:string): PasswordDto {
    let passwordDto = new PasswordDto()
    passwordDto.newPassword = password as string
    passwordDto.token = token as string
    return passwordDto
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/get-all')
  }
}