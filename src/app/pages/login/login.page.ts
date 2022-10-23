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
  validador: boolean = false;
  usuario = [];



  constructor(private router: Router, private api: ApiService, private loading:LoadingController, private toastController: ToastController) { }


  ngOnInit() {
  }

  registroUsuario(){
    this.router.navigate(['registrousuario']);
  }

  ingresar() {
    this.api.ingresar(this.mdl_correo, this.mdl_contrasena);
    this.mdl_correo = '';
    this.mdl_contrasena = '';
  }

  
}
