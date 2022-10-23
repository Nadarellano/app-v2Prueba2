import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  usuario: string = '';
  correo: string = '';

  constructor(private router: Router, private api: ApiService) { 
    
  }

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
