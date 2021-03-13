import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardContactModule } from '@components/card-contact/card-contact.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

import { CompletePolicyRoutingModule } from './complete-policy-routing.module';
import { CompletePolicyPage } from './complete-policy.page';
import { CompletePolicyService } from './complete-policy.service';


@NgModule({
  declarations: [CompletePolicyPage],
  imports: [
    CardContactModule,
    CommonModule,
    CompletePolicyRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalSelectFileModule,
    ModalShowPolicyModule,
    ReactiveFormsModule
  ],
  providers: [CompletePolicyService, CurrencyService, PaymentMethodService, PaymentPlanService, PolicyService]
})
export class CompletePolicyModule { }
