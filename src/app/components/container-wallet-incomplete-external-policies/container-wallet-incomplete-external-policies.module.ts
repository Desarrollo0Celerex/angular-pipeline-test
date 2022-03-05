import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardExternalPolicyModule } from '@components/card-external-policy/card-external-policy.module';
import { ModalConfirmValidateExternalPolicyModule } from '@components/modal-confirm-validate-external-policy/modal-confirm-validate-external-policy.module';
import { ModalConfirmUpdateExternalPolicyModule } from '@components/modal-confirm-update-external-policy/modal-confirm-update-external-policy.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ExternalPolicyService } from '@services/external-policy.service';

import { ContainerWalletIncompleteExternalPoliciesComponent } from './container-wallet-incomplete-external-policies.component';

@NgModule({
  declarations: [
    ContainerWalletIncompleteExternalPoliciesComponent
  ],
  exports: [ContainerWalletIncompleteExternalPoliciesComponent],
  imports: [
    CommonModule,
    CardExternalPolicyModule,
    ModalConfirmValidateExternalPolicyModule,
    ModalConfirmUpdateExternalPolicyModule,
    ModalShowPolicyFileModule
  ],
  providers: [
      ExternalPolicyService
  ]
})
export class ContainerWalletIncompleteExternalPoliciesModule { }
