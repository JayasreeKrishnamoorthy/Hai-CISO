
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Login } from '../../Responses/auth';

//import { environment } from 'src/environments/environment.prod';  // prod

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  apiUrl = environment.apiUrl //'https://localhost:8080/api/getdetails';

  constructor(private http: HttpClient) { }

  getDetails(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', []))
      );
  }

  postDetails(j): Observable<any> {
    return this.http.post(this.apiUrl,j)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

// https://jsonplaceholder.typicode.com/todos/1

getTest(): Observable<any> {  //  For Testing
  return this.http.get("https://jsonplaceholder.typicode.com/todos/1")
    .pipe(
      tap(_ => console.log('response received')),
      catchError(this.handleError('GETTest', []))
    );
}

doLogin(obj): Observable<any> {
console.log(obj);
  return this.http.post<Login>(this.apiUrl+"/auth/login",obj)
    .pipe(
      tap(_ => console.log('response received')),
      catchError(this.handleError('Login', []))
    );
    
}
              
          
}
