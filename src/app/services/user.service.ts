import { Injectable } from '@angular/core';
import { REST_SERV } from '../rest-url/rest-servers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * METODO PARA DETERMINAR SI UN USUARIO ESTÁ O NO LOGGEADO
   */
  public isLoggedIn() {
    return localStorage.getItem('user_key') !== null;
  }
}
