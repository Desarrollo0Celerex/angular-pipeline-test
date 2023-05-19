import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ModalShowPolicyFileModule } from '@components/modal-show-policy-file/modal-show-policy-file.module';
import { ExternalPolicyService } from '@services/external-policy.service';
import { CurrencyService } from '@services/currency.service';
import { InsurerService } from '@services/insurer.service';
import { InsuranceService } from '@services/insurance.service';
import { InsuranceTypeService } from '@services/insurance-type.service';
import { PaymentMethodService } from '@services/payment-method.service';
import { PaymentPlanService } from '@services/payment-plan.service';

import { UpdateExternalPolicyRoutingModule } from './update-external-policy-routing.module';
import { UpdateExternalPolicyPage } from './update-external-policy.page';

@NgModule({
  declarations: [
    UpdateExternalPolicyPage
  ],
  imports: [
    CommonModule,
    UpdateExternalPolicyRoutingModule,
    ContainerContactDetailsModule,
    ModalShowPolicyFileModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
      ExternalPolicyService,
      InsurerService,
      CurrencyService,
      InsuranceService,
      InsuranceTypeService,
      PaymentMethodService,
      PaymentPlanService
  ]
})
export class UpdateExternalPolicyModule { }
