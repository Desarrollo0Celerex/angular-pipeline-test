import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalConfirmEndorsePolicyModule } from '@components/modal-confirm-endorse-policy/modal-confirm-endorse-policy.module';

import { ContainerPolicyEndorsementsManagerComponent } from './container-policy-endorsements-manager.component';

@NgModule({
  declarations: [
    ContainerPolicyEndorsementsManagerComponent
  ],
  exports: [
      ContainerPolicyEndorsementsManagerComponent
  ],
  imports: [
    CommonModule,
    ModalShowPolicyFileModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalConfirmEndorsePolicyModule
  ]
})
export class ContainerPolicyEndorsementsManagerModule { }
