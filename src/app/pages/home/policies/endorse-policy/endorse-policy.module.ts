import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmApplyEndorsementWithDecrementModule } from '@components/modal-confirm-apply-endorsement-with-decrement/modal-confirm-apply-endorsement-with-decrement.module';
import { modalConfirmApplyEndorsementWithIncrementModule } from '@components/modal-confirm-apply-endorsement-with-increment/modal-confirm-apply-endorsement-with-increment.module';
import { ModalConfirmApplyEndorsementWithoutChangesModule } from '@components/modal-confirm-apply-endorsement-without-changes/modal-confirm-apply-endorsement-without-changes.module';
import { ModalConfirmApplyEndorsementModule } from '@components/modal-confirm-apply-endorsement/modal-confirm-apply-endorsement.module';
import { modalConfirmApplyFractionalReceiptModule } from '@components/modal-confirm-apply-fractional-receipt/modal-confirm-apply-fractional-receipt.module';
import { ModalSelectEndorsementPaymentMethodModule } from '@components/modal-select-endorsement-payment-method/modal-select-endorsement-payment-method.module';
import { ModalSelectEvidenceModule } from '@components/modal-select-evidence/modal-select-evidence.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { EndorsementTypeService } from '@services/endorsement-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

import { EndorsePolicyRoutingModule } from './endorse-policy-routing.module';
import { EndorsePolicyPage } from './endorse-policy.page';

@NgModule({
  declarations: [EndorsePolicyPage],
  imports: [
    ContainerContactDetailsModule,
    CommonModule,
    EndorsePolicyRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmApplyEndorsementModule,
    ModalConfirmApplyEndorsementWithDecrementModule,
    ModalConfirmApplyEndorsementWithoutChangesModule,
    modalConfirmApplyFractionalReceiptModule,
    ModalSelectEndorsementPaymentMethodModule,
    modalConfirmApplyEndorsementWithIncrementModule,
    ModalSelectFileModule,
    ModalSelectEvidenceModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, EndorsementTypeService, PaymentMethodService, PaymentPlanService, PolicyService]
})
export class EndorsePolicyModule { }
