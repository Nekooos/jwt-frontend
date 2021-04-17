import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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

    if (sessionStorage.getItem('username') && sessionStorage.getItem('jwtToken')) {
      request = request.clone({                                                                                                                                                                                                           
        setHeaders: {
          Authorization: sessionStorage.getItem('jwtToken')
        }
      })
    } else {
      console.log('User is not logged in')
      //this.router.navigateByUrl("/")
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
      const fieldErrors: string = this.stringifyFieldErrors(error.error.fieldErrors)
      console.log(fieldErrors)
      return `${error.error.message}: ${fieldErrors}`
    } else {
      return error.error.message
    }
  }

  private stringifyFieldErrors(fieldErrors): string {
    let errors: string = ''
    fieldErrors.forEach(error => {
      errors.concat(`${error.errorMessage}, `)
    })
    return errors
  }
}
