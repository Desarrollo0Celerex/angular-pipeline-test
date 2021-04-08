import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateQuotationRoutingModule } from './create-quotation-routing.module';
import { CreateQuotationPage } from './create-quotation.page';


@NgModule({
  declarations: [CreateQuotationPage],
  imports: [
    CommonModule,
    CreateQuotationRoutingModule
  ]
})
export class CreateQuotationModule { }
