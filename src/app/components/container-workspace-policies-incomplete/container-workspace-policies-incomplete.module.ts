import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertWorkspacePoliciesIncompleteModule } from '@components/alert-workspace-policies-incomplete/alert-workspace-policies-incomplete.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { ModalConfirmDeletePolicyModule } from '@components/modal-confirm-delete-policy/modal-confirm-delete-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';
import { PolicyService } from '@services/policy.service';

import { ContainerWorkspacePoliciesIncompleteComponent } from './container-workspace-policies-incomplete.component';

@NgModule({
  declarations: [
    ContainerWorkspacePoliciesIncompleteComponent
  ],
  exports: [
      ContainerWorkspacePoliciesIncompleteComponent
  ],
  imports: [
    AlertWorkspacePoliciesIncompleteModule,
    CommonModule,
    CardContentTitleModule,
    CardPolicyModule,
    ModalConfirmDeletePolicyModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalShowPolicyModule,
    ModalShowPolicyDetailsModule
  ],
  providers: [
    PolicyService
  ]
})
export class ContainerWorkspacePoliciesIncompleteModule { }
