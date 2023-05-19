import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowPolicySinistersModule } from '@components/modal-confirm-show-policy-sinisters/modal-confirm-show-policy-sinisters.module';
import { ModalConfirmShowPolicyClosedSinistersModule } from '@components/modal-confirm-show-policy-closed-sinisters/modal-confirm-show-policy-closed-sinisters.module';
import { ModalConfirmShowPolicyOpenSinistersModule } from '@components/modal-confirm-show-policy-open-sinisters/modal-confirm-show-policy-open-sinisters.module';

import { ContainerSinistersManagerComponent } from './container-sinisters-manager.component';

@NgModule({
  declarations: [
    ContainerSinistersManagerComponent
  ],
  exports: [
      ContainerSinistersManagerComponent
  ],
  imports: [
    CommonModule,
    ModalConfirmShowPolicySinistersModule,
    ModalConfirmShowPolicyClosedSinistersModule,
    ModalConfirmShowPolicyOpenSinistersModule
  ]
})
export class ContainerSinistersManagerModule { }
