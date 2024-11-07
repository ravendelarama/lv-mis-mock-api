import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private http: HttpClient) {}


  xSystemRedirect() {
    return this.http.post('http://localhost:3000/console', {}, {withCredentials: true})
  }
}
