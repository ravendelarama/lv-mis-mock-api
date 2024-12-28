import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  serviceUrl: string = `${environment.SERVICE_URL}`;
  samsServiceUrl: string = `${environment.SAMS_SERVICE_URL}`;
  appUrl: string = environment.CLIENT_URL;

  constructor(private http: HttpClient) {}

  signInWithGoogle() {
    window.location.href = `${this.serviceUrl}/auth/google`;
  }

  validateOauthToken(token: string) {
    return this.http.post(`${this.serviceUrl}/auth/token/validate`, { token });
  }

  xSystemRedirect(authenticationUrlSegment: string) {
    return this.http.post(
      `${this.serviceUrl}/api/x-system/${authenticationUrlSegment}`,
      {}
    );
  }

  logout() {
    return this.http.post(`${this.serviceUrl}/auth/logout`, {});
  }

  test() {
    return this.http.get(`${this.serviceUrl}/test`);
  }

  testFromSams() {
    return this.http.get(`${this.samsServiceUrl}/api/test`);
  }
}
