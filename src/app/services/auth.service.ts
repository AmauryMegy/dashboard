import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api;

  constructor( private router : Router, private toastr: ToastrService, private httpClient : HttpClient) { }

  signIn(user: User):Observable<any> {
    if(localStorage.getItem('access_token')){
      localStorage.removeItem('access_token');
    }
    return this.httpClient.post<any>(this.apiUrl + 'authentication_token', user);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/']);
    }
  }

  get isLoggedIn(): boolean {
    let token = localStorage.getItem('access_token');
    if (token) {
      if(jwt_decode<any>(token).exp < moment().unix()){
        this.toastr.error('Votre session a expiré, veuillez vous reconnecter');
        localStorage.removeItem('access_token');
        this.router.navigate(['/']);
        return false
      }
      return true
    } else {
      return false
    }
  }
}
