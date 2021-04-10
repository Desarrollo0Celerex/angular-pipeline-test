import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';
import { AtomScannService } from '@services/atom-scann.service';
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
    ContainerContactDetailsModule,
    CommonModule,
    CompletePolicyRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalSelectFileModule,
    ModalShowPolicyModule,
    ReactiveFormsModule
  ],
  providers: [AtomScannService, CompletePolicyService, CurrencyService, PaymentMethodService, PaymentPlanService, PolicyService]
})
export class CompletePolicyModule { }
