import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setToken(name: string, value: string){
    localStorage.setItem(name, value);
  }
  
  getToken(name: string): string | null {
    return localStorage.getItem(name);
  }
  
  removeToken(name: string){
    localStorage.removeItem(name);
  }
}
