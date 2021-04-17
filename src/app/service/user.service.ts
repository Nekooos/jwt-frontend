import { User } from '../model/User';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../model/UserDto';

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
        //catchError()
      )
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.url + '/get-all')
  }
}