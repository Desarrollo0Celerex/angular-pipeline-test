import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerInsurancesModule } from '@components/container-insurances/container-insurances.module';

import { CreateQuotationRoutingModule } from './create-quotation-routing.module';
import { CreateQuotationPage } from './create-quotation.page';

@NgModule({
  declarations: [CreateQuotationPage],
  imports: [
    CommonModule,
    ContainerInsurancesModule,
    CreateQuotationRoutingModule
  ]
})
export class CreateQuotationModule { }
