import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  baseUri: string = 'http://localhost:4000';
  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  // Create
  createPost(data): Observable<any> {
    console.log('data', data);
    const headers = new HttpHeaders().set(
      'auth',
      sessionStorage.getItem('token')
    );
    headers.append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    for (let i = 0; i < data.image.length; i++) {
      formData.append('Images', data.image[i]);
    }

    formData.append('post', JSON.stringify(data));
    let url = `${this.baseUri}/post/create`;
    return this.http
      .post(url, formData, { headers: headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get All
  getPosts(param): Observable<any> {
    const headers = new HttpHeaders().set(
      'auth',
      sessionStorage.getItem('token')
    );

    let url =
      `${this.baseUri}/post/list` + `?page=${param.page}&size=${param.size}`;
    return this.http.get(url, { headers: headers });
  }

  // Update
  updatePost(id, data): Observable<any> {
    const headers = new HttpHeaders().set(
      'auth',
      sessionStorage.getItem('token')
    );
    let url = `${this.baseUri}/post/update/${id}`;
    return this.http
      .put(url, data, { headers: headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Delete
  deletePost(id): Observable<any> {
    const headers = new HttpHeaders().set(
      'auth',
      sessionStorage.getItem('token')
    );
    let url = `${this.baseUri}/post/delete/${id}`;
    return this.http
      .delete(url, { headers: headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Create
  createComments(data): Observable<any> {
    const headers = new HttpHeaders().set(
      'auth',
      sessionStorage.getItem('token')
    );
    let url = `${this.baseUri}/comments/create`;
    return this.http
      .post(url, data, { headers: headers })
      .pipe(catchError(this.errorMgmt));
  }

  // Get All
  getComments(id): Observable<any> {
    const headers = new HttpHeaders().set(
      'auth',
      sessionStorage.getItem('token')
    );
    let url = `${this.baseUri}/comments/list`;
    return this.http.post(url, { postId: id }, { headers: headers });
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
