import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { ModalPolicyAmountsDifferentModule } from '@components/modal-policy-amounts-different/modal-policy-amounts-different.module';
import { ModalSelectFileModule } from '@components/modal-select-file/modal-select-file.module';
import { ModalShowPolicyModule } from '@components/modal-show-policy/modal-show-policy.module';

import { UpdateCompletePolicyRoutingModule } from './update-complete-policy-routing.module';
import { UpdateCompletePolicyPage } from './update-complete-policy.page';

import { CurrencyService } from '@services/currency.service';
import { InsurerService } from '@services/insurer.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';
import { PolicyService } from '@services/policy.service';

@NgModule({
  declarations: [
    UpdateCompletePolicyPage
  ],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    FormsModule,
    LoadingContentModule,
    ModalPolicyAmountsDifferentModule,
    ModalSelectFileModule,
    ModalShowPolicyModule,
    ReactiveFormsModule,
    UpdateCompletePolicyRoutingModule
  ],
  providers: [
      CurrencyService,
      InsurerService,
      InsuranceService,
      InsuranceTypeService,
      DatePipe,
      PaymentMethodService,
      PaymentPlanService,
      PolicyService
  ]
})
export class UpdateCompletePolicyModule { }
