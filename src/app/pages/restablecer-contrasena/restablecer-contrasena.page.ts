import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {

  correo: string = '';
  contrasena_actual: string = '';
  contrasena_nueva: string = '';

  constructor( private api: ApiService, private toastController: ToastController, private loading:LoadingController, private router:Router) { }

  ngOnInit() {
  }

  cambioPass(){
    let that = this;

    this.loading.create({
      message: 'Cambiando contraseña...',
      spinner: 'bubbles'
    }).then(async res => {
      res.present();
      let data = await this.api.UsuarioModificarContrasena
        (this.correo, this.contrasena_nueva, this.contrasena_actual);
        console.log(data['result'])
       
      if(data['result'][0].RESPUESTA === 'OK') {
        this.contrasena_actual == this.contrasena_nueva;
        this.mostrarok();
        this.router.navigate(['login']); 
      } else {
        that.mostrarMensajeError();
      }
      res.dismiss();
    });
  }

  async mostrarMensajeError() {
    const toast = await this.toastController.create({
      message: "Error  al modificar la contrasña",
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

  async mostrarok() {
    const toast = await this.toastController.create({
      message: "Contraseña modificada exitosamente",
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();

  }

}
