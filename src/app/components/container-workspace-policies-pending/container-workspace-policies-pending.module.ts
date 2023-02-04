import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardContentTitleModule } from '@components/card-content-title/card-content-title.module';
import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { ModalConfirmReissuePolicyModule } from '@components/modal-confirm-reissue-policy/modal-confirm-reissue-policy.module';
import { ModalConfirmRenewPolicyModule } from '@components/modal-confirm-renew-policy/modal-confirm-renew-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalConfirmShowPaymentHistoryModule } from '@components/modal-confirm-show-payment-history/modal-confirm-show-payment-history.module';
import { ModalConfirmShowPolicySinistersModule } from '@components/modal-confirm-show-policy-sinisters/modal-confirm-show-policy-sinisters.module';
import { ModalConfirmUpdatePolicyModule } from '@components/modal-confirm-update-policy/modal-confirm-update-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';
import { PolicyService } from '@services/policy.service';

import { ContainerWorkspacePoliciesPendingComponent } from './container-workspace-policies-pending.component';

@NgModule({
  declarations: [
    ContainerWorkspacePoliciesPendingComponent
  ],
  exports: [
    ContainerWorkspacePoliciesPendingComponent
  ],
  imports: [
    CardContentTitleModule,
    CardPolicyModule,
    CommonModule,
    ModalConfirmReissuePolicyModule,
    ModalConfirmRenewPolicyModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalConfirmShowPaymentHistoryModule,
    ModalConfirmShowPolicySinistersModule,
    ModalConfirmUpdatePolicyModule,
    ModalSelectContactTypeModule,
    ModalShowPolicyModule,
    ModalShowPolicyDetailsModule
  ],
  providers: [
    PolicyService
  ]
})
export class ContainerWorkspacePoliciesPendingModule { }
