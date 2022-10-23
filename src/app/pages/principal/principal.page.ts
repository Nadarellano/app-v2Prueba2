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

  constructor(private router: Router, private api: ApiService) { 
    
  }

  ngOnInit() {
    this.usuario = this.api.obtenerNombreYApellido();
  }

  restablerContrasena(){
    this.router.navigate(['restablecer-contrasena']);
  }

  cerrarSesion(){
    this.router.navigate(['login']);
  }

}
