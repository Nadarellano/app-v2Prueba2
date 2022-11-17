import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Camera, CameraResultType} from '@capacitor/camera';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';
  correo: string = '';
  rutaFoto: string = ''; //ruta global para poder mostrar la foto en la vista

  constructor(private router: Router, private api: ApiService) { 
    
  }

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
