import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalConfirmShowPolicyEndorsementsModule } from '@components/modal-confirm-show-policy-endorsements/modal-confirm-show-policy-endorsements.module';
import { PolicyService } from '@services/policy.service';

import { ContainerPolicyManagerComponent } from './container-policy-manager.component';

@NgModule({
  declarations: [
    ContainerPolicyManagerComponent
  ],
  exports: [
      ContainerPolicyManagerComponent
  ],
  imports: [
    CommonModule,
    ModalShowPolicyFileModule,
    ModalConfirmShowPolicyEndorsementsModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerPolicyManagerModule { }
