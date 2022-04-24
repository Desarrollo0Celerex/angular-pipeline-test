import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalCreateSinisterModule } from '@components/modal-create-sinister/modal-create-sinister.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';

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
    ModalConfirmShowHistoryPolicyModule,
    ModalCreateSinisterModule,
    ModalShowPolicyFileModule,
  ]
})
export class ContainerSinistersManagerModule { }
