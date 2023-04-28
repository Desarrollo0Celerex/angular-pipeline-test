import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertWorkspaceExternalPoliciesModule } from '@components/alert-workspace-external-policies/alert-workspace-external-policies.module';
import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardExternalPolicyModule } from '@components/card-external-policy/card-external-policy.module';
import { ModalConfirmValidateExternalPolicyModule } from '@components/modal-confirm-validate-external-policy/modal-confirm-validate-external-policy.module';
import { ModalConfirmUpdateExternalPolicyModule } from '@components/modal-confirm-update-external-policy/modal-confirm-update-external-policy.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ModalShowExternalPolicyDetailsModule } from '@components/modal-show-external-policy-details/modal-show-external-policy-details.module';
import { ExternalPolicyService } from '@services/external-policy.service';

import { ContainerWorkspaceExternalPoliciesComponent } from './container-workspace-external-policies.component';

@NgModule({
  declarations: [
    ContainerWorkspaceExternalPoliciesComponent
  ],
  exports: [ContainerWorkspaceExternalPoliciesComponent],
  imports: [
    AlertWorkspaceExternalPoliciesModule,
    CommonModule,
    CardContentTitleModule,
    CardExternalPolicyModule,
    ModalConfirmValidateExternalPolicyModule,
    ModalConfirmUpdateExternalPolicyModule,
    ModalShowExternalPolicyDetailsModule,
    ModalShowPolicyFileModule
  ],
  providers: [
      ExternalPolicyService
  ]
})
export class ContainerWorkspaceExternalPoliciesModule { }
