import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrousuarioPageRoutingModule } from './registrousuario-routing.module';

import { RegistrousuarioPage } from './registrousuario.page';
import { DateComponent } from 'src/app/components/date/date.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrousuarioPageRoutingModule
  ],
  declarations: [RegistrousuarioPage, DateComponent]
})
export class RegistrousuarioPageModule {}
