import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  serviceUrl: string = environment.SERVICE_URL
  appUrl: string = environment.APP_URL

  constructor(private http: HttpClient) {}

  xSystemRedirect(authenticationUrl: string) {
    return this.http.post(authenticationUrl, {}, { withCredentials: true });
  }

  logout(){
    return this.http.post(`${this.serviceUrl}/auth/logout`, {}, { withCredentials: true });
  }
}
