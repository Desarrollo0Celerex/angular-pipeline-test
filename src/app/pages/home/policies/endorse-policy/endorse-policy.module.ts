import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalConfirmAmountIncreaseModule } from '@components/modal-confirm-amount-increase/modal-confirm-amount-increase.module';
import { ModalConfirmApplyEndorsementModule } from '@components/modal-confirm-apply-endorsement/modal-confirm-apply-endorsement.module';
import { ModalGenerateReceiptsModule } from '@components/modal-generate-receipts/modal-generate-receipts.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { CurrencyService } from '@services/currency.service';
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
    ModalConfirmAmountIncreaseModule,
    ModalConfirmApplyEndorsementModule,
    ModalGenerateReceiptsModule,
    ModalSelectFileModule,
    ReactiveFormsModule
  ],
  providers: [CurrencyService, DatePipe, EndorsePolicyService, EndorsementTypeService, PaymentMethodService, PaymentPlanService, PolicyService]
})
export class EndorsePolicyModule { }
