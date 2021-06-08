import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('jwtToken') && sessionStorage.getItem('refreshToken')) {
      request = request.clone({                                                                                                                                                                                                           
        setHeaders: {
          Authorization: sessionStorage.getItem('jwtToken'),
          refreshToken: sessionStorage.getItem('refreshToken')
        }
      })
    } else {
      console.log('User is not logged in')
      this.router.navigateByUrl("/")
    }                                                 

    return next.handle(request)
    .pipe(
      catchError(error => {
        const errorMessage: string = this.createErrorMessage(error)
        return throwError(errorMessage)
      })
    )
  }

  private createErrorMessage(error): string {
    if(error.error instanceof ErrorEvent) {
      return error.error.message
    } else {
      return this.createBackendErrorMessage(error)
    }
  }

  private createBackendErrorMessage(error): string {
    if(error.error.fieldErrors) {
      console.log(error.error.fieldErrors)
      const fieldError = this.fieldErrorsToString(error.error.fieldErrors)
      return `${error.error.message}: ${fieldError}`
    } else {
      return error.error.message
    }
  }

  private fieldErrorsToString(fieldErrors): String {
    let fieldErrorsString: string = JSON.stringify(fieldErrors)
    return fieldErrorsString
  }
}
