import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyDP86G4hfa1ZyGsv0xSvrXuHWE1dLP7Nts';

  // eslint-disable-next-line @typescript-eslint/member-ordering
  userToken: string = null;

  //Crear nuevo ususario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {}

  login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          //console.log('Entro en el mapa de RXJS');

          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true,
    };

    return this.http
      .post(`${this.url}signUp?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          console.log('Entro en el mapa de RXJS');

          // eslint-disable-next-line @typescript-eslint/dot-notation
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  // Guards
  // eslint-disable-next-line @typescript-eslint/member-ordering
  estaAutenticado(): boolean {
    // if (this.userToken) {
    //   console.log('hay token');
    //   return true;
    // }
    return this.userToken.length > 2;
  }
}
