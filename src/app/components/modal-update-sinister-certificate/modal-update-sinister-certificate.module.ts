import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SinisterService } from '@services/sinister.service';

import { ModalUpdateSinisterCertificateComponent } from './modal-update-sinister-certificate.component';

@NgModule({
  declarations: [
    ModalUpdateSinisterCertificateComponent
  ],
  exports: [
      ModalUpdateSinisterCertificateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      SinisterService
  ]
})
export class ModalUpdateSinisterCertificateModule { }
