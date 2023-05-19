import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module'
import { LoadingContentModule } from '@components/loading-content/loading-content.module'
import { ModalPolicyAmountsDifferentModule } from '@components/modal-policy-amounts-different/modal-policy-amounts-different.module'
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';

import { CurrencyService } from '@services/currency.service';
import { GendersService } from '@services/genders.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';
import { PolicyInsuredService } from '@services/policy-insured.service';

import { UpdatePolicyInsuredRoutingModule } from './update-policy-insured-routing.module';
import { UpdatePolicyInsuredPage } from './update-policy-insured.page';

@NgModule({
  declarations: [
    UpdatePolicyInsuredPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    FormsModule,
    LoadingContentModule,
    ModalPolicyAmountsDifferentModule,
    ModalShowPolicyModule,
    ReactiveFormsModule,
    UpdatePolicyInsuredRoutingModule
  ],
  providers: [
    CurrencyService,
    GendersService,
    PaymentMethodService,
    PaymentPlanService,
    PolicyService,
    PolicyInsuredService
  ]
})
export class UpdatePolicyInsuredModule { }
