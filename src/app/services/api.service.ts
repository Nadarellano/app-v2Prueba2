import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  correo: string = '';
  contrasena: string = '';
  validador: boolean = false;
  contrasenaNueva: string = '';
  contrasenaActual: string = '';

  rutaBase: string =
  'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php';

  constructor(private http: HttpClient, private router: Router) { }

  canActivate() {    //función que nos permite activar o desactivar una ruta (adm navegación a las páginas)
    if (!this.validador) {
      this.router.navigate(['login']);
      return false;
    } else {
      return true;
    }
  }
  
  UsuarioAlmacenar (correo, contrasena, nombre, apellido) {
    let that = this;
    
  
    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioAlmacenar",
        parametros: [correo, contrasena, nombre, apellido]

      }).toPromise()) 
    })
  }

  UsuarioLogin(correo: string, contrasena: string) {
    let that = this;
    return new Promise(resolve => {
      resolve(that.http.post(that.rutaBase, {
        nombreFuncion: "UsuarioLogin",
        parametros: [correo, contrasena]
      }).toPromise())
    })
  }

  UsuarioModificarContrasena(correo, contrasenaNueva,contrasenaActual){
    let that = this;

    return new Promise(resolve => {
      resolve(that.http.patch(that.rutaBase, {
        nombreFuncion: "UsuarioModificarContrasena",
        parametros: [correo, contrasenaNueva, contrasenaActual]
      }).toPromise()) 
    })
  }
}
