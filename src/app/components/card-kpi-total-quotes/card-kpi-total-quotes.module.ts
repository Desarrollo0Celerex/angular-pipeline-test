import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuotationService } from '@services/quotation.service';

import { CardKpiTotalQuotesComponent } from './card-kpi-total-quotes.component';

@NgModule({
  declarations: [
    CardKpiTotalQuotesComponent
  ],
  exports: [
      CardKpiTotalQuotesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
      QuotationService
  ]
})
export class CardKpiTotalQuotesModule { }
