import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Stat } from '../models/stat';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  apiUrl = environment.api

  constructor(private httpClient: HttpClient) { }

  getStat(): Observable<Stat> {
    return this.httpClient.get<Stat>(this.apiUrl + 'stats')
  }
}
