import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalConfirmEndorsePolicyModule } from '@components/modal-confirm-endorse-policy/modal-confirm-endorse-policy.module';
import { PolicyService } from '@services/policy.service';

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
    ModalConfirmEndorsePolicyModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerPolicyEndorsementsManagerModule { }
