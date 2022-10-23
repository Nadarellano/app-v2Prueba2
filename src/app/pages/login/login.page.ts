import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';

  constructor(private router: Router, private api: ApiService, private loading:LoadingController, private toastController: ToastController) { }


  ngOnInit() {
  }

  ingresar(){
    let that = this; 
 
     this.loading.create({
       message: 'Ingresando...',
       spinner: 'bubbles'
     }).then(async res => {
       res.present();
      
       let data = await that.api.UsuarioLogin
        (that.mdl_correo, that.mdl_contrasena);
        console.log(data['result'])
        
      if(data['result'] === 'LOGIN OK') {
        this.api.validador= true
        this.mostrarMensajeExito();
        this.router.navigate(['principal']);
      }else{
        this.mostrarMensaje();
        }
      res.dismiss();
      this.mdl_correo = '';
      this.mdl_contrasena = '';
    });
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

  registroUsuario(){
    this.router.navigate(['registrousuario']);
  }

  
}
