
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Login } from '../../Responses/auth';
import { Roles } from '../../Responses/usr-management';
import { Datum, SelectCompany, UserGroupID } from '../../Responses/select-companies';
import { GeoService } from '../geo.service';
import { UtilityService } from '../utility.service';

// import { environment } from 'src/environments/environment.prod';  // prod

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  apiUrl = environment.apiUrl; // '/http://3.108.210.142:5000/api/getdetails';
  token = localStorage.getItem('pspkey');

  constructor(
    private http: HttpClient,
    public utility: UtilityService,
  ) { }


  post(url: any, data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${url}`, data);
  }

  get(url: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}${url}`);
  }

  getToken(url: string) {
    const Header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    });
    Header.append('Authorization', 'Bearer' + localStorage.getItem('pspkey'));
    const responseData = this.http.get<any>(`${environment.apiUrl}${url}`, { headers: Header });
    // responseData.subscribe(data => {
    //   if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
    //     this.utility.openToast(data[`message`]);
    //     this.utility.logOut();
    //   }
    // });
    return responseData;
    // return this.http.get<any>(`${environment.apiUrl}${url}`, { headers: Header });
  }

  delToken(url: string) {
    const Header = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    });
    Header.append('Authorization', 'Bearer' + localStorage.getItem('pspkey'));
    const responseData = this.http.delete<any>(`${environment.apiUrl}${url}`, { headers: Header });
    // responseData.subscribe(data => {
    //   if (data[`success`] === false && data[`message`] === 'Invalid Authentication Credentials') {
    //     this.utility.openToast(data[`message`]);
    //     this.utility.logOut();
    //   }
    // });
    return responseData;
  }

  postToken(url: string, data?: any) {
    const Header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    if (data) {
      // tslint:disable-next-line:max-line-length
      const responseData = this.http.post<any>(`${environment.apiUrl}${url}`, JSON.stringify(data), { headers: Header });
      // responseData.subscribe(res => {
      //   if (res[`success`] === false && res[`message`] === 'Invalid Authentication Credentials') {
      //     this.utility.openToast(res[`message`]);
      //     this.utility.logOut();
      //   }
      // });
      return responseData;
    } else {
      const responseData = this.http.post<any>(`${environment.apiUrl}${url}`, { headers: Header });
      // responseData.subscribe(res => {
      //   if (res[`success`] === false && res[`message`] === 'Invalid Authentication Credentials') {
      //     this.utility.openToast(res[`message`]);
      //     this.utility.logOut();
      //   }
      // });
      return responseData;
    }
  }

  putToken(url: string, data: any) {
    const Header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
    });
    const responseData = this.http.put<any>(`${environment.apiUrl}${url}`, JSON.stringify(data), { headers: Header });
    // responseData.subscribe(res => {
    //   if (res[`success`] === false && res[`message`] === 'Invalid Authentication Credentials') {
    //     this.utility.openToast(res[`message`]);
    //     this.utility.logOut();
    //   }
    // });
    return responseData;
  }


  getDetails(): Observable<any> {
    return this.http.get(this.apiUrl)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', [])),
      );
  }

  postDetails(j): Observable<any> {
    return this.http.post(this.apiUrl, j)
      .pipe(
        tap(_ => this.log('response received')),
        catchError(this.handleError('getDetails', [])),
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
  }

  // https://jsonplaceholder.typicode.com/todos/1

  getTest(): Observable<any> {  //  For Testing
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .pipe(
        // tslint:disable-next-line:no-console
        tap(_ => console.log('response received')),
        catchError(this.handleError('GETTest', [])),
      );
  }

  doLogin(obj): Observable<any> {
    return this.http.post<Login>(this.apiUrl + '/auth/login', obj)
      .pipe(
        // tslint:disable-next-line:no-console
        tap(_ => console.log('response received')),
        catchError(this.handleError('Login', [])),
      );

  }


  getRoles(url: string): Observable<any> {
    return this.http.get<Roles>(`${environment.apiUrl}${url}`)
      .pipe(
        // tslint:disable-next-line:no-console
        tap(_ => console.log('response received')),
        catchError(this.handleError('GETRoles', [])),
      );
  }

  getcompanies() {
    return this.http.get<any>(this.apiUrl + '/companies')
      .pipe(
        // tslint:disable-next-line:no-console
        tap(_ => console.log('response received')),
        catchError(this.handleError('GETcopanies', [])),
      );
  }

  putroles(obj) {
    return this.http.put(this.apiUrl + '/roles', obj)
      .pipe(
        // tslint:disable-next-line:no-console
        tap(_ => console.log('response received')),
        catchError(this.handleError('PUTroles', [])),
      );
  }

  postroles(obj) {
    return this.http.post(this.apiUrl + '/roles', obj)
      .pipe(
        // tslint:disable-next-line:no-console
        tap(_ => console.log('response received')),
        catchError(this.handleError('POSTroles', [])),
      );
  }


}
