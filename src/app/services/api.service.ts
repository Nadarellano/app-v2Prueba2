import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  correo: string = '';
  contrasena: string = '';
  validador: boolean = false;
  contrasenaNueva: string = '';
  contrasenaActual: string = '';
  mdl_correo: string = '';
  mdl_contrasena: string = '';
  nombreUsuario: string = '';
  apellidoUsuario: string = '';

  rutaBase: string =
  'https://fer-sepulveda.cl/API_PRUEBA2/api-service.php';

  constructor(private http: HttpClient, private router: Router, private loading:LoadingController, private toastController: ToastController, private sqlite: SQLite) {
    this.sqlite.create({
      name: "datos.db",
      location: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS CORREO(CORREO VARCHAR(40))', 
      []).then(() => {
        console.log('msg: TABLA CREADA OK');
      }).catch(e => {
        console.log('msg: TABLA NOK');
      })
    }).catch(e => {
      console.log('msg: BASE DE DATOS NOK');
    })
   }

  almacenarLogin(correo) { //almacena en BD
    this.sqlite.create({
      name: "datos.db",
      location: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO CORREO VALUES(?)', 
        [correo]).then(() => {
        console.log('msg: CORREO ALMACENADO OK');
      }).catch(e => {
        console.log('msg: CORREO NO ALMACENADO');
      })
    }).catch(e => {
      console.log('msg: BASE DE DATOS NOK');
    })
  }

  eliminarPesona(correo) {
    this.sqlite.create({
      name: "datos.db",
      location: "default"
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM CORREO WHERE CORREO = ?', 
        [correo]).then(() => {
        console.log('CORREO ELIMINADO OK');
      }).catch(e => {
        console.log('msg: CORREO NO ELIMINADO');
      })
    }).catch(e => {
      console.log('msg: BASE DE DATOS NOK');
    })
  }



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

  ingresar(mdl_correo, mdl_contrasena){
    let that = this; 
 
     this.loading.create({
       message: 'Ingresando...',
       spinner: 'bubbles'
     }).then(async res => {
       res.present();
      
      let data = await that.UsuarioLogin (mdl_correo, mdl_contrasena);
      
      if(data['result'] === 'LOGIN OK') {
        this.validador= true
        this.mostrarMensajeExito();
        this.almacenarLogin(mdl_correo);
        let data2 = await that.obtenerNombre(mdl_correo);
        this.nombreUsuario = data2['result'][0].NOMBRE;
        this.apellidoUsuario = data2['result'][0].APELLIDO;
        this.correo = mdl_correo; 
        this.router.navigate(['principal']);
      }else{
        this.mostrarMensaje();
        }
      res.dismiss();
      this.mdl_correo = '';
      this.mdl_contrasena = '';
    });
  }
  

  obtenerNombre(correo: string) {
    return new Promise(resolve => {
      resolve(
        this.http.get(`${this.rutaBase}?nombreFuncion=UsuarioObtenerNombre&correo=${correo}`).toPromise())
    })
  }

  obtenerCorreo(){
    return this.correo;
  }

  async mostrarMensajeExito() {
    const toast = await this.toastController.create({
      message: 'Ingresado correctamente!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
 
  async mostrarMensaje() {
    const toast = await this.toastController.create({
      message: 'Error, datos incorrectos',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  obtenerNombreYApellido(){
    return `${this.nombreUsuario} ${this.apellidoUsuario}`
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
