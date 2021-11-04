import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalConfirmLinkPolicyModule } from '@components/modal-confirm-link-policy/modal-confirm-link-policy.module';
import { PolicyService } from '@services/policy.service';

import { ContainerPolicyTrackerManagerComponent } from './container-policy-tracker-manager.component';

@NgModule({
  declarations: [
    ContainerPolicyTrackerManagerComponent
  ],
  exports: [
      ContainerPolicyTrackerManagerComponent
  ],
  imports: [
    CommonModule,
    ModalShowPolicyFileModule,
    ModalConfirmLinkPolicyModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerPolicyTrackerManagerModule { }
