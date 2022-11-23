import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalUpdateSinisterCertificateModule } from '@components/modal-update-sinister-certificate/modal-update-sinister-certificate.module';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { ContainerInsuredDetailsComponent } from './container-insured-details.component';

@NgModule({
  declarations: [
    ContainerInsuredDetailsComponent
  ],
  exports: [
      ContainerInsuredDetailsComponent
  ],
  imports: [
    CommonModule,
    ModalUpdateSinisterCertificateModule
  ],
  providers: [
      PolicyInsuredService
  ]
})
export class ContainerInsuredDetailsModule { }
