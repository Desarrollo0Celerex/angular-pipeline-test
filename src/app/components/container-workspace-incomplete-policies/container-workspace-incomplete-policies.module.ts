import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { ModalConfirmDeletePolicyModule } from '@components/modal-confirm-delete-policy/modal-confirm-delete-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { PolicyService } from '@services/policy.service';

import { ContainerWorkspaceIncompletePoliciesComponent } from './container-workspace-incomplete-policies.component';

@NgModule({
  declarations: [
    ContainerWorkspaceIncompletePoliciesComponent
  ],
  exports: [
      ContainerWorkspaceIncompletePoliciesComponent
  ],
  imports: [
    CommonModule,
    CardPolicyModule,
    ModalConfirmDeletePolicyModule,
    ModalConfirmShowHistoryPolicyModule
  ],
  providers: [
    PolicyService
  ]
})
export class ContainerWorkspaceIncompletePoliciesModule { }
