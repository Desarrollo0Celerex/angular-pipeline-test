import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPolicyModule } from '@components/card-policy/card-policy.module';
import { ModalConfirmCancelPolicyModule } from '@components/modal-confirm-cancel-policy/modal-confirm-cancel-policy.module';
import { ModalConfirmEndorsePolicyModule } from '@components/modal-confirm-endorse-policy/modal-confirm-endorse-policy.module';
import { ModalConfirmReissuePolicyModule } from '@components/modal-confirm-reissue-policy/modal-confirm-reissue-policy.module';
import { ModalConfirmRenewPolicyModule } from '@components/modal-confirm-renew-policy/modal-confirm-renew-policy.module';
import { ModalConfirmShowHistoryPolicyModule } from '@components/modal-confirm-show-history-policy/modal-confirm-show-history-policy.module';
import { ModalConfirmUpdatePolicyModule } from '@components/modal-confirm-update-policy/modal-confirm-update-policy.module';
import { ModalSelectContactTypeModule } from '@components/modal-select-contact-type/modal-select-contact-type.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { ModalShowPolicyDetailsModule } from '@components/modal-show-policy-details/modal-show-policy-details.module';

import { PolicyService } from '@services/policy.service';

import { ContainerPolicyDetailsComponent } from './container-policy-details.component';
import { ContainerPolicyDetailsService } from './container-policy-details.service';

@NgModule({
  declarations: [ContainerPolicyDetailsComponent],
  exports: [ContainerPolicyDetailsComponent],
  imports: [
    CardPolicyModule,
    CommonModule,
    ModalConfirmCancelPolicyModule,
    ModalConfirmEndorsePolicyModule,
    ModalConfirmReissuePolicyModule,
    ModalConfirmRenewPolicyModule,
    ModalConfirmShowHistoryPolicyModule,
    ModalConfirmUpdatePolicyModule,
    ModalSelectContactTypeModule,
    ModalShowPolicyModule,
    ModalShowPolicyDetailsModule
  ],
  providers: [ContainerPolicyDetailsService, PolicyService]
})
export class ContainerPolicyDetailsModule { }
