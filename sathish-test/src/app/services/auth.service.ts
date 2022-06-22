import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUri: string = 'http://localhost:4000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create
  createUser(data): Observable<any> {
    let url = `${this.baseUri}/api/create`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  loginUser(data): Observable<any> {
    let url = `${this.baseUri}/auth/login`;
    return this.http.post(url, data).pipe(catchError(this.errorMgmt));
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    let errmsg = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
      errmsg = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
      errmsg = error.error;
    }

    return throwError(() => {
      return errorMessage;
    });
  }
}
