import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationService } from '@services/quotation.service';

import { CardKpiQuotesComponent } from './card-kpi-quotes.component';

@NgModule({
  declarations: [
    CardKpiQuotesComponent
  ],
  exports: [
      CardKpiQuotesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      QuotationService
  ]
})
export class CardKpiQuotesModule { }
