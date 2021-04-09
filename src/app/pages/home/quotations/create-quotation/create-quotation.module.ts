import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerContactDetailsModule } from '@components/container-contact-details/container-contact-details.module';
import { ContainerListInsurancesModule } from '@components/container-list-insurances/container-list-insurances.module';
import { ModalGetPolicyDetailsModule } from '@components/modal-get-policy-details/modal-get-policy-details.module';
import { QuotationService } from '@services/quotation.service';

import { CreateQuotationRoutingModule } from './create-quotation-routing.module';
import { CreateQuotationPage } from './create-quotation.page';
import { CreateQuotationService } from './create-quotation.service';

@NgModule({
  declarations: [CreateQuotationPage],
  imports: [
    CommonModule,
    ContainerContactDetailsModule,
    ContainerListInsurancesModule,
    ModalGetPolicyDetailsModule,
    CreateQuotationRoutingModule
  ],
  providers: [CreateQuotationService, QuotationService]
})
export class CreateQuotationModule { }
