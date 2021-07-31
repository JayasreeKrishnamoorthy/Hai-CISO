import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
//import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public getToken(): string {
    return localStorage.getItem('psp_token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

}
