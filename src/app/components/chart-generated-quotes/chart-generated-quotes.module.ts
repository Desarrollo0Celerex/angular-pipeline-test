import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingContentModule } from '@components/loading-content/loading-content.module';
import { QuotationService } from '@services/quotation.service';

import { ChartGeneratedQuotesComponent } from './chart-generated-quotes.component';

@NgModule({
  declarations: [
    ChartGeneratedQuotesComponent
  ],
  exports: [
      ChartGeneratedQuotesComponent
  ],
  imports: [
    CommonModule,
    LoadingContentModule
  ],
  providers: [
      QuotationService
  ]
})
export class ChartGeneratedQuotesModule { }
