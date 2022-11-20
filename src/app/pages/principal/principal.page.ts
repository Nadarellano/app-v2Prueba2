import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType} from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';
  correo: string = '';
  rutaFoto: string = ''; //ruta global para poder mostrar la foto en la vista
  texto: string = '';
  arregloQr: string[];
  ID_CLASE: string = '';
  validador: boolean = false;
  


  constructor(private router: Router, private api: ApiService, private loading:LoadingController, private toastController: ToastController) { 
    
  }

  async leerQR () {

    let that = this;

    document.querySelector('body').classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });

    BarcodeScanner.hideBackground();
  
    const result = await BarcodeScanner.startScan(); 

    if (result.hasContent) {
      this.texto = result.content;
      this.arregloQr = this.texto.split('|');
      this.arregloQr.pop();
      this.ID_CLASE = this.arregloQr.toString();
  
    this.loading.create({
      message: 'Ingresando...',
      spinner: 'bubbles'
    }).then(async res => {
      res.present();
      let data = await that.api.AsistenciaAlmacenar(that.correo, that.ID_CLASE);
     
        if(data["result"][0].RESPUESTA == 'OK') {
          that.mostrarMensajeAsistencia('Asistencia registrada correctamente');
                  
        } else if(data["result"][0].RESPUESTA == 'ERR03'){
          that.mostrarMensajeAsistencia('Ya se encuentra presente en esta clase');
        }

      res.dismiss();
    });
  
  }
    document.querySelector('body').classList.remove('scanner-active');
  };

  
  async mostrarMensajeAsistencia(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  // async mostrarMensajeErrorAsistencia() {
  //   const toast = await this.toastController.create({
  //     message: 'Asistencia ya fue registrada anteriormente',
  //     duration: 3000,
  //     position: 'bottom'
  //   });
  //   toast.present();
  // }





  async tomarFoto (){
    const image = await Camera.getPhoto({ //propiedades de la cámara
      quality: 90, //% de la calidad de la foto
      allowEditing: true,  // permite la edición si o no
      resultType: CameraResultType.Uri // propiedad obligatoria, uri es una ruta donde 
      //quedará alojada la imagen en galeria
    });

  
    

    this.rutaFoto = image.webPath; //ruta final
  };

  ngOnInit() {
    this.usuario = this.api.obtenerNombreYApellido();
  }

  restablerContrasena(){
    this.router.navigate(['restablecer-contrasena']);
  }

  cerrarSesion(correo) {
    let that= this;
    that.correo = that.api.obtenerCorreo();
    that.api.eliminarPesona(correo);
    that.router.navigate(['login']);
  }

}
