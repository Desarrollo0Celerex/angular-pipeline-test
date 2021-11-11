import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { ModalConfirmCancelPolicyModule } from '@components/modal-confirm-cancel-policy/modal-confirm-cancel-policy.module';
import { ModalConfirmDeletePolicyModule } from '@components/modal-confirm-delete-policy/modal-confirm-delete-policy.module';
import { ModalConfirmDeleteRenewedPolicyModule } from '@components/modal-confirm-delete-renewed-policy/modal-confirm-delete-renewed-policy.module';
import { ModalConfirmEndorsePolicyModule } from '@components/modal-confirm-endorse-policy/modal-confirm-endorse-policy.module';
import { ModalConfirmReissuePolicyModule } from '@components/modal-confirm-reissue-policy/modal-confirm-reissue-policy.module';
import { ModalConfirmRenewPolicyModule } from '@components/modal-confirm-renew-policy/modal-confirm-renew-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalConfirmShowPaymentHistoryModule } from '@components/modal-confirm-show-payment-history/modal-confirm-show-payment-history.module';
import { ModalConfirmShowPolicySinistersModule } from '@components/modal-confirm-show-policy-sinisters/modal-confirm-show-policy-sinisters.module';
import { ModalConfirmUpdatePolicyModule } from '@components/modal-confirm-update-policy/modal-confirm-update-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';

import { PolicyService } from '@services/policy.service';
import { PolicyLogService } from '@services/policy-log.service';

import { ContainerPolicyDetailsComponent } from './container-policy-details.component';
import { ContainerPolicyDetailsService } from './container-policy-details.service';

@NgModule({
  declarations: [ContainerPolicyDetailsComponent],
  exports: [ContainerPolicyDetailsComponent],
  imports: [
    CardPolicyModule,
    CommonModule,
    ModalConfirmCancelPolicyModule,
    ModalConfirmDeletePolicyModule,
    ModalConfirmDeleteRenewedPolicyModule,
    ModalConfirmEndorsePolicyModule,
    ModalConfirmReissuePolicyModule,
    ModalConfirmRenewPolicyModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalConfirmShowPaymentHistoryModule,
    ModalConfirmShowPolicySinistersModule,
    ModalConfirmUpdatePolicyModule,
    ModalSelectContactTypeModule
  ],
  providers: [
      ContainerPolicyDetailsService,
      PolicyService,
      PolicyLogService
  ]
})
export class ContainerPolicyDetailsModule { }
