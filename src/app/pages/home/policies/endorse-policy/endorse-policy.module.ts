import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmApplyPolicyChangesModule } from '@components/modal-confirm-apply-policy-changes/modal-confirm-apply-policy-changes.module';
import { ModalDoCollectionAdjustmentModule } from '@components/modal-do-collection-adjustment/modal-do-collection-adjustment.module';
import { ModalGenerateReceiptsModule } from '@components/modal-generate-receipts/modal-generate-receipts.module';
import { ModalSelectEndorsementPaymentMethodModule } from '@components/modal-select-endorsement-payment-method/modal-select-endorsement-payment-method.module';
import { ModalShowEndorsementSummaryModule } from '@components/modal-show-endorsement-summary/modal-show-endorsement-summary.module';
import { ModalShowNoFractionalReceiptModule } from '@components/modal-show-no-fractional-receipt/modal-show-no-fractional-receipt.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { EndorsementTypeService } from '@services/endorsement-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

import { EndorsePolicyRoutingModule } from './endorse-policy-routing.module';
import { EndorsePolicyPage } from './endorse-policy.page';
import { EndorsePolicyService } from './endorse-policy.service';

@NgModule({
  declarations: [EndorsePolicyPage],
  imports: [
    ContainerContactDetailsModule,
    CommonModule,
    EndorsePolicyRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalConfirmApplyPolicyChangesModule,
    ModalDoCollectionAdjustmentModule,
    ModalGenerateReceiptsModule,
    ModalSelectEndorsementPaymentMethodModule,
    ModalShowEndorsementSummaryModule,
    ModalShowNoFractionalReceiptModule,
    ModalSelectFileModule,
    ReactiveFormsModule
  ],
  providers: [DatePipe, EndorsePolicyService, EndorsementTypeService, PaymentMethodService, PaymentPlanService, PolicyService]
})
export class EndorsePolicyModule { }
