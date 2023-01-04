import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module'
import { LoadingContentModule } from '@components/loading-content/loading-content.module'
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module'
import { CurrencyService } from '@services/currency.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { CreatePolicyInsuredRoutingModule } from './create-policy-insured-routing.module';
import { CreatePolicyInsuredPage } from './create-policy-insured.page';


@NgModule({
  declarations: [
    CreatePolicyInsuredPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    CreatePolicyInsuredRoutingModule,
    FormsModule,
    LoadingContentModule,
    ModalShowPolicyModule,
    ReactiveFormsModule
  ],
  providers: [
    CurrencyService,
    PaymentMethodService,
    PaymentPlanService,
    PolicyService,
    PolicyInsuredService
  ]
})
export class CreatePolicyInsuredModule { }
