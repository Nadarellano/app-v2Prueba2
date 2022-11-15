import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.page.html',
  styleUrls: ['./registrousuario.page.scss'],
})
export class RegistrousuarioPage implements OnInit {
  mdl_correo: string = '';
  mdl_contrasena: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';

  constructor(private router: Router, private api: ApiService,
    private loading: LoadingController, private toastController: ToastController) { }

  ngOnInit() {
  }

  UsuarioAlmacenar(){
   
    let that = this;

    this.loading.create({
      message: 'Almacenando Persona...',
      spinner: 'bubbles'
    }).then(async res => {
      res.present();
      let data = await that.api.UsuarioAlmacenar(
        that.mdl_correo, that.mdl_contrasena, that.mdl_nombre, that.mdl_apellido
      );
      console.log(data['result'][0])
      console.log(data)

      if(data['result'][0].RESPUESTA == 'OK') {
        that.mostrarMensaje('Persona Almacenada Correctamente');
        this.router.navigate(['login']);
      } else {//se puede agregar antes un else if ()
        that.mostrarMensaje('Error al almacenar persona');
      }

      res.dismiss();
    });
  }

  async mostrarMensaje(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

    await toast.present();
  }

}
