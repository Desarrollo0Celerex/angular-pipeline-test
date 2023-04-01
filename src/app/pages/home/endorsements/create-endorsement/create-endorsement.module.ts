import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { DropdownSelectPhoneCodeModule } from '@components/dropdown-select-phone-code/dropdown-select-phone-code.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmApplyEndorsementModule } from '@components/modal-confirm-apply-endorsement/modal-confirm-apply-endorsement.module';
import { ModalConfirmApplyEndorsementWithDecrementModule } from '@components/modal-confirm-apply-endorsement-with-decrement/modal-confirm-apply-endorsement-with-decrement.module';
import { modalConfirmApplyEndorsementWithIncrementModule } from '@components/modal-confirm-apply-endorsement-with-increment/modal-confirm-apply-endorsement-with-increment.module';
import { ModalConfirmApplyEndorsementWithoutChangesModule } from '@components/modal-confirm-apply-endorsement-without-changes/modal-confirm-apply-endorsement-without-changes.module';
import { modalConfirmApplyFractionalReceiptModule } from '@components/modal-confirm-apply-fractional-receipt/modal-confirm-apply-fractional-receipt.module';
import { ModalNotifyEndorsementCannotBeAppliedModule } from '@components/modal-notify-endorsement-cannot-be-applied/modal-notify-endorsement-cannot-be-applied.module';
import { ModalPolicyAmountsDifferentModule } from '@components/modal-policy-amounts-different/modal-policy-amounts-different.module';
import { ModalSelectEndorsementPaymentMethodModule } from '@components/modal-select-endorsement-payment-method/modal-select-endorsement-payment-method.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';

import { EndorsementTypeService } from '@services/endorsement-type.service';
import { GendersService } from '@services/genders.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { CreateEndorsementRoutingModule } from './create-endorsement-routing.module';
import { CreateEndorsementPage } from './create-endorsement.page';

@NgModule({
  declarations: [
    CreateEndorsementPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    CreateEndorsementRoutingModule,
    DropdownSelectPhoneCodeModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmApplyEndorsementModule,
    ModalConfirmApplyEndorsementWithDecrementModule,
    modalConfirmApplyEndorsementWithIncrementModule,
    ModalConfirmApplyEndorsementWithoutChangesModule,
    modalConfirmApplyFractionalReceiptModule,
    ModalNotifyEndorsementCannotBeAppliedModule,
    ModalPolicyAmountsDifferentModule,
    ModalSelectEndorsementPaymentMethodModule,
    ModalSelectEvidenceModule,
    ModalSelectFileModule,
    ReactiveFormsModule,
  ],
  providers: [
    EndorsementTypeService,
    GendersService,
    PaymentMethodService,
    PaymentPlanService,
    PolicyService,
    PolicyInsuredService
  ]
})
export class CreateEndorsementModule { }
