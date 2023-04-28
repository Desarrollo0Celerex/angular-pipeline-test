import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConfirmLinkPolicyModule } from '@components/modal-confirm-link-policy/modal-confirm-link-policy.module';
import { ModalConfirmShowPolicyRenewalHistoryModule } from '@components/modal-confirm-show-policy-renewal-history/modal-confirm-show-policy-renewal-history.module';
import { ModalConfirmShowPolicyRenewalsAppliedModule } from '@components/modal-confirm-show-policy-renewals-applied/modal-confirm-show-policy-renewals-applied.module';
import { PolicyService } from '@services/policy.service';

import { ContainerPolicyRenewalManagerComponent } from './container-policy-renewal-manager.component';

@NgModule({
  declarations: [
    ContainerPolicyRenewalManagerComponent
  ],
  exports: [
      ContainerPolicyRenewalManagerComponent
  ],
  imports: [
    CommonModule,
    ModalConfirmLinkPolicyModule,
    ModalConfirmShowPolicyRenewalHistoryModule,
    ModalConfirmShowPolicyRenewalsAppliedModule
  ],
  providers: [
      PolicyService
  ]
})
export class ContainerPolicyRenewalManagerModule { }
